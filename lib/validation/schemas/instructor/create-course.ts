import { z } from "zod";

// Define the schema for course basic information validation
export const basicInformationSchema = z.object({
  title: z.string().min(1, "Title is required").max(80, "Title must be less than 80 characters"),
  subtitle: z.string().min(1, "Subtitle is required").max(120, "Subtitle must be less than 120 characters"),
  category: z.string().min(1, "Category is required"),
  subcategory: z.string().min(1, "Subcategory is required"),
  topic: z.string().min(1, "Topic is required"),
  language: z.string().min(1, "Language is required"),
  subtitleLang: z.string().optional(),
  level: z.string().min(1, "Level is required"),
  durationValue: z.string().min(1, "Duration value is required"),
  durationUnit: z.string().min(1, "Duration unit is required"),
});

// Export the type for use in components and server actions
export type BasicInformationFormData = z.infer<typeof basicInformationSchema>;