import mongoose from "mongoose";

export interface LocalizedString {
  en: string;
  pt: string;
}

export interface INewsletter extends mongoose.Document {
  title: LocalizedString;
  pdfUrl: string;
  pdfFileName: string;
  sentAt: Date | null;
  sentCount: number;
  createdAt: Date;
  updatedAt: Date;
}

const localizedStringSchema = new mongoose.Schema<LocalizedString>(
  {
    en: { type: String, required: true },
    pt: { type: String, required: true },
  },
  { _id: false }
);

const newsletterSchema = new mongoose.Schema<INewsletter>(
  {
    title: { type: localizedStringSchema, required: true },
    pdfUrl: { type: String, required: true },
    pdfFileName: { type: String, required: true },
    sentAt: { type: Date, default: null },
    sentCount: { type: Number, default: 0 },
  },
  { timestamps: true }
);

newsletterSchema.index({ createdAt: -1 });

const Newsletters: mongoose.Model<INewsletter> =
  mongoose.models.newsletter ||
  mongoose.model<INewsletter>("newsletter", newsletterSchema);

export { Newsletters };
