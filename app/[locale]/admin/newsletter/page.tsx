import { NextPageIntlayer } from "next-intlayer";
import { getIntlayer } from "intlayer";
import { getSubscribers } from "@/lib/actions/newsletter";
import { getNewsletters } from "@/lib/actions/newsletters";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SubscribersTable } from "./_components/subscribers-table";
import { NewslettersManager } from "./_components/newsletters-manager";

const NewsletterPage: NextPageIntlayer = async ({ params }) => {
  const { locale } = await params;
  const content = getIntlayer("admin-newsletter-page", locale);

  const [subscribersResult, newslettersResult] = await Promise.all([
    getSubscribers(),
    getNewsletters(),
  ]);

  const subscribers = subscribersResult.success ? subscribersResult.data : [];
  const newsletters = newslettersResult.success ? newslettersResult.data : [];

  const activeSubscribersCount = subscribers.filter(
    (s) => !s.unsubscribedAt
  ).length;

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-bold">{content.title}</h1>
        <p className="text-muted-foreground">{content.description}</p>
      </div>

      <Tabs defaultValue="newsletters" className="w-full">
        <TabsList>
          <TabsTrigger value="newsletters">{content.tabs.newsletters}</TabsTrigger>
          <TabsTrigger value="subscribers">{content.tabs.subscribers}</TabsTrigger>
        </TabsList>

        <TabsContent value="newsletters" className="mt-6">
          <NewslettersManager
            initialNewsletters={newsletters}
            activeSubscribersCount={activeSubscribersCount}
          />
        </TabsContent>

        <TabsContent value="subscribers" className="mt-6">
          <div className="grid gap-4 md:grid-cols-3 mb-6">
            <div className="rounded-md border p-4">
              <p className="text-sm text-muted-foreground">
                {content.subscribers.stats.total}
              </p>
              <p className="text-2xl font-bold">{subscribers.length}</p>
            </div>
            <div className="rounded-md border p-4">
              <p className="text-sm text-muted-foreground">
                {content.subscribers.stats.active}
              </p>
              <p className="text-2xl font-bold">{activeSubscribersCount}</p>
            </div>
            <div className="rounded-md border p-4">
              <p className="text-sm text-muted-foreground">
                {content.subscribers.stats.unsubscribed}
              </p>
              <p className="text-2xl font-bold">
                {subscribers.length - activeSubscribersCount}
              </p>
            </div>
          </div>
          <SubscribersTable initialSubscribers={subscribers} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default NewsletterPage;
