"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";
import { SearchIcon } from "lucide-react";
import { toast } from "sonner";
import { apiClient } from "@/lib/api-client";
import type { GetApplicationRoute, ApplicationData } from "@/app/api/applications/[applicationId]/route";
import { ApplicationStatusDisplay } from "./application-status-display";

export type { ApplicationData as PublicApplicationData };

const getApplication = (id: string) =>
  apiClient<GetApplicationRoute>(`/api/applications/${encodeURIComponent(id)}`);

export const SearchApplicationForm = () => {
  const [applicationId, setApplicationId] = useState("");
  const [loading, setLoading] = useState(false);
  const [application, setApplication] = useState<ApplicationData | null>(null);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!applicationId.trim()) return;

    setLoading(true);
    const result = await getApplication(applicationId.trim()).get();
    setLoading(false);

    if (result.success) {
      setApplication(result.data);
    } else {
      toast.error(result.error.message);
    }
  };

  const handleBack = () => {
    setApplication(null);
    setApplicationId("");
  };

  const handleApplicationUpdate = (updated: ApplicationData) => {
    setApplication(updated);
  };

  if (application) {
    return (
      <ApplicationStatusDisplay
        application={application}
        onBack={handleBack}
        onUpdate={handleApplicationUpdate}
      />
    );
  }

  return (
    <form
      onSubmit={handleSearch}
      className="w-full flex flex-row items-center gap-2"
    >
      <Input
        value={applicationId}
        onChange={(e) => setApplicationId(e.target.value.toUpperCase())}
        type="text"
        placeholder="APP-XXXXXXXX-YYYYYYYY"
        className="font-mono"
      />
      <Button
        disabled={applicationId.length === 0 || loading}
        variant="default"
        size="icon-lg"
        type="submit"
      >
        {loading ? <Spinner /> : <SearchIcon />}
      </Button>
    </form>
  );
};
