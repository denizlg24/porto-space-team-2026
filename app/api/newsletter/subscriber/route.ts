import { publicRoute, success } from "@/lib/api";
import type { RouteDefinition } from "@/lib/api-client";
import { connectDB } from "@/lib/db";
import { NewsletterSubscribers } from "@/models/NewsletterSubscriber";
import { cookies } from "next/headers";

const NEWSLETTER_COOKIE_NAME = "newsletter_subscriber_token";

export type SubscriberData = {
  id: string;
  email: string;
  name: string;
  dateOfBirth: string;
  isSubscribed: boolean;
};

export type GetSubscriberRoute = RouteDefinition<
  SubscriberData | null,
  never,
  undefined
>;

export const GET = publicRoute(async () => {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get(NEWSLETTER_COOKIE_NAME)?.value;

    if (!token) {
      return success(null);
    }

    await connectDB();
    const subscriber = await NewsletterSubscribers.findOne({ token });

    if (!subscriber) {
      return success(null);
    }

    const data: SubscriberData = {
      id: subscriber._id.toString(),
      email: subscriber.email,
      name: subscriber.name,
      dateOfBirth: subscriber.dateOfBirth.toISOString().split("T")[0],
      isSubscribed: subscriber.unsubscribedAt === null,
    };

    return success(data);
  } catch (error) {
    console.error("Error fetching subscriber:", error);
    throw error;
  }
});
