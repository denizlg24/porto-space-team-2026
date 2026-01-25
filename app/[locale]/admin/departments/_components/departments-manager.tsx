"use client";

import { useIntlayer } from "next-intlayer";
import { useState, useTransition, useOptimistic, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toast } from "sonner";
import {
  Plus,
  GripVertical,
  MoreHorizontal,
  Pencil,
  Trash2,
  Loader2,
} from "lucide-react";
import type { DepartmentItem } from "@/lib/actions/departments";
import {
  createDepartment,
  updateDepartment,
  deleteDepartment,
  reorderDepartments,
} from "@/lib/actions/departments";

interface DepartmentsManagerProps {
  initialDepartments: DepartmentItem[];
}

type DepartmentAction =
  | { type: "add"; department: DepartmentItem }
  | { type: "update"; department: DepartmentItem }
  | { type: "delete"; departmentId: string }
  | { type: "reorder"; departments: DepartmentItem[] };

export function DepartmentsManager({
  initialDepartments,
}: DepartmentsManagerProps) {
  const content = useIntlayer("admin-departments-page");
  const [isPending, startTransition] = useTransition();

  const [departments, setDepartments] = useState(initialDepartments);

  const [optimisticDepartments, updateOptimisticDepartments] = useOptimistic(
    departments,
    (state: DepartmentItem[], action: DepartmentAction) => {
      switch (action.type) {
        case "add":
          return [...state, action.department];
        case "update":
          return state.map((d) =>
            d.id === action.department.id ? action.department : d
          );
        case "delete":
          return state.filter((d) => d.id !== action.departmentId);
        case "reorder":
          return action.departments;
        default:
          return state;
      }
    }
  );

  const [dialogOpen, setDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [editingDepartment, setEditingDepartment] =
    useState<DepartmentItem | null>(null);
  const [departmentToDelete, setDepartmentToDelete] =
    useState<DepartmentItem | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);
  const [dragOverIndex, setDragOverIndex] = useState<number | null>(null);

  const [formData, setFormData] = useState({
    name: "",
    code: "",
  });

  const resetForm = () => {
    setFormData({ name: "", code: "" });
    setEditingDepartment(null);
  };

  const openCreateDialog = () => {
    resetForm();
    setDialogOpen(true);
  };

  const openEditDialog = (department: DepartmentItem) => {
    setEditingDepartment(department);
    setFormData({
      name: department.name,
      code: department.code,
    });
    setDialogOpen(true);
  };

  const handleAdd = useCallback((department: DepartmentItem) => {
    setDepartments((prev) => [...prev, department]);
  }, []);

  const handleUpdate = useCallback((department: DepartmentItem) => {
    setDepartments((prev) =>
      prev.map((d) => (d.id === department.id ? department : d))
    );
  }, []);

  const handleDelete = useCallback((departmentId: string) => {
    setDepartments((prev) => prev.filter((d) => d.id !== departmentId));
  }, []);

  const handleReorder = useCallback((newDepartments: DepartmentItem[]) => {
    setDepartments(newDepartments);
  }, []);

  const handleSubmit = async () => {
    if (!formData.name.trim() || !formData.code.trim()) return;

    setIsSubmitting(true);

    if (editingDepartment) {
      startTransition(async () => {
        const tempDepartment = {
          ...editingDepartment,
          name: formData.name,
          code: formData.code.toUpperCase(),
        };
        updateOptimisticDepartments({ type: "update", department: tempDepartment });

        const result = await updateDepartment(editingDepartment.id, {
          name: formData.name,
          code: formData.code,
        });

        if (result.success) {
          handleUpdate(result.data);
          toast.success(content.toast.updated.value);
          setDialogOpen(false);
          resetForm();
        } else {
          toast.error(result.error);
        }
        setIsSubmitting(false);
      });
    } else {
      startTransition(async () => {
        const result = await createDepartment({
          name: formData.name,
          code: formData.code,
        });

        if (result.success) {
          handleAdd(result.data);
          toast.success(content.toast.created.value);
          setDialogOpen(false);
          resetForm();
        } else {
          toast.error(result.error);
        }
        setIsSubmitting(false);
      });
    }
  };

  const handleDeleteConfirm = () => {
    if (!departmentToDelete) return;

    const departmentId = departmentToDelete.id;
    setDeleteDialogOpen(false);

    startTransition(async () => {
      updateOptimisticDepartments({ type: "delete", departmentId });

      const result = await deleteDepartment(departmentId);

      if (result.success) {
        handleDelete(departmentId);
        toast.success(content.toast.deleted.value);
      } else {
        toast.error(result.error);
      }
      setDepartmentToDelete(null);
    });
  };

  const handleDragStart = (index: number) => {
    setDraggedIndex(index);
  };

  const handleDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    if (draggedIndex === null || draggedIndex === index) return;
    setDragOverIndex(index);
  };

  const handleDragEnd = () => {
    if (
      draggedIndex === null ||
      dragOverIndex === null ||
      draggedIndex === dragOverIndex
    ) {
      setDraggedIndex(null);
      setDragOverIndex(null);
      return;
    }

    const newDepartments = [...departments];
    const [draggedItem] = newDepartments.splice(draggedIndex, 1);
    newDepartments.splice(dragOverIndex, 0, draggedItem);

    const reorderedDepartments = newDepartments.map((dept, i) => ({
      ...dept,
      order: i,
    }));

    const departmentIds = reorderedDepartments.map((d) => d.id);

    setDraggedIndex(null);
    setDragOverIndex(null);

    startTransition(async () => {
      updateOptimisticDepartments({
        type: "reorder",
        departments: reorderedDepartments,
      });

      const result = await reorderDepartments(departmentIds);

      if (result.success) {
        handleReorder(reorderedDepartments);
        toast.success(content.toast.reordered.value);
      } else {
        toast.error(result.error);
      }
    });
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold">{content.list.title}</h2>
          <p className="text-sm text-muted-foreground">
            {content.list.description}
          </p>
        </div>
        <Button onClick={openCreateDialog}>
          <Plus className="size-4" />
          {content.actions.add}
        </Button>
      </div>

      {optimisticDepartments.length === 0 ? (
        <Card>
          <CardContent className="flex items-center justify-center py-12">
            <p className="text-muted-foreground">{content.list.empty}</p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-2">
          <p className="text-xs text-muted-foreground">{content.list.dragHint}</p>
          <div className="space-y-2">
            {optimisticDepartments.map((department, index) => (
              <Card
                key={department.id}
                draggable
                onDragStart={() => handleDragStart(index)}
                onDragOver={(e) => handleDragOver(e, index)}
                onDragEnd={handleDragEnd}
                className={`cursor-move transition-all ${
                  isPending ? "opacity-70" : ""
                } ${draggedIndex === index ? "opacity-50 scale-95" : ""} ${
                  dragOverIndex === index && draggedIndex !== index
                    ? "border-primary border-2"
                    : ""
                }`}
              >
                <CardHeader className="py-3">
                  <div className="flex items-center gap-3">
                    <GripVertical className="size-4 text-muted-foreground" />
                    <div className="flex-1 flex items-center gap-4">
                      <span className="font-mono text-xs text-primary bg-primary/10 px-2 py-1 rounded">
                        {department.code}
                      </span>
                      <span className="font-medium">{department.name}</span>
                    </div>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon-sm">
                          <MoreHorizontal className="size-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem
                          onClick={() => openEditDialog(department)}
                        >
                          <Pencil className="size-4" />
                          {content.actions.edit}
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          className="text-destructive"
                          onClick={() => {
                            setDepartmentToDelete(department);
                            setDeleteDialogOpen(true);
                          }}
                        >
                          <Trash2 className="size-4" />
                          {content.actions.delete}
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      )}

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>
              {editingDepartment ? content.dialog.editTitle : content.dialog.addTitle}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>{content.form.name}</Label>
              <Input
                value={formData.name}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, name: e.target.value }))
                }
                placeholder={content.form.namePlaceholder.value}
              />
            </div>
            <div className="space-y-2">
              <Label>{content.form.code}</Label>
              <Input
                value={formData.code}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    code: e.target.value.toUpperCase(),
                  }))
                }
                placeholder={content.form.codePlaceholder.value}
                maxLength={5}
                className="font-mono uppercase"
              />
              <p className="text-xs text-muted-foreground">
                {content.form.codeDescription}
              </p>
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => {
                setDialogOpen(false);
                resetForm();
              }}
            >
              {content.form.cancel}
            </Button>
            <Button
              onClick={handleSubmit}
              disabled={!formData.name.trim() || !formData.code.trim() || isSubmitting}
            >
              {isSubmitting && <Loader2 className="size-4 animate-spin" />}
              {editingDepartment ? content.form.save : content.form.create}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{content.confirmDelete.title}</AlertDialogTitle>
            <AlertDialogDescription>
              {content.confirmDelete.description}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>{content.confirmDelete.cancel}</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteConfirm}
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
