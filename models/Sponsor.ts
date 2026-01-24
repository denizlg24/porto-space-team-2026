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
  },
  { timestamps: true }
);

sponsorSchema.index({ categoryId: 1, order: 1 });

const Sponsors: mongoose.Model<ISponsor> =
  mongoose.models.sponsor || mongoose.model<ISponsor>("sponsor", sponsorSchema);

export { Sponsors };
