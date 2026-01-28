"use client";

import * as React from "react";
import { useForm } from "@tanstack/react-form";
import { z } from "zod";
import { useIntlayer } from "next-intlayer";

import { Button } from "@/components/ui/button";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Spinner } from "@/components/ui/spinner";
import { cn } from "@/lib/utils";
import { Link } from "@/components/locale/link";
import { authClient } from "@/lib/authClient";

export function SecurityForm({
  className,
  userData,
  moveStep,
}: {
  className?: string;
  userData: {
    name: string;
    email: string;
    department: string;
  };
  moveStep: React.Dispatch<React.SetStateAction<number>>;
}) {
  const content = useIntlayer("register-page");
  const [error, setError] = React.useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const formSchema = React.useMemo(
    () =>
      z
        .object({
          password: z
            .string()
            .min(6, { error: content.securityForm.passwordMinError.value })
            .max(32, { error: content.securityForm.passwordMaxError.value })
            .refine((val) => val !== val.toLowerCase(), {
              error: content.securityForm.passwordUppercaseError.value,
              abort: true,
            })
            .refine(
              (val) => /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/.test(val),
              {
                error: content.securityForm.passwordSpecialError.value,
                abort: true,
              }
            ),
          confirmPassword: z.string().min(1, {
            error: content.securityForm.confirmPasswordError.value,
          }),
        })
        .refine((data) => data.password === data.confirmPassword, {
          message: content.securityForm.passwordsMustMatch.value,
          path: ["confirmPassword"],
        }),
    [content.securityForm]
  );

  const form = useForm({
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
    validators: {
      onSubmit: formSchema,
    },
    onSubmit: async ({ value }) => {
      setError(null);
      setIsSubmitting(true);

      try {
        const result = await authClient.signUp.email({
          email: userData.email,
          password: value.password,
          name: userData.name,
          department: userData.department,
        });

        if (result.error) {
          if (result.error.code === "USER_ALREADY_EXISTS") {
            setError(content.errors.emailInUse.value);
          } else if (
            result.error.code === "BAD_REQUEST" &&
            result.error.message?.includes("@up.pt")
          ) {
            setError(content.errors.invalidEmail.value);
          } else {
            setError(content.errors.genericError.value);
          }
          return;
        }

        moveStep(3);
      } catch {
        setError(content.errors.genericError.value);
      } finally {
        setIsSubmitting(false);
      }
    },
  });

  return (
    <div
      className={cn(
        "w-full flex flex-col gap-6 animate-in fade-in-0 duration-300",
        className
      )}
    >
      <form
        className="w-full flex flex-col gap-6"
        id="register-form"
        onSubmit={(e) => {
          e.preventDefault();
          form.handleSubmit();
        }}
      >
        <FieldGroup>
          <form.Field name="password">
            {(field) => {
              const isInvalid =
                field.state.meta.isTouched && !field.state.meta.isValid;
              return (
                <Field data-invalid={isInvalid}>
                  <FieldLabel
                    className="uppercase font-semibold"
                    htmlFor={field.name}
                  >
                    {content.securityForm.passwordLabel}
                  </FieldLabel>
                  <Input
                    className="h-12"
                    id={field.name}
                    name={field.name}
                    type="password"
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    aria-invalid={isInvalid}
                    placeholder="******"
                    disabled={isSubmitting}
                  />
                  {isInvalid && <FieldError errors={field.state.meta.errors} />}
                </Field>
              );
            }}
          </form.Field>
          <form.Field name="confirmPassword">
            {(field) => {
              const isInvalid =
                field.state.meta.isTouched && !field.state.meta.isValid;
              return (
                <Field data-invalid={isInvalid}>
                  <FieldLabel
                    className="uppercase font-semibold"
                    htmlFor={field.name}
                  >
                    {content.securityForm.confirmPasswordLabel}
                  </FieldLabel>
                  <Input
                    className="h-12"
                    id={field.name}
                    name={field.name}
                    type="password"
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    aria-invalid={isInvalid}
                    disabled={isSubmitting}
                  />
                  {isInvalid && <FieldError errors={field.state.meta.errors} />}
                </Field>
              );
            }}
          </form.Field>
        </FieldGroup>
        <div className="w-full grid sm:grid-cols-2 grid-cols-1 gap-x-2 gap-y-1">
          <Button
            type="button"
            onClick={() => moveStep(1)}
            variant="outline"
            className="w-full h-12"
            disabled={isSubmitting}
          >
            {content.securityForm.backButton}
          </Button>
          <Button type="submit" className="w-full h-12" disabled={isSubmitting}>
            {isSubmitting ? (
              <>
                <Spinner className="mr-2" />
                {content.securityForm.submitting}
              </>
            ) : (
              content.securityForm.submitButton
            )}
          </Button>
        </div>
        {error && (
          <Alert
            variant="destructive"
            className="animate-in fade-in-0 slide-in-from-top-1 duration-200 py-3"
          >
            <AlertDescription className="leading-none">{error}</AlertDescription>
          </Alert>
        )}
      </form>
      <div className="w-full h-px bg-muted relative flex items-center justify-center">
        <span className="dark:bg-[#1c1c1c] bg-[#e7e7e7] absolute text-muted-foreground text-sm font-semibold px-2">
          {content.securityForm.or}
        </span>
      </div>
      <div className="my-4 flex items-center justify-center text-sm">
        <p className="text-muted-foreground">
          {content.securityForm.alreadyHaveAccess}{" "}
          <Link className="inline-flex text-primary" href="/sign-in">
            {content.securityForm.signIn}
          </Link>
        </p>
      </div>
    </div>
  );
}
