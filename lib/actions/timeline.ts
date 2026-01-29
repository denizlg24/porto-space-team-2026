"use server";

import { connectDB } from "@/lib/db";
import {
  TimelineItems,
  type ITimelineItem,
  type LocalizedString,
} from "@/models/TimelineItem";
import { getAdminSession, type ActionResult } from "./users";
import { revalidatePath } from "next/cache";

export type TimelineItemData = {
  id: string;
  year: number;
  title: LocalizedString;
  subtitle: LocalizedString;
  imageUrls: string[];
  order: number;
  createdAt: string;
  updatedAt: string;
};

function transformTimelineItem(doc: ITimelineItem): TimelineItemData {
  return {
    id: doc._id.toString(),
    year: doc.year,
    title: { en: doc.title.en, pt: doc.title.pt },
    subtitle: { en: doc.subtitle.en, pt: doc.subtitle.pt },
    imageUrls: [...doc.imageUrls],
    order: doc.order,
    createdAt: doc.createdAt.toISOString(),
    updatedAt: doc.updatedAt.toISOString(),
  };
}

function revalidateTimeline() {
  revalidatePath('/[locale]/(main)/about', 'page')
}

export async function getTimelineItems(): Promise<
  ActionResult<TimelineItemData[]>
> {
  const session = await getAdminSession();
  if (!session) {
    return { success: false, error: "Unauthorized" };
  }

  try {
    await connectDB();
    const items = await TimelineItems.find().sort({ order: 1 });
    return { success: true, data: items.map(transformTimelineItem) };
  } catch (error) {
    console.error("Error fetching timeline items:", error);
    return { success: false, error: "Failed to fetch timeline items" };
  }
}

export async function getPublicTimelineItems(): Promise<TimelineItemData[]> {
  try {
    await connectDB();
    const items = await TimelineItems.find().sort({ order: 1 });
    return items.map(transformTimelineItem);
  } catch (error) {
    console.error("Error fetching public timeline items:", error);
    return [];
  }
}

export async function createTimelineItem(data: {
  year: number;
  title: LocalizedString;
  subtitle: LocalizedString;
  imageUrls: string[];
}): Promise<ActionResult<TimelineItemData>> {
  const session = await getAdminSession();
  if (!session) {
    return { success: false, error: "Unauthorized" };
  }

  try {
    await connectDB();
    const maxOrder = await TimelineItems.findOne().sort({ order: -1 });
    const order = (maxOrder?.order ?? -1) + 1;

    const item = await TimelineItems.create({
      ...data,
      order,
    });

    revalidateTimeline();
    return { success: true, data: transformTimelineItem(item) };
  } catch (error) {
    console.error("Error creating timeline item:", error);
    return { success: false, error: "Failed to create timeline item" };
  }
}

export async function updateTimelineItem(
  itemId: string,
  data: {
    year?: number;
    title?: LocalizedString;
    subtitle?: LocalizedString;
    imageUrls?: string[];
  }
): Promise<ActionResult<TimelineItemData>> {
  const session = await getAdminSession();
  if (!session) {
    return { success: false, error: "Unauthorized" };
  }

  try {
    await connectDB();
    const item = await TimelineItems.findByIdAndUpdate(
      itemId,
      { $set: data },
      { new: true }
    );

    if (!item) {
      return { success: false, error: "Timeline item not found" };
    }

    revalidateTimeline();
    return { success: true, data: transformTimelineItem(item) };
  } catch (error) {
    console.error("Error updating timeline item:", error);
    return { success: false, error: "Failed to update timeline item" };
  }
}

export async function deleteTimelineItem(
  itemId: string
): Promise<ActionResult> {
  const session = await getAdminSession();
  if (!session) {
    return { success: false, error: "Unauthorized" };
  }

  try {
    await connectDB();
    const result = await TimelineItems.findByIdAndDelete(itemId);

    if (!result) {
      return { success: false, error: "Timeline item not found" };
    }

    revalidateTimeline();
    return { success: true, data: undefined };
  } catch (error) {
    console.error("Error deleting timeline item:", error);
    return { success: false, error: "Failed to delete timeline item" };
  }
}

export async function reorderTimelineItems(
  itemIds: string[]
): Promise<ActionResult> {
  const session = await getAdminSession();
  if (!session) {
    return { success: false, error: "Unauthorized" };
  }

  try {
    await connectDB();

    const bulkOps = itemIds.map((id, index) => ({
      updateOne: {
        filter: { _id: id },
        update: { $set: { order: index } },
      },
    }));

    await TimelineItems.bulkWrite(bulkOps);

    revalidateTimeline();
    return { success: true, data: undefined };
  } catch (error) {
    console.error("Error reordering timeline items:", error);
    return { success: false, error: "Failed to reorder timeline items" };
  }
}
