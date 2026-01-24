import { NextPageIntlayer } from "next-intlayer";
import { getIntlayer } from "intlayer";
import { getUsers } from "@/lib/actions/users";
import { PendingUsersList } from "./_components/pending-users-list";
import { Badge } from "@/components/ui/badge";

const ApprovalsPage: NextPageIntlayer = async ({ params }) => {
  const { locale } = await params;
  const content = getIntlayer("admin-approvals-page", locale);

  const result = await getUsers({ status: "PENDING" });
  const pendingUsers = result.success ? result.data : [];

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-bold">{content.title}</h1>
            {pendingUsers.length > 0 && (
              <Badge variant="secondary" className="text-sm">
                {pendingUsers.length} {content.stats.pending}
              </Badge>
            )}
          </div>
          <p className="text-muted-foreground">{content.description}</p>
        </div>
      </div>
      <PendingUsersList initialUsers={pendingUsers} />
    </div>
  );
};

export default ApprovalsPage;
