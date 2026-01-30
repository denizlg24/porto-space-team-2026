import mongoose from "mongoose";

export type ContactSubject = "sponsorship" | "partnership" | "media" | "other";
export type ContactStatus = "new" | "read" | "replied" | "archived";

export interface IContact extends mongoose.Document {
  ticketId: string;
  email: string;
  name: string;
  subject: ContactSubject;
  message: string;
  status: ContactStatus;
  createdAt: Date;
  updatedAt: Date;
}

const contactSchema = new mongoose.Schema<IContact>(
  {
    ticketId: { type: String, required: true, unique: true },
    email: { type: String, required: true, lowercase: true },
    name: { type: String, required: true },
    subject: {
      type: String,
      required: true,
      enum: ["sponsorship", "partnership", "media", "other"],
    },
    message: { type: String, required: true },
    status: {
      type: String,
      required: true,
      enum: ["new", "read", "replied", "archived"],
      default: "new",
    },
  },
  { timestamps: true }
);

const Contacts: mongoose.Model<IContact> =
  mongoose.models.contact || mongoose.model<IContact>("contact", contactSchema);

export { Contacts };
