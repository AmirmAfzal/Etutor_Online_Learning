import Image from "next/image";
import Link from "next/link";
import { Document } from "mongoose";

import { connectDB } from "@/lib/db/db";
import instructorModel, {
  InstructorInterface,
} from "@/lib/db/models/instructorModel";

import Icon from "../ui/Icon";

type Instructor = Omit<InstructorInterface, keyof Document>;

const TopInstructor = async () => {
  await connectDB();

  const instructors: Instructor[] = JSON.parse(
    JSON.stringify(await instructorModel.find().lean())
  );

  return (
    <section id="instructor" className="bg-base-100 border-base-300 container mx-auto -mt-48 space-y-8 border p-8 md:p-16">
      <h3 className="text-center text-2xl font-bold md:text-3xl">
        Top instructor of the month
      </h3>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
        {instructors.map((instructor: Instructor, index: number) => (
          <div key={index} className="border-base-300 border">
            <Image
              src={instructor.avatar}
              className="w-full"
              alt={instructor.firstname}
              width={200}
              height={200}
            />
            <div className="flex flex-col items-center gap-1 p-2">
              <p className="font-semibold">{`${instructor.firstname}  ${instructor.lastname}`}</p>
              <p className="text-base-content/50 text-sm">{instructor.title}</p>
            </div>
            <div className="border-base-300 flex flex-row items-center justify-between border-t p-2">
              <div className="flex flex-row items-center gap-1">
                <Icon
                  width="24"
                  height="24"
                  className="text-primary"
                  icon="ph:star-fill"
                />
                <p className="text-sm">{instructor.rating}</p>
              </div>
              <div className="flex flex-row items-center gap-1 text-sm">
                <p className="font-semibold">{instructor.students}</p>
                <p className="text-base-content/50">students</p>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="flex flex-col items-center justify-center gap-4 text-sm md:flex-row">
        <p className="text-base-content/50">
          Thousands of students waiting for a instructor. Start teaching &
          earning now!
        </p>
        <Link
          href="/student"
          className="text-primary flex flex-row items-center gap-2"
        >
          Become Instructor
          <Icon icon="ph:arrow-right" width="24" height="24" />
        </Link>
      </div>
    </section>
  );
};

export default TopInstructor;
