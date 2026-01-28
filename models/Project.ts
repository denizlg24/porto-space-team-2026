import mongoose from "mongoose";

export interface LocalizedString {
  en: string;
  pt: string;
}

export interface StatItem {
  value: string;
  label: LocalizedString;
}

export interface GalleryImage {
  url: string;
  alt: LocalizedString;
}

export type MediaType = "image" | "video";

export interface ProjectMedia {
  id: string;
  type: MediaType;
  url: string;
  alt: LocalizedString;
  tags: LocalizedString[];
  order: number;
}

export interface ProjectDepartment {
  id: string;
  title: LocalizedString;
  description: LocalizedString;
  bulletPoints: LocalizedString[];
  gallery: GalleryImage[];
  order: number;
}

export interface IProject extends mongoose.Document {
  name: LocalizedString;
  slug: string;
  description: LocalizedString;
  logo: string;
  order: number;
  visible: boolean;
  heroDescription: LocalizedString;
  stats: StatItem[];
  projectImage: string;
  projectImageAlt: LocalizedString;
  departments: ProjectDepartment[];
  media: ProjectMedia[];
  createdAt: Date;
  updatedAt: Date;
}

const localizedStringSchema = new mongoose.Schema(
  {
    en: { type: String, required: true, default: "" },
    pt: { type: String, required: true, default: "" },
  },
  { _id: false }
);

const statItemSchema = new mongoose.Schema(
  {
    value: { type: String, required: true },
    label: { type: localizedStringSchema, required: true },
  },
  { _id: false }
);

const galleryImageSchema = new mongoose.Schema(
  {
    url: { type: String, required: true },
    alt: { type: localizedStringSchema, required: true },
  },
  { _id: false }
);

const projectMediaSchema = new mongoose.Schema(
  {
    id: { type: String, required: true },
    type: { type: String, enum: ["image", "video"], required: true },
    url: { type: String, required: true },
    alt: { type: localizedStringSchema, required: true },
    tags: { type: [localizedStringSchema], default: [] },
    order: { type: Number, required: true, default: 0 },
  },
  { _id: false }
);

const projectDepartmentSchema = new mongoose.Schema(
  {
    id: { type: String, required: true },
    title: { type: localizedStringSchema, required: true },
    description: { type: localizedStringSchema, required: true },
    bulletPoints: { type: [localizedStringSchema], default: [] },
    gallery: { type: [galleryImageSchema], default: [] },
    order: { type: Number, required: true, default: 0 },
  },
  { _id: false }
);

const projectSchema = new mongoose.Schema<IProject>(
  {
    name: { type: localizedStringSchema, required: true },
    slug: { type: String, required: true, unique: true },
    description: { type: localizedStringSchema, required: true },
    logo: { type: String, required: true },
    order: { type: Number, required: true, default: 0 },
    visible: { type: Boolean, required: true, default: true },
    heroDescription: {
      type: localizedStringSchema,
      default: { en: "", pt: "" },
    },
    stats: { type: [statItemSchema], default: [] },
    projectImage: { type: String, default: "" },
    projectImageAlt: {
      type: localizedStringSchema,
      default: { en: "", pt: "" },
    },
    departments: { type: [projectDepartmentSchema], default: [] },
    media: { type: [projectMediaSchema], default: [] },
  },
  { timestamps: true }
);

projectSchema.index({ order: 1 });
projectSchema.index({ visible: 1, order: 1 });

const Projects: mongoose.Model<IProject> =
  mongoose.models.project || mongoose.model<IProject>("project", projectSchema);

export { Projects };
