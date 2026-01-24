import { IntlayerClientProvider, NextLayoutIntlayer } from "next-intlayer";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { AdminSidebar } from "./_components/admin-sidebar";
import { AdminHeader } from "./_components/admin-header";
import { auth } from "@/lib/auth";
import { headers, cookies } from "next/headers";
import { redirect } from "next/navigation";
import { connection } from "next/server";

const AdminLayout: NextLayoutIntlayer = async ({ children, params }) => {
  await connection();

  const { locale } = await params;
  const cookieStore = await cookies();

  const session = await auth.api.getSession({ headers: await headers() });

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
