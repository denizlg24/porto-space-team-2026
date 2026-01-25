"use server";

import { getClient } from "@/lib/db";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { revalidatePath } from "next/cache";
import { ObjectId } from "mongodb";
import { Resend } from "resend";
import { env } from "@/lib/env";
import { getApprovalEmailTemplate } from "@/lib/email-templates";

const resend = new Resend(env.RESEND_API_KEY);

export type User = {
  id: string;
  email: string;
  name: string;
  emailVerified: boolean;
  image: string | null;
  createdAt: Date;
  updatedAt: Date;
  department: string;
  approvalStatus: "PENDING" | "APPROVED" | "REJECTED";
  approvedBy: string | null;
  approvedAt: Date | null;
};

export type ActionResult<T = void> =
  | { success: true; data: T }
  | { success: false; error: string };

/**
 * Get the current authenticated admin session
 */
export async function getAdminSession() {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session || session.user.approvalStatus !== "APPROVED") {
    return null;
  }
  return session;
}

/**
 * Transform MongoDB document to User type
 */
function transformUser(doc: Record<string, unknown>): User {
  return {
    id: doc._id?.toString() ?? doc.id?.toString() ?? "",
    email: doc.email as string,
    name: doc.name as string,
    emailVerified: doc.emailVerified as boolean,
    image: doc.image as string | null,
    createdAt: new Date(doc.createdAt as string | Date),
    updatedAt: new Date(doc.updatedAt as string | Date),
    department: doc.department as string,
    approvalStatus: (doc.approvalStatus as User["approvalStatus"]) ?? "PENDING",
    approvedBy: doc.approvedBy as string | null,
    approvedAt: doc.approvedAt ? new Date(doc.approvedAt as string | Date) : null,
  };
}

/**
 * Get all users with optional filtering
 */
export async function getUsers(options?: {
  status?: "PENDING" | "APPROVED" | "REJECTED" | "all";
  department?: string;
  search?: string;
}): Promise<ActionResult<User[]>> {
  const session = await getAdminSession();
  if (!session) {
    return { success: false, error: "Unauthorized" };
  }

  try {
    const db = await getClient();
    const usersCollection = db.collection("user");

    const query: Record<string, unknown> = {};

    if (options?.status && options.status !== "all") {
      query.approvalStatus = options.status;
    }

    if (options?.department) {
      query.department = options.department;
    }

    if (options?.search) {
      query.$or = [
        { name: { $regex: options.search, $options: "i" } },
        { email: { $regex: options.search, $options: "i" } },
      ];
    }

    const users = await usersCollection
      .find(query)
      .sort({ createdAt: -1 })
      .toArray();

    return {
      success: true,
      data: users.map(transformUser),
    };
  } catch (error) {
    console.error("Error fetching users:", error);
    return { success: false, error: "Failed to fetch users" };
  }
}

/**
 * Get pending users count for badge display
 */
export async function getPendingUsersCount(): Promise<ActionResult<number>> {
  const session = await getAdminSession();
  if (!session) {
    return { success: false, error: "Unauthorized" };
  }

  try {
    const db = await getClient();
    const count = await db
      .collection("user")
      .countDocuments({ approvalStatus: "PENDING" });

    return { success: true, data: count };
  } catch (error) {
    console.error("Error counting pending users:", error);
    return { success: false, error: "Failed to count pending users" };
  }
}

/**
 * Approve a user account
 */
export async function approveUser(
  userId: string
): Promise<ActionResult<User>> {
  const session = await getAdminSession();
  if (!session) {
    return { success: false, error: "Unauthorized" };
  }

  try {
    const db = await getClient();
    const usersCollection = db.collection("user");

    const result = await usersCollection.findOneAndUpdate(
      { _id: new ObjectId(userId) },
      {
        $set: {
          approvalStatus: "APPROVED",
          approvedBy: session.user.id,
          approvedAt: new Date(),
          updatedAt: new Date(),
        },
      },
      { returnDocument: "after" }
    );

    if (!result) {
      return { success: false, error: "User not found" };
    }

    const approvedUser = transformUser(result);

    await resend.emails.send({
      from: env.EMAIL_FROM,
      to: approvedUser.email,
      subject: "Your account has been approved - Porto Space Team",
      html: getApprovalEmailTemplate({
        name: approvedUser.name,
        signInUrl: `${env.BETTER_AUTH_URL}/sign-in`,
      }),
    });

    revalidatePath("/admin/users", "page");
    revalidatePath("/admin/approvals", "page");

    return { success: true, data: approvedUser };
  } catch (error) {
    console.error("Error approving user:", error);
    return { success: false, error: "Failed to approve user" };
  }
}

/**
 * Reject a user account
 */
export async function rejectUser(
  userId: string
): Promise<ActionResult<User>> {
  const session = await getAdminSession();
  if (!session) {
    return { success: false, error: "Unauthorized" };
  }

  try {
    const db = await getClient();
    const usersCollection = db.collection("user");

    const result = await usersCollection.findOneAndUpdate(
      { _id: new ObjectId(userId) },
      {
        $set: {
          approvalStatus: "REJECTED",
          approvedBy: session.user.id,
          approvedAt: new Date(),
          updatedAt: new Date(),
        },
      },
      { returnDocument: "after" }
    );

    if (!result) {
      return { success: false, error: "User not found" };
    }

    revalidatePath("/admin/users", "page");
    revalidatePath("/admin/approvals", "page");

    return { success: true, data: transformUser(result) };
  } catch (error) {
    console.error("Error rejecting user:", error);
    return { success: false, error: "Failed to reject user" };
  }
}

/**
 * Delete a user account
 */
export async function deleteUser(userId: string): Promise<ActionResult> {
  const session = await getAdminSession();
  if (!session) {
    return { success: false, error: "Unauthorized" };
  }

  if (session.user.id === userId) {
    return { success: false, error: "Cannot delete your own account" };
  }

  try {
    const db = await getClient();
    const usersCollection = db.collection("user");

    const result = await usersCollection.deleteOne({
      _id: new ObjectId(userId),
    });

    if (result.deletedCount === 0) {
      return { success: false, error: "User not found" };
    }

    // Also delete associated sessions
    await db.collection("session").deleteMany({ userId: new ObjectId(userId) });

    revalidatePath("/admin/users", "page");
    revalidatePath("/admin/approvals", "page");

    return { success: true, data: undefined };
  } catch (error) {
    console.error("Error deleting user:", error);
    return { success: false, error: "Failed to delete user" };
  }
}

/**
 * Update user department
 */
export async function updateUserDepartment(
  userId: string,
  department: string
): Promise<ActionResult<User>> {
  const session = await getAdminSession();
  if (!session) {
    return { success: false, error: "Unauthorized" };
  }

  try {
    const db = await getClient();
    const usersCollection = db.collection("user");

    const result = await usersCollection.findOneAndUpdate(
      { _id: new ObjectId(userId) },
      {
        $set: {
          department,
          updatedAt: new Date(),
        },
      },
      { returnDocument: "after" }
    );

    if (!result) {
      return { success: false, error: "User not found" };
    }

    revalidatePath("/admin/users", "page");

    return { success: true, data: transformUser(result) };
  } catch (error) {
    console.error("Error updating user department:", error);
    return { success: false, error: "Failed to update department" };
  }
}
