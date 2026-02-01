"use client";

import { useState } from "react";
import { useIntlayer } from "next-intlayer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Calendar, Trash2 } from "lucide-react";
import { toast } from "sonner";
import {
  createInterviewSlot,
  createBulkInterviewSlots,
  deleteInterviewSlot,
  deleteAllUnbookedSlots,
  type InterviewSlotData,
} from "@/lib/actions/interview-slots";
import { InterviewCalendar } from "@/components/interview-calendar";

interface InterviewSlotsManagerProps {
  initialSlots: InterviewSlotData[];
}

export function InterviewSlotsManager({
  initialSlots,
}: InterviewSlotsManagerProps) {
  const content = useIntlayer("admin-interview-slots-page");
  const [slots, setSlots] = useState(initialSlots);

  const handleAddSlot = async (startTime: string, endTime: string) => {
    const result = await createInterviewSlot(startTime, endTime);

    if (result.success) {
      setSlots(
        [...slots, result.data].sort(
          (a, b) =>
            new Date(a.startTime).getTime() - new Date(b.startTime).getTime(),
        ),
      );
      toast.success(content.toasts.slotAdded);
    } else {
      toast.error(result.error);
    }
  };

  const handleAddBulkSlots = async (
    slotsToCreate: Array<{ startTime: string; endTime: string }>,
  ) => {
    const result = await createBulkInterviewSlots(slotsToCreate);

    if (result.success) {
      setSlots(
        [...slots, ...result.data].sort(
          (a, b) =>
            new Date(a.startTime).getTime() - new Date(b.startTime).getTime(),
        ),
      );
      toast.success(`${result.data.length} ${content.toasts.slotsAdded.value}`);
    } else {
      toast.error(result.error);
    }
  };

  const handleDeleteSlot = async (id: string) => {
    const result = await deleteInterviewSlot(id);

    if (result.success) {
      setSlots(slots.filter((s) => s.id !== id));
      toast.success(content.toasts.slotDeleted.value);
    } else {
      toast.error(result.error);
    }
  };

  const handleDeleteAllUnbooked = async () => {
    const result = await deleteAllUnbookedSlots();

    if (result.success) {
      setSlots(slots.filter((s) => s.isBooked));
      toast.success(content.toasts.allDeleted.value);
    } else {
      toast.error(result.error);
    }
  };

  const unbookedCount = slots.filter((s) => !s.isBooked).length;
  const bookedCount = slots.filter((s) => s.isBooked).length;

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-3 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold">{slots.length}</div>
            <p className="text-sm text-muted-foreground">Total Slots</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold text-green-600">
              {unbookedCount}
            </div>
            <p className="text-sm text-muted-foreground">
              {content.slots.available}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold">
              {bookedCount}
            </div>
            <p className="text-sm text-muted-foreground">
              {content.slots.booked}
            </p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-lg flex items-center gap-2">
            <Calendar className="size-5" />
            {content.slots.title}
          </CardTitle>
          {unbookedCount > 0 && (
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="outline" size="sm" className="text-red-600">
                  <Trash2 className="size-4 mr-2" />
                  {content.slots.deleteAll}
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>
                    Delete all unbooked slots?
                  </AlertDialogTitle>
                  <AlertDialogDescription>
                    This will delete {unbookedCount} unbooked slot(s). This
                    action cannot be undone.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction onClick={handleDeleteAllUnbooked}>
                    Delete All
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          )}
        </CardHeader>
        <CardContent>
          <InterviewCalendar
            mode="admin"
            slots={slots}
            onAddSlot={handleAddSlot}
            onAddBulkSlots={handleAddBulkSlots}
            onDeleteSlot={handleDeleteSlot}
            labels={{
              addSlot: content.addSlot.add.value,
              addMultiple: content.addSlot.addMultiple.value,
              startTime: content.addSlot.startTime.value,
              endTime: content.addSlot.endTime.value,
              duration: content.addSlot.duration.value,
              available: content.slots.available.value,
              booked: content.slots.booked.value,
              noSlots: content.slots.empty.value,
              selectDay: "Click on a day to manage slots",
            }}
          />
        </CardContent>
      </Card>
    </div>
  );
}
