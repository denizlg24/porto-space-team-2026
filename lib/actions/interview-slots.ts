"use server";

import { connectDB } from "@/lib/db";
import { InterviewSlots } from "@/models/InterviewSlot";
import { getAdminSession, type ActionResult } from "./users";

export type InterviewSlotData = {
  id: string;
  startTime: string;
  endTime: string;
  isBooked: boolean;
  bookedBy?: string;
};

export async function getInterviewSlots(): Promise<
  ActionResult<InterviewSlotData[]>
> {
  const session = await getAdminSession();
  if (!session) {
    return { success: false, error: "Unauthorized" };
  }

  await connectDB();

  const slots = await InterviewSlots.find()
    .sort({ startTime: 1 })
    .populate("bookedBy", "name email applicationId")
    .lean();

  const data: InterviewSlotData[] = slots.map((slot) => ({
    id: slot._id.toString(),
    startTime: slot.startTime.toISOString(),
    endTime: slot.endTime.toISOString(),
    isBooked: slot.isBooked,
    bookedBy: slot.bookedBy
      ? (slot.bookedBy as { applicationId?: string }).applicationId
      : undefined,
  }));

  return { success: true, data };
}

export async function createInterviewSlot(
  startTime: string,
  endTime: string,
): Promise<ActionResult<InterviewSlotData>> {
  const session = await getAdminSession();
  if (!session) {
    return { success: false, error: "Unauthorized" };
  }

  const start = new Date(startTime);
  const end = new Date(endTime);

  if (start >= end) {
    return { success: false, error: "End time must be after start time" };
  }

  if (start <= new Date()) {
    return { success: false, error: "Start time must be in the future" };
  }

  await connectDB();

  const overlapping = await InterviewSlots.findOne({
    $or: [{ startTime: { $lt: end }, endTime: { $gt: start } }],
  });

  if (overlapping) {
    return {
      success: false,
      error: "This time slot overlaps with an existing slot",
    };
  }

  const slot = await InterviewSlots.create({
    startTime: start,
    endTime: end,
    isBooked: false,
  });

  return {
    success: true,
    data: {
      id: slot._id.toString(),
      startTime: slot.startTime.toISOString(),
      endTime: slot.endTime.toISOString(),
      isBooked: slot.isBooked,
    },
  };
}

export async function createBulkInterviewSlots(
  slots: Array<{ startTime: string; endTime: string }>,
): Promise<ActionResult<InterviewSlotData[]>> {
  const session = await getAdminSession();
  if (!session) {
    return { success: false, error: "Unauthorized" };
  }

  if (!slots.length) {
    return { success: false, error: "No slots provided" };
  }

  await connectDB();

  const now = new Date();
  const slotsToCreate = [];

  for (const slot of slots) {
    const start = new Date(slot.startTime);
    const end = new Date(slot.endTime);

    if (start >= end || start <= now) continue;

    const overlapping = await InterviewSlots.findOne({
      $or: [{ startTime: { $lt: end }, endTime: { $gt: start } }],
    });

    if (!overlapping) {
      slotsToCreate.push({
        startTime: start,
        endTime: end,
        isBooked: false,
      });
    }
  }

  if (!slotsToCreate.length) {
    return { success: false, error: "No valid slots to create" };
  }

  const created = await InterviewSlots.insertMany(slotsToCreate);

  return {
    success: true,
    data: created.map((slot) => ({
      id: slot._id.toString(),
      startTime: slot.startTime.toISOString(),
      endTime: slot.endTime.toISOString(),
      isBooked: slot.isBooked,
    })),
  };
}

export async function deleteInterviewSlot(
  id: string,
): Promise<ActionResult<{ deleted: true }>> {
  const session = await getAdminSession();
  if (!session) {
    return { success: false, error: "Unauthorized" };
  }

  await connectDB();

  const slot = await InterviewSlots.findById(id);

  if (!slot) {
    return { success: false, error: "Slot not found" };
  }

  if (slot.isBooked) {
    return { success: false, error: "Cannot delete a booked slot" };
  }

  await InterviewSlots.findByIdAndDelete(id);

  return { success: true, data: { deleted: true } };
}

export async function deleteAllUnbookedSlots(): Promise<
  ActionResult<{ deletedCount: number }>
> {
  const session = await getAdminSession();
  if (!session) {
    return { success: false, error: "Unauthorized" };
  }

  await connectDB();

  const result = await InterviewSlots.deleteMany({ isBooked: false });

  return { success: true, data: { deletedCount: result.deletedCount } };
}
