"use client";

import { useState, useTransition, useEffect } from "react";
import { getIntlayer } from "intlayer";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Field, FieldLabel, FieldError } from "@/components/ui/field";
import { Spinner } from "@/components/ui/spinner";
import { cn } from "@/lib/utils";
import {
  subscribeToNewsletter,
  type SubscriberData,
} from "@/lib/actions/newsletter";

type SubscribeDialogProps = {
  locale: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  initialEmail: string;
  onSuccess: (data: SubscriberData) => void;
  onError: (error: string) => void;
};

export function SubscribeDialog({
  locale,
  open,
  onOpenChange,
  initialEmail,
  onSuccess,
  onError,
}: SubscribeDialogProps) {
  const content = getIntlayer("newsletter-page", locale);
  const [isPending, startTransition] = useTransition();

  const [name, setName] = useState("");
  const [email, setEmail] = useState(initialEmail);
  const [dateOfBirth, setDateOfBirth] = useState<Date | undefined>(undefined);
  const [calendarOpen, setCalendarOpen] = useState(false);

  const [errors, setErrors] = useState<{
    name?: string;
    email?: string;
    dateOfBirth?: string;
  }>({});

  useEffect(() => {
    if (open) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setEmail(initialEmail);
    } else {
      setName("");
      setEmail("");
      setDateOfBirth(undefined);
      setErrors({});
    }
  }, [open, initialEmail]);

  const validateForm = () => {
    const newErrors: typeof errors = {};

    if (!name.trim()) {
      newErrors.name =
        locale === "pt" ? "Nome é obrigatório" : "Name is required";
    }

    if (!email.trim()) {
      newErrors.email =
        locale === "pt" ? "Email é obrigatório" : "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = locale === "pt" ? "Email inválido" : "Invalid email";
    }

    if (!dateOfBirth) {
      newErrors.dateOfBirth =
        locale === "pt"
          ? "Data de nascimento é obrigatória"
          : "Date of birth is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (!validateForm() || !dateOfBirth) return;

    startTransition(async () => {
      const result = await subscribeToNewsletter({
        email,
        name,
        dateOfBirth: dateOfBirth.toISOString().split("T")[0],
      });

      if (result.success) {
        onSuccess(result.data);
        onOpenChange(false);
        setName("");
        setEmail("");
        setDateOfBirth(undefined);
        setErrors({});
      } else {
        onError(result.error);
      }
    });
  };

  const currentYear = new Date().getFullYear();
  const fromYear = currentYear - 100;
  const toYear = currentYear - 10;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{content.dialog.title}</DialogTitle>
          <DialogDescription>{content.dialog.description}</DialogDescription>
        </DialogHeader>

        <div className="flex flex-col gap-4 pb-4">
          <Field data-invalid={!!errors.name}>
            <FieldLabel htmlFor="name">{content.dialog.nameLabel}</FieldLabel>
            <Input
              id="name"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                if (errors.name)
                  setErrors((prev) => ({ ...prev, name: undefined }));
              }}
              placeholder={content.dialog.namePlaceholder}
              disabled={isPending}
              aria-invalid={!!errors.name}
            />
            {errors.name && <FieldError>{errors.name}</FieldError>}
          </Field>

          <Field data-invalid={!!errors.email}>
            <FieldLabel htmlFor="email">{content.dialog.emailLabel}</FieldLabel>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (errors.email)
                  setErrors((prev) => ({ ...prev, email: undefined }));
              }}
              placeholder={content.subscribe.emailPlaceholder}
              disabled={isPending}
              aria-invalid={!!errors.email}
            />
            {errors.email && <FieldError>{errors.email}</FieldError>}
          </Field>

          <Field data-invalid={!!errors.dateOfBirth}>
            <FieldLabel>{content.dialog.dateOfBirthLabel}</FieldLabel>
            <Popover open={calendarOpen} onOpenChange={setCalendarOpen}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-full justify-start text-left font-normal",
                    !dateOfBirth && "text-muted-foreground",
                  )}
                  disabled={isPending}
                  aria-invalid={!!errors.dateOfBirth}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {dateOfBirth
                    ? format(dateOfBirth, "PPP")
                    : content.dialog.dateOfBirthPlaceholder}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={dateOfBirth}
                  onSelect={(date) => {
                    setDateOfBirth(date);
                    setCalendarOpen(false);
                    if (errors.dateOfBirth) {
                      setErrors((prev) => ({
                        ...prev,
                        dateOfBirth: undefined,
                      }));
                    }
                  }}
                  captionLayout="dropdown"
                  fromYear={fromYear}
                  toYear={toYear}
                  defaultMonth={
                    dateOfBirth || new Date(toYear, new Date().getMonth())
                  }
                  disabled={(date) =>
                    date > new Date() || date < new Date(fromYear, 0, 1)
                  }
                />
              </PopoverContent>
            </Popover>
            {errors.dateOfBirth && (
              <FieldError>{errors.dateOfBirth}</FieldError>
            )}
          </Field>
        </div>

        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            disabled={isPending}
          >
            {content.dialog.cancelButton}
          </Button>
          <Button onClick={handleSubmit} disabled={isPending}>
            {isPending ? (
              <>
                <Spinner className="mr-2" />
                {content.dialog.submitButton}
              </>
            ) : (
              content.dialog.submitButton
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
