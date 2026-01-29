import { getSubscriberByToken } from "@/lib/actions/newsletter";
import { SubscribeToNewsletterButton } from "./subscribe-newsletter-button";

export async function SubscribeNewsletterButtonWrapper({
  locale,
}: {
  locale: string;
}) {
  const result = await getSubscriberByToken();
  const subscriber = result.success ? result.data : null;

  return (
    <SubscribeToNewsletterButton
      locale={locale}
      initialSubscriber={subscriber}
    />
  );
}
