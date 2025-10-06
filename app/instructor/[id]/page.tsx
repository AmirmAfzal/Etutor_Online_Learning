import React from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Document } from "mongoose";

import Icon from "@/components/ui/Icon";
import CourseCard from "@/components/Student/CourseCard";
import instructorModel, {
  InstructorInterface,
} from "@/lib/db/models/instructorModel";
import { connectDB } from "@/lib/db/db";
import courseModel from "@/lib/db/models/courseModel";
import calculateAllCoursesRating from "@/lib/utils/calculateAllCoursesRating";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import RatingStars from "@/components/instructor-profile/RatingStars";
import RatingFilter from "@/components/instructor-profile/RatingFilter";
import feedbackModel from "@/lib/db/models/feedbackModel";

type Instructor = Omit<InstructorInterface, keyof Document> & { _id: string };

interface Props {
  params: Promise<{
    id: string;
  }>;
  searchParams: Promise<{
    rating: string;
  }>;
}

const InstructorPage = async ({ params, searchParams }: Props) => {
  const rating = (await searchParams).rating || "all";

  const { id } = await params;
  const currentMonth = new Date().getUTCMonth() + 1;
  const currentYear = new Date().getFullYear();

  await connectDB();

  const instructor = await instructorModel.findById(id).lean<Instructor>();
  if (!instructor) notFound();

  const instructorRating = await calculateAllCoursesRating(
    instructor._id,
    currentMonth,
    currentYear
  );

  const courses = await courseModel
    .find({ authors: [instructor._id] })
    .populate("category", "name");

  let feedbacks = [];
  if (rating === "all") {
    feedbacks = await feedbackModel
      .find({ userId: instructor.user })
      .lean()
      .sort({ star: -1 });
  } else {
    feedbacks = await feedbackModel
      .find({ userId: instructor.user, star: { $eq: Number(rating) } })
      .lean()
      .sort({ star: -1 });
  }

  return (
    <div className="w-full">
      <div className="bg-primary/10 h-64"></div>
      <div className="bg-base-100 container mx-auto -mt-48 w-full">
        <div className="border-primary/20 flex w-full flex-row items-center justify-between gap-4 border-1 p-12">
          <div className="flex flex-row items-center gap-6">
            <Image
              className="h-50 w-50 rounded-full"
              src={instructor.avatar}
              alt="instractor"
              width={512}
              height={512}
            />
            <div className="flex flex-col">
              <div className="flex flex-row items-center gap-4">
                <h1 className="text-3xl font-semibold">{`${instructor.firstname} ${instructor.lastname}`}</h1>
                <button className="btn btn-primary btn-soft">
                  <Icon width={20} className="" icon="ph:crown-simple-bold" />
                  Top Rated
                </button>
              </div>
              <p className="text-base-content/60 mt-2">{instructor.title}</p>
              <div className="mt-4 flex flex-row gap-4">
                <div className="flex flex-row items-center gap-2">
                  <Icon
                    icon="ph:star-fill"
                    width={24}
                    className="text-primary"
                  />
                  <span className="font-medium">
                    {instructorRating.averageRating.toFixed(1)}
                  </span>
                  <span className="text-base-content/60">
                    ({instructorRating.totalFeedbacks.toLocaleString("en-US")}{" "}
                    review)
                  </span>
                </div>
                <div className="flex flex-row items-center gap-2">
                  <Icon icon="ph:users" width={24} className="text-secondary" />
                  <span className="font-medium">
                    {instructor.students.toLocaleString("en-US")}
                  </span>
                  <span className="text-base-content/60"> students</span>
                </div>
                <div className="flex flex-row items-center gap-2">
                  <Icon
                    icon="ph:play-circle-fill"
                    width={24}
                    className="text-primary"
                  />
                  <span className="font-medium">
                    {instructor.courses.length}
                  </span>
                  <span className="text-base-content/60"> courses</span>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col justify-end gap-4">
            {instructor.social.website && (
              <div className="flex flex-row items-center justify-end gap-2">
                <Icon
                  icon="ph:globe-simple"
                  width={24}
                  className="text-secondary"
                />
                <Link
                  className="link link-secondary text-sm font-medium"
                  href={instructor.social.website}
                >
                  {instructor.social.website}
                </Link>
              </div>
            )}
            <div className="flex flex-row gap-2">
              {instructor.social.facebook && (
                <Link
                  href={"/"}
                  className="bg-base-200 flex h-12 w-12 flex-row items-center justify-center"
                >
                  <Icon
                    className="text-neutral"
                    icon="ph:facebook-logo-bold"
                    width={24}
                  />
                </Link>
              )}
              {instructor.social.twitter && (
                <Link
                  href={"/"}
                  className="bg-base-200 flex h-12 w-12 flex-row items-center justify-center"
                >
                  <Icon
                    className="text-neutral"
                    icon="ph:twitter-logo-fill"
                    width={24}
                  />
                </Link>
              )}
              {instructor.social.instagram && (
                <Link
                  href={"/"}
                  className="bg-base-200 flex h-12 w-12 flex-row items-center justify-center"
                >
                  <Icon
                    className="text-neutral"
                    icon="ph:instagram-logo"
                    width={24}
                  />
                </Link>
              )}
              {instructor.social.youtube && (
                <Link
                  href={"/"}
                  className="bg-base-200 flex h-12 w-12 flex-row items-center justify-center"
                >
                  <Icon
                    className="text-neutral"
                    icon="ph:youtube-logo-fill"
                    width={24}
                  />
                </Link>
              )}
              {instructor.social.whatsapp && (
                <Link
                  href={"/"}
                  className="bg-base-200 flex h-12 w-12 flex-row items-center justify-center"
                >
                  <Icon
                    className="text-neutral"
                    icon="ph:whatsapp-logo"
                    width={24}
                  />
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto mt-8 grid w-full grid-cols-3 flex-row gap-8">
        <div className="border-base-content/10 flex h-max flex-col gap-4 border-1 p-8">
          <span className="text-lg font-medium">ABOUT ME</span>
          <p className="text-base-content/60 text-sm">{instructor.bio}</p>
        </div>
        <div className="col-span-2 flex w-full flex-col">
          <Tabs defaultValue="courses" className="mb-16 w-full">
            <TabsList className="bg-base-100 grid w-full grid-cols-4 gap-4 rounded-none border-b-2 text-lg">
              <TabsTrigger
                className="data-[state=active]:border-b-primary rounded-none border-b-2 text-lg data-[state=active]:shadow-none"
                value="courses"
              >
                Courses
              </TabsTrigger>
              <TabsTrigger
                className="data-[state=active]:border-b-primary rounded-none border-b-2 text-lg data-[state=active]:shadow-none"
                value="review"
              >
                Review
              </TabsTrigger>
            </TabsList>
            <TabsContent value="courses" className="mt-4">
              <h3 className="mt-6 text-2xl font-semibold">
                {instructor.firstname} Courses
                <span className="font-normal">
                  ({`${courses.length < 10 ? "0" : ""}${courses.length}`})
                </span>
              </h3>
              <div className="mt-6 grid grid-cols-2 gap-6">
                {courses.map((course, index) => (
                  <CourseCard
                    key={index}
                    id={course._id}
                    thumbnail={course.thumbnail}
                    name={course.title}
                    rating={course.rating}
                    students={course.studentsCount}
                    price={course.price}
                    category={course.category.name}
                  />
                ))}
              </div>
            </TabsContent>
            <TabsContent value="review" className="mt-4 space-y-6">
              <div className="mt-6 flex flex-row items-center justify-between">
                <h3 className="text-2xl font-semibold">Students Feedback</h3>
                <RatingFilter />
              </div>

              <div className="mt-4 space-y-4">
                {feedbacks.map((feedBack) => (
                  <div
                    key={String(feedBack._id)}
                    className="flex flex-row gap-4"
                  >
                    <div>
                      <Image
                        src="/images/dashboard-profile.png"
                        alt={feedBack.title || "User profile"}
                        className="rounded-md"
                        width={50}
                        height={50}
                      />
                    </div>
                    <div>
                      <p className="text-lg font-medium">{feedBack.title}</p>
                      <RatingStars stars={feedBack.star} />
                      <p className="text-base-content/70 mt-2">
                        {feedBack.feedback}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default InstructorPage;
