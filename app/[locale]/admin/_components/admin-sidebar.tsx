"use client";

import { useIntlayer } from "next-intlayer";
import { usePathname } from "next/navigation";
import { Link } from "@/components/locale/link";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";
import {
  LayoutDashboard,
  Users,
  UserCheck,
  Mail,
  Settings,
  ArrowLeft,
  LogOut,
  Handshake,
  FolderOpen,
  FileText,
  Building2,
} from "lucide-react";
import { authClient } from "@/lib/authClient";
import Image from "next/image";
import logo from "@/public/logo-black.png";

const mainNavItems = [
  { key: "dashboard", href: "/admin", icon: LayoutDashboard },
] as const;

const managementNavItems = [
  { key: "users", href: "/admin/users", icon: Users },
  { key: "approvals", href: "/admin/approvals", icon: UserCheck },
  { key: "departments", href: "/admin/departments", icon: Building2 },
  { key: "files", href: "/admin/files", icon: FolderOpen },
  { key: "content", href: "/admin/content", icon: FileText },
  { key: "sponsors", href: "/admin/sponsors", icon: Handshake },
  { key: "newsletter", href: "/admin/newsletter", icon: Mail },
] as const;

const systemNavItems = [
  { key: "settings", href: "/admin/settings", icon: Settings },
] as const;

export function AdminSidebar() {
  const content = useIntlayer("admin-sidebar");
  const pathname = usePathname();

  const isActive = (href: string) => {
    const pathWithoutLocale = pathname.replace(/^\/[a-z]{2}/, "");
    if (href === "/admin") {
      return pathWithoutLocale === "/admin" || pathWithoutLocale === "/admin/";
    }
    return pathWithoutLocale.startsWith(href);
  };

  const handleSignOut = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          window.location.href = "/";
        },
      },
    });
  };

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <Link href="/admin">
                <div className="flex aspect-square size-8 items-center justify-center">
                  <Image
                    src={logo}
                    className="size-8 object-contain"
                    alt="Logo"
                  />
                </div>
                <div className="flex flex-col gap-0.5 leading-none">
                  <span className="font-semibold">{content.title}</span>
                  <span className="text-xs text-muted-foreground">
                    Porto Space Team
                  </span>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>{content.sections.main}</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {mainNavItems.map((item) => (
                <SidebarMenuItem key={item.key}>
                  <SidebarMenuButton
                    asChild
                    isActive={isActive(item.href)}
                    tooltip={content.nav[item.key].value}
                  >
                    <Link href={item.href}>
                      <item.icon className="size-4" />
                      <span>{content.nav[item.key]}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>{content.sections.management}</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {managementNavItems.map((item) => (
                <SidebarMenuItem key={item.key}>
                  <SidebarMenuButton
                    asChild
                    isActive={isActive(item.href)}
                    tooltip={content.nav[item.key].value}
                  >
                    <Link href={item.href}>
                      <item.icon className="size-4" />
                      <span>{content.nav[item.key]}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>{content.sections.system}</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {systemNavItems.map((item) => (
                <SidebarMenuItem key={item.key}>
                  <SidebarMenuButton
                    asChild
                    isActive={isActive(item.href)}
                    tooltip={content.nav[item.key].value}
                  >
                    <Link href={item.href}>
                      <item.icon className="size-4" />
                      <span>{content.nav[item.key]}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              tooltip={content.footer.backToSite.value}
            >
              <Link href="/">
                <ArrowLeft className="size-4" />
                <span>{content.footer.backToSite}</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton
              onClick={handleSignOut}
              tooltip={content.footer.signOut.value}
            >
              <LogOut className="size-4" />
              <span>{content.footer.signOut}</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>

      <SidebarRail />
    </Sidebar>
  );
}
