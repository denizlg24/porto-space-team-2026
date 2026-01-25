import { getIntlayer } from "intlayer";
import { getQuickStats } from "@/lib/actions/content";

type Props = {
  locale: string;
};

export async function QuickStats({ locale }: Props) {
  const stats = await getQuickStats();
  const content = getIntlayer("home-page", locale);

  return (
    <div className="flex gap-8 w-full max-w-3xl justify-evenly mx-auto text-center">
      <div>
        <div className="text-3xl font-bold text-foreground">2022</div>
        <div className="text-xs font-mono uppercase tracking-wider text-muted-foreground">
          {content.stats.founded}
        </div>
      </div>
      {stats.teamMembers !== null && (
        <div>
          <div className="text-3xl font-bold text-foreground">
            {stats.teamMembers}+
          </div>
          <div className="text-xs font-mono uppercase tracking-wider text-muted-foreground">
            {content.stats.teamMembers}
          </div>
        </div>
      )}
      {stats.projectsCount !== null && (
        <div>
          <div className="text-3xl font-bold text-foreground">
            {stats.projectsCount}
          </div>
          <div className="text-xs font-mono uppercase tracking-wider text-muted-foreground">
            {content.stats.projects}
          </div>
        </div>
      )}
    </div>
  );
}
