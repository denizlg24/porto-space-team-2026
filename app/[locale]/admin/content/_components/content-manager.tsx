"use client";

import { useState, useTransition, useOptimistic } from "react";
import { useIntlayer } from "next-intlayer";
import { toast } from "sonner";
import { format } from "date-fns";
import { CalendarIcon, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import {
  updateHomePageContent,
  type HomePageContent,
} from "@/lib/actions/content";

type Props = {
  initialHomeContent: HomePageContent;
};

export function ContentManager({ initialHomeContent }: Props) {
  const content = useIntlayer("admin-content-page");
  const [isPending, startTransition] = useTransition();

  const [homeContent, setHomeContent] = useState(initialHomeContent);
  const [, setOptimisticHome] = useOptimistic(homeContent);

  const [countdownEnabled, setCountdownEnabled] = useState(
    initialHomeContent.countdownEnabled
  );
  const [competitionName, setCompetitionName] = useState(
    initialHomeContent.competitionName ?? ""
  );
  const [competitionDate, setCompetitionDate] = useState<Date | null>(
    initialHomeContent.competitionDate
      ? new Date(initialHomeContent.competitionDate)
      : null
  );
  const [timeValue, setTimeValue] = useState(() => {
    if (!initialHomeContent.competitionDate) return "10:00";
    const date = new Date(initialHomeContent.competitionDate);
    return `${String(date.getHours()).padStart(2, "0")}:${String(date.getMinutes()).padStart(2, "0")}`;
  });
  const [calendarOpen, setCalendarOpen] = useState(false);

  const [teamMembers, setTeamMembers] = useState(
    initialHomeContent.teamMembers?.toString() ?? ""
  );
  const [projectsCount, setProjectsCount] = useState(
    initialHomeContent.projectsCount?.toString() ?? ""
  );

  const handleDateSelect = (date: Date | undefined) => {
    if (!date) {
      setCompetitionDate(null);
      return;
    }
    const [hours, minutes] = timeValue.split(":").map(Number);
    date.setHours(hours, minutes);
    setCompetitionDate(date);
  };

  const handleTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const time = e.target.value;
    setTimeValue(time);
    if (time && competitionDate) {
      const [hours, minutes] = time.split(":").map(Number);
      const newDate = new Date(competitionDate);
      newDate.setHours(hours, minutes);
      setCompetitionDate(newDate);
    }
  };

  const handleClearDate = () => {
    setCompetitionDate(null);
  };

  const handleSaveHome = () => {
    const membersNum = teamMembers.trim() ? parseInt(teamMembers, 10) : null;
    const projectsNum = projectsCount.trim()
      ? parseInt(projectsCount, 10)
      : null;

    const newContent: HomePageContent = {
      countdownEnabled,
      competitionName: competitionName.trim() || null,
      competitionDate: competitionDate?.toISOString() ?? null,
      teamMembers: membersNum,
      projectsCount: projectsNum,
    };

    startTransition(async () => {
      setOptimisticHome(newContent);

      const result = await updateHomePageContent(newContent);
      if (result.success) {
        setHomeContent(result.data);
        setCountdownEnabled(result.data.countdownEnabled);
        setCompetitionName(result.data.competitionName ?? "");
        setTeamMembers(result.data.teamMembers?.toString() ?? "");
        setProjectsCount(result.data.projectsCount?.toString() ?? "");
        toast.success(content.toast.success.value);
      } else {
        toast.error(content.toast.error.value);
      }
    });
  };

  const currentName = homeContent.competitionName ?? "";
  const currentMembers = homeContent.teamMembers?.toString() ?? "";
  const currentProjects = homeContent.projectsCount?.toString() ?? "";

  const hasHomeChanges =
    countdownEnabled !== homeContent.countdownEnabled ||
    competitionName.trim() !== currentName ||
    (competitionDate?.toISOString() ?? null) !== homeContent.competitionDate ||
    teamMembers.trim() !== currentMembers ||
    projectsCount.trim() !== currentProjects;

  return (
    <Tabs defaultValue="home" className="space-y-4">
      <TabsList>
        <TabsTrigger value="home">{content.tabs.home}</TabsTrigger>
      </TabsList>

      <TabsContent value="home">
        <Card>
          <CardHeader>
            <CardTitle>{content.home.title}</CardTitle>
            <CardDescription>{content.home.description}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between rounded-lg border p-4">
              <div className="space-y-0.5">
                <Label htmlFor="countdown-enabled">
                  {content.home.countdownEnabled.label}
                </Label>
                <p className="text-sm text-muted-foreground">
                  {content.home.countdownEnabled.description}
                </p>
              </div>
              <Switch
                id="countdown-enabled"
                checked={countdownEnabled}
                onCheckedChange={setCountdownEnabled}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="competition-name">
                {content.home.competitionName.label}
              </Label>
              <Input
                id="competition-name"
                value={competitionName}
                onChange={(e) => setCompetitionName(e.target.value)}
                placeholder={content.home.competitionName.placeholder.value}
                disabled={!countdownEnabled}
              />
              <p className="text-sm text-muted-foreground">
                {content.home.competitionName.description}
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="competition-date">
                {content.home.competitionDate.label}
              </Label>
              <div className="flex gap-2 flex-wrap">
                <Popover open={calendarOpen} onOpenChange={setCalendarOpen}>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      disabled={!countdownEnabled}
                      className={cn(
                        "w-70 justify-start text-left font-normal",
                        !competitionDate && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {competitionDate ? (
                        format(competitionDate, "PPP")
                      ) : (
                        <span>{content.home.competitionDate.placeholder}</span>
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={competitionDate ?? undefined}
                      onSelect={(date) => {
                        handleDateSelect(date);
                        setCalendarOpen(false);
                      }}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                <Input
                  type="time"
                  value={timeValue}
                  onChange={handleTimeChange}
                  className="w-35"
                  disabled={!countdownEnabled || !competitionDate}
                />
                {competitionDate && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleClearDate}
                    disabled={!countdownEnabled}
                  >
                    {content.form.clear}
                  </Button>
                )}
              </div>
              <p className="text-sm text-muted-foreground">
                {content.home.competitionDate.description}
              </p>
            </div>

            <Separator />

            <div className="space-y-4">
              <div>
                <h4 className="text-sm font-medium">
                  {content.home.quickStats.title}
                </h4>
                <p className="text-sm text-muted-foreground">
                  {content.home.quickStats.description}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="team-members">
                    {content.home.quickStats.teamMembers.label}
                  </Label>
                  <Input
                    id="team-members"
                    type="number"
                    min="0"
                    value={teamMembers}
                    onChange={(e) => setTeamMembers(e.target.value)}
                    placeholder={
                      content.home.quickStats.teamMembers.placeholder.value
                    }
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="projects-count">
                    {content.home.quickStats.projectsCount.label}
                  </Label>
                  <Input
                    id="projects-count"
                    type="number"
                    min="0"
                    value={projectsCount}
                    onChange={(e) => setProjectsCount(e.target.value)}
                    placeholder={
                      content.home.quickStats.projectsCount.placeholder.value
                    }
                  />
                </div>
              </div>
            </div>

            <Button
              onClick={handleSaveHome}
              disabled={isPending || !hasHomeChanges}
            >
              {isPending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  {content.form.saving}
                </>
              ) : (
                content.form.save
              )}
            </Button>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
}
