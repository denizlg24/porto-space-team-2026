import { NextPageIntlayer } from "next-intlayer";
import { getIntlayer } from "intlayer";

const AdminDashboardPage: NextPageIntlayer = async ({ params }) => {
  const { locale } = await params;
  const content = getIntlayer("admin-sidebar", locale);

  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-2xl font-bold">{content.nav.dashboard}</h1>
      <p className="text-muted-foreground">
        Welcome to the admin dashboard. Use the sidebar to navigate.
      </p>
    </div>
  );
};

export default AdminDashboardPage;
