"use server";

import { getServerSession } from "next-auth";

import { authOptions } from "@/lib/auth/authOptions";
import { connectDB } from "@/lib/db/db";
import instructorModel from "@/lib/db/models/instructorModel";
import { ActionData } from "@/lib/formTypes";
import { socialProfileSchema } from "@/lib/validation/schemas/instructor/settings/socialProfile";

export async function saveSocialProfile(
  prevState: ActionData,
  formData: FormData
) {
  await connectDB();

  const data = Object.fromEntries(formData.entries());

  const result = socialProfileSchema.safeParse(data);
  if (!result.success) {
    return {
      message: "ERROR",
      errors: result.error.errors.map((error) => error.message),
    };
  }

  const session = await getServerSession(authOptions);

  const foundInstructor = await instructorModel.findOne({
    user: session?.user.id,
  });

  if (!foundInstructor) {
    return {
      message: "ERROR",
      errors: ["Instructor not found"],
    };
  }

  try {
    await instructorModel.findByIdAndUpdate(
      foundInstructor._id,
      {
        social: {
          website: result.data.website,
          facebook: result.data.facebook,
          instagram: result.data.instagram,
          linkedin: result.data.linkedin,
          youtube: result.data.youtube,
          whatsapp: result.data.whatsapp,
          twitter: result.data.twitter,
        },
      },
      { new: true }
    );
    return {
      message: "SUCCESS",
      errors: [],
    };
  } catch (error) {
    console.log(error);
    return {
      message: "ERROR",
      errors: ["error in save social Profiles"],
    };
  }

  return {
    message: "SUCCESS",
    errors: [],
  };
}
