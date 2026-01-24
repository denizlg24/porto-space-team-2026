"use server";

import { connectDB } from "@/lib/db";
import { Files, type IFile } from "@/models/File";
import { getAdminSession, type ActionResult } from "./users";
import { revalidatePath } from "next/cache";
import { pinata } from "@/lib/files";

export type FileItem = {
  id: string;
  cid: string;
  url: string;
  mimeType: string;
  fileName: string;
  uploadedBy: string;
  uploadedAt: Date;
};

function transformFile(doc: IFile): FileItem {
  return {
    id: doc._id.toString(),
    cid: doc.cid,
    url: doc.url,
    mimeType: doc.mimeType,
    fileName: doc.fileName,
    uploadedBy: doc.uploadedBy,
    uploadedAt: doc.uploadedAt,
  };
}

export async function getFiles(): Promise<ActionResult<FileItem[]>> {
  const session = await getAdminSession();
  if (!session) {
    return { success: false, error: "Unauthorized" };
  }

  try {
    await connectDB();
    const files = await Files.find().sort({ uploadedAt: -1 });
    return { success: true, data: files.map(transformFile) };
  } catch (error) {
    console.error("Error fetching files:", error);
    return { success: false, error: "Failed to fetch files" };
  }
}

export async function deleteFile(fileId: string): Promise<ActionResult> {
  const session = await getAdminSession();
  if (!session) {
    return { success: false, error: "Unauthorized" };
  }

  try {
    await connectDB();
    const file = await Files.findById(fileId);

    if (!file) {
      return { success: false, error: "File not found" };
    }

    try {
      await pinata.files.public.delete([file.cid]);
    } catch {
      // Continue even if pinata delete fails
    }

    await Files.findByIdAndDelete(fileId);

    revalidatePath("/admin/files", "page");
    return { success: true, data: undefined };
  } catch (error) {
    console.error("Error deleting file:", error);
    return { success: false, error: "Failed to delete file" };
  }
}
