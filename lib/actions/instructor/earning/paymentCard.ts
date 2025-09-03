"use server";

import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

import { authOptions } from "@/lib/auth/authOptions";
import { connectDB } from "@/lib/db/db";
import paymentCardModel from "@/lib/db/models/paymentCardModel";
import { ActionData } from "@/lib/formTypes";
import {
  PaymentCardFormData,
  paymentCardSchema,
} from "@/lib/validation/schemas/instructor/newPaymentCard";
import instructorModel from "@/lib/db/models/instructorModel";
import { revalidatePath } from "next/cache";

export async function savePaymentCard(
  prevState: ActionData,
  formData: PaymentCardFormData
) {
  await connectDB();

  const result = paymentCardSchema.safeParse(formData);
  if (!result.success) {
    return {
      message: "ERROR",
      errors: result.error.errors.map((error) => error.message),
    };
  }

  const session = await getServerSession(authOptions);
  if (!session?.user.id) {
    redirect("/auth/signin");
  }

  const instructor = await instructorModel.findOne({ user: session.user.id });

  if (!instructor) {
    return {
      message: "ERROR",
      errors: ["instructor not found"],
    };
  }

  await paymentCardModel.create({
    bank: result.data.bank,
    name: result.data.name,
    cardNumber: result.data.cardNumber,
    expiration: result.data.expiration,
    cvc: result.data.cvc,
    instructor: instructor._id,
  });

  revalidatePath("/instructor/dashboard/earning");

  return {
    message: "SUCCESS",
    errors: [],
  };
}
