"use client";

import { Button } from "@/components/ui/button";
import { Upload, FileText, X } from "lucide-react";
import { Dispatch, SetStateAction, useState, useRef, DragEvent } from "react";
import { cn } from "@/lib/utils";
import { getIntlayer } from "next-intlayer";

const ACCEPTED_TYPES = [
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
];
const MAX_SIZE = 5 * 1024 * 1024; // 5MB

type FileState = {
  file: File;
  error?: string;
} | null;

export const FileUpload = ({
  locale,
  setStep,
  onSubmit,
  initialData,
}: {
  locale: "pt" | "en";
  setStep: Dispatch<SetStateAction<number>>;
  onSubmit: (cv: File, letter: File) => void;
  initialData?: { cv: File | null; letter: File | null };
}) => {
  const content = getIntlayer("file-upload", locale);
  const [cvFile, setCvFile] = useState<FileState>(
    initialData?.cv ? { file: initialData.cv } : null
  );
  const [letterFile, setLetterFile] = useState<FileState>(
    initialData?.letter ? { file: initialData.letter } : null
  );
  const [cvDragActive, setCvDragActive] = useState(false);
  const [letterDragActive, setLetterDragActive] = useState(false);

  const cvInputRef = useRef<HTMLInputElement>(null);
  const letterInputRef = useRef<HTMLInputElement>(null);

  const validateFile = (file: File): string | null => {
    if (!ACCEPTED_TYPES.includes(file.type)) {
      return content.validation.invalidType.value;
    }
    if (file.size > MAX_SIZE) {
      return content.validation.tooLarge.value;
    }
    return null;
  };

  const handleFile = (
    file: File,
    setter: Dispatch<SetStateAction<FileState>>
  ) => {
    const error = validateFile(file);
    if (error) {
      setter({ file, error });
    } else {
      setter({ file });
    }
  };

  const handleDrag = (
    e: DragEvent<HTMLDivElement>,
    setActive: Dispatch<SetStateAction<boolean>>
  ) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setActive(true);
    } else if (e.type === "dragleave") {
      setActive(false);
    }
  };

  const handleDrop = (
    e: DragEvent<HTMLDivElement>,
    setter: Dispatch<SetStateAction<FileState>>,
    setActive: Dispatch<SetStateAction<boolean>>
  ) => {
    e.preventDefault();
    e.stopPropagation();
    setActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0], setter);
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    setter: Dispatch<SetStateAction<FileState>>
  ) => {
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0], setter);
    }
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes < 1024) return bytes + " B";
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + " KB";
    return (bytes / (1024 * 1024)).toFixed(1) + " MB";
  };

  const renderDropzone = (
    label: string,
    placeholder: string,
    fileState: FileState,
    setFileState: Dispatch<SetStateAction<FileState>>,
    dragActive: boolean,
    setDragActive: Dispatch<SetStateAction<boolean>>,
    inputRef: React.RefObject<HTMLInputElement | null>
  ) => (
    <div className="w-full col-span-1 flex flex-col items-start text-left gap-2">
      <p className="text-xs text-muted-foreground">{label}</p>
      <input
        ref={inputRef}
        type="file"
        accept=".pdf,.doc,.docx"
        onChange={(e) => handleInputChange(e, setFileState)}
        className="hidden"
      />
      <div
        onClick={() => inputRef.current?.click()}
        onDragEnter={(e) => handleDrag(e, setDragActive)}
        onDragOver={(e) => handleDrag(e, setDragActive)}
        onDragLeave={(e) => handleDrag(e, setDragActive)}
        onDrop={(e) => handleDrop(e, setFileState, setDragActive)}
        className={cn(
          "w-full h-auto aspect-4/3 border-2 border-dashed bg-background flex flex-col items-center justify-center gap-2 text-center cursor-pointer transition-colors",
          dragActive && "border-primary bg-primary/5",
          fileState?.error && "border-destructive bg-destructive/5",
          fileState && !fileState.error && "border-primary/50 bg-primary/5"
        )}
      >
        {fileState ? (
          <>
            <div
              className={cn(
                "w-12 h-12 border p-1 flex items-center justify-center",
                fileState.error ? "text-destructive" : "text-primary"
              )}
            >
              <FileText className="w-full h-full" />
            </div>
            <p className="sm:text-lg text-foreground truncate max-w-[90%]">
              {fileState.file.name}
            </p>
            <p className="text-xs text-muted-foreground">
              {formatFileSize(fileState.file.size)}
            </p>
            {fileState.error && (
              <p className="text-xs text-destructive">{fileState.error}</p>
            )}
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={(e) => {
                e.stopPropagation();
                setFileState(null);
                if (inputRef.current) inputRef.current.value = "";
              }}
              className="text-muted-foreground hover:text-destructive"
            >
              <X className="size-4" />
              {content.remove}
            </Button>
          </>
        ) : (
          <>
            <div className="w-12 h-12 border p-1 flex items-center justify-center text-muted-foreground">
              <Upload className="w-full h-full" />
            </div>
            <p className="sm:text-lg text-foreground">{placeholder}</p>
            <p className="text-xs text-muted-foreground">{content.browse}</p>
            <p className="text-xs text-muted-foreground">{content.fileTypes}</p>
          </>
        )}
      </div>
    </div>
  );

  const canContinue =
    cvFile && !cvFile.error && letterFile && !letterFile.error;

  return (
    <>
      <div className="w-full grid sm:grid-cols-2 grid-cols-1 gap-6">
        {renderDropzone(
          content.cv.label.value,
          content.cv.placeholder.value,
          cvFile,
          setCvFile,
          cvDragActive,
          setCvDragActive,
          cvInputRef
        )}
        {renderDropzone(
          content.letter.label.value,
          content.letter.placeholder.value,
          letterFile,
          setLetterFile,
          letterDragActive,
          setLetterDragActive,
          letterInputRef
        )}
      </div>
      <div className="w-full bg-muted/10 border flex flex-col items-start text-left gap-4 p-4">
        <p className="text-sm text-primary">{content.tips.title}</p>
        <ul className="w-full list-inside list-decimal gap-4 flex flex-col marker:text-primary">
          <li className="text-muted-foreground text-sm">{content.tips.tip1}</li>
          <li className="text-muted-foreground text-sm">{content.tips.tip2}</li>
          <li className="text-muted-foreground text-sm">{content.tips.tip3}</li>
          <li className="text-muted-foreground text-sm">{content.tips.tip4}</li>
        </ul>
      </div>
      <div className="w-full flex sm:flex-row flex-col gap-2 items-center justify-between">
        <Button
          variant={"outline"}
          onClick={() => setStep(1)}
          className="h-12 sm:w-fit w-full min-w-32"
        >
          {content.back}
        </Button>
        <Button
          disabled={!canContinue}
          className="h-12 w-full sm:max-w-3xs"
          onClick={() => {
            if (cvFile && letterFile) {
              onSubmit(cvFile.file, letterFile.file);
            }
          }}
        >
          {content.continue}
        </Button>
      </div>
    </>
  );
};
