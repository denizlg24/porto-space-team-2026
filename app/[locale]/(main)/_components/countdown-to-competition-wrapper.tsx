import { getIntlayer } from "intlayer";
import { getCompetitionData } from "@/lib/actions/content";
import { CountdownToCompetition } from "./countdown-to-competition";

type Props = {
  locale: string;
};

export async function CountdownCompetitionWrapper({ locale }: Props) {
  const data = await getCompetitionData();
  const content = getIntlayer("home-page", locale);

  if (!data.enabled) {
    return null;
  }

  const hasCompetition = data.name !== null;

  const title = hasCompetition
    ? `${content.countdown.prefix} ${data.name}`
    : content.countdown.noEventTitle;

  const labels = {
    days: content.countdown.days,
    hours: content.countdown.hours,
    minutes: content.countdown.minutes,
    seconds: content.countdown.seconds,
  };

  const messages = {
    completed: content.countdown.completed,
    noCompetition: content.countdown.noCompetition,
  };

  return (
    <>
      <div className="col-span-4 text-xs font-mono uppercase tracking-widest text-primary sm:mb-3 pt-6 sm:px-6 px-3">
        {title}
      </div>
      <CountdownToCompetition
        hasCompetition={hasCompetition}
        date={data.date}
        labels={labels}
        messages={messages}
      />
      <div className="sm:pb-3"></div>
    </>
  );
}