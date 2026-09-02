"use server";

import { connectDB } from "@/lib/db/db";
import subCategoryModel from "@/lib/db/models/subCategoryModel";
import { ActionData } from "@/lib/formTypes";

export async function findSubCategories(
  prevState: ActionData,
  formData: string
) {
  const search = formData.trim().toLowerCase();

  if (search.length === 0) {
    return {
      message: "ERROR",
      errors: ["Search term is empty."],
      data: [],
    };
  }

  await connectDB();
  const subCategories = JSON.parse(
    JSON.stringify(await subCategoryModel.find())
  );
  const matched = subCategories.filter((category: { name: string }) =>
    category.name.toLowerCase().includes(search)
  );

  return {
    message: "SUCCESS",
    errors: [],
    data: matched,
  };
}
