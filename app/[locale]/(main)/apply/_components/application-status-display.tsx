"use client";

import { useState, useEffect } from "react";
import { useIntlayer } from "next-intlayer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Spinner } from "@/components/ui/spinner";
import {
  CheckCircle,
  Circle,
  Clock,
  Copy,
  ExternalLink,
  FileText,
  Video,
  ArrowLeft,
  XCircle,
  Calendar as CalendarIcon,
} from "lucide-react";
import { InterviewCalendar } from "@/components/interview-calendar";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { apiClient } from "@/lib/api-client";
import type { PublicApplicationData } from "./search-application-form";
import type {
  GetInterviewSlotsRoute,
  InterviewSlotData,
} from "@/app/api/interview-slots/route";
import type { BookInterviewRoute } from "@/app/api/applications/[applicationId]/book-interview/route";

type ApplicationStatus = "new" | "read" | "rejected" | "interview" | "accepted";

const getInterviewSlots = apiClient<GetInterviewSlotsRoute>(
  "/api/interview-slots",
);
const bookInterview = (applicationId: string) =>
  apiClient<BookInterviewRoute>(
    `/api/applications/${encodeURIComponent(applicationId)}/book-interview`,
  );

interface ApplicationStatusDisplayProps {
  application: PublicApplicationData;
  onBack: () => void;
  onUpdate: (application: PublicApplicationData) => void;
}

const STATUS_ORDER: ApplicationStatus[] = [
  "new",
  "read",
  "interview",
  "accepted",
];

function getStepStatus(
  currentStatus: ApplicationStatus,
  stepStatus: ApplicationStatus,
  isRejected: boolean,
): "completed" | "current" | "upcoming" | "rejected" {
  if (isRejected && stepStatus === currentStatus) return "rejected";
  if (isRejected) return "upcoming";

  const currentIndex = STATUS_ORDER.indexOf(currentStatus);
  const stepIndex = STATUS_ORDER.indexOf(stepStatus);

  if (stepIndex < currentIndex) return "completed";
  if (stepIndex === currentIndex) return "current";
  return "upcoming";
}

