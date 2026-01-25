"use client";

import { useIntlayer } from "next-intlayer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Link } from "@/components/locale/link";
import { CheckCircle2, XCircle, ArrowRight, Clock } from "lucide-react";

interface VerifyEmailResultProps {
  error?: string;
}

export function VerifyEmailResult({ error }: VerifyEmailResultProps) {
  const content = useIntlayer("verify-email-page");

  if (error) {
    return (
      <div className="w-full flex flex-col items-center gap-8 animate-in fade-in-0 slide-in-from-bottom-4 duration-500">
        <div className="w-20 h-20 bg-destructive/10 border border-destructive/20 flex items-center justify-center">
          <XCircle className="w-10 h-10 text-destructive" />
        </div>

        <div className="flex flex-col gap-2 items-center w-full text-center">
          <h3 className="text-xs text-destructive uppercase tracking-wider">
            {content.error.subtitle}
          </h3>
          <h1 className="font-bold text-3xl">{content.error.title}</h1>
          <p className="text-muted-foreground text-sm max-w-sm">
            {content.error.description}
          </p>
        </div>

        <div className="w-full h-px bg-muted" />

        <div className="w-full grid sm:grid-cols-2 grid-cols-1 gap-2">
          <Button asChild variant="outline" className="w-full h-12">
            <Link href="/register">{content.error.tryAgain}</Link>
          </Button>
          <Button asChild className="w-full h-12">
            <Link href="/sign-in">
              {content.error.signIn}
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col items-center gap-8 animate-in fade-in-0 slide-in-from-bottom-4 duration-500">
      <div className="w-20 h-20 bg-primary/10 border border-primary/20 flex items-center justify-center">
        <CheckCircle2 className="w-10 h-10 text-primary" />
      </div>

      <div className="flex flex-col gap-2 items-center w-full text-center">
        <h3 className="text-xs text-primary uppercase tracking-wider">
          {content.success.subtitle}
        </h3>
        <h1 className="font-bold text-3xl">{content.success.title}</h1>
        <p className="text-muted-foreground text-sm max-w-sm">
          {content.success.description}
        </p>
      </div>

      <Card className="w-full p-4 flex flex-row items-center gap-3 bg-muted/30 border-border/60">
        <div className="w-8 h-8 bg-primary/20 flex items-center justify-center shrink-0 mt-0.5">
          <Clock className="w-4 h-4 text-primary" />
        </div>
        <p className="text-sm text-muted-foreground">
          {content.success.pendingApproval}
        </p>
      </Card>

      <div className="w-full h-px bg-muted" />

      <Button asChild className="w-full h-12">
        <Link href="/sign-in">
          {content.success.signIn}
          <ArrowRight className="h-4 w-4" />
        </Link>
      </Button>
    </div>
  );
}
