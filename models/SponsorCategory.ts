import mongoose from "mongoose";

export interface ISponsorCategory extends mongoose.Document {
  name: string;
  order: number;
  titleStyle: {
    fontSize: string;
    fontWeight: string;
    colorLight: string;
    colorDark: string;
  };
  createdAt: Date;
  updatedAt: Date;
}

const sponsorCategorySchema = new mongoose.Schema<ISponsorCategory>(
  {
    name: { type: String, required: true },
    order: { type: Number, required: true, default: 0 },
    titleStyle: {
      fontSize: { type: String, default: "2rem" },
      fontWeight: { type: String, default: "700" },
      colorLight: { type: String, default: "#000000" },
      colorDark: { type: String, default: "#ffffff" },
    },
  },
  { timestamps: true }
);

sponsorCategorySchema.index({ order: 1 });

const SponsorCategories: mongoose.Model<ISponsorCategory> =
  mongoose.models.sponsorcategory ||
  mongoose.model<ISponsorCategory>("sponsorcategory", sponsorCategorySchema);

export { SponsorCategories };
