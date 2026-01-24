"use client";

import { useIntlayer } from "next-intlayer";
import { useState, useTransition, useOptimistic, useRef } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { toast } from "sonner";
import {
  MoreHorizontal,
  Search,
  Trash2,
  Copy,
  ExternalLink,
  Upload,
  Loader2,
} from "lucide-react";
import type { FileItem } from "@/lib/actions/files";
import { deleteFile } from "@/lib/actions/files";
import { FilePreview } from "./file-preview";
import { apiClient } from "@/lib/api-client";
import type { FileUploadRoute } from "@/app/api/files/route";
import { Skeleton } from "@/components/ui/skeleton";

type OptimisticAction =
  | { type: "delete"; fileId: string }
  | { type: "add"; file: FileItem };

interface FilesTableProps {
  initialFiles: FileItem[];
}

const filesApi = apiClient<FileUploadRoute>("/api/files");

export function FilesTable({ initialFiles }: FilesTableProps) {
  const content = useIntlayer("admin-files-page");
  const [isPending, startTransition] = useTransition();
  const [search, setSearch] = useState("");
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [fileToDelete, setFileToDelete] = useState<FileItem | null>(null);
  const [uploadingIds, setUploadingIds] = useState<Set<string>>(new Set());
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const [files, setFiles] = useState<FileItem[]>(initialFiles);

  const [optimisticFiles, addOptimisticUpdate] = useOptimistic(
    files,
    (state: FileItem[], action: OptimisticAction) => {
      switch (action.type) {
        case "delete":
          return state.filter((file) => file.id !== action.fileId);
        case "add":
          return [action.file, ...state];
        default:
          return state;
      }
    }
  );

  const filteredFiles = optimisticFiles.filter((file) => {
    if (search === "") return true;
    return (
      file.url.toLowerCase().includes(search.toLowerCase()) ||
      file.fileName.toLowerCase().includes(search.toLowerCase())
    );
  });

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }

    const tempId = `temp-${Date.now()}`;
    const formData = new FormData();
    formData.append("file", file);

    const tempFile: FileItem = {
      id: tempId,
      cid: "",
      url: URL.createObjectURL(file),
      mimeType: file.type,
      fileName: file.name,
      uploadedBy: "",
      uploadedAt: new Date(),
    };

    setUploadingIds((prev) => new Set(prev).add(tempId));

    startTransition(async () => {
      addOptimisticUpdate({ type: "add", file: tempFile });

      const result = await filesApi.post({ input: formData });

      if (result.success) {
        const newFile: FileItem = {
          id: result.data.id,
          cid: "",
          url: result.data.url,
          mimeType: result.data.mimeType,
          fileName: result.data.fileName,
          uploadedBy: "",
          uploadedAt: new Date(),
        };

        setFiles((prev) => [newFile, ...prev]);
        toast.success(content.toast.uploadSuccess.value);
      } else {
        toast.error(result.error.message);
      }

      setUploadingIds((prev) => {
        const next = new Set(prev);
        next.delete(tempId);
        return next;
      });
    });
  };

  const handleDelete = () => {
    if (!fileToDelete) return;
    const fileId = fileToDelete.id;
    setDeleteDialogOpen(false);
    setFileToDelete(null);

    startTransition(async () => {
      addOptimisticUpdate({ type: "delete", fileId });
      const result = await deleteFile(fileId);
      if (result.success) {
        setFiles((prev) => prev.filter((f) => f.id !== fileId));
        toast.success(content.toast.deleteSuccess.value);
      } else {
        toast.error(content.toast.error.value);
      }
    });
  };

  const handleCopyUrl = async (url: string) => {
    await navigator.clipboard.writeText(url);
    toast.success(content.toast.copySuccess.value);
  };

  const isUploading = uploadingIds.size > 0;

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder={content.searchPlaceholder.value}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9"
          />
        </div>
        <div>
          <input
            ref={fileInputRef}
            type="file"
            onChange={handleUpload}
            className="hidden"
            id="file-upload"
          />
          <Button asChild disabled={isUploading}>
            <label htmlFor="file-upload" className="cursor-pointer">
              {isUploading ? (
                <Loader2 className="size-4 animate-spin" />
              ) : (
                <Upload className="size-4" />
              )}
              {content.upload}
            </label>
          </Button>
        </div>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-20">{content.table.preview}</TableHead>
              <TableHead>{content.table.file}</TableHead>
              <TableHead>{content.table.uploadedAt}</TableHead>
              <TableHead className="w-17.5">{content.table.actions}</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredFiles.length === 0 ? (
              <TableRow>
                <TableCell colSpan={4} className="h-24 text-center">
                  {content.table.noFiles}
                </TableCell>
              </TableRow>
            ) : (
              filteredFiles.map((file) => {
                const isFileUploading = uploadingIds.has(file.id);

                return (
                  <TableRow
                    key={file.id}
                    className={isPending && !isFileUploading ? "opacity-70" : ""}
                  >
                    <TableCell>
                      {isFileUploading ? (
                        <Skeleton className="h-12 w-12 rounded" />
                      ) : (
                        <FilePreview
                          url={file.url}
                          mimeType={file.mimeType}
                          className="h-12 w-12"
                        />
                      )}
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-col">
                        {isFileUploading ? (
                          <>
                            <Skeleton className="h-4 w-32 mb-1" />
                            <Skeleton className="h-3 w-48" />
                          </>
                        ) : (
                          <>
                            <span className="font-medium text-sm truncate max-w-xs">
                              {file.fileName}
                            </span>
                            <span className="text-xs text-muted-foreground truncate max-w-xs">
                              {file.url}
                            </span>
                          </>
                        )}
                      </div>
                    </TableCell>
                    <TableCell className="text-muted-foreground">
                      {isFileUploading ? (
                        <Skeleton className="h-4 w-24" />
                      ) : (
                        new Date(file.uploadedAt).toDateString()
                      )}
                    </TableCell>
                    <TableCell>
                      {isFileUploading ? (
                        <Loader2 className="size-4 animate-spin text-muted-foreground" />
                      ) : (
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon-sm">
                              <MoreHorizontal className="size-4" />
                              <span className="sr-only">{content.table.actions}</span>
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>{content.table.actions}</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem onClick={() => handleCopyUrl(file.url)}>
                              <Copy className="size-4" />
                              {content.actions.copy}
                            </DropdownMenuItem>
                            <DropdownMenuItem asChild>
                              <a href={file.url} target="_blank" rel="noopener noreferrer">
                                <ExternalLink className="size-4" />
                                {content.actions.open}
                              </a>
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem
                              className="text-destructive"
                              onClick={() => {
                                setFileToDelete(file);
                                setDeleteDialogOpen(true);
                              }}
                            >
                              <Trash2 className="size-4" />
                              {content.actions.delete}
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      )}
                    </TableCell>
                  </TableRow>
                );
              })
            )}
          </TableBody>
        </Table>
      </div>

      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{content.confirmDelete.title}</AlertDialogTitle>
            <AlertDialogDescription>
              {content.confirmDelete.description}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>{content.confirmDelete.cancel}</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              {content.confirmDelete.confirm}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
