"use server";

import { connectDB } from "@/lib/db/db";
import categoryModel from "@/lib/db/models/categoryModel";
import { ActionData } from "@/lib/formTypes";

export async function findCategories(prevState: ActionData, formData: string) {
  const search = formData.trim().toLowerCase();

  if (search.length === 0) {
    return {
      message: "ERROR",
      errors: ["Search term is empty."],
      data: [],
    };
  }

  await connectDB();
  const categories = JSON.parse(JSON.stringify(await categoryModel.find()));

  const matched = categories.filter((category: { name: string }) =>
    category.name.toLowerCase().includes(search)
  );

  return {
    message: "SUCCESS",
    errors: [],
    data: matched,
  };
}
