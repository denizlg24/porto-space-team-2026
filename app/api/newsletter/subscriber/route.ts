import { publicRoute, success, createErrors } from "@/lib/api";
import type { RouteDefinition } from "@/lib/api-client";
import { connectDB } from "@/lib/db";
import { NewsletterSubscribers } from "@/models/NewsletterSubscriber";
import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";
import crypto from "crypto";

const NEWSLETTER_COOKIE_NAME = "newsletter_subscriber_token";
const COOKIE_MAX_AGE = 60 * 60 * 24 * 365 * 5; // 5 years

const errors = createErrors({
  INVALID_INPUT: { status: 400, message: "Invalid input data" },
  INVALID_EMAIL: { status: 400, message: "Invalid email address" },
  NOT_FOUND: { status: 404, message: "No subscription found" },
  ALREADY_UNSUBSCRIBED: { status: 400, message: "Already unsubscribed" },
});

function generateToken(): string {
  return crypto.randomBytes(32).toString("hex");
}

export type SubscriberData = {
  id: string;
  email: string;
  name: string;
  dateOfBirth: string;
  isSubscribed: boolean;
};

export type SubscribeInput = {
  email: string;
  name: string;
  dateOfBirth: string;
};

export type NewsletterErrors = keyof typeof errors.schema;

export type GetSubscriberRoute = RouteDefinition<
  SubscriberData | null,
  never,
  undefined
>;

export type SubscribeRoute = RouteDefinition<
  SubscriberData,
  NewsletterErrors,
  SubscribeInput
>;

export type UnsubscribeRoute = RouteDefinition<
  { success: boolean },
  NewsletterErrors,
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

export const POST = publicRoute(async ({ request }) => {
  try {
    const body = (await request.json()) as SubscribeInput;

    const email = body.email?.toLowerCase().trim();
    const name = body.name?.trim();
    const dateOfBirthStr = body.dateOfBirth;

    if (!email || !name || !dateOfBirthStr) {
      errors.throw("INVALID_INPUT", {
        message: "All fields are required",
      });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      errors.throw("INVALID_EMAIL");
    }

    const dateOfBirth = new Date(dateOfBirthStr);

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

      const data: SubscriberData = {
        id: existingSubscriber._id.toString(),
        email: existingSubscriber.email,
        name: existingSubscriber.name,
        dateOfBirth: existingSubscriber.dateOfBirth.toISOString().split("T")[0],
        isSubscribed: true,
      };

      return success(data);
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

    const data: SubscriberData = {
      id: subscriber._id.toString(),
      email: subscriber.email,
      name: subscriber.name,
      dateOfBirth: subscriber.dateOfBirth.toISOString().split("T")[0],
      isSubscribed: true,
    };

    return success(data);
  } catch (error) {
    console.error("Error subscribing to newsletter:", error);
    throw error;
  }
});

export const DELETE = publicRoute(async () => {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get(NEWSLETTER_COOKIE_NAME)?.value;

    if (!token) {
      errors.throw("NOT_FOUND", { message: "No subscription found" });
    }

    await connectDB();
    const subscriber = await NewsletterSubscribers.findOne({ token });

    if (!subscriber) {
      errors.throw("NOT_FOUND", { message: "Subscriber not found" });
    }

    // Non-null assertion: errors.throw never returns, so subscriber is guaranteed non-null here
    if (subscriber!.unsubscribedAt !== null) {
      errors.throw("ALREADY_UNSUBSCRIBED");
    }

    subscriber!.unsubscribedAt = new Date();
    await subscriber!.save();

    cookieStore.delete(NEWSLETTER_COOKIE_NAME);

    revalidatePath("/[locale]/(main)/newsletter", "page");

    return success({ success: true });
  } catch (error) {
    console.error("Error unsubscribing from newsletter:", error);
    throw error;
  }
});
