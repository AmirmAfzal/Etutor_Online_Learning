"use server";

import { redirect } from "next/navigation";
import { z } from "zod";

import { connectDB } from "@/lib/db/db";
import categoryModel from "@/lib/db/models/categoryModel";
import courseModel from "@/lib/db/models/courseModel";
import subCategoryModel from "@/lib/db/models/subCategoryModel";
import { ActionData } from "@/lib/formTypes";
import {
  BasicInformationFormData,
  basicInformationSchema,
} from "@/lib/validation/schemas/instructor/create-course";

export async function saveBasicInformation(
  prevState: ActionData,
  formData: BasicInformationFormData
): Promise<ActionData> {
  await connectDB();

  const result = basicInformationSchema.safeParse(formData);

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
    name: result.data.subCategory,
  });
  if (!foundSubCategory) {
    foundSubCategory = await subCategoryModel.create({
      name: result.data.subCategory,
      category: foundCategory._id,
    });
  }
  if (result.data._id) {
    const foundCourse = await courseModel.findOne({ _id: result.data._id });

    await courseModel.findByIdAndUpdate(
      foundCourse._id,
      {
        title: result.data.title,
        subtitle: result.data.subtitle,
        category: foundCategory._id,
        subCategory: foundSubCategory._id,
        topic: result.data.topic,
        language: result.data.language,
        subtitleLang: result.data.subtitleLang,
        level: result.data.level,
        duration: result.data.durationValue,
        durationUnit: result.data.durationUnit,
      },
      { new: true }
    );
  } else {
    const createdCourse = await courseModel.create({
      title: result.data.title,
      subtitle: result.data.subtitle,
      category: foundCategory._id,
      subCategory: foundSubCategory._id,
      topic: result.data.topic,
      language: result.data.language,
      subtitleLang: result.data.subtitleLang,
      level: result.data.level,
      duration: result.data.durationValue,
      durationUnit: result.data.durationUnit,
    });
    redirect(
      `/instructor/dashboard/create-course?tab=AdvanceInformation&_id=${createdCourse._id}`
    );
  }
  return { message: "SUCCESS", errors: [] };
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
  formData: z.infer<typeof basicInformationSchema>
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
