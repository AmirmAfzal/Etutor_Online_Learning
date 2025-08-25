"use server";
export default async function actionAddToCart(formData: FormData) {
  const id = formData.get("id") as string | null;
  const title = formData.get("title") as string | null;
  const price = formData.get("price") as string | null;

  if (!id) {
    return { success: false, message: "missing course id" };
  }

  return { success: true, id, title, price };
}
