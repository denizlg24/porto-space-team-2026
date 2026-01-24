import type { FC, ReactNode } from "react";
import { ServerLink } from "@/components/locale/server-link";
import { cn } from "@/lib/utils";
import type { LinkProps } from "next/link";
import type { AnchorHTMLAttributes } from "react";

type ServerNavLinkProps = LinkProps &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, keyof LinkProps> & {
    active?: boolean;
    children?: ReactNode;
    locale: string;
  };

export const ServerNavLink: FC<ServerNavLinkProps> = ({
  className,
  active,
  children,
  locale,
  ...props
}) => {
  return (
    <ServerLink
      locale={locale}
      className={cn(
        "relative px-3 py-2 text-xs font-medium tracking-wide text-muted-foreground transition-colors",
        "hover:text-foreground",
        "after:absolute after:bottom-0 after:left-1/2 after:h-px after:w-0 after:bg-primary after:transition-all after:duration-300 after:-translate-x-1/2",
        "hover:after:w-full",
        active && "text-foreground after:w-full",
        className
      )}
      {...props}
    >
      {children}
    </ServerLink>
  );
};
