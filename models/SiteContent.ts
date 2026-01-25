import mongoose from "mongoose";

export interface ISiteContent extends mongoose.Document {
  key: string;
  page: string;
  value: mongoose.Schema.Types.Mixed;
  createdAt: Date;
  updatedAt: Date;
}

const siteContentSchema = new mongoose.Schema<ISiteContent>(
  {
    key: { type: String, required: true },
    page: { type: String, required: true },
    value: { type: mongoose.Schema.Types.Mixed, required: true },
  },
  { timestamps: true }
);

siteContentSchema.index({ page: 1, key: 1 }, { unique: true });

const SiteContent: mongoose.Model<ISiteContent> =
  mongoose.models.sitecontent ||
  mongoose.model<ISiteContent>("sitecontent", siteContentSchema);

export { SiteContent };
