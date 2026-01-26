import mongoose from "mongoose";

export interface LocalizedString {
  en: string;
  pt: string;
}

export interface ITimelineItem extends mongoose.Document {
  year: number;
  title: LocalizedString;
  subtitle: LocalizedString;
  imageUrls: string[];
  order: number;
  createdAt: Date;
  updatedAt: Date;
}

const localizedStringSchema = new mongoose.Schema(
  {
    en: { type: String, required: true },
    pt: { type: String, required: true },
  },
  { _id: false }
);

const timelineItemSchema = new mongoose.Schema<ITimelineItem>(
  {
    year: { type: Number, required: true },
    title: { type: localizedStringSchema, required: true },
    subtitle: { type: localizedStringSchema, required: true },
    imageUrls: { type: [String], required: true, default: [] },
    order: { type: Number, required: true, default: 0 },
  },
  { timestamps: true }
);

timelineItemSchema.index({ order: 1 });
timelineItemSchema.index({ year: -1 });

const TimelineItems: mongoose.Model<ITimelineItem> =
  mongoose.models.timelineitem ||
  mongoose.model<ITimelineItem>("timelineitem", timelineItemSchema);

export { TimelineItems };
