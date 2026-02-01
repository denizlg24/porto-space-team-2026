"use client";

import { useState, useMemo } from "react";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Spinner } from "@/components/ui/spinner";
import { cn } from "@/lib/utils";
import { Plus, Trash2, Clock, Check } from "lucide-react";

export interface InterviewSlot {
  id: string;
  startTime: string;
  endTime: string;
  isBooked?: boolean;
  bookedBy?: string;
}

interface BaseCalendarProps {
  slots: InterviewSlot[];
  selectedSlotId?: string | null;
  isLoading?: boolean;
}

interface BookingModeProps extends BaseCalendarProps {
  mode: "booking";
  onSelectSlot: (slotId: string) => void;
  onConfirmBooking: () => void;
  isBooking?: boolean;
  confirmLabel?: string;
}

interface AdminModeProps extends BaseCalendarProps {
  mode: "admin";
  onAddSlot: (startTime: string, endTime: string) => Promise<void>;
  onAddBulkSlots: (
    slots: Array<{ startTime: string; endTime: string }>,
  ) => Promise<void>;
  onDeleteSlot: (slotId: string) => Promise<void>;
  labels?: {
    addSlot?: string;
    addMultiple?: string;
    startTime?: string;
    endTime?: string;
    duration?: string;
    available?: string;
    booked?: string;
    noSlots?: string;
    selectDay?: string;
  };
}

type InterviewCalendarProps = BookingModeProps | AdminModeProps;

