import { publicRoute, success } from "@/lib/api";
import type { RouteDefinition } from "@/lib/api-client";
import { connectDB } from "@/lib/db";
import { Departments, type LocalizedString } from "@/models/Department";

export type DepartmentItem = {
  id: string;
  name: string;
  code: string;
  order: number;
  createdAt: Date;
  updatedAt: Date;
  description: LocalizedString;
  skills: LocalizedString[];
};

export type GetDepartmentsRoute = RouteDefinition<
  DepartmentItem[],
  never,
  undefined
>;

export const GET = publicRoute(async () => {
  try {
    await connectDB();
    const departments = await Departments.find().sort({ order: 1 });

    const data: DepartmentItem[] = departments.map((doc) => ({
      id: doc._id.toString(),
      name: doc.name,
      code: doc.code,
      order: doc.order,
      createdAt: doc.createdAt,
      updatedAt: doc.updatedAt,
      description: doc.description ?? { en: "", pt: "" },
      skills: doc.skills ?? [],
    }));

    return success(data);
  } catch (error) {
    console.error("Error fetching departments:", error);
    throw error;
  }
});
