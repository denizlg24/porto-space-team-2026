"use client";

import { useEffect, useState } from "react";
import { SubscribeToNewsletterButton } from "./subscribe-newsletter-button";
import { getSubscriberByToken, SubscriberData } from "@/lib/actions/newsletter";

export function SubscribeNewsletterButtonWrapper({
  locale,
}: {
  locale: string;
}) {
  const [subscriber, setSubscriber] = useState<SubscriberData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getSubscriberByToken().then((result) => {
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