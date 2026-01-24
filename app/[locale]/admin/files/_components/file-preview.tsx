import { FileImage, FileVideo, FileAudio, FileText, File } from "lucide-react";
import Image from "next/image";

interface FilePreviewProps {
  url: string;
  mimeType?: string;
  className?: string;
}

type FileType = "image" | "video" | "audio" | "document" | "unknown";

function getFileTypeFromMime(mimeType: string): FileType {
  if (mimeType.startsWith("image/")) return "image";
  if (mimeType.startsWith("video/")) return "video";
  if (mimeType.startsWith("audio/")) return "audio";
  if (
    mimeType.startsWith("application/pdf") ||
    mimeType.startsWith("application/msword") ||
    mimeType.startsWith("application/vnd.") ||
    mimeType.startsWith("text/")
  ) {
    return "document";
  }
  return "unknown";
}

function getFileTypeFromExtension(url: string): FileType {
  const extension = url.split(".").pop()?.toLowerCase() ?? "";

  const imageExts = ["jpg", "jpeg", "png", "gif", "webp", "svg", "bmp", "ico"];
  const videoExts = ["mp4", "webm", "ogg", "mov", "avi", "mkv"];
  const audioExts = ["mp3", "wav", "ogg", "flac", "aac", "m4a"];
  const docExts = ["pdf", "doc", "docx", "xls", "xlsx", "ppt", "pptx", "txt"];

  if (imageExts.includes(extension)) return "image";
  if (videoExts.includes(extension)) return "video";
  if (audioExts.includes(extension)) return "audio";
  if (docExts.includes(extension)) return "document";
  return "unknown";
}

function getFileType(url: string, mimeType?: string): FileType {
  if (mimeType) {
    return getFileTypeFromMime(mimeType);
  }
  return getFileTypeFromExtension(url);
}

export function FilePreview({ url, mimeType, className = "" }: FilePreviewProps) {
  const fileType = getFileType(url, mimeType);

  if (fileType === "image") {
    return (
      <div className={`relative overflow-hidden rounded bg-muted ${className}`}>
        <Image
          src={url}
          alt="File preview"
          fill
          className="object-cover"
          sizes="64px"
          unoptimized
        />
      </div>
    );
  }

  const iconClass = "size-6 text-muted-foreground";

  return (
    <div className={`flex items-center justify-center rounded bg-muted ${className}`}>
      {fileType === "video" && <FileVideo className={iconClass} />}
      {fileType === "audio" && <FileAudio className={iconClass} />}
      {fileType === "document" && <FileText className={iconClass} />}
      {fileType === "unknown" && <File className={iconClass} />}
    </div>
  );
}

export function getFileTypeIcon(url: string, mimeType?: string) {
  const fileType = getFileType(url, mimeType);

  switch (fileType) {
    case "image":
      return FileImage;
    case "video":
      return FileVideo;
    case "audio":
      return FileAudio;
    case "document":
      return FileText;
    default:
      return File;
  }
}
