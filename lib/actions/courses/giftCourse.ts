"use server";
export default async function actionGiftCourse(formData: FormData) {
  const id = formData.get("id") as string | null;
  if (!id) return { success: false, message: "Missing course ID" };

  return { success: true, id, gifted: true };
}
