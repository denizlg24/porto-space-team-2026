"use server";

import { connectDB } from "@/lib/db";
import { NewsletterSubscribers } from "@/models/NewsletterSubscriber";
import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";
import crypto from "crypto";

const NEWSLETTER_COOKIE_NAME = "newsletter_subscriber_token";
const COOKIE_MAX_AGE = 60 * 60 * 24 * 365 * 5; // 5 years

export type NewsletterActionResult<T = void> =
  | { success: true; data: T }
  | { success: false; error: string };

export type SubscriberData = {
  id: string;
  email: string;
  name: string;
  dateOfBirth: string;
  isSubscribed: boolean;
};

function generateToken(): string {
  return crypto.randomBytes(32).toString("hex");
}

export async function getSubscriberByToken(): Promise<
  NewsletterActionResult<SubscriberData | null>
> {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get(NEWSLETTER_COOKIE_NAME)?.value;

    if (!token) {
      return { success: true, data: null };
    }

    await connectDB();
    const subscriber = await NewsletterSubscribers.findOne({ token });

    if (!subscriber) {
      return { success: true, data: null };
    }

    return {
      success: true,
      data: {
        id: subscriber._id.toString(),
        email: subscriber.email,
        name: subscriber.name,
        dateOfBirth: subscriber.dateOfBirth.toISOString().split("T")[0],
        isSubscribed: subscriber.unsubscribedAt === null,
      },
    };
  } catch (error) {
    console.error("Error fetching subscriber:", error);
    return { success: false, error: "Failed to fetch subscriber" };
  }
}

export async function subscribeToNewsletter(data: {
  email: string;
  name: string;
  dateOfBirth: string;
}): Promise<NewsletterActionResult<SubscriberData>> {
  try {
    const email = data.email.toLowerCase().trim();
    const name = data.name.trim();
    const dateOfBirth = new Date(data.dateOfBirth);

    if (!email || !name || !data.dateOfBirth) {
      return { success: false, error: "All fields are required" };
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return { success: false, error: "Invalid email address" };
    }

    await connectDB();

    const existingSubscriber = await NewsletterSubscribers.findOne({ email });

    if (existingSubscriber) {
      const newToken = generateToken();
      existingSubscriber.name = name;
      existingSubscriber.dateOfBirth = dateOfBirth;
      existingSubscriber.token = newToken;
      existingSubscriber.unsubscribedAt = null;
      existingSubscriber.subscribedAt = new Date();
      await existingSubscriber.save();

      const cookieStore = await cookies();
      cookieStore.set(NEWSLETTER_COOKIE_NAME, newToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: COOKIE_MAX_AGE,
        path: "/",
      });

      revalidatePath("/[locale]/(main)/newsletter", "page");

      return {
        success: true,
        data: {
          id: existingSubscriber._id.toString(),
          email: existingSubscriber.email,
          name: existingSubscriber.name,
          dateOfBirth: existingSubscriber.dateOfBirth
            .toISOString()
            .split("T")[0],
          isSubscribed: true,
        },
      };
    }

    const token = generateToken();
    const subscriber = await NewsletterSubscribers.create({
      email,
      name,
      dateOfBirth,
      token,
      subscribedAt: new Date(),
    });

    const cookieStore = await cookies();
    cookieStore.set(NEWSLETTER_COOKIE_NAME, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: COOKIE_MAX_AGE,
      path: "/",
    });

    revalidatePath("/[locale]/(main)/newsletter", "page");

    return {
      success: true,
      data: {
        id: subscriber._id.toString(),
        email: subscriber.email,
        name: subscriber.name,
        dateOfBirth: subscriber.dateOfBirth.toISOString().split("T")[0],
        isSubscribed: true,
      },
    };
  } catch (error) {
    console.error("Error subscribing to newsletter:", error);
    return { success: false, error: "Failed to subscribe" };
  }
}

