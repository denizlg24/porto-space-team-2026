import { publicRoute, adminRoute, success, createErrors, assertExists } from "@/lib/api";
import type { RouteDefinition } from "@/lib/api-client";
import { connectDB } from "@/lib/db";
import { Contacts, type ContactSubject, type ContactStatus } from "@/models/Contact";
import { revalidatePath } from "next/cache";
import crypto from "crypto";
import { Resend } from "resend";
import { env } from "@/lib/env";
import {
  getContactConfirmationEmailTemplate,
  getContactNotificationEmailTemplate,
} from "@/lib/email-templates";

const resend = new Resend(env.RESEND_API_KEY);

const SUBJECT_LABELS: Record<ContactSubject, string> = {
  sponsorship: "Sponsorship Inquiry",
  partnership: "Academic Collaboration",
  media: "Media & Press",
  other: "Other",
};

const errors = createErrors({
  INVALID_INPUT: { status: 400, message: "Invalid input data" },
  INVALID_EMAIL: { status: 400, message: "Invalid email address" },
  INVALID_SUBJECT: { status: 400, message: "Invalid subject" },
  MESSAGE_TOO_SHORT: { status: 400, message: "Message must be at least 10 characters" },
  MESSAGE_TOO_LONG: { status: 400, message: "Message must be at most 5000 characters" },
  EMAIL_FAILED: { status: 500, message: "Failed to send confirmation email" },
  NOT_FOUND: { status: 404, message: "Contact not found" },
});

function generateTicketId(): string {
  const timestamp = Date.now().toString(36).toUpperCase();
  const random = crypto.randomBytes(4).toString("hex").toUpperCase();
  return `PST-${timestamp}-${random}`;
}

export type ContactData = {
  id: string;
  ticketId: string;
  email: string;
  name: string;
  subject: ContactSubject;
  message: string;
  status: ContactStatus;
  createdAt: string;
};

export type ContactInput = {
  email: string;
  name: string;
  subject: ContactSubject;
  message: string;
};

export type ContactErrors = keyof typeof errors.schema;

export type SubmitContactRoute = RouteDefinition<
  ContactData,
  ContactErrors,
  ContactInput
>;

export type GetContactsRoute = RouteDefinition<
  ContactData[],
  never,
  undefined
>;

export type UpdateContactRoute = RouteDefinition<
  ContactData,
  ContactErrors,
  { id: string; status: ContactStatus }
>;

export const GET = adminRoute(async () => {
  await connectDB();
  const contacts = await Contacts.find().sort({ createdAt: -1 });

  const data: ContactData[] = contacts.map((contact) => ({
    id: contact._id.toString(),
    ticketId: contact.ticketId,
    email: contact.email,
    name: contact.name,
    subject: contact.subject,
    message: contact.message,
    status: contact.status,
    createdAt: contact.createdAt.toISOString(),
  }));

  return success(data);
});

export const POST = publicRoute(async ({ request }) => {
  const body = (await request.json()) as ContactInput;

  const email = body.email?.toLowerCase().trim();
  const name = body.name?.trim();
  const subject = body.subject;
  const message = body.message?.trim();

  if (!email || !name || !subject || !message) {
    errors.throw("INVALID_INPUT", { message: "All fields are required" });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    errors.throw("INVALID_EMAIL");
  }

  const validSubjects: ContactSubject[] = ["sponsorship", "partnership", "media", "other"];
  if (!validSubjects.includes(subject)) {
    errors.throw("INVALID_SUBJECT");
  }

  if (message.length < 10) {
    errors.throw("MESSAGE_TOO_SHORT");
  }

  if (message.length > 5000) {
    errors.throw("MESSAGE_TOO_LONG");
  }

  await connectDB();

  const ticketId = generateTicketId();

  const contact = await Contacts.create({
    ticketId,
    email,
    name,
    subject,
    message,
    status: "new",
  });

  const subjectLabel = SUBJECT_LABELS[subject];

  try {
    await Promise.all([
      resend.emails.send({
        from: env.EMAIL_FROM,
        to: email,
        subject: `[${ticketId}] We received your message - Porto Space Team`,
        html: getContactConfirmationEmailTemplate({
          name,
          ticketId,
          subject: subjectLabel,
          message,
        }),
      }),
      resend.emails.send({
        from: env.EMAIL_FROM,
        to: env.EMAIL_FROM.split("<")[1].split(">")[0],
        subject: `[${ticketId}] New Contact: ${subjectLabel} from ${name}`,
        html: getContactNotificationEmailTemplate({
          ticketId,
          name,
          email,
          subject: subjectLabel,
          message,
          adminUrl: `${env.BETTER_AUTH_URL}/en/admin/contacts`,
        }),
      }),
    ]);
  } catch (emailError) {
    console.error("Failed to send contact emails:", emailError);
  }

  revalidatePath("/[locale]/admin/contacts", "page");

  const data: ContactData = {
    id: contact._id.toString(),
    ticketId: contact.ticketId,
    email: contact.email,
    name: contact.name,
    subject: contact.subject,
    message: contact.message,
    status: contact.status,
    createdAt: contact.createdAt.toISOString(),
  };

  return success(data);
});

export const PATCH = adminRoute(async ({ request }) => {
  const body = (await request.json()) as { id: string; status: ContactStatus };

  if (!body.id || !body.status) {
    errors.throw("INVALID_INPUT");
  }

  await connectDB();

  const contact = await Contacts.findByIdAndUpdate(
    body.id,
    { status: body.status },
    { new: true }
  );

  if (!contact) {
    errors.throw("NOT_FOUND");
  }

  assertExists(contact);

  revalidatePath("/[locale]/admin/contacts", "page");

  const data: ContactData = {
    id: contact._id.toString(),
    ticketId: contact.ticketId,
    email: contact.email,
    name: contact.name,
    subject: contact.subject,
    message: contact.message,
    status: contact.status,
    createdAt: contact.createdAt.toISOString(),
  };

  return success(data);
});
