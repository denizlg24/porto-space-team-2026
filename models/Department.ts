import mongoose from "mongoose";

export interface LocalizedString {
  en: string;
  pt: string;
}

export interface IDepartment extends mongoose.Document {
  name: string;
  code: string;
  description: LocalizedString;
  skills: LocalizedString[];
  order: number;
  createdAt: Date;
  updatedAt: Date;
}

const localizedStringSchema = new mongoose.Schema(
  {
    en: { type: String, default: "" },
    pt: { type: String, default: "" },
  },
  { _id: false }
);

const departmentSchema = new mongoose.Schema<IDepartment>(
  {
    name: { type: String, required: true },
    code: { type: String, required: true, unique: true },
    order: { type: Number, required: true, default: 0 },
    description: {
      type: localizedStringSchema,
      default: () => ({ en: "", pt: "" }),
    },
    skills: {
      type: [localizedStringSchema],
      default: [],
    },
  },
  { timestamps: true }
);

departmentSchema.index({ order: 1 });

const Departments: mongoose.Model<IDepartment> =
  mongoose.models.department ||
  mongoose.model<IDepartment>("department", departmentSchema);

export { Departments };
