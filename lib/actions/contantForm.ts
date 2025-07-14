"use server";

import { ActionData } from "@/lib/formTypes";

import { connectDB } from "../db/db";
import contactModel from "../db/models/contactModel";
import { contactSchema } from "../validation/schemas/contactSchema";

export const createContact = async (
  prevState: ActionData,
  formData: FormData
): Promise<ActionData> => {
  await connectDB();
  const data = Object.fromEntries(formData.entries());

  const result = await contactSchema.safeParse(data);
  if (!result.success) {
    return {
      message: "ERROR",
      errors: result.error.errors.map((error) => error.message),
    };
  }

  await contactModel.create({
    name: result.data.name,
    email: result.data.email,
    subject: result.data.subject,
    message: result.data.message,
  });

  return {
    message: "SUCCESS",
    errors: [],
  };
};
