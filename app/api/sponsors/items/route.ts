import { adminRoute, success, createErrors } from "@/lib/api";
import type { RouteDefinition } from "@/lib/api-client";
import { connectDB } from "@/lib/db";
import { Sponsors } from "@/models/Sponsor";
import { SponsorCategories } from "@/models/SponsorCategory";
import type { SponsorItem } from "@/lib/actions/sponsors";

const errors = createErrors({
  INVALID_INPUT: { status: 400, message: "Invalid input data" },
  SPONSOR_NOT_FOUND: { status: 404, message: "Sponsor not found" },
  CATEGORY_NOT_FOUND: { status: 404, message: "Category not found" },
});

export type CreateSponsorInput = {
  name: string;
  categoryId: string;
  link: string;
  imageUrl: string;
  description?: string;
};

export type UpdateSponsorInput = {
  id: string;
  name?: string;
  categoryId?: string;
  link?: string;
  imageUrl?: string;
  description?: string;
};

export type ReorderSponsorsInput = {
  categoryId: string;
  sponsorIds: string[];
};

export type SponsorErrors = keyof typeof errors.schema;

export type CreateSponsorRoute = RouteDefinition<SponsorItem, SponsorErrors, CreateSponsorInput>;
export type UpdateSponsorRoute = RouteDefinition<SponsorItem, SponsorErrors, UpdateSponsorInput>;
export type ReorderSponsorsRoute = RouteDefinition<{ success: boolean }, SponsorErrors, ReorderSponsorsInput>;
export type DeleteSponsorRoute = RouteDefinition<{ success: boolean }, SponsorErrors, { id: string }>;

function transformSponsor(doc: InstanceType<typeof Sponsors>): SponsorItem {
  return {
    id: doc._id.toString(),
    name: doc.name,
    categoryId: doc.categoryId.toString(),
    link: doc.link,
    imageUrl: doc.imageUrl,
    description: doc.description,
    order: doc.order,
    createdAt: doc.createdAt,
    updatedAt: doc.updatedAt,
  };
}

export const POST = adminRoute(async ({ request }) => {
  const body = await request.json() as CreateSponsorInput;

  if (!body.name || !body.categoryId || !body.link || !body.imageUrl) {
    errors.throw("INVALID_INPUT", { message: "Name, categoryId, link, and imageUrl are required" });
  }

  await connectDB();

  const category = await SponsorCategories.findById(body.categoryId);
  if (!category) {
    errors.throw("CATEGORY_NOT_FOUND");
  }

  const maxOrder = await Sponsors.findOne({ categoryId: body.categoryId }).sort({ order: -1 });
  const order = (maxOrder?.order ?? -1) + 1;

  const sponsor = await Sponsors.create({
    name: body.name,
    categoryId: body.categoryId,
    link: body.link,
    imageUrl: body.imageUrl,
    description: body.description ?? "",
    order,
  });

  return success<SponsorItem>(transformSponsor(sponsor), 201);
});

export const PUT = adminRoute(async ({ request }) => {
  const body = await request.json() as UpdateSponsorInput;

  if (!body.id) {
    errors.throw("INVALID_INPUT", { message: "Sponsor ID is required" });
  }

  await connectDB();

  if (body.categoryId) {
    const category = await SponsorCategories.findById(body.categoryId);
    if (!category) {
      errors.throw("CATEGORY_NOT_FOUND");
    }
  }

  const updateData: Record<string, unknown> = {};
  if (body.name) updateData.name = body.name;
  if (body.categoryId) updateData.categoryId = body.categoryId;
  if (body.link) updateData.link = body.link;
  if (body.imageUrl) updateData.imageUrl = body.imageUrl;
  if (body.description !== undefined) updateData.description = body.description;

  const sponsor = await Sponsors.findByIdAndUpdate(
    body.id,
    { $set: updateData },
    { new: true }
  );

  if (!sponsor) {
    return errors.create("SPONSOR_NOT_FOUND").toResponse();
  }

  return success<SponsorItem>(transformSponsor(sponsor));
});

export const PATCH = adminRoute(async ({ request }) => {
  const body = await request.json() as ReorderSponsorsInput;

  if (!body.categoryId || !body.sponsorIds || !Array.isArray(body.sponsorIds)) {
    errors.throw("INVALID_INPUT", { message: "categoryId and sponsorIds array are required" });
  }

  await connectDB();

  const bulkOps = body.sponsorIds.map((id, index) => ({
    updateOne: {
      filter: { _id: id, categoryId: body.categoryId },
      update: { $set: { order: index } },
    },
  }));

  await Sponsors.bulkWrite(bulkOps);

  return success({ success: true });
});

export const DELETE = adminRoute(async ({ request }) => {
  const body = await request.json() as { id: string };

  if (!body.id) {
    errors.throw("INVALID_INPUT", { message: "Sponsor ID is required" });
  }

  await connectDB();

  const result = await Sponsors.findByIdAndDelete(body.id);
  if (!result) {
    errors.throw("SPONSOR_NOT_FOUND");
  }

  return success({ success: true });
});
