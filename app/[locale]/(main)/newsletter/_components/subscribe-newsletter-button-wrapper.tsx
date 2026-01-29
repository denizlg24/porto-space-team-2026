"use client";

import { useEffect, useState } from "react";
import { SubscribeToNewsletterButton } from "./subscribe-newsletter-button";
import { apiClient } from "@/lib/api-client";
import type { GetSubscriberRoute } from "@/app/api/newsletter/subscriber/route";

type SubscriberData = GetSubscriberRoute["data"];

const getSubscriber = apiClient<GetSubscriberRoute>("/api/newsletter/subscriber");

export function SubscribeNewsletterButtonWrapper({
  locale,
}: {
  locale: string;
}) {
  const [subscriber, setSubscriber] = useState<SubscriberData>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getSubscriber.get().then((result) => {
      if (result.success) setSubscriber(result.data);
      setLoading(false);
    });
  }, []);

  return (
    <SubscribeToNewsletterButton
      locale={locale}
      initialSubscriber={subscriber}
      loading={loading}
    />
  );
}