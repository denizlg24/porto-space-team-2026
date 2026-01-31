"use client";

import { useEffect, useState } from "react";
import { StepDisplay } from "./step-display";
import { DepartmentSelection } from "./department-selection";
import { Separator } from "@/components/ui/separator";
import { apiClient } from "@/lib/api-client";
import type { DepartmentItem, GetDepartmentsRoute } from "@/app/api/departments/route";
import { FileUpload } from "./file-upload";
import { PersonalInfoForm } from "./personal-info-form";
import { ApplicationReview } from "./application-review";
import { getIntlayer } from "next-intlayer";

const departmentsApi = apiClient<GetDepartmentsRoute>("/api/departments");

type PersonalInfoData = {
  name: string;
  email: string;
  course: string;
  yearOfStudy: "1st" | "2nd" | "3rd" | "4th" | "5th" | "masters" | "phd";
  linkedin?: string;
  github?: string;
  experience?: string;
};

export const ApplicationContainer = ({ locale }: { locale: "pt" | "en" }) => {
  const content = getIntlayer("apply-page", locale);
  const [departments, setDepartments] = useState<DepartmentItem[]>([]);
  const [isLoadingDepartments, setIsLoadingDepartments] = useState(true);

  useEffect(() => {
    const fetchDepartments = async () => {
      const result = await departmentsApi.get();
      if (result.success) {
        setDepartments(result.data);
      }
      setIsLoadingDepartments(false);
    };
    fetchDepartments();
  }, []);

  const [step, setStep] = useState(1);
  const [applicationData, setApplicationData] = useState<{
    departments: string[];
    cvFile: File | null;
    letterFile: File | null;
    personalInfo?: PersonalInfoData;
  }>({
    departments: [],
    cvFile: null,
    letterFile: null,
    personalInfo: undefined,
  });

  const onSubmitDepartmentSelection = (selectedDepartments: string[]) => {
    setApplicationData((prev) => ({
      ...prev,
      departments: selectedDepartments,
    }));
    setStep(2);
  };

  const onSubmitFileUpload = (cvFile: File, letterFile: File) => {
    setApplicationData((prev) => ({
      ...prev,
      cvFile,
      letterFile,
    }));
    setStep(3);
  };

  const onSubmitPersonalInfo = (data: PersonalInfoData) => {
    setApplicationData((prev) => ({
      ...prev,
      personalInfo: data,
    }));
    setStep(4);
  };

  const onReset = () => {
    setApplicationData({
      departments: [],
      cvFile: null,
      letterFile: null,
      personalInfo: undefined,
    });
    setStep(1);
  };

  return (
    <div className="w-full mx-auto max-w-5xl flex flex-col gap-6 items-start pb-24">
      <StepDisplay locale={locale} step={step} setStep={setStep} allowedStep={step} />
      <Separator className="max-w-5xl mt-4" />
      {step === 1 && (
        <div className="flex flex-col gap-8 items-start w-full mt-6">
          <div className="w-full flex flex-col gap-4 text-left">
            <h1 className="sm:text-2xl text-xl font-bold">
              {content.steps.step1.title}
            </h1>
            <h2 className="sm:text-base text-sm text-muted-foreground">
              {content.steps.step1.description}
            </h2>
          </div>
          <DepartmentSelection
            loading={isLoadingDepartments}
            departments={departments}
            locale={locale}
            initialData={applicationData.departments}
            onSubmit={onSubmitDepartmentSelection}
          />
        </div>
      )}
      {step === 2 && (
        <div className="flex flex-col gap-8 items-start w-full mt-6">
          <div className="w-full flex flex-col gap-4 text-left">
            <h1 className="sm:text-2xl text-xl font-bold">
              {content.steps.step2.title}
            </h1>
            <h2 className="sm:text-base text-sm text-muted-foreground">
              {content.steps.step2.description}
            </h2>
          </div>
          <FileUpload
            locale={locale}
            setStep={setStep}
            onSubmit={onSubmitFileUpload}
            initialData={{
              cv: applicationData.cvFile,
              letter: applicationData.letterFile,
            }}
          />
        </div>
      )}
      {step === 3 && (
        <div className="flex flex-col gap-8 items-start w-full mt-6">
          <div className="w-full flex flex-col gap-4 text-left">
            <h1 className="sm:text-2xl text-xl font-bold">
              {content.steps.step3.title}
            </h1>
            <h2 className="sm:text-base text-sm text-muted-foreground">
              {content.steps.step3.description}
            </h2>
          </div>
          <PersonalInfoForm
            locale={locale}
            setStep={setStep}
            initialData={applicationData.personalInfo}
            onSubmit={onSubmitPersonalInfo}
          />
        </div>
      )}
      {step === 4 && applicationData.cvFile && applicationData.letterFile && applicationData.personalInfo && (
        <div className="flex flex-col gap-8 items-start w-full mt-6">
          <div className="w-full flex flex-col gap-4 text-left">
            <h1 className="sm:text-2xl text-xl font-bold">
              {content.steps.step4.title}
            </h1>
            <h2 className="sm:text-base text-sm text-muted-foreground">
              {content.steps.step4.description}
            </h2>
          </div>
          <ApplicationReview
            locale={locale}
            setStep={setStep}
            departments={departments}
            selectedDepartmentIds={applicationData.departments}
            cvFile={applicationData.cvFile}
            letterFile={applicationData.letterFile}
            personalInfo={applicationData.personalInfo}
            onReset={onReset}
          />
        </div>
      )}
    </div>
  );
};
