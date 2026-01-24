import { NextPageIntlayer } from "next-intlayer";
import { getIntlayer } from "intlayer";
import { getUsers } from "@/lib/actions/users";
import { UsersTable } from "./_components/users-table";

const UsersPage: NextPageIntlayer = async ({ params }) => {
  const { locale } = await params;
  const content = getIntlayer("admin-users-page", locale);

  const result = await getUsers();
  const users = result.success ? result.data : [];

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-bold">{content.title}</h1>
        <p className="text-muted-foreground">{content.description}</p>
      </div>
      <UsersTable initialUsers={users} />
    </div>
  );
};

export default UsersPage;
