import { connectDB } from "@/lib/db";
import { Applications } from "@/models/Application";
import { checkRateLimit } from "@/lib/rate-limit";
import {
  publicRoute,
  success,
  ApiError,
  assert,
  assertExists,
} from "@/lib/api";
import type { RouteDefinition } from "@/lib/api-client";
import type { ApplicationStatus } from "@/models/Application";

export type ApplicationData = {
  applicationId: string;
  name: string;
  email: string;
  course: string;
  status: ApplicationStatus;
  interviewDate?: string;
  zoomLink?: string;
  cvLink: string;
  motivationLetterLink: string;
  createdAt: string;
};

export type GetApplicationRoute = RouteDefinition<
  ApplicationData,
  "INVALID_APPLICATION_ID"
>;

const RATE_LIMIT_CONFIG = {
  maxRequests: 5,
  windowMs: 60 * 1000,
};

export const GET = publicRoute(async (ctx) => {
  const url = new URL(ctx.request.url);
  const applicationId = url.pathname.split("/").pop() || "";

  const clientIp =
    ctx.headers.get("x-forwarded-for")?.split(",")[0] ||
    ctx.headers.get("x-real-ip") ||
    "unknown";

  const rateLimitResult = await checkRateLimit(
    `app-lookup:${clientIp}`,
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

  await connectDB();

  const application = await Applications.findOne({
    applicationId: applicationId.toUpperCase(),
  });

  assertExists(application, "NOT_FOUND", "Application not found");

  return success<ApplicationData>({
    applicationId: application.applicationId,
    name: application.name,
    email: application.email,
    course: application.course,
    status: application.status,
    interviewDate: application.interviewDate?.toISOString(),
    zoomLink: application.zoomLink,
    cvLink: application.cvLink,
    motivationLetterLink: application.motivationLetterLink,
    createdAt: application.createdAt.toISOString(),
  });
});
