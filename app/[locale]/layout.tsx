import "../globals.css";
import { Geist, Geist_Mono, JetBrains_Mono } from "next/font/google";
import type { LocalPromiseParams, NextLayoutIntlayer } from "next-intlayer";
import { IntlayerClientProvider } from "next-intlayer";
import { getHTMLTextDir } from "intlayer";
import { getIntlayer, getMultilingualUrls } from "intlayer";
import type { Metadata } from "next";
import { ThemeProvider } from "@/components/theme/theme-provider";
import { Header } from "@/components/header/header";

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-sans",
});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const generateMetadata = async ({
  params,
}: LocalPromiseParams): Promise<Metadata> => {
  const { locale } = await params;

  const metadata = getIntlayer("layout-metadata", locale);

  const multilingualUrls = getMultilingualUrls("/");
  const localizedUrl =
    multilingualUrls[locale as keyof typeof multilingualUrls];

  return {
    ...metadata,
    alternates: {
      canonical: localizedUrl,
      languages: { ...multilingualUrls, "x-default": "/" },
    },
    openGraph: {
      url: localizedUrl,
    },
  };
};

const LocaleLayout: NextLayoutIntlayer = async ({ children, params }) => {
  const { locale } = await params;
  return (
    <html
      suppressHydrationWarning
      lang={locale}
      className={jetbrainsMono.variable}
      dir={getHTMLTextDir(locale)}
    >
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen sm:pt-24 pt-20 w-full`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <IntlayerClientProvider locale={locale}>
            <Header />
            {children}
          </IntlayerClientProvider>
        </ThemeProvider>
      </body>
    </html>
  );
};

export { generateStaticParams } from "next-intlayer";
export default LocaleLayout;
