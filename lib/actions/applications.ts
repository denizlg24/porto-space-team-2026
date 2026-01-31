"use server";

import { connectDB } from "@/lib/db";
import { Applications, type ApplicationStatus } from "@/models/Application";
import { getAdminSession, type ActionResult } from "./users";
import { Resend } from "resend";
import { env } from "@/lib/env";
import { getApplicationStatusUpdateEmailTemplate } from "@/lib/email-templates";
import { createZoomMeeting } from "@/lib/zoom";

const resend = new Resend(env.RESEND_API_KEY);

export type ApplicationData = {
  id: string;
  applicationId: string;
  email: string;
  name: string;
  course: string;
  yearOfStudy: number;
  linkedIn?: string;
  github?: string;
  relevantExperience?: string;
  cvLink: string;
  motivationLetterLink: string;
  status: ApplicationStatus;
  interviewDate?: string;
  zoomLink?: string;
  zoomMeetingId?: string;
  zoomPassword?: string;
  createdAt: string;
};

function mapApplicationToData(application: {
  _id: { toString(): string };
  applicationId: string;
  email: string;
  name: string;
  course: string;
  yearOfStudy: number;
  linkedIn?: string;
  github?: string;
  relevantExperience?: string;
  cvLink: string;
  motivationLetterLink: string;
  status: ApplicationStatus;
  interviewDate?: Date;
  zoomLink?: string;
  zoomMeetingId?: string;
  zoomPassword?: string;
  createdAt: Date;
}): ApplicationData {
  return {
    id: application._id.toString(),
    applicationId: application.applicationId,
    email: application.email,
    name: application.name,
    course: application.course,
    yearOfStudy: application.yearOfStudy,
    linkedIn: application.linkedIn,
    github: application.github,
    relevantExperience: application.relevantExperience,
    cvLink: application.cvLink,
    motivationLetterLink: application.motivationLetterLink,
    status: application.status,
    interviewDate: application.interviewDate?.toISOString(),
    zoomLink: application.zoomLink,
    zoomMeetingId: application.zoomMeetingId,
    zoomPassword: application.zoomPassword,
    createdAt: application.createdAt.toISOString(),
  };
}

async function sendStatusEmail(
  application: ApplicationData,
  status: "read" | "interview" | "accepted" | "rejected" | "archived",
  interviewDate?: string,
  zoomLink?: string,
) {
  try {
    const formattedInterviewDate = interviewDate
      ? new Date(interviewDate).toLocaleString("en-US", {
          weekday: "long",
          year: "numeric",
          month: "long",
          day: "numeric",
          hour: "2-digit",
          minute: "2-digit",
        })
      : undefined;

    await resend.emails.send({
      from: env.EMAIL_FROM,
      to: application.email,
      subject: getEmailSubject(status, application.applicationId),
      html: getApplicationStatusUpdateEmailTemplate({
        name: application.name,
        applicationId: application.applicationId,
        status,
        interviewDate: formattedInterviewDate,
        zoomLink,
      }),
    });
  } catch (error) {
    console.error("Failed to send status update email:", error);
  }
}

function getEmailSubject(
  status: "read" | "interview" | "accepted" | "rejected" | "archived",
  applicationId: string,
): string {
  const subjects = {
    read: `[${applicationId}] Your Application is Under Review`,
    interview: `[${applicationId}] Interview Invitation - Porto Space Team`,
    accepted: `[${applicationId}] Welcome to Porto Space Team!`,
    rejected: `[${applicationId}] Application Update - Porto Space Team`,
    archived: `[${applicationId}] Application Archived - Porto Space Team`,
  };
  return subjects[status];
}

export async function getApplications(): Promise<
  ActionResult<ApplicationData[]>
> {
  const session = await getAdminSession();
  if (!session) {
    return { success: false, error: "Unauthorized" };
  }

  await connectDB();
  const applications = await Applications.find().sort({ createdAt: -1 });

  const data: ApplicationData[] = applications.map(mapApplicationToData);

  return { success: true, data };
}

export async function updateApplicationStatus(
  id: string,
  status: ApplicationStatus,
): Promise<ActionResult<ApplicationData>> {
  const session = await getAdminSession();
  if (!session) {
    return { success: false, error: "Unauthorized" };
  }

  await connectDB();

  const application = await Applications.findByIdAndUpdate(
    id,
    { status },
    { new: true },
  );

  if (!application) {
    return { success: false, error: "Application not found" };
  }

  const data = mapApplicationToData(application);

  if (status !== "new") {
    await sendStatusEmail(
      data,
      status as "read" | "interview" | "accepted" | "rejected",
    );
  }

  return { success: true, data };
}

export async function scheduleInterview(
  id: string,
  interviewDate: string,
): Promise<ActionResult<ApplicationData>> {
  const session = await getAdminSession();
  if (!session) {
    return { success: false, error: "Unauthorized" };
  }

  await connectDB();

  const existingApplication = await Applications.findById(id);
  if (!existingApplication) {
    return { success: false, error: "Application not found" };
  }

  let zoomData: { joinUrl: string; meetingId: string; password: string } | null = null;
  try {
    zoomData = await createZoomMeeting({
      topic: `Porto Space Team Interview - ${existingApplication.name}`,
      startTime: new Date(interviewDate).toISOString(),
      duration: 60,
      agenda: `Interview for application ${existingApplication.applicationId}`,
    });
  } catch (error) {
    console.error("Failed to create Zoom meeting:", error);
  }

  const application = await Applications.findByIdAndUpdate(
    id,
    {
      status: "interview" as ApplicationStatus,
      interviewDate: new Date(interviewDate),
      ...(zoomData && {
        zoomLink: zoomData.joinUrl,
        zoomMeetingId: zoomData.meetingId,
        zoomPassword: zoomData.password,
      }),
    },
    { new: true },
  );

  if (!application) {
    return { success: false, error: "Application not found" };
  }

  const data = mapApplicationToData(application);

  await sendStatusEmail(data, "interview", interviewDate, zoomData?.joinUrl);

  return { success: true, data };
}

export async function deleteApplication(
  id: string,
): Promise<ActionResult<{ deleted: true }>> {
  const session = await getAdminSession();
  if (!session) {
    return { success: false, error: "Unauthorized" };
  }

  await connectDB();

  const application = await Applications.findById(id);

  if (!application) {
    return { success: false, error: "Application not found" };
  }

  const data = mapApplicationToData(application);

  await sendStatusEmail(data, "archived");

  await Applications.findByIdAndDelete(id);

  return { success: true, data: { deleted: true } };
}
