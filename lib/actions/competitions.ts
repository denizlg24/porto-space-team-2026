"use server";

import { connectDB } from "@/lib/db";
import {
  CompetitionSections,
  type ICompetitionSection,
  type SectionType,
  type SectionContent,
  type ContentBlock,
  type LocalizedString,
  type TextBlockData,
  type ImageBlockData,
  type ImageFrameBlockData,
  type CarouselBlockData,
  type CarouselImage,
  type ButtonBlockData,
  type ButtonGroupBlockData,
  type SpacerBlockData,
  type StatItem,
  type TimelineItem,
} from "@/models/CompetitionSection";
import { getAdminSession, type ActionResult } from "./users";
import { revalidatePath } from "next/cache";

export type CompetitionSectionData = {
  id: string;
  type: SectionType;
  content: SectionContent;
  order: number;
  visible: boolean;
  createdAt: string;
  updatedAt: string;
};

function transformLocalizedString(ls: LocalizedString): LocalizedString {
  return { en: ls.en, pt: ls.pt };
}

function transformTextBlockData(block: TextBlockData): TextBlockData {
  return {
    textType: block.textType,
    content: transformLocalizedString(block.content),
    color: block.color,
    size: block.size,
    align: block.align,
    bold: block.bold,
  };
}

function transformImageBlockData(block: ImageBlockData): ImageBlockData {
  return {
    url: block.url,
    alt: transformLocalizedString(block.alt),
    aspectRatio: block.aspectRatio,
    objectFit: block.objectFit,
    maxWidth: block.maxWidth,
    rounded: block.rounded,
  };
}

function transformImageFrameBlockData(block: ImageFrameBlockData): ImageFrameBlockData {
  return {
    url: block.url,
    alt: transformLocalizedString(block.alt),
    aspectRatio: block.aspectRatio,
    objectFit: block.objectFit,
    maxWidth: block.maxWidth,
  };
}

function transformButtonBlockData(block: ButtonBlockData): ButtonBlockData {
  return {
    text: transformLocalizedString(block.text),
    url: block.url,
    variant: block.variant,
    size: block.size,
    fullWidth: block.fullWidth,
    align: block.align,
  };
}

function transformButtonGroupBlockData(block: ButtonGroupBlockData): ButtonGroupBlockData {
  return {
    buttons: block.buttons?.map(transformButtonBlockData) ?? [],
    align: block.align,
  };
}

function transformSpacerBlockData(block: SpacerBlockData): SpacerBlockData {
  return {
    size: block.size,
  };
}

function transformCarouselImage(image: CarouselImage): CarouselImage {
  return {
    url: image.url,
    alt: transformLocalizedString(image.alt),
  };
}

function transformCarouselBlockData(block: CarouselBlockData): CarouselBlockData {
  return {
    images: block.images?.map(transformCarouselImage) ?? [],
    aspectRatio: block.aspectRatio,
    maxWidth: block.maxWidth,
  };
}

function transformContentBlock(block: ContentBlock): ContentBlock {
  return {
    blockType: block.blockType,
    text: block.text ? transformTextBlockData(block.text) : undefined,
    image: block.image ? transformImageBlockData(block.image) : undefined,
    imageFrame: block.imageFrame ? transformImageFrameBlockData(block.imageFrame) : undefined,
    carousel: block.carousel ? transformCarouselBlockData(block.carousel) : undefined,
    button: block.button ? transformButtonBlockData(block.button) : undefined,
    buttonGroup: block.buttonGroup ? transformButtonGroupBlockData(block.buttonGroup) : undefined,
    spacer: block.spacer ? transformSpacerBlockData(block.spacer) : undefined,
  };
}

function transformStatItem(item: StatItem): StatItem {
  return {
    value: item.value,
    label: transformLocalizedString(item.label),
  };
}

function transformTimelineItem(item: TimelineItem): TimelineItem {
  return {
    year: item.year,
    title: transformLocalizedString(item.title),
    description: transformLocalizedString(item.description),
  };
}

function transformContent(content: SectionContent): SectionContent {
  return {
    blocks: content.blocks?.map(transformContentBlock) ?? [],
    stats: content.stats?.map(transformStatItem) ?? [],
    timelineItems: content.timelineItems?.map(transformTimelineItem) ?? [],
    layout: content.layout,
    leftBlocks: content.leftBlocks?.map(transformContentBlock) ?? [],
    rightBlocks: content.rightBlocks?.map(transformContentBlock) ?? [],
    fullWidth: content.fullWidth,
    align: content.align,
  };
}

function transformSection(doc: ICompetitionSection): CompetitionSectionData {
  return {
    id: doc._id.toString(),
    type: doc.type,
    content: transformContent(doc.content),
    order: doc.order,
    visible: doc.visible,
    createdAt: doc.createdAt.toISOString(),
    updatedAt: doc.updatedAt.toISOString(),
  };
}

