import mongoose from "mongoose";

export interface IFile extends mongoose.Document {
  cid: string;
  url: string;
  mimeType: string;
  fileName: string;
  uploadedBy: string;
  uploadedAt: Date;
}

const fileSchema = new mongoose.Schema<IFile>({
  cid: { type: String, required: true },
  url: { type: String, required: true },
  mimeType: { type: String, required: true },
  fileName: { type: String, required: true },
  uploadedBy: { type: String, ref: "user", required: true },
  uploadedAt: { type: Date, default: Date.now },
});

const Files: mongoose.Model<IFile> = mongoose.models.file || mongoose.model<IFile>("file", fileSchema);

export {Files};