export function InterviewCalendar(props: InterviewCalendarProps) {
  const { slots, selectedSlotId } = props;
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [addMode, setAddMode] = useState<"single" | "bulk">("single");
  const [startTime, setStartTime] = useState("09:00");
  const [endTime, setEndTime] = useState("17:00");
  const [duration, setDuration] = useState(60);
  const [isAdding, setIsAdding] = useState(false);
  const [isDeletingId, setIsDeletingId] = useState<string | null>(null);

  const slotsByDate = useMemo(() => {
    const map = new Map<string, InterviewSlot[]>();
    slots.forEach((slot) => {
      const dateKey = new Date(slot.startTime).toDateString();
      if (!map.has(dateKey)) map.set(dateKey, []);
      map.get(dateKey)!.push(slot);
    });

    map.forEach((daySlots) => {
      daySlots.sort(
        (a, b) =>
          new Date(a.startTime).getTime() - new Date(b.startTime).getTime(),
      );
    });
    return map;
  }, [slots]);

  const datesWithSlots = useMemo(() => {
    const dates: Date[] = [];
    slotsByDate.forEach((_, dateKey) => {
      dates.push(new Date(dateKey));
    });
    return dates;
  }, [slotsByDate]);

  const availableDates = useMemo(() => {
    if (props.mode !== "booking") return [];
    const dates: Date[] = [];
    slotsByDate.forEach((daySlots, dateKey) => {
      if (daySlots.some((s) => !s.isBooked)) {
        dates.push(new Date(dateKey));
      }
    });
    return dates;
  }, [slotsByDate, props.mode]);

  const selectedDateSlots = selectedDate
    ? slotsByDate.get(selectedDate.toDateString()) || []
    : [];

  const formatTime = (isoString: string) => {
    return new Date(isoString).toLocaleTimeString(undefined, {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const formatDateHeader = (date: Date) => {
    return date.toLocaleDateString(undefined, {
      weekday: "long",
      month: "long",
      day: "numeric",
    });
  };

  const handleDayClick = (date: Date) => {
    setSelectedDate(date);
    setDialogOpen(true);
  };

  const handleAddSingleSlot = async () => {
    if (props.mode !== "admin" || !selectedDate) return;

    setIsAdding(true);
    const dateStr = selectedDate.toISOString().split("T")[0];
    const start = new Date(`${dateStr}T${startTime}`);
    const end = new Date(start.getTime() + duration * 60000);

    await props.onAddSlot(start.toISOString(), end.toISOString());
    setIsAdding(false);
  };

  const handleAddBulkSlots = async () => {
    if (props.mode !== "admin" || !selectedDate) return;

    const dateStr = selectedDate.toISOString().split("T")[0];
    const startOfDay = new Date(`${dateStr}T${startTime}`);
    const endOfDay = new Date(`${dateStr}T${endTime}`);

    const slotsToCreate: Array<{ startTime: string; endTime: string }> = [];
    let currentStart = startOfDay;

    while (currentStart.getTime() + duration * 60000 <= endOfDay.getTime()) {
      const currentEnd = new Date(currentStart.getTime() + duration * 60000);
      slotsToCreate.push({
        startTime: currentStart.toISOString(),
        endTime: currentEnd.toISOString(),
      });
      currentStart = currentEnd;
    }

    if (slotsToCreate.length === 0) return;

    setIsAdding(true);
    await props.onAddBulkSlots(slotsToCreate);
    setIsAdding(false);
  };

  const handleDeleteSlot = async (slotId: string) => {
    if (props.mode !== "admin") return;
    setIsDeletingId(slotId);
    await props.onDeleteSlot(slotId);
    setIsDeletingId(null);
  };

  const modifiers = useMemo(() => {
    if (props.mode === "booking") {
      return {
        hasSlots: availableDates,
      };
    }
    return {
      hasSlots: datesWithSlots,
    };
  }, [props.mode, availableDates, datesWithSlots]);

  const modifiersClassNames = {
    hasSlots:
      "bg-primary/10 text-primary hover:bg-primary/20 font-medium relative after:absolute after:bottom-1 after:left-1/2 after:-translate-x-1/2 after:size-1 after:rounded-full after:bg-primary",
  };

  return (
    <div className="space-y-4 w-full max-w-3xl mx-auto">
      <div className="flex justify-center w-full">
        <Calendar
          mode="single"
          selected={selectedDate}
          onSelect={(date) => date && handleDayClick(date)}
          disabled={(date) => date < new Date(new Date().setHours(0, 0, 0, 0))}
          modifiers={modifiers}
          modifiersClassNames={modifiersClassNames}
          className="border w-full"
        />
      </div>

      {props.mode === "booking" && (
        <p className="text-sm text-muted-foreground text-center">
          {availableDates.length > 0
            ? "Click on a highlighted day to see available slots"
            : "No available interview slots"}
        </p>
      )}

      {props.mode === "admin" && (
        <p className="text-sm text-muted-foreground text-center">
          {props.labels?.selectDay || "Click on any day to manage slots"}
        </p>
      )}

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>
              {selectedDate && formatDateHeader(selectedDate)}
            </DialogTitle>
          </DialogHeader>

          {props.mode === "booking" ? (
            <BookingDialogContent
              slots={selectedDateSlots.filter((s) => !s.isBooked)}
              selectedSlotId={selectedSlotId}
              onSelectSlot={props.onSelectSlot}
              onConfirm={() => {
                props.onConfirmBooking();
                setDialogOpen(false);
              }}
              isBooking={props.isBooking}
              confirmLabel={props.confirmLabel}
              formatTime={formatTime}
            />
          ) : (
            <AdminDialogContent
              slots={selectedDateSlots}
              addMode={addMode}
              setAddMode={setAddMode}
              startTime={startTime}
              setStartTime={setStartTime}
              endTime={endTime}
              setEndTime={setEndTime}
              duration={duration}
              setDuration={setDuration}
              isAdding={isAdding}
              isDeletingId={isDeletingId}
              onAddSingle={handleAddSingleSlot}
              onAddBulk={handleAddBulkSlots}
              onDelete={handleDeleteSlot}
              formatTime={formatTime}
              labels={props.labels}
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}

interface BookingDialogContentProps {
  slots: InterviewSlot[];
  selectedSlotId?: string | null;
  onSelectSlot: (slotId: string) => void;
  onConfirm: () => void;
  isBooking?: boolean;
  confirmLabel?: string;
  formatTime: (iso: string) => string;
}

function BookingDialogContent({
  slots,
  selectedSlotId,
  onSelectSlot,
  onConfirm,
  isBooking,
  confirmLabel = "Confirm Booking",
  formatTime,
}: BookingDialogContentProps) {
  if (slots.length === 0) {
    return (
      <p className="text-center text-muted-foreground py-4">
        No available slots for this day
      </p>
    );
  }

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-2 max-h-64 overflow-y-auto">
        {slots.map((slot) => (
          <button
            key={slot.id}
            onClick={() => onSelectSlot(slot.id)}
            className={cn(
              "p-3 text-sm border rounded-md transition-colors text-center",
              selectedSlotId === slot.id
                ? "bg-primary text-primary-foreground border-primary"
                : "hover:bg-muted hover:border-primary/50",
            )}
          >
            <Clock className="size-4 mx-auto mb-1 opacity-70" />
            {formatTime(slot.startTime)} - {formatTime(slot.endTime)}
          </button>
        ))}
      </div>

      <Button
        onClick={onConfirm}
        disabled={!selectedSlotId || isBooking}
        className="w-full"
      >
        {isBooking && <Spinner className="size-4 mr-2" />}
        <Check className="size-4 mr-2" />
        {confirmLabel}
      </Button>
    </div>
  );
}

interface AdminDialogContentProps {
  slots: InterviewSlot[];
  addMode: "single" | "bulk";
  setAddMode: (mode: "single" | "bulk") => void;
  startTime: string;
  setStartTime: (time: string) => void;
  endTime: string;
  setEndTime: (time: string) => void;
  duration: number;
  setDuration: (duration: number) => void;
  isAdding: boolean;
  isDeletingId: string | null;
  onAddSingle: () => void;
  onAddBulk: () => void;
  onDelete: (slotId: string) => void;
  formatTime: (iso: string) => string;
  labels?: AdminModeProps["labels"];
}

function AdminDialogContent({
  slots,
  addMode,
  setAddMode,
  startTime,
  setStartTime,
  endTime,
  setEndTime,
  duration,
  setDuration,
  isAdding,
  isDeletingId,
  onAddSingle,
  onAddBulk,
  onDelete,
  formatTime,
  labels,
}: AdminDialogContentProps) {
  return (
    <div className="space-y-4">
      <div className="space-y-3 p-3 border rounded-lg bg-muted/30">
        <div className="flex gap-2">
          <Button
            variant={addMode === "single" ? "default" : "outline"}
            size="sm"
            onClick={() => setAddMode("single")}
            className="flex-1"
          >
            {labels?.addSlot || "Single Slot"}
          </Button>
          <Button
            variant={addMode === "bulk" ? "default" : "outline"}
            size="sm"
            onClick={() => setAddMode("bulk")}
            className="flex-1"
          >
            {labels?.addMultiple || "Multiple Slots"}
          </Button>
        </div>

        {addMode === "single" ? (
          <div className="space-y-3">
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1">
                <Label className="text-xs">
                  {labels?.startTime || "Start Time"}
                </Label>
                <Input
                  type="time"
                  value={startTime}
                  onChange={(e) => setStartTime(e.target.value)}
                />
              </div>
              <div className="space-y-1">
                <Label className="text-xs">
                  {labels?.duration || "Duration (min)"}
                </Label>
                <Input
                  type="number"
                  value={duration}
                  onChange={(e) => setDuration(parseInt(e.target.value) || 60)}
                  min={15}
                  max={180}
                  step={15}
                />
              </div>
            </div>
            <Button
              onClick={onAddSingle}
              disabled={isAdding}
              size="sm"
              className="w-full"
            >
              {isAdding && <Spinner className="size-4 mr-2" />}
              <Plus className="size-4 mr-2" />
              {labels?.addSlot || "Add Slot"}
            </Button>
          </div>
        ) : (
          <div className="space-y-3">
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1">
                <Label className="text-xs">
                  {labels?.startTime || "Start Time"}
                </Label>
                <Input
                  type="time"
                  value={startTime}
                  onChange={(e) => setStartTime(e.target.value)}
                />
              </div>
              <div className="space-y-1">
                <Label className="text-xs">
                  {labels?.endTime || "End Time"}
                </Label>
                <Input
                  type="time"
                  value={endTime}
                  onChange={(e) => setEndTime(e.target.value)}
                />
              </div>
            </div>
            <div className="space-y-1">
              <Label className="text-xs">
                {labels?.duration || "Duration per slot (min)"}
              </Label>
              <Input
                type="number"
                value={duration}
                onChange={(e) => setDuration(parseInt(e.target.value) || 60)}
                min={15}
                max={180}
                step={15}
              />
            </div>
            <Button
              onClick={onAddBulk}
              disabled={isAdding}
              size="sm"
              className="w-full"
            >
              {isAdding && <Spinner className="size-4 mr-2" />}
              <Plus className="size-4 mr-2" />
              {labels?.addMultiple || "Add Slots"}
            </Button>
          </div>
        )}
      </div>

      {slots.length > 0 && (
        <div className="space-y-2">
          <h4 className="text-sm font-medium">Existing Slots</h4>
          <div className="space-y-2 max-h-48 overflow-y-auto">
            {slots.map((slot) => (
              <div
                key={slot.id}
                className="flex items-center justify-between p-2 border rounded-md text-sm"
              >
                <div className="flex items-center gap-2">
                  <span className="font-mono">
                    {formatTime(slot.startTime)} - {formatTime(slot.endTime)}
                  </span>
                  <Badge
                    variant={slot.isBooked ? "secondary" : "outline"}
                    className="text-xs"
                  >
                    {slot.isBooked
                      ? labels?.booked || "Booked"
                      : labels?.available || "Available"}
                  </Badge>
                </div>
                {!slot.isBooked && (
                  <Button
                    variant="ghost"
                    size="icon"
                    className="size-7"
                    onClick={() => onDelete(slot.id)}
                    disabled={isDeletingId === slot.id}
                  >
                    {isDeletingId === slot.id ? (
                      <Spinner className="size-3" />
                    ) : (
                      <Trash2 className="size-3 text-red-500" />
                    )}
                  </Button>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {slots.length === 0 && (
        <p className="text-center text-muted-foreground text-sm py-2">
          {labels?.noSlots || "No slots for this day yet"}
        </p>
      )}
    </div>
  );
}
