"use client";

import { useIntlayer } from "next-intlayer";
import { useState, useTransition, useOptimistic } from "react";
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
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
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
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { toast } from "sonner";
import { MoreHorizontal, Search, Trash2 } from "lucide-react";
import {
  deleteSubscriber,
  type AdminSubscriberData,
} from "@/lib/actions/newsletter";

type OptimisticAction = { type: "delete"; subscriberId: string };

interface SubscribersTableProps {
  initialSubscribers: AdminSubscriberData[];
}

export function SubscribersTable({ initialSubscribers }: SubscribersTableProps) {
  const content = useIntlayer("admin-newsletter-page");
  const [isPending, startTransition] = useTransition();
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [subscriberToDelete, setSubscriberToDelete] =
    useState<AdminSubscriberData | null>(null);

  const [optimisticSubscribers, addOptimisticUpdate] = useOptimistic(
    initialSubscribers,
    (state: AdminSubscriberData[], action: OptimisticAction) => {
      if (action.type === "delete") {
        return state.filter((sub) => sub.id !== action.subscriberId);
      }
      return state;
    }
  );

  const filteredSubscribers = optimisticSubscribers.filter((subscriber) => {
    const matchesSearch =
      search === "" ||
      subscriber.name.toLowerCase().includes(search.toLowerCase()) ||
      subscriber.email.toLowerCase().includes(search.toLowerCase());

    const isSubscribed = !subscriber.unsubscribedAt;
    const matchesStatus =
      statusFilter === "all" ||
      (statusFilter === "subscribed" && isSubscribed) ||
      (statusFilter === "unsubscribed" && !isSubscribed);

    return matchesSearch && matchesStatus;
  });

  const handleDelete = () => {
    if (!subscriberToDelete) return;
    const subscriberId = subscriberToDelete.id;
    setDeleteDialogOpen(false);
    setSubscriberToDelete(null);

    startTransition(async () => {
      addOptimisticUpdate({ type: "delete", subscriberId });
      const result = await deleteSubscriber(subscriberId);
      if (result.success) {
        toast.success(content.subscribers.toast.deleteSuccess.value);
      } else {
        toast.error(content.subscribers.toast.error.value);
      }
    });
  };

  const getStatusBadge = (unsubscribedAt: string | null) => {
    if (unsubscribedAt) {
      return (
        <Badge variant="secondary">{content.subscribers.status.unsubscribed}</Badge>
      );
    }
    return <Badge variant="default">{content.subscribers.status.subscribed}</Badge>;
  };

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder={content.subscribers.searchPlaceholder.value}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9"
          />
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-40">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">
              {content.subscribers.filters.allStatuses}
            </SelectItem>
            <SelectItem value="subscribed">
              {content.subscribers.filters.subscribed}
            </SelectItem>
            <SelectItem value="unsubscribed">
              {content.subscribers.filters.unsubscribed}
            </SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>{content.subscribers.table.subscriber}</TableHead>
              <TableHead>{content.subscribers.table.dateOfBirth}</TableHead>
              <TableHead>{content.subscribers.table.status}</TableHead>
              <TableHead>{content.subscribers.table.subscribedAt}</TableHead>
              <TableHead className="w-17.5">
                {content.subscribers.table.actions}
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredSubscribers.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="h-24 text-center">
                  {content.subscribers.table.noSubscribers}
                </TableCell>
              </TableRow>
            ) : (
              filteredSubscribers.map((subscriber) => (
                <TableRow
                  key={subscriber.id}
                  className={isPending ? "opacity-70" : ""}
                >
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar className="size-8">
                        <AvatarFallback className="text-xs">
                          {getInitials(subscriber.name)}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex flex-col">
                        <span className="font-medium">{subscriber.name}</span>
                        <span className="text-xs text-muted-foreground">
                          {subscriber.email}
                        </span>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    {new Date(subscriber.dateOfBirth).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    {getStatusBadge(subscriber.unsubscribedAt)}
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    {new Date(subscriber.subscribedAt).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon-sm">
                          <MoreHorizontal className="size-4" />
                          <span className="sr-only">
                            {content.subscribers.table.actions}
                          </span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>
                          {content.subscribers.table.actions}
                        </DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                          className="text-destructive"
                          onClick={() => {
                            setSubscriberToDelete(subscriber);
                            setDeleteDialogOpen(true);
                          }}
                        >
                          <Trash2 className="size-4" />
                          {content.subscribers.actions.delete}
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              {content.subscribers.confirmDelete.title}
            </AlertDialogTitle>
            <AlertDialogDescription>
              {content.subscribers.confirmDelete.description}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>
              {content.subscribers.confirmDelete.cancel}
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              {content.subscribers.confirmDelete.confirm}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
