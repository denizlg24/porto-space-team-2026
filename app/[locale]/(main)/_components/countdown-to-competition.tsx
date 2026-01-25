"use client";

import { useEffect, useState } from "react";

type Props = {
  hasCompetition: boolean;
  date: Date | null;
  labels: {
    days: string;
    hours: string;
    minutes: string;
    seconds: string;
  };
  messages: {
    completed: string;
    noCompetition: string;
  };
};

type CountdownState = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isCompleted: boolean;
};

function calculateCountdown(date: Date): CountdownState {
  const now = new Date();
  const diff = date.getTime() - now.getTime();

  if (diff <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0, isCompleted: true };
  }

  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
    minutes: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
    seconds: Math.floor((diff % (1000 * 60)) / 1000),
    isCompleted: false,
  };
}

export const CountdownToCompetition = ({
  hasCompetition,
  date,
  labels,
  messages,
}: Props) => {
  const isDisabled = !hasCompetition || !date;
  const [mounted, setMounted] = useState(false);
  const [countdown, setCountdown] = useState<CountdownState>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    isCompleted: false,
  });

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  useEffect(() => {
    if (isDisabled || !date) return;

    // eslint-disable-next-line react-hooks/set-state-in-effect
    setCountdown(calculateCountdown(date));

    const interval = setInterval(() => {
      setCountdown(calculateCountdown(date));
    }, 1000);

    return () => clearInterval(interval);
  }, [isDisabled, date]);

  if (isDisabled) {
    return (
      <div className="col-span-4 text-center py-2">
        <p className="text-sm font-mono text-muted-foreground">
          {messages.noCompetition}
        </p>
      </div>
    );
  }

  if (mounted && countdown.isCompleted) {
    return (
      <div className="col-span-4 text-center py-2">
        <p className="text-sm font-mono font-semibold text-primary">
          {messages.completed}
        </p>
      </div>
    );
  }

  const items = [
    { value: countdown.days, label: labels.days },
    { value: countdown.hours, label: labels.hours },
    { value: countdown.minutes, label: labels.minutes },
    { value: countdown.seconds, label: labels.seconds },
  ];

  return (
    <>
      {items.map((item) => (
        <div key={item.label} className="text-center">
          <div className="text-2xl md:text-3xl font-mono font-bold text-foreground">
            {mounted ? String(item.value).padStart(2, "0") : "--"}
          </div>
          <div className="text-xs font-mono text-muted-foreground uppercase">
            {item.label}
          </div>
        </div>
      ))}
    </>
  );
};
