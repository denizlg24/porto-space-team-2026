import { publicRoute, adminRoute, success, createErrors, assertExists } from "@/lib/api";
import type { RouteDefinition } from "@/lib/api-client";
import { connectDB } from "@/lib/db";
import { Applications, type ApplicationStatus } from "@/models/Application";
import { Departments } from "@/models/Department";
import crypto from "crypto";
import { Resend } from "resend";
import { env } from "@/lib/env";
import {
  getApplicationConfirmationEmailTemplate,
  getApplicationNotificationEmailTemplate,
} from "@/lib/email-templates";
import { pinata } from "@/lib/files";

const resend = new Resend(env.RESEND_API_KEY);

const YEAR_LABELS: Record<string, string> = {
  "1st": "1st Year",
  "2nd": "2nd Year",
  "3rd": "3rd Year",
  "4th": "4th Year",
  "5th": "5th Year",
  masters: "Masters",
  phd: "PhD",
};

const errors = createErrors({
  INVALID_INPUT: { status: 400, message: "Invalid input data" },
  INVALID_EMAIL: { status: 400, message: "Invalid email address" },
  INVALID_DEPARTMENTS: { status: 400, message: "Please select at least one department" },
  INVALID_YEAR: { status: 400, message: "Invalid year of study" },
  MISSING_FILES: { status: 400, message: "CV and motivation letter are required" },
  FILE_TOO_LARGE: { status: 400, message: "File size must be less than 5MB" },
  INVALID_FILE_TYPE: { status: 400, message: "Only PDF, DOC, and DOCX files are allowed" },
  UPLOAD_FAILED: { status: 500, message: "Failed to upload files" },
  NOT_FOUND: { status: 404, message: "Application not found" },
});

function generateApplicationId(): string {
  const timestamp = Date.now().toString(36).toUpperCase();
  const random = crypto.randomBytes(4).toString("hex").toUpperCase();
  return `APP-${timestamp}-${random}`;
}

export type ApplicationData = {
  id: string;
  applicationId: string;
  email: string;
  name: string;
  course: string;
  yearOfStudy: number;
  linkedIn?: string;
  github?: string;
  relevantExperience?: string;
  cvLink: string;
  motivationLetterLink: string;
  status: ApplicationStatus;
  createdAt: string;
};

export type ApplicationInput = {
  email: string;
  name: string;
  course: string;
  yearOfStudy: string;
  departments: string[];
  linkedin?: string;
  github?: string;
  experience?: string;
};

export type ApplicationErrors = keyof typeof errors.schema;

export type SubmitApplicationRoute = RouteDefinition<
  { applicationId: string },
  ApplicationErrors,
  FormData
>;

export type GetApplicationsRoute = RouteDefinition<
  ApplicationData[],
  never,
  undefined
>;

export type UpdateApplicationRoute = RouteDefinition<
  ApplicationData,
  ApplicationErrors,
  { id: string; status: ApplicationStatus }
>;

const ALLOWED_FILE_TYPES = [
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
];

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

async function uploadFile(file: File, applicationId: string, type: "cv" | "letter"): Promise<string> {
  const ext = file.name.split(".").pop() || "pdf";
  const filename = `${applicationId}-${type}.${ext}`;

  const renamedFile = new File([file], filename, { type: file.type });

  const { cid } = await pinata.upload.public.file(renamedFile);
  const url = await pinata.gateways.public.convert(cid);

  return url;
}

export const GET = adminRoute(async () => {
  await connectDB();
  const applications = await Applications.find().sort({ createdAt: -1 });

  const data: ApplicationData[] = applications.map((app) => ({
    id: app._id.toString(),
    applicationId: app.applicationId,
    email: app.email,
    name: app.name,
    course: app.course,
    yearOfStudy: app.yearOfStudy,
    linkedIn: app.linkedIn,
    github: app.github,
    relevantExperience: app.relevantExperience,
    cvLink: app.cvLink,
    motivationLetterLink: app.motivationLetterLink,
    status: app.status,
    createdAt: app.createdAt.toISOString(),
  }));

  return success(data);
});

