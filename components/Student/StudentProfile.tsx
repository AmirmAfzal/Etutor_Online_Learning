"use server";

import React from "react";
import Image from "next/image";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

import { authOptions } from "@/lib/auth/authOptions";
import { connectDB } from "@/lib/db/db";
import studentModel from "@/lib/db/models/studentModel";
import instructorModel from "@/lib/db/models/instructorModel";
import Icon from "@/components/ui/Icon";

import BecomeInstructorButton from "./BecomeInstructorButton";

export interface Student {
  user: string;
  _id: string;
  bio: string;
  avatar: string;
  firstname: string;
  lastname: string;
}

interface StudentProfileProp {
  name: string;
  job: string;
  image: string;
  _id: string;
}

const StudentProfile = async () => {
  await connectDB();
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    return redirect("/auth/signin");
  }

  const instructor = await instructorModel.findOne({ user: session.user.id });

  const student = await studentModel
    .findOne({ user: session.user.id })
    .lean<Student | null>();

  if (!student) {
    return redirect("/auth/signin");
  }

  const studentProfile: StudentProfileProp = {
    name: `${student.firstname} ${student.lastname}`,
    job: student.bio,
    image: student.avatar,
    _id: student._id,
  };

  return (
    <div className="bg-base-100 border-primary/20 mt-8 flex w-full flex-col items-center gap-4 border-2 p-4 sm:gap-6 sm:p-6 md:flex-row md:items-center">
      {studentProfile.image ? (
        <Image
          src={studentProfile.image}
          alt={`${studentProfile.name} profile`}
          width={112}
          height={112}
          className="h-20 w-20 rounded-full object-cover sm:h-28 sm:w-28"
          priority
        />
      ) : (
        <Icon
          icon="ph:user"
          className="text-5xl rounded-full border p-4 border-base-300"
        />
      )}
      <div className="flex flex-1 flex-col items-center text-center md:items-start md:text-left">
        <h2 className="text-base-content text-lg font-bold sm:text-2xl">
          {studentProfile.name}
        </h2>
        <p className="text-base-content/50 mt-2 text-xs sm:mt-4 sm:text-base">
          {studentProfile.job}
        </p>
      </div>

      <BecomeInstructorButton
        userId={session.user.id}
        student={JSON.parse(JSON.stringify(student))}
        isInstructor={instructor ? true : false}
      />
    </div>
  );
};

export default StudentProfile;
