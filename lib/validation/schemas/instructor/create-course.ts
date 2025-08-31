import { z } from "zod";

// Define the schema for course basic information validation
export const basicInformationSchema = z.object({
  _id: z.string().optional(),
  title: z
    .string()
    .min(1, "Title is required")
    .max(80, "Title must be less than 80 characters"),
  subtitle: z
    .string()
    .min(1, "Subtitle is required")
    .max(120, "Subtitle must be less than 120 characters"),
  category: z.string().min(1, "Category is required"),
  subCategory: z.string().min(1, "SubCategory is required"),
  topic: z.string().min(1, "Topic is required"),
  language: z.string().min(1, "Language is required"),
  subtitleLang: z.string().optional(),
  level: z.string().min(1, "Level is required"),
  durationValue: z.string().min(1, "Duration value is required"),
  durationUnit: z.string().min(1, "Duration unit is required"),
});

// Export the type for use in components and server actions
export type BasicInformationFormData = z.infer<typeof basicInformationSchema>;

// Define the schema for course advance information validation
export const advanceInformationSchema = z.object({
  _id: z.string().min(1, "Course ID is required"),
  learningOutcomes: z.array(z.string().min(1, "fields is required").max(120)),
  targetAudience: z.array(z.string().min(1, "fields is required").max(120)),
  requirements: z.array(z.string().min(1, "fields is required").max(120)),
  description: z.string().min(10).max(1000),
  thumbnail: z.string().url(),
  video: z.string().url(),
});

export type AdvanceInformationFormData = z.infer<
  typeof advanceInformationSchema
>;

// Lecture Schema
export const LectureSchema = z.object({
  id: z.number(),
  name: z.string().min(1, "Lecture name is required"),
  videoUrl: z.string().url().optional(),
  fileUrl: z.string().url().optional(),
  captions: z.string().optional(),
  description: z.string().optional(),
  note: z.string().optional(),
  noteFile: z.string().optional(),
});

// Section Schema
const SectionSchema = z.object({
  id: z.union([z.string(), z.number()]),
  name: z.string().min(1, "Section name is required"),
  lectures: z.array(LectureSchema).min(1, "At least one lecture is required"),
});

export const curriculumSchema = z.array(SectionSchema);

// publish course
export const Instructor = z.object({
  id: z.number(),
  profile: z.string(),
  name: z.string(),
  skill: z.string(),
});

export const publishMessageSchema = z.object({
  courseId: z.string().min(1, "Course ID is required"),
  welcomeMessage: z.string().min(10).max(100),
  congratulationsMessage: z.string().min(10).max(100),
  instructors: z
    .array(Instructor)
    .min(1, "At least one Instructor is required"),
});

export type PublishMessageFormData = z.infer<typeof publishMessageSchema>;
