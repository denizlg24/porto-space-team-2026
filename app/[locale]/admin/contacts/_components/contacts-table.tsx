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
  MoreHorizontal,
  Eye,
  CheckCircle,
  MessageCircle,
  Archive,
  Copy,
  Mail,
} from "lucide-react";
import { toast } from "sonner";
import { apiClient } from "@/lib/api-client";
import type { ContactData, UpdateContactRoute } from "@/app/api/contacts/route";
import type { ContactStatus, ContactSubject } from "@/models/Contact";
import { cn } from "@/lib/utils";

interface ContactsTableProps {
  initialContacts: ContactData[];
}

const STATUS_COLORS: Record<ContactStatus, string> = {
  new: "bg-blue-500/10 text-blue-600 border-blue-500/20",
  read: "bg-yellow-500/10 text-yellow-600 border-yellow-500/20",
  replied: "bg-green-500/10 text-green-600 border-green-500/20",
  archived: "bg-gray-500/10 text-gray-600 border-gray-500/20",
};

export function ContactsTable({ initialContacts }: ContactsTableProps) {
  const content = useIntlayer("admin-contacts-page");
  const [contacts, setContacts] = useState(initialContacts);
  const [selectedContact, setSelectedContact] = useState<ContactData | null>(
    null
  );
  const [dialogOpen, setDialogOpen] = useState(false);

  const updateStatus = async (id: string, status: ContactStatus) => {
    const contactsApi = apiClient<UpdateContactRoute>("/api/contacts");
    const result = await contactsApi.patch({
      input: { id, status },
    });

    if (result.success) {
      setContacts((prev) =>
        prev.map((c) => (c.id === id ? { ...c, status } : c))
      );
      toast.success("Status updated");
    } else {
      toast.error("Failed to update status");
    }
  };

  const viewContact = (contact: ContactData) => {
    setSelectedContact(contact);
    setDialogOpen(true);
    if (contact.status === "new") {
      updateStatus(contact.id, "read");
    }
  };

  const copyEmail = (email: string) => {
    navigator.clipboard.writeText(email);
    toast.success("Email copied to clipboard");
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

  const getSubjectLabel = (subject: ContactSubject) => {
    return content.subjects[subject];
  };

  const getStatusLabel = (status: ContactStatus) => {
    return content.statuses[status];
  };

  if (contacts.length === 0) {
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
              <TableHead>{content.table.ticketId}</TableHead>
              <TableHead>{content.table.name}</TableHead>
              <TableHead>{content.table.email}</TableHead>
              <TableHead>{content.table.subject}</TableHead>
              <TableHead>{content.table.status}</TableHead>
              <TableHead>{content.table.date}</TableHead>
              <TableHead className="w-17.5">{content.table.actions}</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {contacts.map((contact) => (
              <TableRow
                key={contact.id}
                className={cn(
                  contact.status === "new" && "bg-blue-500/5"
                )}
              >
                <TableCell className="font-mono text-sm">
                  {contact.ticketId}
                </TableCell>
                <TableCell className="font-medium">{contact.name}</TableCell>
                <TableCell className="text-muted-foreground">
                  {contact.email}
                </TableCell>
                <TableCell>
                  <Badge variant="outline">
                    {getSubjectLabel(contact.subject)}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Badge
                    variant="outline"
                    className={STATUS_COLORS[contact.status]}
                  >
                    {getStatusLabel(contact.status)}
                  </Badge>
                </TableCell>
                <TableCell className="text-muted-foreground text-sm">
                  {formatDate(contact.createdAt)}
                </TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal className="size-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => viewContact(contact)}>
                        <Eye className="size-4" />
                        {content.actions.view}
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => copyEmail(contact.email)}
                      >
                        <Copy className="size-4" />
                        {content.actions.copyEmail}
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      {contact.status !== "read" && (
                        <DropdownMenuItem
                          onClick={() => updateStatus(contact.id, "read")}
                        >
                          <CheckCircle className="size-4" />
                          {content.actions.markAsRead}
                        </DropdownMenuItem>
                      )}
                      {contact.status !== "replied" && (
                        <DropdownMenuItem
                          onClick={() => updateStatus(contact.id, "replied")}
                        >
                          <MessageCircle className="size-4" />
                          {content.actions.markAsReplied}
                        </DropdownMenuItem>
                      )}
                      {contact.status !== "archived" && (
                        <DropdownMenuItem
                          onClick={() => updateStatus(contact.id, "archived")}
                        >
                          <Archive className="size-4" />
                          {content.actions.archive}
                        </DropdownMenuItem>
                      )}
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              {content.dialog.title}
              {selectedContact && (
                <span className="font-mono text-sm text-muted-foreground">
                  {selectedContact.ticketId}
                </span>
              )}
            </DialogTitle>
            <DialogDescription>
              {selectedContact && formatDate(selectedContact.createdAt)}
            </DialogDescription>
          </DialogHeader>
          {selectedContact && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    {content.dialog.from}
                  </p>
                  <p className="text-sm">
                    {selectedContact.name} &lt;{selectedContact.email}&gt;
                  </p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    {content.dialog.subject}
                  </p>
                  <p className="text-sm">
                    {getSubjectLabel(selectedContact.subject)}
                  </p>
                </div>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground mb-2">
                  {content.dialog.message}
                </p>
                <div className="bg-muted/50 rounded-md p-4 text-sm whitespace-pre-wrap">
                  {selectedContact.message}
                </div>
              </div>
              <div className="flex justify-end gap-2 pt-4">
                <Button
                  variant="outline"
                  onClick={() => setDialogOpen(false)}
                >
                  {content.dialog.close}
                </Button>
                <Button
                  onClick={() => {
                    window.location.href = `mailto:${selectedContact.email}?subject=Re: [${selectedContact.ticketId}]`;
                    updateStatus(selectedContact.id, "replied");
                  }}
                >
                  <Mail className="size-4" />
                  {content.dialog.reply}
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
