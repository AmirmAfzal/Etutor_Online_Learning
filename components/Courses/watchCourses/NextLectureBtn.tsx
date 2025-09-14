import Link from "next/link";
import { connectDB } from "@/lib/db/db";
import lectureModel from "@/lib/db/models/lectureModel";
import sectionModel from "@/lib/db/models/sectionModel";
import { Types } from "mongoose";


interface Lecture {
  _id: Types.ObjectId;
  index: number;
  section: Section;
}

interface Section {
  _id: Types.ObjectId;
  course: string;
  index: number;
}

const NextLectureBtn = async ({
                                searchParams,
                              }: {
  searchParams: { lectureId: string; section: string };
}) => {
  await connectDB();

  const foundCurrentLecture = await lectureModel
    .findById(searchParams.lectureId)
    .populate("section")
    .lean<Lecture | null>();

  if (!foundCurrentLecture) {
    return null;
  }

  const nextLectureInSameSection = await lectureModel
    .findOne({
      index: foundCurrentLecture.index + 1,
      section: foundCurrentLecture.section._id,
    })
    .lean<Lecture | null>();

  if (nextLectureInSameSection) {
    const sectionIndex = foundCurrentLecture.section.index;
    return (
      <Link
        href={`/courses/${foundCurrentLecture.section.course}/watch?section=${sectionIndex}&lectureId=${nextLectureInSameSection._id.toString()}`}
        className="btn btn-primary text-xs whitespace-nowrap md:text-base"
      >
        Next Lecture
      </Link>
    );
  }

  const nextSection = await sectionModel
    .findOne({
      course: foundCurrentLecture.section.course,
      index: foundCurrentLecture.section.index + 1,
    })
    .lean<Section | null>();

  if (nextSection) {
    const firstLectureInNextSection = await lectureModel
      .findOne({
        section: nextSection._id,
      })
      .sort({ index: 1 })
      .lean<Lecture | null>();

    if (firstLectureInNextSection) {
      return (
        <Link
          href={`/courses/${nextSection.course}/watch?section=${nextSection.index}&lectureId=${firstLectureInNextSection._id.toString()}`}
          className="btn btn-primary text-xs whitespace-nowrap md:text-base"
        >
          Next Lecture
        </Link>
      );
    }
  }

  return (
    <button className="btn btn-disabled text-xs whitespace-nowrap md:text-base">
      No More Lectures
    </button>
  );
};

export default NextLectureBtn;