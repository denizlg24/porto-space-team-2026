import { adminRoute, success, createErrors } from "@/lib/api";
import type { RouteDefinition } from "@/lib/api-client";
import { connectDB } from "@/lib/db";
import { SponsorCategories } from "@/models/SponsorCategory";
import { Sponsors } from "@/models/Sponsor";
import type { SponsorCategoryItem, CategoryTitleStyle } from "@/lib/actions/sponsors";

const errors = createErrors({
  INVALID_INPUT: { status: 400, message: "Invalid input data" },
  CATEGORY_NOT_FOUND: { status: 404, message: "Category not found" },
  CATEGORY_HAS_SPONSORS: { status: 400, message: "Cannot delete category with sponsors" },
});

export type CreateCategoryInput = {
  name: string;
  titleStyle?: CategoryTitleStyle;
};

export type UpdateCategoryInput = {
  id: string;
  name?: string;
  titleStyle?: CategoryTitleStyle;
};

export type ReorderCategoriesInput = {
  categoryIds: string[];
};

export type CategoryErrors = keyof typeof errors.schema;

export type CreateCategoryRoute = RouteDefinition<SponsorCategoryItem, CategoryErrors, CreateCategoryInput>;
export type UpdateCategoryRoute = RouteDefinition<SponsorCategoryItem, CategoryErrors, UpdateCategoryInput>;
export type ReorderCategoriesRoute = RouteDefinition<{ success: boolean }, CategoryErrors, ReorderCategoriesInput>;
export type DeleteCategoryRoute = RouteDefinition<{ success: boolean }, CategoryErrors, { id: string }>;

function transformCategory(doc: InstanceType<typeof SponsorCategories>): SponsorCategoryItem {
  return {
    id: doc._id.toString(),
    name: doc.name,
    order: doc.order,
    titleStyle: {
      fontSize: doc.titleStyle.fontSize,
      fontWeight: doc.titleStyle.fontWeight,
      colorLight: doc.titleStyle.colorLight,
      colorDark: doc.titleStyle.colorDark,
    },
    createdAt: doc.createdAt,
    updatedAt: doc.updatedAt,
  };
}

export const POST = adminRoute(async ({ request }) => {
  const body = await request.json() as CreateCategoryInput;

  if (!body.name || typeof body.name !== "string") {
    errors.throw("INVALID_INPUT", { message: "Name is required" });
  }

  await connectDB();

  const maxOrder = await SponsorCategories.findOne().sort({ order: -1 });
  const order = (maxOrder?.order ?? -1) + 1;

  const category = await SponsorCategories.create({
    name: body.name,
    order,
    titleStyle: body.titleStyle ?? {
      fontSize: "2rem",
      fontWeight: "700",
      colorLight: "#0a0a0a",
      colorDark: "#fafafa",
    },
  });

  return success<SponsorCategoryItem>(transformCategory(category), 201);
});

export const PUT = adminRoute(async ({ request }) => {
  const body = await request.json() as UpdateCategoryInput;

  if (!body.id) {
    errors.throw("INVALID_INPUT", { message: "Category ID is required" });
  }

  await connectDB();

  const updateData: Partial<UpdateCategoryInput> = {};
  if (body.name) updateData.name = body.name;
  if (body.titleStyle) updateData.titleStyle = body.titleStyle;

  const category = await SponsorCategories.findByIdAndUpdate(
    body.id,
    { $set: updateData },
    { new: true }
  );

  if (!category) {
    return errors.create("CATEGORY_NOT_FOUND").toResponse();
  }

  return success<SponsorCategoryItem>(transformCategory(category));
});

export const PATCH = adminRoute(async ({ request }) => {
  const body = await request.json() as ReorderCategoriesInput;

  if (!body.categoryIds || !Array.isArray(body.categoryIds)) {
    errors.throw("INVALID_INPUT", { message: "categoryIds array is required" });
  }

  await connectDB();

  const bulkOps = body.categoryIds.map((id, index) => ({
    updateOne: {
      filter: { _id: id },
      update: { $set: { order: index } },
    },
  }));

  await SponsorCategories.bulkWrite(bulkOps);

  return success({ success: true });
});

export const DELETE = adminRoute(async ({ request }) => {
  const body = await request.json() as { id: string };

  if (!body.id) {
    errors.throw("INVALID_INPUT", { message: "Category ID is required" });
  }

  await connectDB();

  const sponsorsCount = await Sponsors.countDocuments({ categoryId: body.id });
  if (sponsorsCount > 0) {
    errors.throw("CATEGORY_HAS_SPONSORS");
  }

  const result = await SponsorCategories.findByIdAndDelete(body.id);
  if (!result) {
    errors.throw("CATEGORY_NOT_FOUND");
  }

  return success({ success: true });
});
