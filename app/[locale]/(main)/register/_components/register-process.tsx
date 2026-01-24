"use client";

import { useState } from "react";
import { useIntlayer } from "next-intlayer";
import { StepDisplay } from "./step-display";
import { IdentityForm } from "./identity-form";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { User2, Mail, ArrowLeft, Clock } from "lucide-react";
import { SecurityForm } from "./security-form";
import { Link } from "@/components/locale/link";

export const RegisterProcess = () => {
  const content = useIntlayer("register-page");
  const [step, setStep] = useState(1);
  const [userData, updateUserData] = useState<{
    name: string;
    email: string;
    department: string;
  }>({
    name: "",
    email: "",
    department: "",
  });

  if (step === 3) {
    return (
      <div className="w-full flex flex-col items-center gap-8 animate-in fade-in-0 slide-in-from-bottom-4 duration-500">
        <div className="w-20 h-20 bg-primary/10 border border-primary/20 flex items-center justify-center">
          <Mail className="w-10 h-10 text-primary" />
        </div>

        <div className="flex flex-col gap-2 items-center w-full text-center">
          <h3 className="text-xs text-primary uppercase tracking-wider">
            {content.success.subtitle}
          </h3>
          <h1 className="font-bold text-3xl">{content.success.title}</h1>
          <p className="text-muted-foreground text-sm max-w-sm">
            {content.success.description}
          </p>
        </div>

        <Card className="w-full p-4 flex flex-row items-center gap-3 bg-muted/30 border-border/60">
          <div className="w-8 h-8 bg-primary/20 flex items-center justify-center shrink-0 mt-0.5">
            <Clock className="w-4 h-4 text-primary" />
          </div>
          <p className="text-sm text-muted-foreground">
            {content.success.pendingApproval}
          </p>
        </Card>

        <div className="w-full h-px bg-muted" />

        <Button asChild variant="outline" className="w-full h-12">
          <Link href="/sign-in">
            <ArrowLeft className="h-4 w-4 transition-transform" />
            {content.success.backToSignIn}
          </Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col items-center gap-6">
      <StepDisplay step={step} />
      {step === 1 && (
        <div className="flex flex-col gap-2 items-start w-full animate-in fade-in-0 duration-300">
          <h3 className="text-xs text-primary text-left w-full uppercase">
            {content.step1.subtitle}
          </h3>
          <h1 className="font-bold text-3xl">{content.step1.title}</h1>
          <p className="text-muted-foreground text-sm">
            {content.step1.description}
          </p>
        </div>
      )}
      {step === 2 && (
        <div className="flex flex-col gap-2 items-start w-full animate-in fade-in-0 duration-300">
          <h3 className="text-xs text-primary text-left w-full uppercase">
            {content.step2.subtitle}
          </h3>
          <h1 className="font-bold text-3xl">{content.step2.title}</h1>
          <p className="text-muted-foreground text-sm">
            {content.step2.description}
          </p>
        </div>
      )}
      {step === 1 && (
        <IdentityForm
          initialData={userData}
          submit={updateUserData}
          moveStep={setStep}
        />
      )}
      {step === 2 && (
        <>
          <Card className="w-full p-3! flex flex-row justify-start items-center animate-in fade-in-0 slide-in-from-top-2 duration-300">
            <div className="w-10 h-10 bg-primary/20 flex items-center justify-center">
              <User2 className="text-primary" />
            </div>
            <div>
              <div className="text-foreground font-medium">{userData.name}</div>
              <div className="text-xs text-muted-foreground font-mono">
                {userData.email}
              </div>
            </div>
          </Card>
          <SecurityForm userData={userData} moveStep={setStep} />
        </>
      )}
    </div>
  );
};
