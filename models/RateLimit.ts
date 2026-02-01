import mongoose from "mongoose";

export interface IRateLimit extends mongoose.Document {
  identifier: string;
  count: number;
  windowStart: Date;
  expiresAt: Date;
}

const rateLimitSchema = new mongoose.Schema<IRateLimit>({
  identifier: { type: String, required: true, unique: true, index: true },
  count: { type: Number, required: true, default: 1 },
  windowStart: { type: Date, required: true, default: Date.now },
  expiresAt: { type: Date, required: true, index: { expires: 0 } },
});

const RateLimits: mongoose.Model<IRateLimit> =
  mongoose.models.ratelimit || mongoose.model<IRateLimit>("ratelimit", rateLimitSchema);

export { RateLimits };
