import { IntlayerClientProvider, NextLayoutIntlayer } from "next-intlayer";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { AdminSidebar } from "./_components/admin-sidebar";
import { AdminHeader } from "./_components/admin-header";
import { auth } from "@/lib/auth";
import { headers, cookies } from "next/headers";
import { redirect } from "next/navigation";
import { unstable_noStore as noStore } from "next/cache";

export const dynamic = "force-dynamic";

const AdminLayout: NextLayoutIntlayer = async ({ children, params }) => {
  noStore();

  const { locale } = await params;

  const cookieStore = await cookies();
  const allCookies = cookieStore.getAll();
  console.log("=== ADMIN LAYOUT DEBUG ===");
  console.log("BETTER_AUTH_URL:", process.env.BETTER_AUTH_URL);
  console.log("All cookies:", allCookies.map(c => c.name));

  const sessionCookie = cookieStore.get("porto_space_team.session_token");
  console.log("Session cookie exists:", !!sessionCookie);

  const reqHeaders = await headers();
  console.log("Cookie header:", reqHeaders.get("cookie")?.substring(0, 100));

  let session = await auth.api.getSession({ headers: reqHeaders });
  console.log("Session with headers:", session ? "found" : "null");

  if (!session) {
    session = await auth.api.getSession();
    console.log("Session without headers:", session ? "found" : "null");
  }
  console.log("=== END DEBUG ===");

  if (!session || session.user.approvalStatus !== "APPROVED") {
    redirect(`/${locale}/sign-in`);
  }

  const sidebarState = cookieStore.get("sidebar_state");
  const defaultOpen = sidebarState?.value !== "false";

  return (
    <IntlayerClientProvider locale={locale}>
      <SidebarProvider className="" defaultOpen={defaultOpen}>
        <AdminSidebar />
        <SidebarInset>
          <AdminHeader />
          <div className="flex flex-1 flex-col gap-4 p-4">{children}</div>
        </SidebarInset>
      </SidebarProvider>
    </IntlayerClientProvider>
  );
};

export default AdminLayout;
