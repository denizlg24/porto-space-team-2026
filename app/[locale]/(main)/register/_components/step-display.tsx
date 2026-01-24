"use client";

import { useIntlayer } from "next-intlayer";

const StepDisplay = ({ step }: { step: number }) => {
  const content = useIntlayer("register-page");
  
  return (
    <div className="flex items-center gap-4 w-full">
      <div className="flex items-center gap-2">
        <div
          className={`w-8 h-8 rounded flex items-center justify-center font-mono text-sm ${
            step >= 1
              ? "bg-primary text-primary-foreground"
              : "bg-secondary text-muted-foreground"
          }`}
        >
          01
        </div>
        <span
          className={`text-sm ${
            step >= 1 ? "text-foreground" : "text-muted-foreground"
          }`}
        >
          {content.steps.identity}
        </span>
      </div>
      <div className="flex-1 h-px bg-border relative">
        <div
          className="absolute inset-y-0 left-0 bg-primary transition-all duration-300"
          style={{ width: step >= 2 ? "100%" : "0%" }}
        />
      </div>
      <div className="flex items-center gap-2">
        <div
          className={`w-8 h-8 rounded flex items-center justify-center font-mono text-sm ${
            step >= 2
              ? "bg-primary text-primary-foreground"
              : "bg-secondary text-muted-foreground"
          }`}
        >
          02
        </div>
        <span
          className={`text-sm ${
            step >= 2 ? "text-foreground" : "text-muted-foreground"
          }`}
        >
          {content.steps.security}
        </span>
      </div>
    </div>
  );
};

export { StepDisplay };
