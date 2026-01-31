"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import * as z from "zod";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  InputGroupTextarea,
} from "@/components/ui/input-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Dispatch, SetStateAction, useMemo } from "react";
import { getIntlayer } from "next-intlayer";

export const PersonalInfoForm = ({
  locale,
  setStep,
  onSubmit,
  initialData,
}: {
  locale: "pt" | "en";
  setStep: Dispatch<SetStateAction<number>>;
  onSubmit: (data: {
    name: string;
    email: string;
    course: string;
    yearOfStudy: "1st" | "2nd" | "3rd" | "4th" | "5th" | "masters" | "phd";
    linkedin?: string | undefined;
    github?: string | undefined;
    experience?: string | undefined;
  }) => void;
  initialData?: Partial<{
    name: string;
    email: string;
    course: string;
    yearOfStudy: "1st" | "2nd" | "3rd" | "4th" | "5th" | "masters" | "phd";
    linkedin?: string | undefined;
    github?: string | undefined;
    experience?: string | undefined;
  }>;
}) => {
  const content = getIntlayer("personal-info-form", locale);

  const YEAR_OPTIONS = [
    { value: "1st", label: content.fields.yearOfStudy.options["1st"] },
    { value: "2nd", label: content.fields.yearOfStudy.options["2nd"] },
    { value: "3rd", label: content.fields.yearOfStudy.options["3rd"] },
    { value: "4th", label: content.fields.yearOfStudy.options["4th"] },
    { value: "5th", label: content.fields.yearOfStudy.options["5th"] },
    { value: "masters", label: content.fields.yearOfStudy.options.masters },
    { value: "phd", label: content.fields.yearOfStudy.options.phd },
  ] as const;

  const formSchema = useMemo(
    () =>
      z.object({
        name: z
          .string()
          .min(2, content.validation.nameMin.value)
          .max(128, content.validation.nameMax.value),
        email: z.string().email(content.validation.emailInvalid.value),
        course: z
          .string()
          .min(2, content.validation.courseMin.value)
          .max(256, content.validation.courseMax.value),
        yearOfStudy: z.enum(
          ["1st", "2nd", "3rd", "4th", "5th", "masters", "phd"],
          {
            message: content.validation.yearRequired.value,
          }
        ),
        linkedin: z
          .string()
          .url(content.validation.urlInvalid.value)
          .optional()
          .or(z.literal("")),
        github: z
          .string()
          .url(content.validation.urlInvalid.value)
          .optional()
          .or(z.literal("")),
        experience: z
          .string()
          .max(2000, content.validation.experienceMax.value)
          .optional(),
      }),
    [content]
  );

  type PersonalInfoData = z.infer<typeof formSchema>;

  const form = useForm<PersonalInfoData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: initialData?.name ?? "",
      email: initialData?.email ?? "",
      course: initialData?.course ?? "",
      yearOfStudy: initialData?.yearOfStudy,
      linkedin: initialData?.linkedin ?? "",
      github: initialData?.github ?? "",
      experience: initialData?.experience ?? "",
    },
  });

  const handleSubmit = (data: PersonalInfoData) => {
    onSubmit(data);
  };

  return (
    <form
      id="personal-info-form"
      className="w-full"
      onSubmit={form.handleSubmit(handleSubmit)}
    >
      <FieldGroup className="grid sm:grid-cols-2 grid-cols-1 gap-4 w-full">
        <Controller
          name="name"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel
                className="text-muted-foreground uppercase"
                htmlFor="personal-info-name"
              >
                {content.fields.name.label}
              </FieldLabel>
              <Input
                {...field}
                id="personal-info-name"
                aria-invalid={fieldState.invalid}
                placeholder={content.fields.name.placeholder.value}
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        <Controller
          name="email"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel
                className="text-muted-foreground uppercase"
                htmlFor="personal-info-email"
              >
                {content.fields.email.label}
              </FieldLabel>
              <Input
                {...field}
                id="personal-info-email"
                aria-invalid={fieldState.invalid}
                placeholder={content.fields.email.placeholder.value}
                type="email"
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        <Controller
          name="course"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel
                className="text-muted-foreground uppercase"
                htmlFor="personal-info-course"
              >
                {content.fields.course.label}
              </FieldLabel>
              <Input
                {...field}
                id="personal-info-course"
                aria-invalid={fieldState.invalid}
                placeholder={content.fields.course.placeholder.value}
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        <Controller
          name="yearOfStudy"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel
                className="text-muted-foreground uppercase"
                htmlFor="personal-info-year"
              >
                {content.fields.yearOfStudy.label}
              </FieldLabel>
              <Select value={field.value} onValueChange={field.onChange}>
                <SelectTrigger
                  id="personal-info-year"
                  className={cn(
                    "w-full",
                    fieldState.invalid && "border-destructive"
                  )}
                >
                  <SelectValue
                    placeholder={content.fields.yearOfStudy.placeholder.value}
                  />
                </SelectTrigger>
                <SelectContent position="popper">
                  {YEAR_OPTIONS.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        <Controller
          name="linkedin"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel
                className="text-muted-foreground uppercase"
                htmlFor="personal-info-linkedin"
              >
                {content.fields.linkedin.label}
              </FieldLabel>
              <Input
                {...field}
                id="personal-info-linkedin"
                aria-invalid={fieldState.invalid}
                placeholder={content.fields.linkedin.placeholder.value}
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        <Controller
          name="github"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel
                className="text-muted-foreground uppercase"
                htmlFor="personal-info-github"
              >
                {content.fields.github.label}
              </FieldLabel>
              <Input
                {...field}
                id="personal-info-github"
                aria-invalid={fieldState.invalid}
                placeholder={content.fields.github.placeholder.value}
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        <Controller
          name="experience"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field className="col-span-full" data-invalid={fieldState.invalid}>
              <FieldLabel
                className="text-muted-foreground uppercase"
                htmlFor="personal-info-experience"
              >
                {content.fields.experience.label}
              </FieldLabel>
              <InputGroup>
                <InputGroupTextarea
                  {...field}
                  id="personal-info-experience"
                  placeholder={content.fields.experience.placeholder.value}
                  rows={5}
                  className="min-h-24 resize-none"
                  aria-invalid={fieldState.invalid}
                />
                <InputGroupAddon align="block-end">
                  <InputGroupText className="tabular-nums">
                    {field.value?.length ?? 0}/2000{" "}
                    {content.fields.experience.counter}
                  </InputGroupText>
                </InputGroupAddon>
              </InputGroup>
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
      </FieldGroup>
      <div className="w-full flex sm:flex-row flex-col gap-2 items-center justify-between mt-6">
        <Button
          type="button"
          variant={"outline"}
          onClick={() => setStep(2)}
          className="h-12 sm:w-fit w-full min-w-32"
        >
          {content.back}
        </Button>
        <Button type="submit" className="h-12 w-full sm:max-w-3xs">
          {content.continue}
        </Button>
      </div>
    </form>
  );
};
