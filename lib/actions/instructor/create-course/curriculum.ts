"use server";

import { Section } from "@/components/instructor-dashboard/create-course/Curriculum";
import { connectDB } from "@/lib/db/db";
import courseModel from "@/lib/db/models/courseModel";
import lectureModel from "@/lib/db/models/lectureModel";
import sectionModel from "@/lib/db/models/sectionModel";
import { ActionData } from "@/lib/formTypes";
import { curriculumSchema } from "@/lib/validation/schemas/instructor/create-course";

export async function saveCurriculum(
  prevState: ActionData,
  formData: { sections: Section[]; courseId: string }
) {
  await connectDB();

  const result = curriculumSchema.safeParse(formData.sections);

  if (!result.success) {
    return {
      message: "ERROR",
      errors: result.error.errors.map((error) => error.message),
    };
  }

  const foundCourse = await courseModel.findOne({ _id: formData.courseId });

  try {
    for (const section of result.data) {
      console.log(section);

      // Create section first
      const createdSection = await sectionModel.create({
        title: section.name,
        description: section.name, // You might want to add a description field to your Section interface
        lectures: [], // Will be populated after creating lectures
        course: foundCourse?._id,
        duration: 0,
      });

      const lectureIds: string[] = [];

      // Create lectures with section ID
      console.log("section.lectures", section.lectures);
      for (const lecture of section.lectures) {
        console.log("lecture", lecture);
        const createdLecture = await lectureModel.create({
          title: lecture.name,
          description: lecture.description || "",
          video: lecture.videoUrl || null,
          duration: 0,
          files: lecture.fileUrl ? [lecture.fileUrl] : [],
          notes: lecture.note || "",
          caption: lecture.captions || "",
          section: createdSection._id,
        });
        console.log("createdLecture", createdLecture);

        lectureIds.push(createdLecture._id);
      }

      // Update section with lecture IDs
      await sectionModel.findByIdAndUpdate(createdSection._id, {
        lectures: lectureIds,
      });
    }

    return {
      message: "SUCCESS",
      errors: [],
    };
  } catch (error) {
    console.log("error", error);
    return {
      message: "ERROR",
      errors: [],
    };
  }
}
