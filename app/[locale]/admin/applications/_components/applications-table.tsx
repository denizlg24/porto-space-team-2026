"use client";

import { useState } from "react";
import { useIntlayer } from "next-intlayer";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  MoreHorizontal,
  Eye,
  CheckCircle,
  Calendar,
  UserCheck,
  UserX,
  Copy,
  Mail,
  FileText,
  ExternalLink,
  Linkedin,
  Github,
  Trash2,
  Loader2,
} from "lucide-react";
import { toast } from "sonner";
import {
  updateApplicationStatus,
  deleteApplication,
  type ApplicationData,
} from "@/lib/actions/applications";
import type { ApplicationStatus } from "@/models/Application";

interface ApplicationsTableProps {
  initialApplications: ApplicationData[];
}

export function ApplicationsTable({
  initialApplications,
}: ApplicationsTableProps) {
  const content = useIntlayer("admin-applications-page");
  const [applications, setApplications] = useState(initialApplications);
  const [selectedApplication, setSelectedApplication] =
    useState<ApplicationData | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [applicationToDelete, setApplicationToDelete] =
    useState<ApplicationData | null>(null);

  const updateStatus = async (id: string, status: ApplicationStatus) => {
    setIsLoading(true);
    const result = await updateApplicationStatus(id, status);
    setIsLoading(false);

    if (result.success) {
      setApplications((prev) =>
        prev.map((a) => (a.id === id ? { ...a, status } : a)),
      );
      toast.success(content.toasts.statusUpdated);
    } else {
      toast.error(content.toasts.statusUpdateFailed);
    }
  };

  const handleDeleteApplication = async () => {
    if (!applicationToDelete) return;

    setIsLoading(true);
    const result = await deleteApplication(applicationToDelete.id);
    setIsLoading(false);

    if (result.success) {
      setApplications((prev) =>
        prev.filter((a) => a.id !== applicationToDelete.id),
      );
      toast.success(content.toasts.applicationDeleted);
      setDeleteDialogOpen(false);
      setApplicationToDelete(null);
      if (dialogOpen && selectedApplication?.id === applicationToDelete.id) {
        setDialogOpen(false);
        setSelectedApplication(null);
      }
    } else {
      toast.error(content.toasts.applicationDeleteFailed);
    }
  };

  const openDeleteDialog = (application: ApplicationData) => {
    setApplicationToDelete(application);
    setDeleteDialogOpen(true);
  };

  const viewApplication = (application: ApplicationData) => {
    setSelectedApplication(application);
    setDialogOpen(true);
    if (application.status === "new") {
      updateStatus(application.id, "read");
    }
  };

  const copyEmail = (email: string) => {
    navigator.clipboard.writeText(email);
    toast.success(content.toasts.emailCopied);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString(undefined, {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getYearLabel = (year: number) => {
    return content.years[year.toString() as keyof typeof content.years] || year;
  };

  const getStatusLabel = (status: ApplicationStatus) => {
    return content.statuses[status];
  };

  if (applications.length === 0) {
    return (
      <div className="text-center py-12 text-muted-foreground">
        {content.table.empty}
      </div>
    );
  }

  return (
    <>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>{content.table.applicationId}</TableHead>
              <TableHead>{content.table.name}</TableHead>
              <TableHead>{content.table.email}</TableHead>
              <TableHead>{content.table.course}</TableHead>
              <TableHead>{content.table.year}</TableHead>
              <TableHead>{content.table.status}</TableHead>
              <TableHead>{content.table.date}</TableHead>
              <TableHead className="w-17.5">{content.table.actions}</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {applications.map((application) => (
              <TableRow
                key={application.id}
              >
                <TableCell className="font-mono text-sm">
                  {application.applicationId}
                </TableCell>
                <TableCell className="font-medium">
                  {application.name}
                </TableCell>
                <TableCell className="text-muted-foreground">
                  {application.email}
                </TableCell>
                <TableCell className="text-muted-foreground max-w-32 truncate">
                  {application.course}
                </TableCell>
                <TableCell>
                  <Badge variant="outline">
                    {getYearLabel(application.yearOfStudy)}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className="flex flex-col gap-1">
                    <Badge
                      variant="outline"
                    >
                      {getStatusLabel(application.status)}
                    </Badge>
                    {application.status === "interview" &&
                      application.interviewDate && (
                        <span className="text-xs text-muted-foreground">
                          {formatDate(application.interviewDate)}
                        </span>
                      )}
                    {application.status === "interview" &&
                      application.zoomLink && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            navigator.clipboard.writeText(
                              application.zoomLink!,
                            );
                            toast.success(content.toasts.zoomLinkCopied);
                          }}
                          className="text-xs flex items-center gap-1 cursor-pointer"
                        >
                          <Copy className="size-3" />
                          Zoom
                        </button>
                      )}
                  </div>
                </TableCell>
                <TableCell className="text-muted-foreground text-sm">
                  {formatDate(application.createdAt)}
                </TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal className="size-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem
                        onClick={() => viewApplication(application)}
                      >
                        <Eye className="size-4" />
                        {content.actions.view}
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => copyEmail(application.email)}
                      >
                        <Copy className="size-4" />
                        {content.actions.copyEmail}
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem asChild>
                        <a
                          href={application.cvLink}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <FileText className="size-4" />
                          {content.actions.downloadCV}
                        </a>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <a
                          href={application.motivationLetterLink}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <FileText className="size-4" />
                          {content.actions.downloadLetter}
                        </a>
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      {application.status !== "read" &&
                        application.status !== "interview" &&
                        application.status !== "accepted" &&
                        application.status !== "rejected" && (
                          <DropdownMenuItem
                            onClick={() => updateStatus(application.id, "read")}
                          >
                            <CheckCircle className="size-4" />
                            {content.actions.markAsRead}
                          </DropdownMenuItem>
                        )}
                      {application.status !== "interview" &&
                        application.status !== "accepted" &&
                        application.status !== "rejected" && (
                          <DropdownMenuItem
                            onClick={() => updateStatus(application.id, "interview")}
                          >
                            <Calendar className="size-4" />
                            {content.actions.scheduleInterview}
                          </DropdownMenuItem>
                        )}
                      {application.status !== "accepted" && (
                        <DropdownMenuItem
                          onClick={() =>
                            updateStatus(application.id, "accepted")
                          }
                          className="text-green-600"
                        >
                          <UserCheck className="size-4" />
                          {content.actions.accept}
                        </DropdownMenuItem>
                      )}
                      {application.status !== "rejected" && (
                        <DropdownMenuItem
                          onClick={() =>
                            updateStatus(application.id, "rejected")
                          }
                          className="text-red-600"
                        >
                          <UserX className="size-4" />
                          {content.actions.reject}
                        </DropdownMenuItem>
                      )}
                      <DropdownMenuSeparator />
                      <DropdownMenuItem
                        onClick={() => openDeleteDialog(application)}
                        className="text-red-600"
                      >
                        <Trash2 className="size-4" />
                        {content.actions.delete}
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              {content.dialog.title}
              {selectedApplication && (
                <span className="font-mono text-sm text-muted-foreground">
                  {selectedApplication.applicationId}
                </span>
              )}
            </DialogTitle>
            <DialogDescription>
              {selectedApplication && formatDate(selectedApplication.createdAt)}
            </DialogDescription>
          </DialogHeader>
          {selectedApplication && (
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    {content.dialog.applicant}
                  </p>
                  <p className="text-sm">
                    {selectedApplication.name} &lt;{selectedApplication.email}
                    &gt;
                  </p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    {content.table.status}
                  </p>
                  <div className="flex flex-col gap-1">
                    <Badge
                      variant="outline"
                    >
                      {getStatusLabel(selectedApplication.status)}
                    </Badge>
                    {selectedApplication.status === "interview" &&
                      selectedApplication.interviewDate && (
                        <span className="text-xs text-muted-foreground">
                          {content.dialog.interviewScheduled}:{" "}
                          {formatDate(selectedApplication.interviewDate)}
                        </span>
                      )}
                  </div>
                </div>
              </div>

              {selectedApplication.status === "interview" &&
                selectedApplication.zoomLink && (
                  <div className="p-4 rounded-md border">
                    <div className="flex items-center justify-between gap-4">
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium">
                          {content.dialog.zoomMeeting}
                        </p>
                        <p className="text-xs truncate mt-1">
                          {selectedApplication.zoomLink}
                        </p>
                        {selectedApplication.zoomPassword && (
                          <p className="text-xs mt-1">
                            {content.dialog.zoomPassword}:{" "}
                            {selectedApplication.zoomPassword}
                          </p>
                        )}
                      </div>
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            navigator.clipboard.writeText(
                              selectedApplication.zoomLink!,
                            );
                            toast.success(content.toasts.zoomLinkCopied);
                          }}
                        >
                          <Copy className="size-4" />
                          {content.dialog.copyZoomLink}
                        </Button>
                        <Button
                          size="sm"
                          onClick={() =>
                            window.open(selectedApplication.zoomLink, "_blank")
                          }
                        >
                          <ExternalLink className="size-4" />
                          {content.dialog.joinZoom}
                        </Button>
                      </div>
                    </div>
                  </div>
                )}

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    {content.dialog.course}
                  </p>
                  <p className="text-sm">{selectedApplication.course}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    {content.dialog.year}
                  </p>
                  <p className="text-sm">
                    {getYearLabel(selectedApplication.yearOfStudy)}
                  </p>
                </div>
              </div>

              {(selectedApplication.linkedIn || selectedApplication.github) && (
                <div className="grid grid-cols-2 gap-4">
                  {selectedApplication.linkedIn && (
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">
                        {content.dialog.linkedin}
                      </p>
                      <a
                        href={selectedApplication.linkedIn}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-primary hover:underline flex items-center gap-1"
                      >
                        <Linkedin className="size-3" />
                        {content.dialog.openInNewTab}
                        <ExternalLink className="size-3" />
                      </a>
                    </div>
                  )}
                  {selectedApplication.github && (
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">
                        {content.dialog.github}
                      </p>
                      <a
                        href={selectedApplication.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-primary hover:underline flex items-center gap-1"
                      >
                        <Github className="size-3" />
                        {content.dialog.openInNewTab}
                        <ExternalLink className="size-3" />
                      </a>
                    </div>
                  )}
                </div>
              )}

              {selectedApplication.relevantExperience && (
                <div>
                  <p className="text-sm font-medium text-muted-foreground mb-2">
                    {content.dialog.experience}
                  </p>
                  <div className="bg-muted/50 rounded-md p-4 text-sm whitespace-pre-wrap">
                    {selectedApplication.relevantExperience}
                  </div>
                </div>
              )}

              <div>
                <p className="text-sm font-medium text-muted-foreground mb-2">
                  {content.dialog.documents}
                </p>
                <div className="grid grid-cols-2 gap-4">
                  <a
                    href={selectedApplication.cvLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 p-4 border rounded-md hover:bg-muted/50 transition-colors"
                  >
                    <div className="w-10 h-10 border flex items-center justify-center text-primary">
                      <FileText className="size-5" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">{content.dialog.cv}</p>
                      <p className="text-xs text-muted-foreground flex items-center gap-1">
                        {content.dialog.openInNewTab}
                        <ExternalLink className="size-3" />
                      </p>
                    </div>
                  </a>
                  <a
                    href={selectedApplication.motivationLetterLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 p-4 border rounded-md hover:bg-muted/50 transition-colors"
                  >
                    <div className="w-10 h-10 border flex items-center justify-center text-primary">
                      <FileText className="size-5" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">
                        {content.dialog.motivationLetter}
                      </p>
                      <p className="text-xs text-muted-foreground flex items-center gap-1">
                        {content.dialog.openInNewTab}
                        <ExternalLink className="size-3" />
                      </p>
                    </div>
                  </a>
                </div>
              </div>

              <div className="flex flex-wrap justify-between gap-2 pt-4 border-t">
                <div className="flex gap-2">
                  {selectedApplication.status !== "accepted" && (
                    <Button
                      variant="outline"
                      className="text-green-600 border-green-600/20 hover:bg-green-500/10"
                      onClick={() => {
                        updateStatus(selectedApplication.id, "accepted");
                        setDialogOpen(false);
                      }}
                    >
                      <UserCheck className="size-4" />
                      {content.actions.accept}
                    </Button>
                  )}
                  {selectedApplication.status !== "rejected" && (
                    <Button
                      variant="outline"
                      className="text-red-600 border-red-600/20 hover:bg-red-500/10"
                      onClick={() => {
                        updateStatus(selectedApplication.id, "rejected");
                        setDialogOpen(false);
                      }}
                    >
                      <UserX className="size-4" />
                      {content.actions.reject}
                    </Button>
                  )}
                  {selectedApplication.status !== "interview" &&
                    selectedApplication.status !== "accepted" &&
                    selectedApplication.status !== "rejected" && (
                      <Button
                        variant="outline"
                        onClick={() => {
                          updateStatus(selectedApplication.id, "interview");
                          setDialogOpen(false);
                        }}
                      >
                        <Calendar className="size-4" />
                        {content.actions.scheduleInterview}
                      </Button>
                    )}
                  <Button
                    variant="outline"
                    className="text-red-600 border-red-600/20 hover:bg-red-500/10"
                    onClick={() => {
                      openDeleteDialog(selectedApplication);
                    }}
                  >
                    <Trash2 className="size-4" />
                    {content.actions.delete}
                  </Button>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    onClick={() => setDialogOpen(false)}
                  >
                    {content.dialog.close}
                  </Button>
                  <Button
                    onClick={() => {
                      window.location.href = `mailto:${selectedApplication.email}?subject=Re: [${selectedApplication.applicationId}] Your Application to Porto Space Team`;
                    }}
                  >
                    <Mail className="size-4" />
                    {content.dialog.contactApplicant}
                  </Button>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{content.deleteDialog.title}</AlertDialogTitle>
            <AlertDialogDescription>
              {content.deleteDialog.description}
            </AlertDialogDescription>
          </AlertDialogHeader>
          {applicationToDelete && (
            <div className="p-4 bg-muted/50 rounded-md">
              <p className="text-sm font-medium">{applicationToDelete.name}</p>
              <p className="text-sm text-muted-foreground">
                {applicationToDelete.email}
              </p>
              <p className="text-xs font-mono text-muted-foreground mt-1">
                {applicationToDelete.applicationId}
              </p>
            </div>
          )}
          <AlertDialogFooter>
            <AlertDialogCancel
              onClick={() => {
                setDeleteDialogOpen(false);
                setApplicationToDelete(null);
              }}
            >
              {content.deleteDialog.cancel}
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteApplication}
              disabled={isLoading}
              className="bg-red-600 hover:bg-red-700"
            >
              {isLoading && <Loader2 className="size-4 animate-spin" />}
              {content.deleteDialog.confirm}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
