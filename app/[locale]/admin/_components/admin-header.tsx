"use client";

import React from "react";
import { useIntlayer } from "next-intlayer";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { usePathname } from "next/navigation";
import { Link } from "@/components/locale/link";

export function AdminHeader() {
  const content = useIntlayer("admin-header");
  const sidebarContent = useIntlayer("admin-sidebar");
  const pathname = usePathname();

  const generateBreadcrumbs = () => {
    const pathWithoutLocale = pathname.replace(/^\/[a-z]{2}(?=\/|$)/, "");
    const segments = pathWithoutLocale.split("/").filter(Boolean);

    return segments.map((segment, index) => {
      const href = "/" + segments.slice(0, index + 1).join("/");
      const isLast = index === segments.length - 1;

      let label = segment.charAt(0).toUpperCase() + segment.slice(1);
      if (segment === "admin") {
        label = String(sidebarContent.breadcrumbTitle.value);
      } else if (segment in sidebarContent.nav) {
        label = String(
          sidebarContent.nav[segment as keyof typeof sidebarContent.nav].value
        );
      }

      return { label, href, isLast };
    });
  };

  const breadcrumbs = generateBreadcrumbs();

  return (
    <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
      <SidebarTrigger className="-ml-1" />
      <Separator orientation="vertical" className="mr-2 h-4" />
      <Breadcrumb>
        <BreadcrumbList>
          {breadcrumbs.map((crumb, index) => (
            <React.Fragment key={crumb.href}>
              {index > 0 && <BreadcrumbSeparator />}
              <BreadcrumbItem>
                {crumb.isLast ? (
                  <BreadcrumbPage>{crumb.label}</BreadcrumbPage>
                ) : (
                  <BreadcrumbLink asChild>
                    <Link href={crumb.href}>{crumb.label}</Link>
                  </BreadcrumbLink>
                )}
              </BreadcrumbItem>
            </React.Fragment>
          ))}
        </BreadcrumbList>
      </Breadcrumb>
    </header>
  );
}
