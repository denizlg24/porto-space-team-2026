"use server";

import { connectDB } from "@/lib/db";
import { Departments, type IDepartment } from "@/models/Department";
import { getAdminSession, type ActionResult } from "./users";
import { revalidatePath } from "next/cache";

export type DepartmentItem = {
  id: string;
  name: string;
  code: string;
  order: number;
  createdAt: Date;
  updatedAt: Date;
};

function transformDepartment(doc: IDepartment): DepartmentItem {
  return {
    id: doc._id.toString(),
    name: doc.name,
    code: doc.code,
    order: doc.order,
    createdAt: doc.createdAt,
    updatedAt: doc.updatedAt,
  };
}

function revalidateDepartments() {
  revalidatePath('/(main)/[locale]/register', 'page')
}

export async function getDepartments(): Promise<ActionResult<DepartmentItem[]>> {
  const session = await getAdminSession();
  if (!session) {
    return { success: false, error: "Unauthorized" };
  }

  try {
    await connectDB();
    const departments = await Departments.find().sort({ order: 1 });
    return { success: true, data: departments.map(transformDepartment) };
  } catch (error) {
    console.error("Error fetching departments:", error);
    return { success: false, error: "Failed to fetch departments" };
  }
}

export async function getPublicDepartments(): Promise<ActionResult<DepartmentItem[]>> {
  try {
    await connectDB();
    const departments = await Departments.find().sort({ order: 1 });
    return { success: true, data: departments.map(transformDepartment) };
  } catch (error) {
    console.error("Error fetching departments:", error);
    return { success: false, error: "Failed to fetch departments" };
  }
}

export async function createDepartment(data: {
  name: string;
  code: string;
}): Promise<ActionResult<DepartmentItem>> {
  const session = await getAdminSession();
  if (!session) {
    return { success: false, error: "Unauthorized" };
  }

  try {
    await connectDB();

    const existingCode = await Departments.findOne({ code: data.code.toUpperCase() });
    if (existingCode) {
      return { success: false, error: "Department code already exists" };
    }

    const maxOrder = await Departments.findOne().sort({ order: -1 });
    const order = (maxOrder?.order ?? -1) + 1;

    const department = await Departments.create({
      name: data.name,
      code: data.code.toUpperCase(),
      order,
    });

    revalidateDepartments();
    return { success: true, data: transformDepartment(department) };
  } catch (error) {
    console.error("Error creating department:", error);
    return { success: false, error: "Failed to create department" };
  }
}

export async function updateDepartment(
  departmentId: string,
  data: {
    name?: string;
    code?: string;
  }
): Promise<ActionResult<DepartmentItem>> {
  const session = await getAdminSession();
  if (!session) {
    return { success: false, error: "Unauthorized" };
  }

  try {
    await connectDB();

    if (data.code) {
      const existingCode = await Departments.findOne({
        code: data.code.toUpperCase(),
        _id: { $ne: departmentId },
      });
      if (existingCode) {
        return { success: false, error: "Department code already exists" };
      }
      data.code = data.code.toUpperCase();
    }

    const department = await Departments.findByIdAndUpdate(
      departmentId,
      { $set: data },
      { new: true }
    );

    if (!department) {
      return { success: false, error: "Department not found" };
    }

    revalidateDepartments();
    return { success: true, data: transformDepartment(department) };
  } catch (error) {
    console.error("Error updating department:", error);
    return { success: false, error: "Failed to update department" };
  }
}

export async function deleteDepartment(
  departmentId: string
): Promise<ActionResult<void>> {
  const session = await getAdminSession();
  if (!session) {
    return { success: false, error: "Unauthorized" };
  }

  try {
    await connectDB();
    const result = await Departments.findByIdAndDelete(departmentId);

    if (!result) {
      return { success: false, error: "Department not found" };
    }

    revalidateDepartments();
    return { success: true, data: undefined };
  } catch (error) {
    console.error("Error deleting department:", error);
    return { success: false, error: "Failed to delete department" };
  }
}

export async function reorderDepartments(
  departmentIds: string[]
): Promise<ActionResult<void>> {
  const session = await getAdminSession();
  if (!session) {
    return { success: false, error: "Unauthorized" };
  }

  try {
    await connectDB();

    const bulkOps = departmentIds.map((id, index) => ({
      updateOne: {
        filter: { _id: id },
        update: { $set: { order: index } },
      },
    }));

    await Departments.bulkWrite(bulkOps);

    revalidateDepartments();
    return { success: true, data: undefined };
  } catch (error) {
    console.error("Error reordering departments:", error);
    return { success: false, error: "Failed to reorder departments" };
  }
}
