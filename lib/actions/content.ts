"use server";

import { connectDB } from "@/lib/db";
import { SiteContent, type ISiteContent } from "@/models/SiteContent";
import { getAdminSession, type ActionResult } from "./users";
import { revalidatePath } from "next/cache";

export type SiteContentItem = {
  id: string;
  key: string;
  page: string;
  value: unknown;
  createdAt: Date;
  updatedAt: Date;
};

export type HomePageContent = {
  countdownEnabled: boolean;
  competitionName: string | null;
  competitionDate: string | null;
  teamMembers: number | null;
  projectsCount: number | null;
  teamPictureUrl: string | null;
};

function transformContent(doc: ISiteContent): SiteContentItem {
  return {
    id: doc._id.toString(),
    key: doc.key,
    page: doc.page,
    value: doc.value,
    createdAt: doc.createdAt,
    updatedAt: doc.updatedAt,
  };
}

function revalidateContent() {
  revalidatePath('/[locale]/(main)', 'page')
  revalidatePath('/[locale]/(main)/about', 'page');
}

export async function getPageContent(
  page: string
): Promise<ActionResult<SiteContentItem[]>> {
  const session = await getAdminSession();
  if (!session) {
    return { success: false, error: "Unauthorized" };
  }

  try {
    await connectDB();
    const contents = await SiteContent.find({ page }).sort({ key: 1 });
    return { success: true, data: contents.map(transformContent) };
  } catch (error) {
    console.error("Error fetching page content:", error);
    return { success: false, error: "Failed to fetch content" };
  }
}

export async function getContentByKey(
  page: string,
  key: string
): Promise<SiteContentItem | null> {
  try {
    await connectDB();
    const content = await SiteContent.findOne({ page, key });
    return content ? transformContent(content) : null;
  } catch (error) {
    console.error("Error fetching content:", error);
    return null;
  }
}

export async function getCompetitionData(): Promise<{
  enabled: boolean;
  name: string | null;
  date: Date | null;
}> {
  try {
    await connectDB();
    const [enabledDoc, nameDoc, dateDoc] = await Promise.all([
      SiteContent.findOne({ page: "home", key: "countdownEnabled" }),
      SiteContent.findOne({ page: "home", key: "competitionName" }),
      SiteContent.findOne({ page: "home", key: "competitionDate" }),
    ]);

    return {
      enabled: (enabledDoc?.value as unknown as boolean) === true,
      name: nameDoc?.value ? String(nameDoc.value) : null,
      date: dateDoc?.value ? new Date(dateDoc.value as unknown as string) : null,
    };
  } catch (error) {
    console.error("Error fetching competition data:", error);
    return {
      enabled: false,
      name: null,
      date: null,
    };
  }
}

export async function upsertContent(data: {
  page: string;
  key: string;
  value: unknown;
}): Promise<ActionResult<SiteContentItem>> {
  const session = await getAdminSession();
  if (!session) {
    return { success: false, error: "Unauthorized" };
  }

  try {
    await connectDB();
    const content = await SiteContent.findOneAndUpdate(
      { page: data.page, key: data.key },
      { $set: { value: data.value } },
      { new: true, upsert: true }
    );

    revalidateContent();
    return { success: true, data: transformContent(content) };
  } catch (error) {
    console.error("Error upserting content:", error);
    return { success: false, error: "Failed to save content" };
  }
}

export async function deleteContent(
  page: string,
  key: string
): Promise<ActionResult> {
  const session = await getAdminSession();
  if (!session) {
    return { success: false, error: "Unauthorized" };
  }

  try {
    await connectDB();
    await SiteContent.findOneAndDelete({ page, key });
    revalidateContent();
    return { success: true, data: undefined };
  } catch (error) {
    console.error("Error deleting content:", error);
    return { success: false, error: "Failed to delete content" };
  }
}

