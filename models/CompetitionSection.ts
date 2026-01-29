import mongoose from "mongoose";

export interface LocalizedString {
  en: string;
  pt: string;
}

export type SectionType = "content" | "twoColumn" | "stats" | "timeline";

export type ContentBlockType =
  | "text"
  | "image"
  | "imageFrame"
  | "carousel"
  | "button"
  | "buttonGroup"
  | "spacer";

export interface TextBlockData {
  textType: "heading" | "paragraph" | "label";
  content: LocalizedString;
  color?: string;
  size?: "sm" | "md" | "lg" | "xl" | "2xl" | "3xl" | "4xl";
  align?: "left" | "center" | "right";
  bold?: boolean;
}

export interface ImageBlockData {
  url: string;
  alt: LocalizedString;
  aspectRatio?: "video" | "square" | "4/5" | "3/4" | "16/9";
  objectFit?: "cover" | "contain" | "fill" | "none";
  maxWidth?: "sm" | "md" | "lg" | "xl" | "full";
  rounded?: boolean;
}

export interface ImageFrameBlockData {
  url: string;
  alt: LocalizedString;
  aspectRatio?: "video" | "square" | "4/5" | "3/4" | "16/9";
  objectFit?: "cover" | "contain" | "fill" | "none";
  maxWidth?: "sm" | "md" | "lg" | "xl" | "full";
}

export interface ButtonBlockData {
  text: LocalizedString;
  url: string;
  variant?: "default" | "outline" | "secondary" | "ghost";
  size?: "sm" | "default" | "lg";
  fullWidth?: boolean;
  align?: "left" | "center" | "right";
}

export interface ButtonGroupBlockData {
  buttons: ButtonBlockData[];
  align?: "left" | "center" | "right";
}

export interface SpacerBlockData {
  size: "xs" | "sm" | "md" | "lg" | "xl" | "2xl";
}

export interface CarouselImage {
  url: string;
  alt: LocalizedString;
}

export interface CarouselBlockData {
  images: CarouselImage[];
  aspectRatio?: "video" | "square" | "4/5" | "3/4" | "16/9";
  maxWidth?: "sm" | "md" | "lg" | "xl" | "full";
}

export interface ContentBlock {
  blockType: ContentBlockType;
  text?: TextBlockData;
  image?: ImageBlockData;
  imageFrame?: ImageFrameBlockData;
  carousel?: CarouselBlockData;
  button?: ButtonBlockData;
  buttonGroup?: ButtonGroupBlockData;
  spacer?: SpacerBlockData;
}

export interface StatItem {
  value: string;
  label: LocalizedString;
}

export interface TimelineItem {
  year: string;
  title: LocalizedString;
  description: LocalizedString;
}

export interface SectionContent {
  blocks?: ContentBlock[];
  stats?: StatItem[];
  timelineItems?: TimelineItem[];
  layout?: "imageLeft" | "imageRight";
  leftBlocks?: ContentBlock[];
  rightBlocks?: ContentBlock[];
  fullWidth?: boolean;
  align?: "left" | "center" | "right";
}