export function ApplicationStatusDisplay({
  application,
  onBack,
  onUpdate,
}: ApplicationStatusDisplayProps) {
  const content = useIntlayer("apply-page");
  const [slots, setSlots] = useState<InterviewSlotData[]>([]);
  const [loadingSlots, setLoadingSlots] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
  const [isBooking, setIsBooking] = useState(false);

  const isRejected = application.status === "rejected";
  const hasInterview =
    application.status === "interview" && application.interviewDate;
  const canBookInterview =
    application.status === "interview" && !application.interviewDate;

  const fetchSlots = async () => {
    setLoadingSlots(true);
    const result = await getInterviewSlots.get();
    setLoadingSlots(false);

    if (result.success) {
      setSlots(result.data.slots);
    } else {
      console.error("Failed to fetch slots:", result.error.message);
    }
  };

  useEffect(() => {
    if (canBookInterview) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      fetchSlots();
    }
  }, [canBookInterview]);

  const handleBookInterview = async () => {
    if (!selectedSlot) return;

    setIsBooking(true);
    const result = await bookInterview(application.applicationId).post({
      input: { slotId: selectedSlot },
    });
    setIsBooking(false);

    if (result.success) {
      toast.success(content.statusPage.interview.booking.booked);
      onUpdate({
        ...application,
        interviewDate: result.data.interviewDate,
        meetLink: result.data.meetLink,
      });
    } else {
      toast.error(result.error.message);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const formatShortDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="w-full max-w-5xl mx-auto space-y-8">
      <div className="flex items-center justify-between">
        <Button variant="ghost" onClick={onBack} className="gap-2">
          <ArrowLeft className="size-4" />
          {content.statusPage.backToSearch}
        </Button>
      </div>

      <Card>
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <CardTitle className="text-xl">
              {content.statusPage.title}
            </CardTitle>
            <Badge
              variant="outline"
              className={"text-sm"}
            >
              {content.statusPage.roadmap[application.status]}
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-muted-foreground">
                {content.statusPage.applicationId}
              </p>
              <p className="font-mono font-medium">
                {application.applicationId}
              </p>
            </div>
            <div>
              <p className="text-muted-foreground">
                {content.statusPage.submittedOn}
              </p>
              <p className="font-medium">
                {formatShortDate(application.createdAt)}
              </p>
            </div>
            <div>
              <p className="text-muted-foreground">
                {content.statusPage.course}
              </p>
              <p className="font-medium">{application.course}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">
            {content.statusPage.roadmap.title}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="relative">
            <div className="absolute left-3.75 top-0 bottom-0 w-0.5 bg-muted" />

            <div className="space-y-6">
              {STATUS_ORDER.map((status, index) => {
                const stepState = getStepStatus(
                  application.status,
                  status,
                  isRejected,
                );
                const isLast = index === STATUS_ORDER.length - 1;

                return (
                  <div key={status} className="relative flex gap-4">
                    <div
                      className={cn(
                        "relative z-10 flex items-center justify-center size-8 rounded-full border-2",
                        stepState === "completed" &&
                          "bg-green-500 border-green-500 text-white",
                        stepState === "current" &&
                          "bg-primary border-primary text-primary-foreground",
                        stepState === "upcoming" &&
                          "bg-background border-muted-foreground/30",
                        stepState === "rejected" &&
                          "bg-red-500 border-red-500 text-white",
                      )}
                    >
                      {stepState === "completed" ? (
                        <CheckCircle className="size-4" />
                      ) : stepState === "rejected" ? (
                        <XCircle className="size-4" />
                      ) : stepState === "current" ? (
                        <Clock className="size-4" />
                      ) : (
                        <Circle className="size-4" />
                      )}
                    </div>

                    <div className={cn("flex-1 pb-6", isLast && "pb-0")}>
                      <p
                        className={cn(
                          "font-medium",
                          stepState === "upcoming" && "text-muted-foreground",
                        )}
                      >
                        {content.statusPage.roadmap[status]}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {
                          content.statusPage.roadmap[
                            `${status}Desc` as keyof typeof content.statusPage.roadmap
                          ]
                        }
                      </p>
                    </div>
                  </div>
                );
              })}

              {isRejected && (
                <div className="relative flex gap-4">
                  <div className="relative z-10 flex items-center justify-center size-8 rounded-full border-2 bg-red-500 border-red-500 text-white">
                    <XCircle className="size-4" />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-red-600">
                      {content.statusPage.roadmap.rejected}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {content.statusPage.roadmap.rejectedDesc}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {hasInterview && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Video className="size-5" />
              {content.statusPage.interview.scheduled}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <p className="text-sm text-muted-foreground">
                {content.statusPage.interview.date}
              </p>
              <p className="font-medium">
                {formatDate(application.interviewDate!)}
              </p>
            </div>

            {application.meetLink && (
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">
                  {content.statusPage.interview.meetLink}
                </p>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      navigator.clipboard.writeText(application.meetLink!);
                      toast.success(content.statusPage.interview.linkCopied);
                    }}
                  >
                    <Copy className="size-4 mr-2" />
                    {content.statusPage.interview.copyLink}
                  </Button>
                  <Button
                    size="sm"
                    onClick={() => window.open(application.meetLink, "_blank")}
                  >
                    <ExternalLink className="size-4 mr-2" />
                    {content.statusPage.interview.joinMeeting}
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {canBookInterview && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <CalendarIcon className="size-5" />
              {content.statusPage.interview.booking.title}
            </CardTitle>
            <p className="text-sm text-muted-foreground">
              {content.statusPage.interview.booking.description}
            </p>
          </CardHeader>
          <CardContent>
            {loadingSlots ? (
              <div className="flex justify-center py-8">
                <Spinner className="size-6" />
              </div>
            ) : (
              <InterviewCalendar
                mode="booking"
                slots={slots}
                selectedSlotId={selectedSlot}
                onSelectSlot={setSelectedSlot}
                onConfirmBooking={handleBookInterview}
                isBooking={isBooking}
                confirmLabel={content.statusPage.interview.booking.confirm.value}
              />
            )}
          </CardContent>
        </Card>
      )}

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">
            {content.statusPage.documents.title}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between p-3 rounded-lg border">
            <div className="flex items-center gap-3">
              <FileText className="size-5 text-muted-foreground" />
              <span className="font-medium">
                {content.statusPage.documents.cv}
              </span>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => window.open(application.cvLink, "_blank")}
            >
              <ExternalLink className="size-4 mr-2" />
              {content.statusPage.documents.view}
            </Button>
          </div>

          <div className="flex items-center justify-between p-3 rounded-lg border">
            <div className="flex items-center gap-3">
              <FileText className="size-5 text-muted-foreground" />
              <span className="font-medium">
                {content.statusPage.documents.motivationLetter}
              </span>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() =>
                window.open(application.motivationLetterLink, "_blank")
              }
            >
              <ExternalLink className="size-4 mr-2" />
              {content.statusPage.documents.view}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
