"use server";

import { connectDB } from "@/lib/db";
import { SponsorCategories, type ISponsorCategory } from "@/models/SponsorCategory";
import { Sponsors, type ISponsor } from "@/models/Sponsor";
import { getAdminSession, type ActionResult } from "./users";
import { revalidatePath, revalidateTag } from "next/cache";

export type CategoryTitleStyle = {
  fontSize: string;
  fontWeight: string;
  colorLight: string;
  colorDark: string;
};

export type SponsorCategoryItem = {
  id: string;
  name: string;
  order: number;
  titleStyle: CategoryTitleStyle;
  createdAt: Date;
  updatedAt: Date;
};

export type SponsorItem = {
  id: string;
  name: string;
  categoryId: string;
  link: string;
  imageUrl: string;
  description: string;
  order: number;
  createdAt: Date;
  updatedAt: Date;
};

function transformCategory(doc: ISponsorCategory): SponsorCategoryItem {
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

function transformSponsor(doc: ISponsor): SponsorItem {
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

function revalidateSponsors() {
  revalidatePath("/admin/sponsors", "page");
  revalidatePath("/en/admin/sponsors", "page");
  revalidatePath("/pt/admin/sponsors", "page");
  revalidatePath("/sponsors", "page");
  revalidatePath("/en/sponsors", "page");
  revalidatePath("/pt/sponsors", "page");
  revalidateTag("sponsors-page-en", "default");
  revalidateTag("sponsors-page-pt", "default");
}

export async function getCategories(): Promise<ActionResult<SponsorCategoryItem[]>> {
  const session = await getAdminSession();
  if (!session) {
    return { success: false, error: "Unauthorized" };
  }

  try {
    await connectDB();
    const categories = await SponsorCategories.find().sort({ order: 1 });
    return { success: true, data: categories.map(transformCategory) };
  } catch (error) {
    console.error("Error fetching categories:", error);
    return { success: false, error: "Failed to fetch categories" };
  }
}

export async function createCategory(data: {
  name: string;
  titleStyle?: CategoryTitleStyle;
}): Promise<ActionResult<SponsorCategoryItem>> {
  const session = await getAdminSession();
  if (!session) {
    return { success: false, error: "Unauthorized" };
  }

  try {
    await connectDB();
    const maxOrder = await SponsorCategories.findOne().sort({ order: -1 });
    const order = (maxOrder?.order ?? -1) + 1;

    const category = await SponsorCategories.create({
      name: data.name,
      order,
      titleStyle: data.titleStyle ?? {
        fontSize: "2rem",
        fontWeight: "700",
        colorLight: "#0a0a0a",
        colorDark: "#fafafa",
      },
    });

    revalidateSponsors();
    return { success: true, data: transformCategory(category) };
  } catch (error) {
    console.error("Error creating category:", error);
    return { success: false, error: "Failed to create category" };
  }
}

export async function updateCategory(
  categoryId: string,
  data: {
    name?: string;
    titleStyle?: CategoryTitleStyle;
  }
): Promise<ActionResult<SponsorCategoryItem>> {
  const session = await getAdminSession();
  if (!session) {
    return { success: false, error: "Unauthorized" };
  }

  try {
    await connectDB();
    const category = await SponsorCategories.findByIdAndUpdate(
      categoryId,
      { $set: data },
      { new: true }
    );

    if (!category) {
      return { success: false, error: "Category not found" };
    }

    revalidateSponsors();
    return { success: true, data: transformCategory(category) };
  } catch (error) {
    console.error("Error updating category:", error);
    return { success: false, error: "Failed to update category" };
  }
}

export async function deleteCategory(categoryId: string): Promise<ActionResult> {
  const session = await getAdminSession();
  if (!session) {
    return { success: false, error: "Unauthorized" };
  }

  try {
    await connectDB();

    const sponsorsCount = await Sponsors.countDocuments({ categoryId });
    if (sponsorsCount > 0) {
      return { success: false, error: "Cannot delete category with sponsors" };
    }

    const result = await SponsorCategories.findByIdAndDelete(categoryId);
    if (!result) {
      return { success: false, error: "Category not found" };
    }

    revalidateSponsors();
    return { success: true, data: undefined };
  } catch (error) {
    console.error("Error deleting category:", error);
    return { success: false, error: "Failed to delete category" };
  }
}

export async function reorderCategories(
  categoryIds: string[]
): Promise<ActionResult> {
  const session = await getAdminSession();
  if (!session) {
    return { success: false, error: "Unauthorized" };
  }

  try {
    await connectDB();

    const bulkOps = categoryIds.map((id, index) => ({
      updateOne: {
        filter: { _id: id },
        update: { $set: { order: index } },
      },
    }));

    await SponsorCategories.bulkWrite(bulkOps);

    revalidateSponsors();
    return { success: true, data: undefined };
  } catch (error) {
    console.error("Error reordering categories:", error);
    return { success: false, error: "Failed to reorder categories" };
  }
}

export async function getSponsors(): Promise<ActionResult<SponsorItem[]>> {
  const session = await getAdminSession();
  if (!session) {
    return { success: false, error: "Unauthorized" };
  }

  try {
    await connectDB();
    const sponsors = await Sponsors.find().sort({ categoryId: 1, order: 1 });
    return { success: true, data: sponsors.map(transformSponsor) };
  } catch (error) {
    console.error("Error fetching sponsors:", error);
    return { success: false, error: "Failed to fetch sponsors" };
  }
}

export async function createSponsor(data: {
  name: string;
  categoryId: string;
  link: string;
  imageUrl: string;
  description?: string;
}): Promise<ActionResult<SponsorItem>> {
  const session = await getAdminSession();
  if (!session) {
    return { success: false, error: "Unauthorized" };
  }

  try {
    await connectDB();

    const category = await SponsorCategories.findById(data.categoryId);
    if (!category) {
      return { success: false, error: "Category not found" };
    }

    const maxOrder = await Sponsors.findOne({ categoryId: data.categoryId }).sort({
      order: -1,
    });
    const order = (maxOrder?.order ?? -1) + 1;

    const sponsor = await Sponsors.create({
      name: data.name,
      categoryId: data.categoryId,
      link: data.link,
      imageUrl: data.imageUrl,
      description: data.description ?? "",
      order,
    });

    revalidateSponsors();
    return { success: true, data: transformSponsor(sponsor) };
  } catch (error) {
    console.error("Error creating sponsor:", error);
    return { success: false, error: "Failed to create sponsor" };
  }
}

export async function updateSponsor(
  sponsorId: string,
  data: {
    name?: string;
    categoryId?: string;
    link?: string;
    imageUrl?: string;
    description?: string;
  }
): Promise<ActionResult<SponsorItem>> {
  const session = await getAdminSession();
  if (!session) {
    return { success: false, error: "Unauthorized" };
  }

  try {
    await connectDB();

    if (data.categoryId) {
      const category = await SponsorCategories.findById(data.categoryId);
      if (!category) {
        return { success: false, error: "Category not found" };
      }
    }

    const sponsor = await Sponsors.findByIdAndUpdate(
      sponsorId,
      { $set: data },
      { new: true }
    );

    if (!sponsor) {
      return { success: false, error: "Sponsor not found" };
    }

    revalidateSponsors();
    return { success: true, data: transformSponsor(sponsor) };
  } catch (error) {
    console.error("Error updating sponsor:", error);
    return { success: false, error: "Failed to update sponsor" };
  }
}

export async function deleteSponsor(sponsorId: string): Promise<ActionResult> {
  const session = await getAdminSession();
  if (!session) {
    return { success: false, error: "Unauthorized" };
  }

  try {
    await connectDB();
    const result = await Sponsors.findByIdAndDelete(sponsorId);

    if (!result) {
      return { success: false, error: "Sponsor not found" };
    }

    revalidateSponsors();
    return { success: true, data: undefined };
  } catch (error) {
    console.error("Error deleting sponsor:", error);
    return { success: false, error: "Failed to delete sponsor" };
  }
}

export async function reorderSponsors(
  categoryId: string,
  sponsorIds: string[]
): Promise<ActionResult> {
  const session = await getAdminSession();
  if (!session) {
    return { success: false, error: "Unauthorized" };
  }

  try {
    await connectDB();

    const bulkOps = sponsorIds.map((id, index) => ({
      updateOne: {
        filter: { _id: id, categoryId },
        update: { $set: { order: index } },
      },
    }));

    await Sponsors.bulkWrite(bulkOps);

    revalidateSponsors();
    return { success: true, data: undefined };
  } catch (error) {
    console.error("Error reordering sponsors:", error);
    return { success: false, error: "Failed to reorder sponsors" };
  }
}

export type PublicSponsorData = {
  categories: SponsorCategoryItem[];
  sponsors: SponsorItem[];
};

export async function getPublicSponsorsData(): Promise<PublicSponsorData> {
  await connectDB();

  const [categories, sponsors] = await Promise.all([
    SponsorCategories.find().sort({ order: 1 }),
    Sponsors.find().sort({ categoryId: 1, order: 1 }),
  ]);

  return {
    categories: categories.map(transformCategory),
    sponsors: sponsors.map(transformSponsor),
  };
}
