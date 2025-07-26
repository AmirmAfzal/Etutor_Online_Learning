import Image from "next/image";
import React from "react";

import CourseInformation from "@/components/instructor-dashboard/course-detail/CourseInformation";
import CourseOverview from "@/components/instructor-dashboard/CourseOverview";
import CourseRating from "@/components/instructor-dashboard/CourseRating";
import RevenueView from "@/components/instructor-dashboard/RevenueView";
import Icon from "@/components/ui/Icon";

type Props = {};

const CourseDetailPage = (props: Props) => {
  return (
    <section className="bg-base-200 w-full">
      <div className="container mx-auto p-6">
        <div className="py-4">
          course / My Courses / Development / Web Development
        </div>

        <div className="bg-base-100 flex flex-row gap-4 p-4">
          <Image
            src="/images/course-image.png"
            className="w-86"
            alt="course-detail"
            width={400}
            height={300}
          />
          <div className="w-full space-y-2">
            <div className="flex flex-row items-center gap-6 text-xs">
              <p className="text-base-content/70">
                <span>Uploaded: </span>
                <span className="text-base-content">Jan 21, 2025</span>
              </p>
              <p className="text-base-content/80">
                <span>Last Updated: </span>
                <span className="text-base-content">Sep 11, 2025</span>
              </p>
            </div>

            <h3 className="text-2xl font-bold">
              2021 Complete Python Bootcamp From Zero to Hero in Python
            </h3>
            <p className="text-base-content/70 text-sm">
              3 in 1 Course: Learn to design websites with Figma, build with
              Webflow, and make a living freelancing.
            </p>

            <div className="flex flex-row items-center justify-between">
              <div className="flex flex-row items-center gap-4">
                <div className="relative">
                  <Image
                    src="/images/dashboard-profile.png"
                    alt="instructor"
                    width={40}
                    height={40}
                  />
                  <Image
                    src="/images/dashboard-profile.png"
                    className="border-base-100 absolute top-0 left-6 rounded-full border-2"
                    alt="instructor"
                    width={40}
                    height={40}
                  />
                </div>
                <div className="ml-6">
                  <p className="text-base-content/70">Created by:</p>
                  <p>Kevin Gilbert , Kristin Watson</p>
                </div>
              </div>
              <div className="flex flex-row items-center gap-2">
                <div className="flex flex-row items-center">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Icon
                      icon="ph:star-fill"
                      width={20}
                      height={20}
                      className="text-primary"
                      key={star}
                    />
                  ))}
                </div>
                <p className="font-bold">4.8</p>
                <p className="text-base-content/70 text-sm">(123,456 Rating)</p>
              </div>
            </div>
            <div className="border-base-300 flex flex-row items-center justify-between border-t pt-4">
              <div className="flex flex-row items-center gap-4">
                <span className="border-base-300 border-r-2 pr-4">
                  <p className="text-lg">$13.99</p>
                  <p className="text-base-content/70 text-sm">Course prices</p>
                </span>
                <span>
                  <p className="text-lg">$132,829,277</p>
                  <p className="text-base-content/70 text-sm">
                    USD dollar revenue
                  </p>
                </span>
              </div>
              <div className="flex flex-row items-center gap-4">
                <button className="btn btn-primary">Withdrew Money</button>
                <button className="btn btn-soft">
                  <Icon icon="ph:dots-three" width="24" height="24" />
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-2 gap-6">
          <CourseInformation />
          <CourseRating />
        </div>
        <div className="mt-6 grid grid-cols-12 gap-6">
          <div className="col-span-5">
            <RevenueView stroke="#23BD33" fill="#E1F7E3" height={400} />
          </div>
          <div className="col-span-7">
            <CourseOverview />
          </div>
        </div>
      </div>
    </section>
  );
};

export default CourseDetailPage;
