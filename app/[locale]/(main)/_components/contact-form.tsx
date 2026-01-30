"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import * as z from "zod";
import { getIntlayer} from "next-intlayer";
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
import { Send, CheckCircle2, AlertCircle, RotateCcw, Loader2 } from "lucide-react";
import { apiClient } from "@/lib/api-client";
import type { SubmitContactRoute } from "@/app/api/contacts/route";

type FormState =
  | { status: "idle" }
  | { status: "submitting" }
  | { status: "success"; ticketId: string }
  | { status: "error"; message: string };

export const ContactForm = ({locale}:{locale:string}) => {
  const content = getIntlayer("contact-form", locale);
  const [state, setState] = useState<FormState>({ status: "idle" });

  const formSchema = z.object({
    name: z
      .string()
      .min(2, content.validation.nameMin.value)
      .max(128, content.validation.nameMax.value),
    email: z.string().email(content.validation.emailInvalid.value),
    subject: z.literal(["sponsorship", "partnership", "media", "other"],{error:content.validation.subjectRequired.value}),
    message: z
      .string()
      .min(10, content.validation.messageMin.value)
      .max(5000, content.validation.messageMax.value),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
      subject: undefined,
    },
  });

  const submitForm = async (data: z.infer<typeof formSchema>) => {
    setState({ status: "submitting" });

    const contactsApi = apiClient<SubmitContactRoute>("/api/contacts");
    const result = await contactsApi.post({
      input: {
        email: data.email,
        name: data.name,
        subject: data.subject,
        message: data.message,
      },
    });

    if (result.success) {
      setState({ status: "success", ticketId: result.data.ticketId });
      form.reset();
    } else {
      setState({ status: "error", message: result.error.message });
    }
  };

  const resetForm = () => {
    setState({ status: "idle" });
    form.reset();
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
              {content.success.ticketLabel}
            </p>
            <p className="font-mono text-lg font-semibold text-primary">
              {state.ticketId}
            </p>
          </div>
          <p className="text-sm text-muted-foreground">
            {content.success.ticketNote}
          </p>
          <Button
            variant="outline"
            onClick={resetForm}
            className="mt-2"
          >
            <Send className="size-4" />
            {content.success.sendAnother}
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
          </div>
          <Button
            variant="outline"
            onClick={resetForm}
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
    <form
      id="contact-form-pst"
      className="w-full animate-in fade-in duration-300"
      onSubmit={form.handleSubmit(submitForm)}
    >
      <FieldGroup className="grid grid-cols-2 gap-4 w-full">
        <Controller
          name="name"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel
                className="text-muted-foreground uppercase"
                htmlFor="contact-form-pst-name"
              >
                {content.fields.name.label}
              </FieldLabel>
              <Input
                {...field}
                id="contact-form-pst-name"
                aria-invalid={fieldState.invalid}
                placeholder={content.fields.name.placeholder.value}
                disabled={state.status === "submitting"}
              />
              {fieldState.invalid && (
                <FieldError errors={[fieldState.error]} />
              )}
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
                htmlFor="contact-form-pst-email"
              >
                {content.fields.email.label}
              </FieldLabel>
              <Input
                {...field}
                id="contact-form-pst-email"
                aria-invalid={fieldState.invalid}
                placeholder={content.fields.email.placeholder.value}
                type="email"
                disabled={state.status === "submitting"}
              />
              {fieldState.invalid && (
                <FieldError errors={[fieldState.error]} />
              )}
            </Field>
          )}
        />
        <Controller
          name="subject"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field className="col-span-full" data-invalid={fieldState.invalid}>
              <FieldLabel
                className="text-muted-foreground uppercase"
                htmlFor="contact-form-pst-subject"
              >
                {content.fields.subject.label}
              </FieldLabel>
              <Select
                value={field.value}
                onValueChange={field.onChange}
                disabled={state.status === "submitting"}
              >
                <SelectTrigger
                  className={cn(
                    "w-full",
                    fieldState.invalid && "border-destructive"
                  )}
                >
                  <SelectValue placeholder={content.fields.subject.placeholder.value} />
                </SelectTrigger>
                <SelectContent position="popper">
                  <SelectItem value="sponsorship">
                    {content.fields.subject.options.sponsorship}
                  </SelectItem>
                  <SelectItem value="partnership">
                    {content.fields.subject.options.partnership}
                  </SelectItem>
                  <SelectItem value="media">
                    {content.fields.subject.options.media}
                  </SelectItem>
                  <SelectItem value="other">
                    {content.fields.subject.options.other}
                  </SelectItem>
                </SelectContent>
              </Select>
              {fieldState.invalid && (
                <FieldError errors={[fieldState.error]} />
              )}
            </Field>
          )}
        />
        <Controller
          name="message"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field
              className="col-span-full"
              data-invalid={fieldState.invalid}
            >
              <FieldLabel
                className="text-muted-foreground uppercase"
                htmlFor="contact-form-pst-message"
              >
                {content.fields.message.label}
              </FieldLabel>
              <InputGroup>
                <InputGroupTextarea
                  {...field}
                  id="contact-form-pst-message"
                  placeholder={content.fields.message.placeholder.value}
                  rows={6}
                  className="min-h-24 resize-none"
                  aria-invalid={fieldState.invalid}
                  disabled={state.status === "submitting"}
                />
                <InputGroupAddon align="block-end">
                  <InputGroupText className="tabular-nums">
                    {field.value.length}/5000 {content.fields.message.counter}
                  </InputGroupText>
                </InputGroupAddon>
              </InputGroup>
              {fieldState.invalid && (
                <FieldError errors={[fieldState.error]} />
              )}
            </Field>
          )}
        />
      </FieldGroup>
      <Button
        size="lg"
        type="submit"
        className="mt-4 w-full h-10"
        disabled={state.status === "submitting"}
      >
        {state.status === "submitting" ? (
          <>
            <Loader2 className="size-4 animate-spin" />
            {content.submitting}
          </>
        ) : (
          <>
            <Send className="size-4" />
            {content.submit}
          </>
        )}
      </Button>
    </form>
  );
};
