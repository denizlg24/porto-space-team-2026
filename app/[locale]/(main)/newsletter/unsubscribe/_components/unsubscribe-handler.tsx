"use client";

import { useEffect, useState } from "react";
import { useIntlayer } from "next-intlayer";
import { Button } from "@/components/ui/button";
import { Link } from "@/components/locale/link";
import { Skeleton } from "@/components/ui/skeleton";
import { CheckCircle2, XCircle } from "lucide-react";
import { unsubscribeByToken } from "@/lib/actions/newsletter";

interface UnsubscribeHandlerProps {
  token: string | undefined;
}

export function UnsubscribeHandler({ token }: UnsubscribeHandlerProps) {
  const content = useIntlayer("newsletter-unsubscribe-page");
  const [status, setStatus] = useState<"loading" | "success" | "error">("loading");
  const [errorType, setErrorType] = useState<string | null>(null);

  useEffect(() => {
    async function handleUnsubscribe() {
      if (!token) {
        setErrorType("missing_token");
        setStatus("error");
        return;
      }

      const result = await unsubscribeByToken(token);

      if (result.success) {
        setStatus("success");
      } else {
        setErrorType(result.error);
        setStatus("error");
      }
    }

    handleUnsubscribe();
  }, [token]);

  if (status === "loading") {
    return (
      <div className="flex flex-col items-center gap-4">
        <Skeleton className="size-16 rounded-full" />
        <Skeleton className="h-8 w-64" />
        <Skeleton className="h-4 w-48" />
      </div>
    );
  }

  if (status === "success") {
    return (
      <>
        <CheckCircle2 className="mx-auto size-16 text-green-500 mb-6" />
        <h1 className="text-2xl md:text-3xl font-bold mb-4">
          {content.success.title}
        </h1>
        <p className="text-muted-foreground mb-8">
          {content.success.description}
        </p>
        <Button asChild>
          <Link href="/">{content.backToHome}</Link>
        </Button>
      </>
    );
  }

  return (
    <>
      <XCircle className="mx-auto size-16 text-destructive mb-6" />
      <h1 className="text-2xl md:text-3xl font-bold mb-4">
        {content.error.title}
      </h1>
      <p className="text-muted-foreground mb-8">
        {errorType === "invalid_token"
          ? content.error.invalidToken
          : errorType === "missing_token"
            ? content.error.missingToken
            : content.error.serverError}
      </p>
      <Button asChild>
        <Link href="/">{content.backToHome}</Link>
      </Button>
    </>
  );
}
