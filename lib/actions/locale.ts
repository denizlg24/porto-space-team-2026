"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { getLocalizedUrl } from "intlayer";

export async function changeLocale(pathWithoutLocale: string, newLocale: string) {
  const newPath = getLocalizedUrl(pathWithoutLocale, newLocale);
  
  // Invalidate cache to get new localized content
  revalidatePath(newPath, "page");
  
  // Redirect to the new locale path
  redirect(newPath);
}
