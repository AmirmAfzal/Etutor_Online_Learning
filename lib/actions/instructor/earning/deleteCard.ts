"use server"

import { connectDB } from "@/lib/db/db"
import paymentCardModel from "@/lib/db/models/paymentCardModel";
import { revalidatePath } from "next/cache";

export async function deleteCard (id: string) {
    await connectDB();
    await paymentCardModel.findByIdAndDelete(id);

    revalidatePath("/instructor/dashboard/earning");
}