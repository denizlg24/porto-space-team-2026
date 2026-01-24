"use client";

import * as React from "react";
import { useForm } from "@tanstack/react-form";
import { z } from "zod";
import { useIntlayer } from "next-intlayer";

import { Button } from "@/components/ui/button";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { Link } from "@/components/locale/link";
import { MoveRight } from "lucide-react";

export function IdentityForm({
  className,
  submit,
  moveStep,
  initialData,
}: {
  className?: string;
  submit: React.Dispatch<
    React.SetStateAction<{
      name: string;
      email: string;
      department: string;
    }>
  >;
  initialData: {
    name: string;
    email: string;
    department: string;
  };
  moveStep: React.Dispatch<React.SetStateAction<number>>;
}) {
  const content = useIntlayer("register-page");

  const departments = React.useMemo(
    () => [
      { id: "propulsion", name: content.departments.propulsion, code: "PRO" },
      { id: "structures", name: content.departments.structures, code: "STR" },
      { id: "avionics", name: content.departments.avionics, code: "AVI" },
      { id: "recovery", name: content.departments.recovery, code: "REC" },
      { id: "operations", name: content.departments.operations, code: "OPS" },
      { id: "business", name: content.departments.business, code: "BIZ" },
    ],
    [content.departments]
  );

  const formSchema = React.useMemo(
    () =>
      z.object({
        email: z.email({ error: content.identityForm.emailError.value }),
        name: z
          .string()
          .min(2, { error: content.identityForm.fullNameError.value }),
        department: z
          .string()
          .nonempty({ error: content.identityForm.departmentError.value }),
      }),
    [content.identityForm]
  );

  const form = useForm({
    defaultValues: {
      email: initialData.email,
      name: initialData.name,
      department: initialData.department,
    },
    validators: {
      onSubmit: formSchema,
    },
    onSubmit: async ({ value }) => {
      submit((prev) => ({
        ...prev,
        name: value.name,
        email: value.email,
        department: value.department,
      }));
      moveStep(2);
    },
  });

  return (
    <div className={cn("w-full flex flex-col gap-6", className)}>
      <form
        className="w-full flex flex-col gap-6"
        id="identity-register-form"
        onSubmit={(e) => {
          e.preventDefault();
          form.handleSubmit();
        }}
      >
        <FieldGroup>
          <form.Field
            name="name"
            children={(field) => {
              const isInvalid =
                field.state.meta.isTouched && !field.state.meta.isValid;
              return (
                <Field data-invalid={isInvalid}>
                  <FieldLabel
                    className="uppercase font-semibold"
                    htmlFor={field.name}
                  >
                    {content.identityForm.fullNameLabel}
                  </FieldLabel>
                  <Input
                    className="h-12"
                    id={field.name}
                    name={field.name}
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    aria-invalid={isInvalid}
                    placeholder={content.identityForm.fullNamePlaceholder.value}
                  />
                  {isInvalid && <FieldError errors={field.state.meta.errors} />}
                </Field>
              );
            }}
          />
          <form.Field
            name="email"
            children={(field) => {
              const isInvalid =
                field.state.meta.isTouched && !field.state.meta.isValid;
              return (
                <Field data-invalid={isInvalid}>
                  <FieldLabel
                    className="uppercase font-semibold"
                    htmlFor={field.name}
                  >
                    {content.identityForm.emailLabel}
                  </FieldLabel>
                  <Input
                    className="h-12"
                    id={field.name}
                    name={field.name}
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    aria-invalid={isInvalid}
                    placeholder={content.identityForm.emailPlaceholder.value}
                  />
                  <FieldDescription>
                    {content.identityForm.emailDescription}
                  </FieldDescription>
                  {isInvalid && <FieldError errors={field.state.meta.errors} />}
                </Field>
              );
            }}
          />
          <form.Field
            name="department"
            children={(field) => {
              const isInvalid =
                field.state.meta.isTouched && !field.state.meta.isValid;
              return (
                <div className="grid grid-cols-2 gap-2">
                  <FieldLabel
                    className="uppercase font-semibold col-span-2"
                    htmlFor={field.name}
                  >
                    {content.identityForm.departmentLabel}
                  </FieldLabel>
                  {departments.map((dept) => (
                    <button
                      key={dept.id}
                      type="button"
                      onClick={() => field.handleChange(dept.id)}
                      className={`p-3 border text-left transition-all ${
                        field.state.value === dept.id
                          ? "border-primary bg-primary/10"
                          : "border-border bg-secondary hover:border-muted-foreground"
                      }`}
                    >
                      <div className="font-mono text-xs text-primary">
                        {dept.code}
                      </div>
                      <div className="text-sm text-foreground">{dept.name}</div>
                    </button>
                  ))}
                  {isInvalid && (
                    <FieldError
                      className="w-full col-span-2"
                      errors={field.state.meta.errors}
                    />
                  )}
                </div>
              );
            }}
          />
        </FieldGroup>
        <Button type="submit" className="w-full h-12">
          {content.identityForm.continueButton} <MoveRight />
        </Button>
      </form>
      <div className="w-full h-px bg-muted relative flex items-center justify-center">
        <span className="dark:bg-[#1c1c1c] bg-[#e7e7e7] absolute text-muted-foreground text-sm font-semibold px-2">
          {content.identityForm.or}
        </span>
      </div>
      <div className="my-4 flex items-center justify-center text-sm">
        <p className="text-muted-foreground">
          {content.identityForm.alreadyHaveAccess}{" "}
          <Link className="inline-flex text-primary" href="/sign-in">
            {content.identityForm.signIn}
          </Link>
        </p>
      </div>
    </div>
  );
}