export async function updateHomePageContent(
  data: Partial<HomePageContent>
): Promise<ActionResult<HomePageContent>> {
  const session = await getAdminSession();
  if (!session) {
    return { success: false, error: "Unauthorized" };
  }

  try {
    await connectDB();

    const updates: Promise<unknown>[] = [];

    if (data.countdownEnabled !== undefined) {
      updates.push(
        SiteContent.findOneAndUpdate(
          { page: "home", key: "countdownEnabled" },
          { $set: { value: data.countdownEnabled } },
          { upsert: true }
        )
      );
    }

    if (data.competitionName !== undefined) {
      updates.push(
        SiteContent.findOneAndUpdate(
          { page: "home", key: "competitionName" },
          { $set: { value: data.competitionName } },
          { upsert: true }
        )
      );
    }

    if (data.competitionDate !== undefined) {
      updates.push(
        SiteContent.findOneAndUpdate(
          { page: "home", key: "competitionDate" },
          { $set: { value: data.competitionDate } },
          { upsert: true }
        )
      );
    }

    if (data.teamMembers !== undefined) {
      updates.push(
        SiteContent.findOneAndUpdate(
          { page: "home", key: "teamMembers" },
          { $set: { value: data.teamMembers } },
          { upsert: true }
        )
      );
    }

    if (data.projectsCount !== undefined) {
      updates.push(
        SiteContent.findOneAndUpdate(
          { page: "home", key: "projectsCount" },
          { $set: { value: data.projectsCount } },
          { upsert: true }
        )
      );
    }

    if (data.teamPictureUrl !== undefined) {
      updates.push(
        SiteContent.findOneAndUpdate(
          { page: "home", key: "teamPictureUrl" },
          { $set: { value: data.teamPictureUrl } },
          { upsert: true }
        )
      );
    }

    await Promise.all(updates);
    revalidateContent();

    const content = await getHomePageContent();
    return { success: true, data: content };
  } catch (error) {
    console.error("Error updating home page content:", error);
    return { success: false, error: "Failed to update content" };
  }
}

export async function getHomePageContent(): Promise<HomePageContent> {
  try {
    await connectDB();
    const [enabledDoc, nameDoc, dateDoc, membersDoc, projectsDoc, pictureDoc] =
      await Promise.all([
        SiteContent.findOne({ page: "home", key: "countdownEnabled" }),
        SiteContent.findOne({ page: "home", key: "competitionName" }),
        SiteContent.findOne({ page: "home", key: "competitionDate" }),
        SiteContent.findOne({ page: "home", key: "teamMembers" }),
        SiteContent.findOne({ page: "home", key: "projectsCount" }),
        SiteContent.findOne({ page: "home", key: "teamPictureUrl" }),
      ]);

    return {
      countdownEnabled: (enabledDoc?.value as unknown as boolean) === true,
      competitionName: nameDoc?.value ? String(nameDoc.value) : null,
      competitionDate: dateDoc?.value ? String(dateDoc.value) : null,
      teamMembers:
        membersDoc?.value !== undefined ? Number(membersDoc.value) : null,
      projectsCount:
        projectsDoc?.value !== undefined ? Number(projectsDoc.value) : null,
      teamPictureUrl: pictureDoc?.value ? String(pictureDoc.value) : null,
    };
  } catch (error) {
    console.error("Error fetching home page content:", error);
    return {
      countdownEnabled: false,
      competitionName: null,
      competitionDate: null,
      teamMembers: null,
      projectsCount: null,
      teamPictureUrl: null,
    };
  }
}

export async function getQuickStats(): Promise<{
  teamMembers: number | null;
  projectsCount: number | null;
}> {
  try {
    await connectDB();
    const [membersDoc, projectsDoc] = await Promise.all([
      SiteContent.findOne({ page: "home", key: "teamMembers" }),
      SiteContent.findOne({ page: "home", key: "projectsCount" }),
    ]);

    return {
      teamMembers:
        membersDoc?.value !== undefined ? Number(membersDoc.value) : null,
      projectsCount:
        projectsDoc?.value !== undefined ? Number(projectsDoc.value) : null,
    };
  } catch (error) {
    console.error("Error fetching quick stats:", error);
    return {
      teamMembers: null,
      projectsCount: null,
    };
  }
}

export async function getTeamPictureUrl(): Promise<string | null> {
  try {
    await connectDB();
    const doc = await SiteContent.findOne({ page: "home", key: "teamPictureUrl" });
    return doc?.value ? String(doc.value) : null;
  } catch (error) {
    console.error("Error fetching team picture URL:", error);
    return null;
  }
}

export async function getApplicationsOpen(): Promise<boolean> {
  try {
    await connectDB();
    const doc = await SiteContent.findOne({ page: "apply", key: "applicationsOpen" });
    return doc?.value === true;
  } catch (error) {
    console.error("Error fetching applications open status:", error);
    return false;
  }
}

export async function setApplicationsOpen(
  open: boolean
): Promise<ActionResult<boolean>> {
  const session = await getAdminSession();
  if (!session) {
    return { success: false, error: "Unauthorized" };
  }

  try {
    await connectDB();
    await SiteContent.findOneAndUpdate(
      { page: "apply", key: "applicationsOpen" },
      { $set: { value: open } },
      { upsert: true }
    );

    revalidatePath('/[locale]/(main)/apply', 'page');
    return { success: true, data: open };
  } catch (error) {
    console.error("Error setting applications open status:", error);
    return { success: false, error: "Failed to update status" };
  }
}
