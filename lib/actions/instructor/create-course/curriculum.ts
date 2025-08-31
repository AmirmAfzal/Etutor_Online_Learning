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
    const sectionIds: string[] = [];

    for (const section of result.data) {
      const createdSection = await sectionModel.create({
        title: section.name,
        description: section.name,
        lectures: [],
        course: foundCourse?._id,
        duration: 0,
      });

      sectionIds.push(createdSection._id);

      const lectureIds: string[] = [];

      for (const lecture of section.lectures) {
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

        lectureIds.push(createdLecture._id);
      }

      await sectionModel.findByIdAndUpdate(createdSection._id, {
        lectures: lectureIds,
      });
    }

    if (foundCourse) {
      await courseModel.findByIdAndUpdate(foundCourse._id, {
        sections: sectionIds,
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
