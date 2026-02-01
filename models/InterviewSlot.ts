import mongoose from "mongoose";

export interface IInterviewSlot extends mongoose.Document {
  startTime: Date;
  endTime: Date;
  isBooked: boolean;
  bookedBy?: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const interviewSlotSchema = new mongoose.Schema<IInterviewSlot>(
  {
    startTime: { type: Date, required: true, index: true },
    endTime: { type: Date, required: true },
    isBooked: { type: Boolean, default: false },
    bookedBy: { type: mongoose.Schema.Types.ObjectId, ref: "application" },
  },
  { timestamps: true }
);


interviewSlotSchema.index({ startTime: 1, isBooked: 1 });

const InterviewSlots: mongoose.Model<IInterviewSlot> =
  mongoose.models.interviewslot ||
  mongoose.model<IInterviewSlot>("interviewslot", interviewSlotSchema);

export { InterviewSlots };
