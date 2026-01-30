"use client";

import { useState, useOptimistic, useTransition } from "react";
import { getIntlayer } from "intlayer";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";
import { SubscribeDialog } from "./subscribe-dialog";
import { apiClient } from "@/lib/api-client";
import type {
  SubscriberData,
  UnsubscribeRoute,
} from "@/app/api/newsletter/subscriber/route";

const unsubscribeApi = apiClient<UnsubscribeRoute>(
  "/api/newsletter/subscriber",
);

type SubscribeToNewsletterButtonProps = {
  locale: string;
  initialSubscriber: SubscriberData | null;
  loading: boolean;
};

type OptimisticState = {
  subscriber: SubscriberData | null;
  isSubscribed: boolean;
};

export function SubscribeToNewsletterButton({
  locale,
  initialSubscriber,
  loading,
}: SubscribeToNewsletterButtonProps) {
  const content = getIntlayer("newsletter-page", locale);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [isPending, startTransition] = useTransition();

  const [optimisticState, setOptimisticState] = useOptimistic<OptimisticState>({
    subscriber: initialSubscriber,
    isSubscribed: initialSubscriber?.isSubscribed ?? false,
  });

  const handleSubscribeSuccess = (data: SubscriberData) => {
    setOptimisticState({ subscriber: data, isSubscribed: true });
    toast.success(content.messages.subscribeSuccess);
  };

  const handleSubscribeError = (error: string) => {
    toast.error(error || content.messages.error);
  };

  const handleUnsubscribe = () => {
    startTransition(async () => {
      setOptimisticState({ subscriber: null, isSubscribed: false });

      const result = await unsubscribeApi.delete();

      if (result.success) {
        toast.success(content.messages.unsubscribeSuccess);
      } else {
        setOptimisticState({
          subscriber: initialSubscriber,
          isSubscribed: true,
        });
        toast.error(result.error.message || content.messages.error);
      }
    });
  };

  if (loading) {
    return (
      <>
        <Input
          placeholder={content.subscribe.emailPlaceholder}
          readOnly
          type="email"
        />
        <Button>{content.subscribe.subscribeButton}</Button>
      </>
    );
  }

  if (optimisticState.isSubscribed && optimisticState.subscriber) {
    return (
      <>
        <div className="w-full relative overflow-y-visible">
          <Input
            value={optimisticState.subscriber.email}
            readOnly
            type="email"
            disabled
          />
        </div>
        <Button onClick={handleUnsubscribe} disabled={isPending}>
          {isPending ? (
            <>
              <Spinner className="mr-2" />
              {content.subscribe.unsubscribeButton}
            </>
          ) : (
            content.subscribe.unsubscribeButton
          )}
        </Button>
      </>
    );
  }

  return (
    <>
      <div className="w-full relative overflow-y-visible">
        <Input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          placeholder={content.subscribe.emailPlaceholder}
        />
      </div>
      <Button onClick={() => setDialogOpen(true)}>
        {content.subscribe.subscribeButton}
      </Button>

      <SubscribeDialog
        locale={locale}
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        initialEmail={email}
        onSuccess={handleSubscribeSuccess}
        onError={handleSubscribeError}
      />
    </>
  );
}
