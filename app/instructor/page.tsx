import React from "react";
import Link from "next/link";
import Image from "next/image";

import Icon from "@/components/ui/Icon";
import { connectDB } from "@/lib/db/db";
import instructorModel, {
  InstructorInterface,
} from "@/lib/db/models/instructorModel";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Instructors | E-Tutor",
  description: "Browse our instructors and their courses.",
};

const InstructorsPage = async () => {
  await connectDB();
  const instructors = (await instructorModel
    .find()
    .sort({ createdAt: -1 })
    .lean()) as unknown as InstructorInterface[];

  return (
    <div className="bg-base-200 min-h-screen">
      <div className="bg-primary/10 flex h-48 items-center justify-center">
        <h1 className="text-3xl font-bold">Our Instructors</h1>
      </div>
      <div className="container mx-auto px-4 py-12">
        {instructors.length === 0 ? (
          <p className="text-base-content/60 text-center">
            No instructors yet. Check back soon.
          </p>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {instructors.map((instructor) => (
              <Link
                key={instructor._id.toString()}
                href={`/instructor/${instructor._id.toString()}`}
                className="bg-base-100 border-base-content/10 group flex flex-col items-center gap-4 border p-8 transition hover:shadow"
              >
                {instructor.avatar ? (
                  <Image
                    src={instructor.avatar}
                    alt={`${instructor.firstname} ${instructor.lastname}`}
                    width={128}
                    height={128}
                    className="h-32 w-32 rounded-full object-cover"
                  />
                ) : (
                  <Icon
                    icon="ph:user-circle-duotone"
                    className="text-base-content/40 h-32 w-32"
                  />
                )}
                <div className="text-center">
                  <h2 className="text-lg font-bold">
                    {instructor.firstname} {instructor.lastname}
                  </h2>
                  <p className="text-base-content/60 mt-1 text-sm">
                    {instructor.title || "Instructor"}
                  </p>
                </div>
                <div className="text-base-content/60 flex items-center gap-4 text-sm">
                  <span className="flex items-center gap-1">
                    <Icon icon="ph:star-fill" className="text-primary" />
                    {instructor.rating?.toFixed(1) || "0.0"}
                  </span>
                  <span className="flex items-center gap-1">
                    <Icon icon="ph:users" className="text-secondary" />
                    {instructor.students || 0} students
                  </span>
                  <span className="flex items-center gap-1">
                    <Icon icon="ph:play-circle-fill" className="text-primary" />
                    {instructor.courses?.length || 0} courses
                  </span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default InstructorsPage;
