import mongoose from "mongoose";

export type ApplicationStatus = "new" | "read" | "rejected" | "interview" | "accepted";

export interface IApplication extends mongoose.Document {
  applicationId: string;
  email: string;
  name: string;
  course: string;
  yearOfStudy: number;
  linkedIn?: string;
  github?: string;
  relevantExperience?: string;
  cvLink: string;
  motivationLetterLink: string;
  status: ApplicationStatus;
  interviewDate?: Date;
  zoomLink?: string;
  zoomMeetingId?: string;
  zoomPassword?: string;
  createdAt: Date;
  updatedAt: Date;
}

const applicationSchema = new mongoose.Schema<IApplication>(
  {
    applicationId: { type: String, required: true, unique: true },
    email: { type: String, required: true, lowercase: true },
    name: { type: String, required: true },
    course: { type: String, required: true },
    yearOfStudy: { type: Number, required: true },
    linkedIn: { type: String },
    github: { type: String },
    relevantExperience: { type: String },
    cvLink: { type: String, required: true },
    motivationLetterLink: { type: String, required: true },
    status: {
      type: String,
      required: true,
      enum: ["new", "read", "rejected", "interview", "accepted"],
      default: "new",
    },
    interviewDate: { type: Date },
    zoomLink: { type: String },
    zoomMeetingId: { type: String },
    zoomPassword: { type: String },
  },
  { timestamps: true }
);

const Applications: mongoose.Model<IApplication> =
  mongoose.models.application || mongoose.model<IApplication>("application", applicationSchema);

export { Applications };
