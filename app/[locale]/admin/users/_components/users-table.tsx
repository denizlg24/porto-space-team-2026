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
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { toast } from "sonner";
import {
  MoreHorizontal,
  Search,
  Check,
  X,
  Trash2,
  Building2,
} from "lucide-react";
import type { User } from "@/lib/actions/users";
import {
  approveUser,
  rejectUser,
  deleteUser,
  updateUserDepartment,
} from "@/lib/actions/users";

const departments = [
  "propulsion",
  "structures",
  "avionics",
  "recovery",
  "operations",
  "business",
] as const;

type OptimisticAction =
  | { type: "approve"; userId: string }
  | { type: "reject"; userId: string }
  | { type: "delete"; userId: string }
  | { type: "department"; userId: string; department: string };

interface UsersTableProps {
  initialUsers: User[];
}

export function UsersTable({ initialUsers }: UsersTableProps) {
  const content = useIntlayer("admin-users-page");
  const [isPending, startTransition] = useTransition();
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [departmentFilter, setDepartmentFilter] = useState<string>("all");
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState<User | null>(null);

  const [optimisticUsers, addOptimisticUpdate] = useOptimistic(
    initialUsers,
    (state: User[], action: OptimisticAction) => {
      switch (action.type) {
        case "approve":
          return state.map((user) =>
            user.id === action.userId
              ? { ...user, approvalStatus: "APPROVED" as const }
              : user
          );
        case "reject":
          return state.map((user) =>
            user.id === action.userId
              ? { ...user, approvalStatus: "REJECTED" as const }
              : user
          );
        case "delete":
          return state.filter((user) => user.id !== action.userId);
        case "department":
          return state.map((user) =>
            user.id === action.userId
              ? { ...user, department: action.department }
              : user
          );
        default:
          return state;
      }
    }
  );

  const filteredUsers = optimisticUsers.filter((user) => {
    const matchesSearch =
      search === "" ||
      user.name.toLowerCase().includes(search.toLowerCase()) ||
      user.email.toLowerCase().includes(search.toLowerCase());

    const matchesStatus =
      statusFilter === "all" || user.approvalStatus === statusFilter;

    const matchesDepartment =
      departmentFilter === "all" || user.department === departmentFilter;

    return matchesSearch && matchesStatus && matchesDepartment;
  });

  const handleApprove = (user: User) => {
    startTransition(async () => {
      addOptimisticUpdate({ type: "approve", userId: user.id });
      const result = await approveUser(user.id);
      if (result.success) {
        toast.success(content.toast.approveSuccess.value);
      } else {
        toast.error(content.toast.error.value);
      }
    });
  };

  const handleReject = (user: User) => {
    startTransition(async () => {
      addOptimisticUpdate({ type: "reject", userId: user.id });
      const result = await rejectUser(user.id);
      if (result.success) {
        toast.success(content.toast.rejectSuccess.value);
      } else {
        toast.error(content.toast.error.value);
      }
    });
  };

  const handleDelete = () => {
    if (!userToDelete) return;
    const userId = userToDelete.id;
    setDeleteDialogOpen(false);
    setUserToDelete(null);

    startTransition(async () => {
      addOptimisticUpdate({ type: "delete", userId });
      const result = await deleteUser(userId);
      if (result.success) {
        toast.success(content.toast.deleteSuccess.value);
      } else {
        toast.error(content.toast.error.value);
      }
    });
  };

  const handleDepartmentChange = (user: User, department: string) => {
    startTransition(async () => {
      addOptimisticUpdate({ type: "department", userId: user.id, department });
      const result = await updateUserDepartment(user.id, department);
      if (result.success) {
        toast.success(content.toast.departmentSuccess.value);
      } else {
        toast.error(content.toast.error.value);
      }
    });
  };

  const getStatusBadge = (status: User["approvalStatus"]) => {
    switch (status) {
      case "APPROVED":
        return <Badge variant="default">{content.status.approved}</Badge>;
      case "REJECTED":
        return <Badge variant="destructive">{content.status.rejected}</Badge>;
      default:
        return <Badge variant="secondary">{content.status.pending}</Badge>;
    }
  };

  const getDepartmentLabel = (dept: string) => {
    return (
      content.departments[dept as keyof typeof content.departments] ?? dept
    );
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
            placeholder={content.searchPlaceholder.value}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9"
          />
        </div>
        <div className="flex gap-2">
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">{content.filters.allStatuses}</SelectItem>
              <SelectItem value="PENDING">{content.status.pending}</SelectItem>
              <SelectItem value="APPROVED">
                {content.status.approved}
              </SelectItem>
              <SelectItem value="REJECTED">
                {content.status.rejected}
              </SelectItem>
            </SelectContent>
          </Select>
          <Select value={departmentFilter} onValueChange={setDepartmentFilter}>
            <SelectTrigger className="w-45">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">
                {content.filters.allDepartments}
              </SelectItem>
              {departments.map((dept) => (
                <SelectItem key={dept} value={dept}>
                  {getDepartmentLabel(dept)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>{content.table.user}</TableHead>
              <TableHead>{content.table.department}</TableHead>
              <TableHead>{content.table.status}</TableHead>
              <TableHead>{content.table.joined}</TableHead>
              <TableHead className="w-17.5">{content.table.actions}</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredUsers.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="h-24 text-center">
                  {content.table.noUsers}
                </TableCell>
              </TableRow>
            ) : (
              filteredUsers.map((user) => (
                <TableRow
                  key={user.id}
                  className={isPending ? "opacity-70" : ""}
                >
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar className="size-8">
                        <AvatarImage src={user.image ?? undefined} />
                        <AvatarFallback className="text-xs">
                          {getInitials(user.name)}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex flex-col">
                        <span className="font-medium">{user.name}</span>
                        <span className="text-xs text-muted-foreground">
                          {user.email}
                        </span>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{getDepartmentLabel(user.department)}</TableCell>
                  <TableCell>{getStatusBadge(user.approvalStatus)}</TableCell>
                  <TableCell className="text-muted-foreground">
                    {new Date(user.createdAt).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon-sm">
                          <MoreHorizontal className="size-4" />
                          <span className="sr-only">
                            {content.table.actions}
                          </span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>
                          {content.table.actions}
                        </DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        {user.approvalStatus !== "APPROVED" && (
                          <DropdownMenuItem onClick={() => handleApprove(user)}>
                            <Check className="size-4" />
                            {content.actions.approve}
                          </DropdownMenuItem>
                        )}
                        {user.approvalStatus !== "REJECTED" && (
                          <DropdownMenuItem onClick={() => handleReject(user)}>
                            <X className="size-4" />
                            {content.actions.reject}
                          </DropdownMenuItem>
                        )}
                        <DropdownMenuSub>
                          <DropdownMenuSubTrigger>
                            <Building2 className="size-4" />
                            {content.actions.changeDepartment}
                          </DropdownMenuSubTrigger>
                          <DropdownMenuSubContent>
                            {departments.map((dept) => (
                              <DropdownMenuItem
                                key={dept}
                                onClick={() =>
                                  handleDepartmentChange(user, dept)
                                }
                                disabled={user.department === dept}
                              >
                                {getDepartmentLabel(dept)}
                                {user.department === dept && (
                                  <Check className="ml-auto size-4" />
                                )}
                              </DropdownMenuItem>
                            ))}
                          </DropdownMenuSubContent>
                        </DropdownMenuSub>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                          className="text-destructive"
                          onClick={() => {
                            setUserToDelete(user);
                            setDeleteDialogOpen(true);
                          }}
                        >
                          <Trash2 className="size-4" />
                          {content.actions.delete}
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
            <AlertDialogTitle>{content.confirmDelete.title}</AlertDialogTitle>
            <AlertDialogDescription>
              {content.confirmDelete.description}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>
              {content.confirmDelete.cancel}
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              {content.confirmDelete.confirm}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
