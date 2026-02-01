import { connectDB } from "./db";
import { RateLimits } from "@/models/RateLimit";

export interface RateLimitConfig {
  maxRequests: number;
  windowMs: number;
}

export interface RateLimitResult {
  success: boolean;
  remaining: number;
  resetAt: Date;
  retryAfterMs?: number;
}

export async function checkRateLimit(
  identifier: string,
  config: RateLimitConfig,
): Promise<RateLimitResult> {
  await connectDB();

  const now = new Date();
  const windowStart = new Date(now.getTime() - config.windowMs);
  const expiresAt = new Date(now.getTime() + config.windowMs);

  const existing = await RateLimits.findOne({ identifier });

  if (!existing || existing.windowStart < windowStart) {
    await RateLimits.findOneAndUpdate(
      { identifier },
      {
        identifier,
        count: 1,
        windowStart: now,
        expiresAt,
      },
      { upsert: true, new: true },
    );

    return {
      success: true,
      remaining: config.maxRequests - 1,
      resetAt: expiresAt,
    };
  }

  if (existing.count >= config.maxRequests) {
    const resetAt = new Date(existing.windowStart.getTime() + config.windowMs);
    return {
      success: false,
      remaining: 0,
      resetAt,
      retryAfterMs: resetAt.getTime() - now.getTime(),
    };
  }

  await RateLimits.findOneAndUpdate({ identifier }, { $inc: { count: 1 } });

  return {
    success: true,
    remaining: config.maxRequests - existing.count - 1,
    resetAt: new Date(existing.windowStart.getTime() + config.windowMs),
  };
}
