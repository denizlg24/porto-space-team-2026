"use server";

import { connectDB } from "@/lib/db";
import { Newsletters, type LocalizedString } from "@/models/Newsletter";
import { NewsletterSubscribers } from "@/models/NewsletterSubscriber";
import { getAdminSession, type ActionResult } from "./users";
import { revalidatePath } from "next/cache";
import { Resend } from "resend";
import { env } from "@/lib/env";
import { getNewsletterEmailTemplate } from "@/lib/email-templates";

const resend = new Resend(env.RESEND_API_KEY);

export type NewsletterData = {
  id: string;
  title: LocalizedString;
  pdfUrl: string;
  pdfFileName: string;
  sentAt: string | null;
  sentCount: number;
  createdAt: string;
};

function transformNewsletter(doc: {
  _id: unknown;
  title: LocalizedString;
  pdfUrl: string;
  pdfFileName: string;
  sentAt: Date | null;
  sentCount: number;
  createdAt: Date;
}): NewsletterData {
  return {
    id: String(doc._id),
    title: { en: doc.title.en, pt: doc.title.pt },
    pdfUrl: doc.pdfUrl,
    pdfFileName: doc.pdfFileName,
    sentAt: doc.sentAt?.toISOString() ?? null,
    sentCount: doc.sentCount,
    createdAt: doc.createdAt.toISOString(),
  };
}

export async function getNewsletters(): Promise<
  ActionResult<NewsletterData[]>
> {
  const session = await getAdminSession();
  if (!session) {
    return { success: false, error: "Unauthorized" };
  }

  try {
    await connectDB();
    const newsletters = await Newsletters.find().sort({ createdAt: -1 });
    return { success: true, data: newsletters.map(transformNewsletter) };
  } catch (error) {
    console.error("Error fetching newsletters:", error);
    return { success: false, error: "Failed to fetch newsletters" };
  }
}

export async function getPublicNewsletters(
  limit?: number,
): Promise<NewsletterData[]> {
  try {
    await connectDB();
    const query = Newsletters.find().sort({ createdAt: -1 });
    if (limit) {
      query.limit(limit);
    }
    const newsletters = await query;
    return newsletters.map(transformNewsletter);
  } catch (error) {
    console.error("Error fetching public newsletters:", error);
    return [];
  }
}

export async function createNewsletter(data: {
  title: LocalizedString;
  pdfUrl: string;
  pdfFileName: string;
}): Promise<ActionResult<NewsletterData>> {
  const session = await getAdminSession();
  if (!session) {
    return { success: false, error: "Unauthorized" };
  }

  try {
    await connectDB();
    const newsletter = await Newsletters.create({
      title: data.title,
      pdfUrl: data.pdfUrl,
      pdfFileName: data.pdfFileName,
    });

    revalidatePath("/[locale]/(main)/newsletter", "page");
    revalidatePath("/[locale]/(main)/newsletter/archive", "page");

    return { success: true, data: transformNewsletter(newsletter) };
  } catch (error) {
    console.error("Error creating newsletter:", error);
    return { success: false, error: "Failed to create newsletter" };
  }
}

export async function deleteNewsletter(
  newsletterId: string,
): Promise<ActionResult<void>> {
  const session = await getAdminSession();
  if (!session) {
    return { success: false, error: "Unauthorized" };
  }

  try {
    await connectDB();
    const result = await Newsletters.findByIdAndDelete(newsletterId);

    if (!result) {
      return { success: false, error: "Newsletter not found" };
    }

    revalidatePath("/[locale]/(main)/newsletter", "page");
    revalidatePath("/[locale]/(main)/newsletter/archive", "page");
    return { success: true, data: undefined };
  } catch (error) {
    console.error("Error deleting newsletter:", error);
    return { success: false, error: "Failed to delete newsletter" };
  }
}

export async function sendNewsletter(
  newsletterId: string,
  emailContent: string,
): Promise<ActionResult<{ sentCount: number }>> {
  const session = await getAdminSession();
  if (!session) {
    return { success: false, error: "Unauthorized" };
  }

  try {
    await connectDB();

    const newsletter = await Newsletters.findById(newsletterId);
    if (!newsletter) {
      return { success: false, error: "Newsletter not found" };
    }

    const subscribers = await NewsletterSubscribers.find({
      unsubscribedAt: null,
    });

    if (subscribers.length === 0) {
      return { success: false, error: "No active subscribers" };
    }

    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || env.BETTER_AUTH_URL;
    let sentCount = 0;

    for (const subscriber of subscribers) {
      const unsubscribeUrl = `${baseUrl}/en/newsletter/unsubscribe?token=${subscriber.token}`;

      try {
        await resend.emails.send({
          from: env.EMAIL_FROM,
          to: subscriber.email,
          subject: newsletter.title.en,
          html: getNewsletterEmailTemplate({
            name: subscriber.name,
            title: newsletter.title.en,
            content: emailContent,
            newsletterUrl: newsletter.pdfUrl,
            unsubscribeUrl,
          }),
        });
        sentCount++;
      } catch (emailError) {
        console.error(`Failed to send to ${subscriber.email}:`, emailError);
      }
    }

    newsletter.sentAt = new Date();
    newsletter.sentCount = sentCount;
    await newsletter.save();

    return { success: true, data: { sentCount } };
  } catch (error) {
    console.error("Error sending newsletter:", error);
    return { success: false, error: "Failed to send newsletter" };
  }
}
