import mongoose from "mongoose";

export interface ISponsor extends mongoose.Document {
  name: string;
  categoryId: mongoose.Types.ObjectId;
  link: string;
  imageUrl: string;
  description: string;
  order: number;
  createdAt: Date;
  updatedAt: Date;
  projectLogo?: string;
  projectName?: string;
  projectSlug?: string;
}

const sponsorSchema = new mongoose.Schema<ISponsor>(
  {
    name: { type: String, required: true },
    categoryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "sponsorcategory",
      required: true,
    },
    link: { type: String, required: true },
    imageUrl: { type: String, required: true },
    description: { type: String, default: "" },
    order: { type: Number, required: true, default: 0 },
    projectLogo: { type: String, required: false },
    projectName: { type: String, required: false },
    projectSlug: { type: String, required: false },
  },
  { timestamps: true }
);

sponsorSchema.index({ categoryId: 1, order: 1 });

const Sponsors: mongoose.Model<ISponsor> =
  mongoose.models.sponsor || mongoose.model<ISponsor>("sponsor", sponsorSchema);

export { Sponsors };
