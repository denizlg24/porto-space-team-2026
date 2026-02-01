import { connectDB } from "@/lib/db";
import { InterviewSlots } from "@/models/InterviewSlot";
import { checkRateLimit } from "@/lib/rate-limit";
import { publicRoute, success, ApiError } from "@/lib/api";
import type { RouteDefinition } from "@/lib/api-client";

export type InterviewSlotData = {
  id: string;
  startTime: string;
  endTime: string;
};

export type GetInterviewSlotsResponse = {
  slots: InterviewSlotData[];
};

export type GetInterviewSlotsRoute = RouteDefinition<GetInterviewSlotsResponse>;

const RATE_LIMIT_CONFIG = {
  maxRequests: 10,
  windowMs: 60 * 1000,
};

export const GET = publicRoute(async (ctx) => {
  const clientIp =
    ctx.headers.get("x-forwarded-for")?.split(",")[0] ||
    ctx.headers.get("x-real-ip") ||
    "unknown";

  const rateLimitResult = await checkRateLimit(
    `interview-slots:${clientIp}`,
    RATE_LIMIT_CONFIG,
  );

  if (!rateLimitResult.success) {
    const seconds = Math.ceil((rateLimitResult.retryAfterMs || 0) / 1000);
    throw new ApiError("RATE_LIMITED", {
      message: `Too many requests. Please try again in ${seconds} seconds.`,
    });
  }

  await connectDB();

  const slots = await InterviewSlots.find({
    isBooked: false,
    startTime: { $gt: new Date() },
  })
    .sort({ startTime: 1 })
    .lean();

  return success<GetInterviewSlotsResponse>({
    slots: slots.map((slot) => ({
      id: slot._id.toString(),
      startTime: slot.startTime.toISOString(),
      endTime: slot.endTime.toISOString(),
    })),
  });
});
