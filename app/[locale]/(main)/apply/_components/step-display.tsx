"use client";

import { cn } from "@/lib/utils";
import { Check, ChevronRight } from "lucide-react";
import { Dispatch, SetStateAction } from "react";
import { getIntlayer } from "next-intlayer";

export const StepDisplay = ({
  locale,
  step,
  setStep,
  allowedStep,
}: {
  locale: "pt" | "en";
  step: number;
  setStep: Dispatch<SetStateAction<number>>;
  allowedStep: number;
}) => {
  const content = getIntlayer("apply-page", locale);

  const steps = [
    { number: 1, label: content.stepLabels.step1 },
    { number: 2, label: content.stepLabels.step2 },
    { number: 3, label: content.stepLabels.step3 },
    { number: 4, label: content.stepLabels.step4 },
  ];

  return (
    <div className="w-full flex sm:flex-row flex-col sm:items-center items-start justify-start gap-4 relative">
      <div className="absolute sm:hidden h-full w-px bg-muted left-3 -z-10"></div>
      {steps.map((s, index) => (
        <div key={s.number} className="contents">
          <button
            onClick={() => {
              if (allowedStep >= s.number) setStep(s.number);
            }}
            className={cn(
              "w-fit flex flex-row items-center gap-2 justify-start group text-muted",
              step >= s.number && "text-foreground",
              allowedStep >= s.number ? "cursor-pointer" : "cursor-not-allowed"
            )}
          >
            <div
              className={cn(
                "sm:w-8 sm:h-8 w-6 h-6 flex transition-all items-center justify-center border border-muted group-hover:border-primary bg-background",
                step >= s.number && "bg-primary border-primary"
              )}
            >
              {step > s.number ? <Check /> : s.number}
            </div>
            <p className="text-sm">{s.label}</p>
          </button>
          {index < steps.length - 1 && (
            <ChevronRight className="sm:block hidden w-6 h-6 text-muted" />
          )}
        </div>
      ))}
    </div>
  );
};