function revalidateCompetitions() {
  revalidatePath("/competitions", "page");
  revalidatePath("/en/competitions", "page");
  revalidatePath("/pt/competitions", "page");
  revalidatePath("/admin/competitions", "page");
  revalidatePath("/en/admin/competitions", "page");
  revalidatePath("/pt/admin/competitions", "page");
}

export async function getCompetitionSections(): Promise<
  ActionResult<CompetitionSectionData[]>
> {
  const session = await getAdminSession();
  if (!session) {
    return { success: false, error: "Unauthorized" };
  }

  try {
    await connectDB();
    const sections = await CompetitionSections.find().sort({ order: 1 });
    return { success: true, data: sections.map(transformSection) };
  } catch (error) {
    console.error("Error fetching competition sections:", error);
    return { success: false, error: "Failed to fetch sections" };
  }
}

export async function getPublicCompetitionSections(): Promise<
  CompetitionSectionData[]
> {
  try {
    await connectDB();
    const sections = await CompetitionSections.find({ visible: true }).sort({
      order: 1,
    });
    return sections.map(transformSection);
  } catch (error) {
    console.error("Error fetching public competition sections:", error);
    return [];
  }
}

export async function createCompetitionSection(data: {
  type: SectionType;
  content: SectionContent;
}): Promise<ActionResult<CompetitionSectionData>> {
  const session = await getAdminSession();
  if (!session) {
    return { success: false, error: "Unauthorized" };
  }

  try {
    await connectDB();
    const maxOrder = await CompetitionSections.findOne().sort({ order: -1 });
    const order = (maxOrder?.order ?? -1) + 1;

    const section = await CompetitionSections.create({
      type: data.type,
      content: data.content,
      order,
      visible: true,
    });

    revalidateCompetitions();
    return { success: true, data: transformSection(section) };
  } catch (error) {
    console.error("Error creating competition section:", error);
    return { success: false, error: "Failed to create section" };
  }
}

export async function updateCompetitionSection(
  sectionId: string,
  data: {
    type?: SectionType;
    content?: SectionContent;
    visible?: boolean;
  }
): Promise<ActionResult<CompetitionSectionData>> {
  const session = await getAdminSession();
  if (!session) {
    return { success: false, error: "Unauthorized" };
  }

  try {
    await connectDB();
    const section = await CompetitionSections.findByIdAndUpdate(
      sectionId,
      { $set: data },
      { new: true }
    );

    if (!section) {
      return { success: false, error: "Section not found" };
    }

    revalidateCompetitions();
    return { success: true, data: transformSection(section) };
  } catch (error) {
    console.error("Error updating competition section:", error);
    return { success: false, error: "Failed to update section" };
  }
}

export async function deleteCompetitionSection(
  sectionId: string
): Promise<ActionResult> {
  const session = await getAdminSession();
  if (!session) {
    return { success: false, error: "Unauthorized" };
  }

  try {
    await connectDB();
    const result = await CompetitionSections.findByIdAndDelete(sectionId);

    if (!result) {
      return { success: false, error: "Section not found" };
    }

    revalidateCompetitions();
    return { success: true, data: undefined };
  } catch (error) {
    console.error("Error deleting competition section:", error);
    return { success: false, error: "Failed to delete section" };
  }
}

export async function reorderCompetitionSections(
  sectionIds: string[]
): Promise<ActionResult> {
  const session = await getAdminSession();
  if (!session) {
    return { success: false, error: "Unauthorized" };
  }

  try {
    await connectDB();

    const bulkOps = sectionIds.map((id, index) => ({
      updateOne: {
        filter: { _id: id },
        update: { $set: { order: index } },
      },
    }));

    await CompetitionSections.bulkWrite(bulkOps);

    revalidateCompetitions();
    return { success: true, data: undefined };
  } catch (error) {
    console.error("Error reordering competition sections:", error);
    return { success: false, error: "Failed to reorder sections" };
  }
}

export async function toggleSectionVisibility(
  sectionId: string
): Promise<ActionResult<CompetitionSectionData>> {
  const session = await getAdminSession();
  if (!session) {
    return { success: false, error: "Unauthorized" };
  }

  try {
    await connectDB();
    const section = await CompetitionSections.findById(sectionId);

    if (!section) {
      return { success: false, error: "Section not found" };
    }

    section.visible = !section.visible;
    await section.save();

    revalidateCompetitions();
    return { success: true, data: transformSection(section) };
  } catch (error) {
    console.error("Error toggling section visibility:", error);
    return { success: false, error: "Failed to toggle visibility" };
  }
}
