"use client";

import { getLocalizedUrl } from "intlayer";
import NextLink, { type LinkProps as NextLinkProps } from "next/link";
import type { PropsWithChildren, FC, AnchorHTMLAttributes } from "react";

export const checkIsExternalLink = (href?: string): boolean =>
  /^https?:\/\//.test(href ?? "");

type ClientLinkProps = NextLinkProps &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, keyof NextLinkProps> & {
    locale: string;
  };

export const ClientLink: FC<PropsWithChildren<ClientLinkProps>> = ({
  href,
  locale,
  children,
  ...props
}) => {
  const isExternalLink = checkIsExternalLink(href.toString());

  const hrefI18n: NextLinkProps["href"] =
    href && !isExternalLink ? getLocalizedUrl(href.toString(), locale) : href;

  return (
    <NextLink href={hrefI18n} {...props}>
      {children}
    </NextLink>
  );
};
