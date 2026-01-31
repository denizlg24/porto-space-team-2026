import { NextPageIntlayer } from "next-intlayer";
import { getIntlayer } from "intlayer";
import { getApplications } from "@/lib/actions/applications";
import { ApplicationsTable } from "./_components/applications-table";

const ApplicationsPage: NextPageIntlayer = async ({ params }) => {
  const { locale } = await params;
  const content = getIntlayer("admin-applications-page", locale);

  const applicationsResult = await getApplications();
  const applications = applicationsResult.success
    ? applicationsResult.data
    : [];

  const newCount = applications.filter((a) => a.status === "new").length;
  const readCount = applications.filter((a) => a.status === "read").length;
  const interviewCount = applications.filter(
    (a) => a.status === "interview"
  ).length;
  const acceptedCount = applications.filter(
    (a) => a.status === "accepted"
  ).length;
  const rejectedCount = applications.filter(
    (a) => a.status === "rejected"
  ).length;

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-bold">{content.title}</h1>
        <p className="text-muted-foreground">{content.description}</p>
      </div>

      <div className="grid gap-4 md:grid-cols-6">
        <div className="rounded-md border p-4">
          <p className="text-sm text-muted-foreground">{content.stats.total}</p>
          <p className="text-2xl font-bold">{applications.length}</p>
        </div>
        <div className="rounded-md border p-4">
          <p className="text-sm text-muted-foreground">{content.stats.new}</p>
          <p className="text-2xl font-bold text-blue-600">{newCount}</p>
        </div>
        <div className="rounded-md border p-4">
          <p className="text-sm text-muted-foreground">{content.stats.read}</p>
          <p className="text-2xl font-bold text-yellow-600">{readCount}</p>
        </div>
        <div className="rounded-md border p-4">
          <p className="text-sm text-muted-foreground">
            {content.stats.interview}
          </p>
          <p className="text-2xl font-bold text-purple-600">{interviewCount}</p>
        </div>
        <div className="rounded-md border p-4">
          <p className="text-sm text-muted-foreground">
            {content.stats.accepted}
          </p>
          <p className="text-2xl font-bold text-green-600">{acceptedCount}</p>
        </div>
        <div className="rounded-md border p-4">
          <p className="text-sm text-muted-foreground">
            {content.stats.rejected}
          </p>
          <p className="text-2xl font-bold text-red-600">{rejectedCount}</p>
        </div>
      </div>

      <ApplicationsTable initialApplications={applications} />
    </div>
  );
};

export default ApplicationsPage;
