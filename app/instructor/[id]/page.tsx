import React from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import Icon from "@/components/ui/Icon";
import CourseCard from "@/components/Student/CourseCard";
import { connectDB } from "@/lib/db/db";
import instructorModel, {
  InstructorInterface,
} from "@/lib/db/models/instructorModel";
import courseModel, { CourseInterface } from "@/lib/db/models/courseModel";

export const dynamic = "force-dynamic";

interface Props {
  params: Promise<{ id: string }>;
}

const InstructorProfilePage = async (props: Props) => {
  const { id } = await props.params;

  await connectDB();
  const instructor = (await instructorModel
    .findById(id)
    .lean()) as InstructorInterface | null;

  if (!instructor) {
    notFound();
  }

  const courses = (await courseModel
    .find({ authors: instructor._id })
    .sort({ createdAt: -1 })
    .lean()) as unknown as CourseInterface[];

  const socialLinks = [
    {
      icon: "ph:globe-simple",
      label: "website",
      value: instructor.social?.website,
    },
    {
      icon: "ph:facebook-logo-bold",
      label: "facebook",
      value: instructor.social?.facebook,
    },
    {
      icon: "ph:twitter-logo-fill",
      label: "twitter",
      value: instructor.social?.twitter,
    },
    {
      icon: "ph:instagram-logo",
      label: "instagram",
      value: instructor.social?.instagram,
    },
    {
      icon: "ph:youtube-logo",
      label: "youtube",
      value: instructor.social?.youtube,
    },
    {
      icon: "ph:whatsapp-logo",
      label: "whatsapp",
      value: instructor.social?.whatsapp,
    },
  ];

  return (
    <div className="bg-base-200 min-h-screen">
      <div className="bg-primary/10 h-64"></div>
      <div className="bg-base-100 container mx-auto -mt-48 w-full px-4">
        <div className="border-primary/20 flex w-full flex-row flex-wrap items-center justify-between gap-4 border p-8">
          <div className="flex flex-row items-center gap-6">
            {instructor.avatar ? (
              <Image
                className="h-32 w-32 rounded-full object-cover"
                src={instructor.avatar}
                alt={`${instructor.firstname} ${instructor.lastname}`}
                width={512}
                height={512}
              />
            ) : (
              <Icon
                icon="ph:user-circle-duotone"
                className="text-base-content/40 h-32 w-32"
              />
            )}
            <div className="flex flex-col">
              <div className="flex flex-row items-center gap-4">
                <h1 className="text-2xl font-semibold sm:text-3xl">
                  {instructor.firstname} {instructor.lastname}
                </h1>
                {instructor.rating >= 4.5 && (
                  <button className="btn btn-primary btn-soft">
                    <Icon width={20} className="" icon="ph:crown-simple-bold" />
                    Top Rated
                  </button>
                )}
              </div>
              <p className="text-base-content/60 mt-2">
                {instructor.title || "Instructor"}
              </p>
              <div className="mt-4 flex flex-row flex-wrap gap-4">
                <div className="flex flex-row items-center gap-2">
                  <Icon
                    icon="ph:star-fill"
                    width={24}
                    className="text-primary"
                  />
                  <span className="font-medium">
                    {instructor.rating?.toFixed(1) || "0.0"}
                  </span>
                  <span className="text-base-content/60">rating</span>
                </div>
                <div className="flex flex-row items-center gap-2">
                  <Icon icon="ph:users" width={24} className="text-secondary" />
                  <span className="font-medium">
                    {instructor.students || 0}
                  </span>
                  <span className="text-base-content/60">students</span>
                </div>
                <div className="flex flex-row items-center gap-2">
                  <Icon
                    icon="ph:play-circle-fill"
                    width={24}
                    className="text-primary"
                  />
                  <span className="font-medium">{courses.length}</span>
                  <span className="text-base-content/60">courses</span>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col justify-end gap-4">
            <div className="flex flex-row flex-wrap justify-end gap-2">
              {socialLinks
                .filter((link) => link.value)
                .map((link) => (
                  <Link
                    key={link.label}
                    href={link.value!}
                    target={link.label === "website" ? undefined : "_blank"}
                    rel="noopener noreferrer"
                    className="bg-base-200 flex h-12 w-12 flex-row items-center justify-center"
                  >
                    <Icon
                      className="text-neutral"
                      icon={link.icon}
                      width={24}
                    />
                  </Link>
                ))}
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto mt-8 grid w-full grid-cols-1 gap-8 px-4 md:grid-cols-3">
        <div className="border-base-content/10 flex h-max flex-col gap-4 border p-8">
          <span className="text-lg font-medium">About me</span>
          <p className="text-base-content/60 text-sm">
            {instructor.bio ||
              "This instructor is passionate about sharing practical, real-world knowledge."}
          </p>
        </div>
        <div className="flex w-full flex-col md:col-span-2">
          <span className="text-2xl font-semibold">
            Instructor Courses{" "}
            <span className="font-normal">({courses.length})</span>
          </span>
          <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2">
            {courses.map((course) => (
              <CourseCard
                key={course._id.toString()}
                id={course._id.toString()}
                thumbnail={course.thumbnail || "/images/course-img-1.png"}
                name={course.title}
                rating={course.rating || 0}
                students={course.studentsCount || 0}
                price={course.price || 0}
                category={course.category?.toString() || ""}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default InstructorProfilePage;
