"use server";

import { redirect } from "next/navigation";

import { connectDB } from "@/lib/db/db";
import categoryModel from "@/lib/db/models/categoryModel";
import courseModel from "@/lib/db/models/courseModel";
import subCategoryModel from "@/lib/db/models/subCategoryModel";
import { ActionData } from "@/lib/formTypes";
import { basicInformationSchema } from "@/lib/validation/schemas/instructor/create-course";


export async function saveBasicInformation(
  prevState: ActionData,
  formData: FormData
): Promise<ActionData> {
  await connectDB();
  const data = Object.fromEntries(formData.entries());
  console.log(data);

  const result = basicInformationSchema.safeParse(data);

  if (!result.success) {
    return {
      message: "ERROR",
      errors: result.error.errors.map((error) => error.message),
    };
  }

  // try {
  let foundCategory = await categoryModel.findOne({
    name: result.data.category,
  });
  if (!foundCategory) {
    foundCategory = await categoryModel.create({
      name: result.data.category,
    });
  }
  let foundSubCategory = await subCategoryModel.findOne({
    name: result.data.subcategory,
  });
  if (!foundSubCategory) {
    foundSubCategory = await subCategoryModel.create({
      name: result.data.subcategory,
      category: foundCategory._id,
    });
  }
  
  const durationValue = parseFloat(result.data.durationValue);
  
  // Convert duration to hours
  let durationInHours: number;
  switch (result.data.durationUnit.toLowerCase()) {
    case 'hour':
      durationInHours = durationValue;
      break;
    case 'day':
      durationInHours = durationValue * 24; // 1 day = 24 hours
      break;
    case 'week':
      durationInHours = durationValue * 24 * 7; // 1 week = 24 * 7 hours
      break;
    default:
      durationInHours = durationValue; // Default to hours if unit is not recognized
  }

  const createdCourse = await courseModel.create({
    title: result.data.title,
    subtitle: result.data.subtitle,
    category: foundCategory._id,
    subcategory: foundSubCategory._id,
    topic: result.data.topic,
    language: result.data.language,
    subtitleLang: result.data.subtitleLang,
    level: result.data.level,
    duration: durationInHours, // Save duration in hours
    durationUnit: result.data.durationUnit, // Keep the original unit for reference
  });
  redirect(
    `/instructor/dashboard/create-course?tab=AdvanceInformation&_id=${createdCourse._id}`
  );
  //   return {
  //     message: "SUCCESS",
  //     errors: [],
  //   };
  // } catch (error) {
  //   console.error("Error saving form data:", error);
  //   return {
  //     message: "ERROR",
  //     errors: ["An unexpected error occurred. Please try again."],
  //   };
  // }
}

export async function saveAndPreviewBasicInformation(
  prevState: ActionData,
  formData: FormData
): Promise<ActionData> {
  // This function could be used for the "Save & Preview" button
  // It would save the data and then redirect to a preview page
  const result = await saveBasicInformation(prevState, formData);

  if (result.message === "SUCCESS") {
    // Additional logic for preview could go here
    return {
      ...result,
      message: "PREVIEW", // You could use a different message to indicate preview
    };
  }

  return result;
}
