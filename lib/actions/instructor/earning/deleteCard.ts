"use server";

import { revalidatePath } from "next/cache";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

import { connectDB } from "@/lib/db/db";
import paymentCardModel from "@/lib/db/models/paymentCardModel";
import { authOptions } from "@/lib/auth/authOptions";
import instructorModel from "@/lib/db/models/instructorModel";

export async function deleteCard(id: string) {
  await connectDB();

  const session = await getServerSession(authOptions);
  if (!session?.user.id) {
    redirect("/auth/signin");
  }

  const instructor = await instructorModel.findOne({ user: session.user.id });

  const paymentCard = await paymentCardModel.findOne({
    _id: id,
    instructor: instructor._id,
  });

  if (paymentCard) {
    await paymentCardModel.findByIdAndDelete(id);
  }

  revalidatePath("/instructor/dashboard/earning");
}
