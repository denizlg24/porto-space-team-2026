import mongoose from "mongoose";

export interface INewsletterSubscriber extends mongoose.Document {
  email: string;
  name: string;
  dateOfBirth: Date;
  token: string;
  subscribedAt: Date;
  unsubscribedAt: Date | null;
  createdAt: Date;
  updatedAt: Date;
}

const newsletterSubscriberSchema = new mongoose.Schema<INewsletterSubscriber>(
  {
    email: { type: String, required: true, unique: true, lowercase: true },
    name: { type: String, required: true },
    dateOfBirth: { type: Date, required: true },
    token: { type: String, required: true, unique: true },
    subscribedAt: { type: Date, required: true, default: Date.now },
    unsubscribedAt: { type: Date, default: null },
  },
  { timestamps: true }
);

const NewsletterSubscribers: mongoose.Model<INewsletterSubscriber> =
  mongoose.models.newsletter_subscriber ||
  mongoose.model<INewsletterSubscriber>(
    "newsletter_subscriber",
    newsletterSubscriberSchema
  );

export { NewsletterSubscribers };
