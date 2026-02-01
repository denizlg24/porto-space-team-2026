"use client";

import { useState } from "react";
import { useIntlayer } from "next-intlayer";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Spinner } from "@/components/ui/spinner";
import { toast } from "sonner";
import { setApplicationsOpen } from "@/lib/actions/content";

interface ApplicationsToggleProps {
  initialOpen: boolean;
}

export function ApplicationsToggle({ initialOpen }: ApplicationsToggleProps) {
  const content = useIntlayer("admin-applications-page");
  const [isOpen, setIsOpen] = useState(initialOpen);
  const [isLoading, setIsLoading] = useState(false);

  const handleToggle = async (checked: boolean) => {
    setIsLoading(true);
    const result = await setApplicationsOpen(checked);
    setIsLoading(false);

    if (result.success) {
      setIsOpen(checked);
      toast.success(
        checked
          ? content.toggle.openedSuccess
          : content.toggle.closedSuccess
      );
    } else {
      toast.error(content.toggle.error);
    }
  };

  return (
    <div className="flex items-center gap-3 rounded-md border p-4">
      <Switch
        id="applications-toggle"
        checked={isOpen}
        onCheckedChange={handleToggle}
        disabled={isLoading}
      />
      <div className="flex-1">
        <Label
          htmlFor="applications-toggle"
          className="text-sm font-medium cursor-pointer"
        >
          {content.toggle.label}
        </Label>
        <p className="text-xs text-muted-foreground">
          {isOpen ? content.toggle.statusOpen : content.toggle.statusClosed}
        </p>
      </div>
      {isLoading && <Spinner className="size-4" />}
    </div>
  );
}
