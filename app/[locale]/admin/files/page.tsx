import { Suspense } from "react";
import { NextPageIntlayer } from "next-intlayer";
import { getIntlayer } from "intlayer";
import { getFiles } from "@/lib/actions/files";
import { FilesTable } from "./_components/files-table";
import { FilesTableSkeleton } from "./_components/files-table-skeleton";

async function FilesContent({ locale }: { locale: string }) {
  const content = getIntlayer("admin-files-page", locale);
  const result = await getFiles();
  const files = result.success ? result.data : [];

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-bold">{content.title}</h1>
        <p className="text-muted-foreground">{content.description}</p>
      </div>
      <FilesTable initialFiles={files} />
    </div>
  );
}

const FilesPage: NextPageIntlayer = async ({ params }) => {
  const { locale } = await params;

  return (
    <Suspense fallback={<FilesTableSkeleton />}>
      <FilesContent locale={locale} />
    </Suspense>
  );
};

export default FilesPage;
