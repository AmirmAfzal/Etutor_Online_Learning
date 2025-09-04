"use server";

import { revalidatePath } from "next/cache";

import { connectDB } from "@/lib/db/db";
import paymentCardModel from "@/lib/db/models/paymentCardModel";

export async function deleteCard(id: string) {
  await connectDB();
  await paymentCardModel.findByIdAndDelete(id);

  revalidatePath("/instructor/dashboard/earning");
}
