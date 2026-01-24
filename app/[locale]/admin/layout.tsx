import { IntlayerClientProvider, NextLayoutIntlayer } from "next-intlayer";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { AdminSidebar } from "./_components/admin-sidebar";
import { AdminHeader } from "./_components/admin-header";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";

const AdminLayout: NextLayoutIntlayer = async ({ children, params }) => {
  const { locale } = await params;

  const session = await auth.api.getSession({ headers: await headers() });
  if (!session || session.user.approvalStatus !== "APPROVED") {
    console.log("NO SESSION REDIRECTING TO SIGN IN");
    redirect(`/${locale}/sign-in`);
  }

  const cookieStore = await cookies();
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
