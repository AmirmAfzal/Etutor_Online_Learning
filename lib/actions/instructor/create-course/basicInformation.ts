"use server";

import { redirect } from "next/navigation";
import { z } from "zod";
import { getServerSession } from "next-auth";

import { connectDB } from "@/lib/db/db";
import categoryModel from "@/lib/db/models/categoryModel";
import courseModel from "@/lib/db/models/courseModel";
import subCategoryModel from "@/lib/db/models/subCategoryModel";
import { ActionData } from "@/lib/formTypes";
import {
  BasicInformationFormData,
  basicInformationSchema,
} from "@/lib/validation/schemas/instructor/create-course";
import { authOptions } from "@/lib/auth/authOptions";
import instructorModel from "@/lib/db/models/instructorModel";

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

  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    redirect("/auth/signin");
  }

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

  const durationValue = parseFloat(result.data.durationValue);

  // Convert duration to hours
  let durationInHours: number;
  switch (result.data.durationUnit.toLowerCase()) {
    case "hour":
      durationInHours = durationValue;
      break;
    case "day":
      durationInHours = durationValue * 24; // 1 day = 24 hours
      break;
    case "week":
      durationInHours = durationValue * 24 * 7; // 1 week = 24 * 7 hours
      break;
    default:
      durationInHours = durationValue; // Default to hours if unit is not recognized
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
        tools: result.data.tools,
        price: result.data.price,
        language: result.data.language,
        subtitleLanguage: result.data.subtitleLang,
        level: result.data.level,
        duration: durationInHours,
        durationUnit: result.data.durationUnit,
      },
      { new: true }
    );
    return { message: "SUCCESS", errors: [] };
  } else {
    const instructor = await instructorModel.findOne({
      user: session?.user?.id,
    });

    const createdCourse = await courseModel.create({
      title: result.data.title,
      subtitle: result.data.subtitle,
      authors: [instructor._id],
      category: foundCategory._id,
      subCategory: foundSubCategory._id,
      topic: result.data.topic,
      tools: result.data.tools,
      price: result.data.price,
      language: result.data.language,
      subtitleLanguage: result.data.subtitleLang,
      level: result.data.level,
      duration: durationInHours,
      durationUnit: result.data.durationUnit,
    });

    if (instructor) {
      await instructorModel.findByIdAndUpdate(instructor._id, {
        $push: { courses: createdCourse._id },
      });
    }

    redirect(
      `/instructor/dashboard/create-course?tab=AdvanceInformation&_id=${createdCourse._id}`
    );
  }
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
