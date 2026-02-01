import { connectDB } from "@/lib/db";
import { Applications } from "@/models/Application";
import { InterviewSlots } from "@/models/InterviewSlot";
import { checkRateLimit } from "@/lib/rate-limit";
import { createGoogleMeetMeeting } from "@/lib/google-meet";
import { Resend } from "resend";
import { env } from "@/lib/env";
import {
  getInterviewBookedEmailTemplate,
  getInterviewBookedAdminEmailTemplate,
} from "@/lib/email-templates";
import {
  publicRoute,
  success,
  ApiError,
  assert,
  assertExists,
  createErrors,
} from "@/lib/api";
import type { RouteDefinition } from "@/lib/api-client";

const resend = new Resend(env.RESEND_API_KEY);

const errors = createErrors({
  SLOT_UNAVAILABLE: {
    status: 400,
    message: "This time slot is no longer available",
  },
  INTERVIEW_EXISTS: {
    status: 400,
    message: "Interview already scheduled",
  },
  NOT_IN_INTERVIEW_STAGE: {
    status: 400,
    message:
      "You can only book an interview when your application is in interview stage",
  },
  MEET_FAILED: {
    status: 500,
    message: "Failed to create meeting. Please try again.",
  },
});

export type BookInterviewInput = {
  slotId: string;
};

export type BookInterviewResponse = {
  interviewDate: string;
  meetLink: string;
};

export type BookInterviewRoute = RouteDefinition<
  BookInterviewResponse,
  | "SLOT_UNAVAILABLE"
  | "INTERVIEW_EXISTS"
  | "NOT_IN_INTERVIEW_STAGE"
  | "MEET_FAILED",
  BookInterviewInput
>;

const RATE_LIMIT_CONFIG = {
  maxRequests: 3,
  windowMs: 60 * 1000,
};

export const POST = publicRoute(async (ctx) => {
  const url = new URL(ctx.request.url);
  const pathParts = url.pathname.split("/");
  const applicationId = pathParts[pathParts.length - 2] || "";

  const body = await ctx.request.json();
  const { slotId } = body as BookInterviewInput;

  const clientIp =
    ctx.headers.get("x-forwarded-for")?.split(",")[0] ||
    ctx.headers.get("x-real-ip") ||
    "unknown";

  const rateLimitResult = await checkRateLimit(
    `book-interview:${clientIp}`,
    RATE_LIMIT_CONFIG,
  );

  if (!rateLimitResult.success) {
    const seconds = Math.ceil((rateLimitResult.retryAfterMs || 0) / 1000);
    throw new ApiError("RATE_LIMITED", {
      message: `Too many requests. Please try again in ${seconds} seconds.`,
    });
  }

  assert(
    applicationId && /^APP-[A-Z0-9]+-[A-Z0-9]+$/i.test(applicationId),
    "BAD_REQUEST",
    "Invalid application ID format",
  );

  assert(slotId, "BAD_REQUEST", "Interview slot is required");

  await connectDB();

  const application = await Applications.findOne({
    applicationId: applicationId.toUpperCase(),
  });

  assertExists(application, "NOT_FOUND", "Application not found");

  if (application.status !== "interview") {
    return errors.throw("NOT_IN_INTERVIEW_STAGE");
  }

  if (application.interviewDate) {
    return errors.throw("INTERVIEW_EXISTS");
  }

  const slot = await InterviewSlots.findOneAndUpdate(
    {
      _id: slotId,
      isBooked: false,
      startTime: { $gt: new Date() },
    },
    {
      isBooked: true,
      bookedBy: application._id,
    },
    { new: true },
  );

  if (!slot) {
    return errors.throw("SLOT_UNAVAILABLE");
  }

  let meetData: { meetLink: string; eventId: string; calendarLink: string };
  try {
    meetData = await createGoogleMeetMeeting({
      topic: `Porto Space Team Interview - ${application.name}`,
      startTime: slot.startTime.toISOString(),
      duration: Math.round(
        (slot.endTime.getTime() - slot.startTime.getTime()) / 60000,
      ),
      agenda: `Interview for application ${application.applicationId}`,
    });
  } catch (error) {
    console.error("Failed to create Google Meet meeting:", error);

    await InterviewSlots.findByIdAndUpdate(slotId, {
      isBooked: false,
      bookedBy: null,
    });
    return errors.throw("MEET_FAILED");
  }

  await Applications.findByIdAndUpdate(application._id, {
    interviewDate: slot.startTime,
    meetLink: meetData.meetLink,
    meetEventId: meetData.eventId,
    calendarLink: meetData.calendarLink,
  });

  const formattedDate = slot.startTime.toLocaleString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    timeZone: "Europe/Lisbon",
  });

  try {
    await resend.emails.send({
      from: env.EMAIL_FROM,
      to: application.email,
      subject: `[${application.applicationId}] Interview Confirmed - Porto Space Team`,
      html: getInterviewBookedEmailTemplate({
        name: application.name,
        applicationId: application.applicationId,
        interviewDate: formattedDate,
        meetLink: meetData.meetLink,
      }),
    });
  } catch (error) {
    console.error("Failed to send applicant email:", error);
  }

  try {
    await resend.emails.send({
      from: env.EMAIL_FROM,
      to: env.EMAIL_FROM.split("<")[1].split(">")[0],
      subject: `Interview Booked: ${application.name} - ${formattedDate}`,
      html: getInterviewBookedAdminEmailTemplate({
        applicantName: application.name,
        applicantEmail: application.email,
        applicationId: application.applicationId,
        interviewDate: formattedDate,
        meetLink: meetData.meetLink,
      }),
    });
  } catch (error) {
    console.error("Failed to send admin email:", error);
  }

  return success<BookInterviewResponse>({
    interviewDate: slot.startTime.toISOString(),
    meetLink: meetData.meetLink,
  });
});
