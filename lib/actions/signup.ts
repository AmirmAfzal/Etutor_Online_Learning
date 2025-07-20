"use server";

import { connectDB } from "../db/db";
import userModel from "../db/models/userModel";
import { signUpSchema } from "@/lib/validation/auth/signinSchema";
import { ActionData } from "@/lib/formTypes";
import bcrypt from "bcrypt";
import studentModel from "../db/models/studentModel";

export const createUser = async (
  prevState: ActionData,
  formData: FormData
): Promise<ActionData> => {
  await connectDB();
  const data = Object.fromEntries(formData.entries());

  type SignUpFormData = Record<string, FormDataEntryValue> & {
    terms?: string | boolean;
  };
  const typedData = data as SignUpFormData;

  if (typeof typedData.terms === "string") {
    typedData.terms = typedData.terms === "true";
  }

  const result = await signUpSchema.safeParse(data);

  if (!result.success) {
    return {
      message: "ERROR",
      errors: result.error.errors.map((error) => error.message),
    };
  }

  const existingUser = await userModel.findOne({ email: result.data.email });
  if (existingUser) {
    return {
      message: "ERROR",
      errors: ["Email is already registered."],
    };
  }

  const hashedPassword = await bcrypt.hash(result.data.password, 10);

  const createdUser = await userModel.create({
    email: result.data.email,
    password: hashedPassword,
    role: "STUDENT",
  });
  await studentModel.create({
    user: createdUser._id,
    firstname: result.data.firstName,
    lastname: result.data.lastName,
  });

  return {
    message: "SUCCESS",
    errors: [],
  };
};