export type AdminSubscriberData = {
  id: string;
  email: string;
  name: string;
  dateOfBirth: string;
  subscribedAt: string;
  unsubscribedAt: string | null;
  createdAt: string;
};

export async function getSubscribers(options?: {
  status?: "subscribed" | "unsubscribed" | "all";
  search?: string;
}): Promise<NewsletterActionResult<AdminSubscriberData[]>> {
  const { getAdminSession } = await import("./users");
  const session = await getAdminSession();
  if (!session) {
    return { success: false, error: "Unauthorized" };
  }

  try {
    await connectDB();

    const query: Record<string, unknown> = {};

    if (options?.status === "subscribed") {
      query.unsubscribedAt = null;
    } else if (options?.status === "unsubscribed") {
      query.unsubscribedAt = { $ne: null };
    }

    if (options?.search) {
      query.$or = [
        { name: { $regex: options.search, $options: "i" } },
        { email: { $regex: options.search, $options: "i" } },
      ];
    }

    const subscribers = await NewsletterSubscribers.find(query).sort({
      subscribedAt: -1,
    });

    return {
      success: true,
      data: subscribers.map((sub) => ({
        id: sub._id.toString(),
        email: sub.email,
        name: sub.name,
        dateOfBirth: sub.dateOfBirth.toISOString().split("T")[0],
        subscribedAt: sub.subscribedAt.toISOString(),
        unsubscribedAt: sub.unsubscribedAt?.toISOString() ?? null,
        createdAt: sub.createdAt.toISOString(),
      })),
    };
  } catch (error) {
    console.error("Error fetching subscribers:", error);
    return { success: false, error: "Failed to fetch subscribers" };
  }
}

export async function deleteSubscriber(
  subscriberId: string
): Promise<NewsletterActionResult<void>> {
  const { getAdminSession } = await import("./users");
  const session = await getAdminSession();
  if (!session) {
    return { success: false, error: "Unauthorized" };
  }

  try {
    await connectDB();
    const result = await NewsletterSubscribers.findByIdAndDelete(subscriberId);

    if (!result) {
      return { success: false, error: "Subscriber not found" };
    }

    revalidatePath("/[locale]/admin/newsletter", "page");
    return { success: true, data: undefined };
  } catch (error) {
    console.error("Error deleting subscriber:", error);
    return { success: false, error: "Failed to delete subscriber" };
  }
}

export async function unsubscribeByToken(
  token: string
): Promise<NewsletterActionResult<void>> {
  try {
    await connectDB();
    const subscriber = await NewsletterSubscribers.findOne({ token });

    if (!subscriber) {
      return { success: false, error: "invalid_token" };
    }

    if (subscriber.unsubscribedAt === null) {
      subscriber.unsubscribedAt = new Date();
      await subscriber.save();
    }

    const cookieStore = await cookies();
    cookieStore.delete(NEWSLETTER_COOKIE_NAME);

    return { success: true, data: undefined };
  } catch (error) {
    console.error("Error unsubscribing by token:", error);
    return { success: false, error: "server_error" };
  }
}

export async function unsubscribeFromNewsletter(): Promise<
  NewsletterActionResult<void>
> {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get(NEWSLETTER_COOKIE_NAME)?.value;

    if (!token) {
      return { success: false, error: "No subscription found" };
    }

    await connectDB();
    const subscriber = await NewsletterSubscribers.findOne({ token });

    if (!subscriber) {
      return { success: false, error: "Subscriber not found" };
    }

    if (subscriber.unsubscribedAt !== null) {
      return { success: false, error: "Already unsubscribed" };
    }

    subscriber.unsubscribedAt = new Date();
    await subscriber.save();

    cookieStore.delete(NEWSLETTER_COOKIE_NAME);

    revalidatePath("/[locale]/(main)/newsletter", "page");

    return { success: true, data: undefined };
  } catch (error) {
    console.error("Error unsubscribing from newsletter:", error);
    return { success: false, error: "Failed to unsubscribe" };
  }
}
