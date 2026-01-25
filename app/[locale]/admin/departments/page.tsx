import { NextPageIntlayer } from "next-intlayer";
import { getIntlayer } from "intlayer";
import { getDepartments } from "@/lib/actions/departments";
import { DepartmentsManager } from "./_components/departments-manager";
import { Suspense } from "react";
import { DepartmentsManagerSkeleton } from "./_components/departments-manager-skeleton";

const DepartmentsPage: NextPageIntlayer = async ({ params }) => {
  const { locale } = await params;
  const content = getIntlayer("admin-departments-page", locale);

  const result = await getDepartments();
  const departments = result.success ? result.data : [];

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-bold">{content.title}</h1>
        <p className="text-muted-foreground">{content.description}</p>
      </div>
      <Suspense fallback={<DepartmentsManagerSkeleton />}>
        <DepartmentsManager initialDepartments={departments} />
      </Suspense>
    </div>
  );
};

export default DepartmentsPage;