export const POST = publicRoute(async ({ request }) => {
  const formData = await request.formData();

  const email = (formData.get("email") as string)?.toLowerCase().trim();
  const name = (formData.get("name") as string)?.trim();
  const course = (formData.get("course") as string)?.trim();
  const yearOfStudy = formData.get("yearOfStudy") as string;
  const departmentsJson = formData.get("departments") as string;
  const linkedin = (formData.get("linkedin") as string)?.trim() || undefined;
  const github = (formData.get("github") as string)?.trim() || undefined;
  const experience = (formData.get("experience") as string)?.trim() || undefined;
  const cvFile = formData.get("cv") as File | null;
  const letterFile = formData.get("letter") as File | null;

  if (!email || !name || !course || !yearOfStudy || !departmentsJson) {
    errors.throw("INVALID_INPUT", { message: "All required fields must be provided" });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    errors.throw("INVALID_EMAIL");
  }

  const validYears = ["1st", "2nd", "3rd", "4th", "5th", "masters", "phd"];
  if (!validYears.includes(yearOfStudy)) {
    errors.throw("INVALID_YEAR");
  }

  let departments: string[] = [];
  try {
    departments = JSON.parse(departmentsJson);
    if (!Array.isArray(departments) || departments.length === 0) {
      errors.throw("INVALID_DEPARTMENTS");
    }
  } catch {
    errors.throw("INVALID_DEPARTMENTS");
  }

  if (!cvFile || !letterFile) {
    errors.throw("MISSING_FILES");
  }

  assertExists(cvFile);
  assertExists(letterFile);
  if (cvFile.size > MAX_FILE_SIZE || letterFile.size > MAX_FILE_SIZE) {
    errors.throw("FILE_TOO_LARGE");
  }

  if (!ALLOWED_FILE_TYPES.includes(cvFile.type) || !ALLOWED_FILE_TYPES.includes(letterFile.type)) {
    errors.throw("INVALID_FILE_TYPE");
  }

  await connectDB();

  const applicationId = generateApplicationId();

  let cvLink: string = "";
  let letterLink: string = "";

  try {
    [cvLink, letterLink] = await Promise.all([
      uploadFile(cvFile, applicationId, "cv"),
      uploadFile(letterFile, applicationId, "letter"),
    ]);
  } catch (uploadError) {
    console.error("Failed to upload files:", uploadError);
    errors.throw("UPLOAD_FAILED");
  }


  const yearMap: Record<string, number> = {
    "1st": 1,
    "2nd": 2,
    "3rd": 3,
    "4th": 4,
    "5th": 5,
    masters: 6,
    phd: 7,
  };

  await Applications.create({
    applicationId,
    email,
    name,
    course,
    yearOfStudy: yearMap[yearOfStudy],
    linkedIn: linkedin,
    github,
    relevantExperience: experience,
    cvLink,
    motivationLetterLink: letterLink,
    status: "new",
  });

  const departmentDocs = await Departments.find({ _id: { $in: departments } });
  const departmentNames = departmentDocs.map((d) => d.name);

  const yearLabel = YEAR_LABELS[yearOfStudy];

  try {
    await Promise.all([
      resend.emails.send({
        from: env.EMAIL_FROM,
        to: email,
        subject: `[${applicationId}] Application Received - Porto Space Team`,
        html: getApplicationConfirmationEmailTemplate({
          name,
          applicationId,
          departments: departmentNames,
          course,
          yearOfStudy: yearLabel,
        }),
      }),
      resend.emails.send({
        from: env.EMAIL_FROM,
        to: env.EMAIL_FROM.split("<")[1].split(">")[0],
        subject: `[${applicationId}] New Application from ${name}`,
        html: getApplicationNotificationEmailTemplate({
          applicationId,
          name,
          email,
          departments: departmentNames,
          course,
          yearOfStudy: yearLabel,
          linkedin,
          github,
          experience,
          adminUrl: `${env.BETTER_AUTH_URL}/en/admin/applications`,
        }),
      }),
    ]);
  } catch (emailError) {
    console.error("Failed to send application emails:", emailError);
  }


  return success({ applicationId });
});

export const PATCH = adminRoute(async ({ request }) => {
  const body = (await request.json()) as { id: string; status: ApplicationStatus };

  if (!body.id || !body.status) {
    errors.throw("INVALID_INPUT");
  }

  await connectDB();

  const application = await Applications.findByIdAndUpdate(
    body.id,
    { status: body.status },
    { new: true }
  );

  if (!application) {
    errors.throw("NOT_FOUND");
  }

  assertExists(application);


  const data: ApplicationData = {
    id: application._id.toString(),
    applicationId: application.applicationId,
    email: application.email,
    name: application.name,
    course: application.course,
    yearOfStudy: application.yearOfStudy,
    linkedIn: application.linkedIn,
    github: application.github,
    relevantExperience: application.relevantExperience,
    cvLink: application.cvLink,
    motivationLetterLink: application.motivationLetterLink,
    status: application.status,
    createdAt: application.createdAt.toISOString(),
  };

  return success(data);
});
