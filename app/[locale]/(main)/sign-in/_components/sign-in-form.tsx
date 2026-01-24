"use client";

import * as React from "react";
import { useForm } from "@tanstack/react-form";
import { z } from "zod";
import { useIntlayer, useLocale } from "next-intlayer";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import {
  Field,
  FieldDescription,
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

export function SignInForm({ className }: { className?: string }) {
  const content = useIntlayer("sign-in-page");
  const router = useRouter();
  const [error, setError] = React.useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const locale = useLocale();
  const formSchema = React.useMemo(
    () =>
      z.object({
        email: z.email({ error: content.form.emailError.value }),
        password: z
          .string()
          .min(6, { error: content.form.passwordMinError.value })
          .max(32, { error: content.form.passwordMaxError.value }),
      }),
    [content]
  );

  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    validators: {
      onSubmit: formSchema,
    },
    onSubmit: async ({ value }) => {
      setError(null);
      setIsSubmitting(true);

      try {
        const result = await authClient.signIn.email({
          email: value.email,
          password: value.password,
          callbackURL: `/${locale.locale}/admin`,
        });

        if (result.error) {
          if (result.error.code === "INVALID_EMAIL_OR_PASSWORD") {
            setError(content.errors.invalidCredentials.value);
          } else if (result.error.code === "EMAIL_NOT_VERIFIED") {
            setError(content.errors.emailNotVerified.value);
          } else if (
            result.error.code === "ACCOUNT_NOT_APPROVED" &&
            result.error.message === "ACCOUNT_NOT_APPROVED"
          ) {
            setError(content.errors.accountNotApproved.value);
          } else {
            setError(content.errors.genericError.value);
          }
          return;
        }

        router.push(`/${locale.locale}/admin`);
      } catch {
        setError(content.errors.genericError.value);
      } finally {
        setIsSubmitting(false);
      }
    },
  });

  return (
    <div className={cn("w-full flex flex-col gap-6", className)}>
      <form
        className="w-full flex flex-col gap-6"
        id="sign-in-form"
        onSubmit={(e) => {
          e.preventDefault();
          form.handleSubmit();
        }}
      >
        <FieldGroup>
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
                    {content.form.emailLabel}
                  </FieldLabel>
                  <Input
                    className="h-12"
                    id={field.name}
                    name={field.name}
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    aria-invalid={isInvalid}
                    placeholder={content.form.emailPlaceholder.value}
                    disabled={isSubmitting}
                  />
                  {isInvalid && <FieldError errors={field.state.meta.errors} />}
                </Field>
              );
            }}
          />
          <form.Field
            name="password"
            children={(field) => {
              const isInvalid =
                field.state.meta.isTouched && !field.state.meta.isValid;
              return (
                <Field data-invalid={isInvalid}>
                  <FieldLabel
                    className="uppercase font-semibold"
                    htmlFor={field.name}
                  >
                    {content.form.passwordLabel}
                  </FieldLabel>
                  <Input
                    className="h-12"
                    id={field.name}
                    name={field.name}
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    type="password"
                    onChange={(e) => field.handleChange(e.target.value)}
                    aria-invalid={isInvalid}
                    placeholder="********"
                    disabled={isSubmitting}
                  />
                  <FieldDescription className="text-right">
                    <Link href="/forgot-password">
                      {content.form.forgotPassword}
                    </Link>
                  </FieldDescription>
                  {isInvalid && <FieldError errors={field.state.meta.errors} />}
                </Field>
              );
            }}
          />
        </FieldGroup>
        <Button type="submit" className="w-full h-12" disabled={isSubmitting}>
          {isSubmitting ? (
            <>
              <Spinner className="mr-2" />
              {content.form.submitting}
            </>
          ) : (
            content.form.submitButton
          )}
        </Button>
        {error && (
          <Alert
            variant="destructive"
            className="animate-in fade-in-0 slide-in-from-top-1 duration-200 py-3"
          >
            <AlertDescription className="leading-none">
              {error}
            </AlertDescription>
          </Alert>
        )}
      </form>
      <div className="w-full h-px bg-muted relative flex items-center justify-center">
        <span className="dark:bg-[#1c1c1c] bg-[#e7e7e7] absolute text-muted-foreground text-sm font-semibold px-2">
          {content.form.or}
        </span>
      </div>
      <div className="my-4 flex items-center justify-center text-sm">
        <p className="text-muted-foreground">
          {content.form.newMember}{" "}
          <Link className="inline-flex text-primary" href="/register">
            {content.form.requestAccess}
          </Link>
        </p>
      </div>
    </div>
  );
}
