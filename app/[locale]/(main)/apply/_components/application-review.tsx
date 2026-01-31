"use client";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { DepartmentItem } from "@/lib/actions/departments";
import {
  FileText,
  CheckCircle2,
  AlertCircle,
  RotateCcw,
  Loader2,
  Pencil,
  Rocket,
} from "lucide-react";
import { Dispatch, SetStateAction, useState } from "react";
import { getIntlayer } from "next-intlayer";
type ApplicationState =
  | { status: "idle" }
  | { status: "submitting" }
  | { status: "success"; applicationId: string }
  | { status: "error"; message: string };

type PersonalInfoData = {
  name: string;
  email: string;
  course: string;
  yearOfStudy: "1st" | "2nd" | "3rd" | "4th" | "5th" | "masters" | "phd";
  linkedin?: string;
  github?: string;
  experience?: string;
};

export const ApplicationReview = ({
  locale,
  setStep,
  departments,
  selectedDepartmentIds,
  cvFile,
  letterFile,
  personalInfo,
  onReset,
}: {
  locale: "pt" | "en";
  setStep: Dispatch<SetStateAction<number>>;
  departments: DepartmentItem[];
  selectedDepartmentIds: string[];
  cvFile: File;
  letterFile: File;
  personalInfo: PersonalInfoData;
  onReset: () => void;
}) => {
  const content = getIntlayer("application-review", locale);
  const personalInfoContent = getIntlayer("personal-info-form", locale);
  const [consent, setConsent] = useState(false);
  const [state, setState] = useState<ApplicationState>({ status: "idle" });

  const selectedDepartments = departments.filter((d) =>
    selectedDepartmentIds.includes(d.id),
  );

  const yearLabels = personalInfoContent.fields.yearOfStudy.options;

  const formatFileSize = (bytes: number): string => {
    if (bytes < 1024) return bytes + " B";
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + " KB";
    return (bytes / (1024 * 1024)).toFixed(1) + " MB";
  };

  const handleSubmit = async () => {
    setState({ status: "submitting" });

    const formData = new FormData();
    formData.append("email", personalInfo.email);
    formData.append("name", personalInfo.name);
    formData.append("course", personalInfo.course);
    formData.append("yearOfStudy", personalInfo.yearOfStudy);
    formData.append("departments", JSON.stringify(selectedDepartmentIds));
    if (personalInfo.linkedin)
      formData.append("linkedin", personalInfo.linkedin);
    if (personalInfo.github) formData.append("github", personalInfo.github);
    if (personalInfo.experience)
      formData.append("experience", personalInfo.experience);
    formData.append("cv", cvFile);
    formData.append("letter", letterFile);

    try {
      const response = await fetch("/api/applications", {
        method: "POST",
        body: formData,
      });

      const result = await response.json();

      if (result.success) {
        setState({
          status: "success",
          applicationId: result.data.applicationId,
        });
      } else {
        setState({
          status: "error",
          message: result.error?.message || "Unknown error",
        });
      }
    } catch {
      setState({ status: "error", message: "Failed to submit application" });
    }
  };

  if (state.status === "success") {
    return (
      <div className="w-full animate-in fade-in slide-in-from-bottom-4 duration-500">
        <div className="flex flex-col items-center gap-6 py-8 text-center">
          <div className="flex size-16 items-center justify-center rounded-full bg-primary/10">
            <CheckCircle2 className="size-8 text-primary" />
          </div>
          <div className="space-y-2">
            <h3 className="text-2xl font-semibold">{content.success.title}</h3>
            <p className="text-muted-foreground max-w-md">
              {content.success.description}
            </p>
          </div>
          <div className="border border-border/60 bg-muted/30 px-6 py-4">
            <p className="text-xs text-muted-foreground mb-1">
              {content.success.applicationIdLabel}
            </p>
            <p className="font-mono text-lg font-semibold text-primary">
              {state.applicationId}
            </p>
          </div>
          <p className="text-sm text-muted-foreground">
            {content.success.emailNote}
          </p>
          <div className="w-full max-w-md border border-border/60 bg-muted/10 p-4 text-left">
            <p className="text-sm font-semibold text-primary mb-2">
              {content.success.nextSteps.title}
            </p>
            <ol className="list-decimal list-inside text-sm text-muted-foreground space-y-1">
              <li>{content.success.nextSteps.step1}</li>
              <li>{content.success.nextSteps.step2}</li>
              <li>{content.success.nextSteps.step3}</li>
            </ol>
          </div>
          <Button variant="outline" onClick={onReset} className="mt-2">
            <Rocket className="size-4" />
            {content.success.applyAgain}
          </Button>
        </div>
      </div>
    );
  }

  if (state.status === "error") {
    return (
      <div className="w-full animate-in fade-in slide-in-from-bottom-4 duration-500">
        <div className="flex flex-col items-center gap-6 py-8 text-center">
          <div className="flex size-16 items-center justify-center rounded-full bg-destructive/10">
            <AlertCircle className="size-8 text-destructive" />
          </div>
          <div className="space-y-2">
            <h3 className="text-2xl font-semibold">{content.error.title}</h3>
            <p className="text-muted-foreground max-w-md">
              {content.error.description}
            </p>
            {state.message && (
              <p className="text-sm text-destructive">{state.message}</p>
            )}
          </div>
          <Button
            variant="outline"
            onClick={() => setState({ status: "idle" })}
            className="mt-2 border-destructive/40 text-destructive hover:bg-destructive/10"
          >
            <RotateCcw className="size-4" />
            {content.error.tryAgain}
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col gap-6">
      <div className="w-full border bg-background p-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-semibold text-primary uppercase">
            {content.sections.departments.title}
          </h3>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setStep(1)}
            className="text-muted-foreground hover:text-primary"
          >
            <Pencil className="size-3 mr-1" />
            {content.sections.departments.edit}
          </Button>
        </div>
        <div className="flex flex-wrap gap-2">
          {selectedDepartments.map((dept) => (
            <span
              key={dept.id}
              className="px-3 py-1.5 border bg-muted/30 text-sm"
            >
              {dept.name}
            </span>
          ))}
        </div>
      </div>

      <div className="w-full border bg-background p-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-semibold text-primary uppercase">
            {content.sections.documents.title}
          </h3>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setStep(2)}
            className="text-muted-foreground hover:text-primary"
          >
            <Pencil className="size-3 mr-1" />
            {content.sections.departments.edit}
          </Button>
        </div>
        <div className="grid sm:grid-cols-2 grid-cols-1 gap-4">
          <div className="flex items-center gap-3 p-3 border bg-muted/10">
            <div className="w-10 h-10 border flex items-center justify-center text-primary">
              <FileText className="size-5" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs text-muted-foreground">
                {content.sections.documents.cv}
              </p>
              <p className="text-sm font-medium truncate">{cvFile.name}</p>
              <p className="text-xs text-muted-foreground">
                {formatFileSize(cvFile.size)}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3 p-3 border bg-muted/10">
            <div className="w-10 h-10 border flex items-center justify-center text-primary">
              <FileText className="size-5" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs text-muted-foreground">
                {content.sections.documents.motivationLetter}
              </p>
              <p className="text-sm font-medium truncate">{letterFile.name}</p>
              <p className="text-xs text-muted-foreground">
                {formatFileSize(letterFile.size)}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full border bg-background p-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-semibold text-primary uppercase">
            {content.sections.personalInfo.title}
          </h3>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setStep(3)}
            className="text-muted-foreground hover:text-primary"
          >
            <Pencil className="size-3 mr-1" />
            {content.sections.departments.edit}
          </Button>
        </div>
        <div className="grid sm:grid-cols-2 grid-cols-1 gap-4">
          <div>
            <p className="text-xs text-muted-foreground mb-1">
              {content.sections.personalInfo.name}
            </p>
            <p className="text-sm font-medium">{personalInfo.name}</p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground mb-1">
              {content.sections.personalInfo.email}
            </p>
            <p className="text-sm font-medium">{personalInfo.email}</p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground mb-1">
              {content.sections.personalInfo.course}
            </p>
            <p className="text-sm font-medium">{personalInfo.course}</p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground mb-1">
              {content.sections.personalInfo.yearOfStudy}
            </p>
            <p className="text-sm font-medium">
              {yearLabels[personalInfo.yearOfStudy as keyof typeof yearLabels]}
            </p>
          </div>
          {personalInfo.linkedin && (
            <div>
              <p className="text-xs text-muted-foreground mb-1">
                {content.sections.personalInfo.linkedin}
              </p>
              <a
                href={personalInfo.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-medium text-primary hover:underline truncate block"
              >
                {personalInfo.linkedin}
              </a>
            </div>
          )}
          {personalInfo.github && (
            <div>
              <p className="text-xs text-muted-foreground mb-1">
                {content.sections.personalInfo.github}
              </p>
              <a
                href={personalInfo.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-medium text-primary hover:underline truncate block"
              >
                {personalInfo.github}
              </a>
            </div>
          )}
          {personalInfo.experience && (
            <div className="col-span-full">
              <p className="text-xs text-muted-foreground mb-1">
                {content.sections.personalInfo.experience}
              </p>
              <p className="text-sm whitespace-pre-wrap">
                {personalInfo.experience}
              </p>
            </div>
          )}
        </div>
      </div>

      <div className="w-full flex items-start gap-3 p-4 border bg-muted/10">
        <Checkbox
          id="consent"
          checked={consent}
          onCheckedChange={(checked) => setConsent(checked === true)}
          className="mt-0.5"
        />
        <label
          htmlFor="consent"
          className="text-sm text-muted-foreground cursor-pointer"
        >
          {content.consent.label}
        </label>
      </div>

      <div className="w-full flex sm:flex-row flex-col gap-2 items-center justify-between">
        <Button
          type="button"
          variant="outline"
          onClick={() => setStep(3)}
          className="h-12 sm:w-fit w-full min-w-32"
          disabled={state.status === "submitting"}
        >
          {content.back}
        </Button>
        <Button
          onClick={handleSubmit}
          disabled={!consent || state.status === "submitting"}
          className="h-12 w-full sm:max-w-3xs"
        >
          {state.status === "submitting" ? (
            <>
              <Loader2 className="size-4 animate-spin" />
              {content.submitting}
            </>
          ) : (
            <>
              <Rocket className="size-4" />
              {content.submit}
            </>
          )}
        </Button>
      </div>
    </div>
  );
};
