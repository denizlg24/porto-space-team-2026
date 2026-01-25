import mongoose from "mongoose";

export interface IDepartment extends mongoose.Document {
  name: string;
  code: string;
  order: number;
  createdAt: Date;
  updatedAt: Date;
}

const departmentSchema = new mongoose.Schema<IDepartment>(
  {
    name: { type: String, required: true },
    code: { type: String, required: true, unique: true },
    order: { type: Number, required: true, default: 0 },
  },
  { timestamps: true }
);

departmentSchema.index({ order: 1 });

const Departments: mongoose.Model<IDepartment> =
  mongoose.models.department ||
  mongoose.model<IDepartment>("department", departmentSchema);

export { Departments };