export interface ICompetitionSection extends mongoose.Document {
  type: SectionType;
  content: SectionContent;
  order: number;
  visible: boolean;
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

const textBlockDataSchema = new mongoose.Schema(
  {
    textType: { type: String, enum: ["heading", "paragraph", "label"], required: true },
    content: { type: localizedStringSchema, required: true },
    color: { type: String },
    size: { type: String, enum: ["sm", "md", "lg", "xl", "2xl", "3xl", "4xl"] },
    align: { type: String, enum: ["left", "center", "right"] },
    bold: { type: Boolean },
  },
  { _id: false }
);

const imageBlockDataSchema = new mongoose.Schema(
  {
    url: { type: String, required: true },
    alt: { type: localizedStringSchema, required: true },
    aspectRatio: { type: String, enum: ["video", "square", "4/5", "3/4", "16/9"] },
    objectFit: { type: String, enum: ["cover", "contain", "fill", "none"] },
    maxWidth: { type: String, enum: ["sm", "md", "lg", "xl", "full"] },
    rounded: { type: Boolean },
  },
  { _id: false }
);

const imageFrameBlockDataSchema = new mongoose.Schema(
  {
    url: { type: String, required: true },
    alt: { type: localizedStringSchema, required: true },
    aspectRatio: { type: String, enum: ["video", "square", "4/5", "3/4", "16/9"] },
    objectFit: { type: String, enum: ["cover", "contain", "fill", "none"] },
    maxWidth: { type: String, enum: ["sm", "md", "lg", "xl", "full"] },
  },
  { _id: false }
);

const buttonBlockDataSchema = new mongoose.Schema(
  {
    text: { type: localizedStringSchema, required: true },
    url: { type: String, required: true },
    variant: { type: String, enum: ["default", "outline", "secondary", "ghost"] },
    size: { type: String, enum: ["sm", "default", "lg"] },
    fullWidth: { type: Boolean },
    align: { type: String, enum: ["left", "center", "right"] },
  },
  { _id: false }
);

const buttonGroupBlockDataSchema = new mongoose.Schema(
  {
    buttons: { type: [buttonBlockDataSchema], default: [] },
    align: { type: String, enum: ["left", "center", "right"] },
  },
  { _id: false }
);

const spacerBlockDataSchema = new mongoose.Schema(
  {
    size: { type: String, enum: ["xs", "sm", "md", "lg", "xl", "2xl"], required: true },
  },
  { _id: false }
);

const carouselImageSchema = new mongoose.Schema(
  {
    url: { type: String, required: true },
    alt: { type: localizedStringSchema, required: true },
  },
  { _id: false }
);

const carouselBlockDataSchema = new mongoose.Schema(
  {
    images: { type: [carouselImageSchema], default: [] },
    aspectRatio: { type: String, enum: ["video", "square", "4/5", "3/4", "16/9"] },
    maxWidth: { type: String, enum: ["sm", "md", "lg", "xl", "full"] },
  },
  { _id: false }
);

const contentBlockSchema = new mongoose.Schema(
  {
    blockType: {
      type: String,
      enum: ["text", "image", "imageFrame", "carousel", "button", "buttonGroup", "spacer"],
      required: true,
    },
    text: { type: textBlockDataSchema },
    image: { type: imageBlockDataSchema },
    imageFrame: { type: imageFrameBlockDataSchema },
    carousel: { type: carouselBlockDataSchema },
    button: { type: buttonBlockDataSchema },
    buttonGroup: { type: buttonGroupBlockDataSchema },
    spacer: { type: spacerBlockDataSchema },
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

const timelineItemSchema = new mongoose.Schema(
  {
    year: { type: String, required: true },
    title: { type: localizedStringSchema, required: true },
    description: { type: localizedStringSchema, required: true },
  },
  { _id: false }
);

const sectionContentSchema = new mongoose.Schema(
  {
    blocks: { type: [contentBlockSchema], default: [] },
    stats: { type: [statItemSchema], default: [] },
    timelineItems: { type: [timelineItemSchema], default: [] },
    layout: { type: String, enum: ["imageLeft", "imageRight"] },
    leftBlocks: { type: [contentBlockSchema], default: [] },
    rightBlocks: { type: [contentBlockSchema], default: [] },
    fullWidth: { type: Boolean },
    align: { type: String, enum: ["left", "center", "right"] },
  },
  { _id: false }
);

export const competitionSectionSchema = new mongoose.Schema<ICompetitionSection>(
  {
    type: {
      type: String,
      enum: ["content", "twoColumn", "stats", "timeline"],
      required: true,
    },
    content: { type: sectionContentSchema, required: true },
    order: { type: Number, required: true, default: 0 },
    visible: { type: Boolean, required: true, default: true },
  },
  { timestamps: true }
);

competitionSectionSchema.index({ order: 1 });

const CompetitionSections: mongoose.Model<ICompetitionSection> =
  mongoose.models.competitionsection ||
  mongoose.model<ICompetitionSection>("competitionsection", competitionSectionSchema);

export { CompetitionSections };
