import { Suspense } from "react";
import { NextLayoutIntlayer } from "next-intlayer";
import { ServerHeader } from "@/components/header/server-header";
import { ServerFooter } from "@/components/footer/server-footer";

const MainLayout: NextLayoutIntlayer = async ({ children, params }) => {
  const { locale } = await params;

  return (
    <>
      <Suspense>
        <ServerHeader locale={locale} />
      </Suspense>
      <div className="w-full h-0 sm:mb-24 mb-20" />
      {children}
      <Suspense>
        <ServerFooter locale={locale} />
      </Suspense>
    </>
  );
};

export default MainLayout;
