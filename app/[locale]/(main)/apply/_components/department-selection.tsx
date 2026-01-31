"use client";

import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import type { DepartmentItem } from "@/app/api/departments/route";
import { cn } from "@/lib/utils";
import { Check } from "lucide-react";
import { useState } from "react";
import { getIntlayer } from "next-intlayer";

export const DepartmentSelection = ({
  locale,
  onSubmit,
  departments,
  loading,
  initialData,
}: {
  locale: "pt" | "en";
  onSubmit: (selectedDepartments: string[]) => void;
  departments: DepartmentItem[];
  loading: boolean;
  initialData?: string[];
}) => {
  const content = getIntlayer("department-selection", locale);
  const [selectedDepartments, setSelectedDepartments] = useState<string[]>(
    initialData || []
  );

  const getSelectedText = () => {
    const count = selectedDepartments.length;
    if (count === 1) {
      return `1 ${content.selected.value} ${content.selectedSuffix.value}`;
    }
    return `${count} ${content.selectedPlural.value} ${content.selectedPluralSuffix.value}`;
  };

  return (
    <>
      <div className="w-full grid lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-4">
        {loading &&
          Array.from({ length: 6 }).map((_, index) => (
            <Skeleton key={index} className="h-36 w-full"></Skeleton>
          ))}
        {departments.map((department) => {
          return (
            <button
              onClick={() => {
                setSelectedDepartments((prev) =>
                  prev.includes(department.id)
                    ? prev.filter((id) => id !== department.id)
                    : [...prev, department.id]
                );
              }}
              className={cn(
                "w-full border relative p-4 group hover:border-primary bg-background transition-all flex flex-col items-start gap-2",
                selectedDepartments.includes(department.id) &&
                  "border-primary bg-primary/5"
              )}
              key={department.id}
            >
              <div
                className={cn(
                  "absolute right-2 top-2 w-6 h-6 border group-hover:border-primary flex items-center justify-center",
                  selectedDepartments.includes(department.id) && "bg-primary"
                )}
              >
                {selectedDepartments.includes(department.id) && (
                  <Check className="w-4 h-4 m-auto text-foreground" />
                )}
              </div>
              <div className="flex flex-col gap-0 items-start">
                <p className="text-xs text-primary">
                  {"//"} {department.code}
                </p>
                <h3 className="text-lg font-semibold">{department.name}</h3>
              </div>
              <p className="text-muted-foreground text-sm text-left">
                {department.description[locale]}
              </p>
              <div className="flex flex-wrap items-center gap-2 w-full">
                {department.skills.map((skill, index) => (
                  <span
                    key={index}
                    className="text-xs bg-background text-muted-foreground px-2 py-1 border"
                  >
                    {skill[locale]}
                  </span>
                ))}
              </div>
            </button>
          );
        })}
      </div>
      <div className="w-full flex sm:flex-row flex-col gap-2 items-center justify-between">
        <p className="text-sm text-muted-foreground">{getSelectedText()}</p>
        <Button
          onClick={() => onSubmit(selectedDepartments)}
          disabled={selectedDepartments.length === 0}
          className="h-12 w-full sm:max-w-3xs"
        >
          {content.continue}
        </Button>
      </div>
    </>
  );
};
