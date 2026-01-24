import { adminRoute, success, createErrors } from "@/lib/api";
import type { RouteDefinition } from "@/lib/api-client";
import { connectDB } from "@/lib/db";
import { pinata } from "@/lib/files";
import { Files } from "@/models/File";

const uploadErrors = createErrors({
  INVALID_FILE: {
    status: 400,
    message: "Invalid or missing file",
  },
  FILE_TOO_LARGE: {
    status: 400,
    message: "File size exceeds 128MB limit",
  },
  UPLOAD_FAILED: {
    status: 500,
    message: "Failed to upload file to storage",
  },
});

export type FileUploadData = {
  id: string;
  url: string;
  mimeType: string;
  fileName: string;
};
export type FileUploadErrors = keyof typeof uploadErrors.schema;
export type FileUploadRoute = RouteDefinition<FileUploadData, FileUploadErrors, FormData>;

export const POST = adminRoute(async ({ request, user }) => {
  const data = await request.formData();
  const file: File | null = data.get("file") as unknown as File;

  if (!file || !(file instanceof File)) {
    uploadErrors.throw("INVALID_FILE");
  }

  const fileSizeInMB = file.size / (1024 * 1024);

  if (fileSizeInMB > 128) {
    uploadErrors.throw("FILE_TOO_LARGE", {
      details: { maxSizeMB: 128, actualSizeMB: fileSizeInMB.toFixed(2) },
    });
  }

  const { cid } = await pinata.upload.public.file(file);
  const url = await pinata.gateways.public.convert(cid);

  if (!cid || !url) {
    uploadErrors.throw("UPLOAD_FAILED");
  }

  await connectDB();

  const newFile = await Files.create({
    cid,
    url,
    mimeType: file.type,
    fileName: file.name,
    uploadedBy: user.id,
  });

  return success<FileUploadData>({
    url: newFile.url,
    mimeType: newFile.mimeType,
    fileName: newFile.fileName,
    id: newFile._id.toString(),
  });
});
