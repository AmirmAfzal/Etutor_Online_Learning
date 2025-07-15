"use client";

import React, { useMemo, useRef, useEffect, useState } from "react";
import { Icon } from "@iconify/react";
import Image from "next/image";
import gsap from "gsap";

const mockCoursesData = [
  {
    title: "Reiki Level I, II and Master/Teacher Program",
    subtitle: "1. Introductions",
    image: "/images/course-1.jpg",
    progress: null,
    status: null,
  },
  {
    title: "The Complete 2021 Web Development Bootcamp",
    subtitle: "167. What You'll Need to Get Started - Setup",
    image: "/images/course-2.jpg",
    progress: "61% Completed",
    status: "text-success",
  },
  {
    title: "Copywriting - Become a Freelance Copywriter",
    subtitle: "1. How to get started with figma",
    image: "/images/course-3.jpg",
    progress: null,
    status: null,
  },
  {
    title: "2021 Complete Python Bootcamp From Zero to Hero",
    subtitle: "9. Advanced CSS - Selector Priority",
    image: "/images/course-4.jpg",
    progress: "12% Finish",
    status: "text-success",
  },
];

export default function StudentDashboard() {
  const [loading, setLoading] = useState(true);
  const statsRef = useRef<HTMLDivElement>(null);
  const coursesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => setLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!loading) {
      if (statsRef.current) {
        gsap.fromTo(
          statsRef.current.children,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            stagger: 0.12,
            ease: "power2.out",
          }
        );
      }
      if (coursesRef.current) {
        gsap.fromTo(
          coursesRef.current.children,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.5,
            stagger: 0.1,
            delay: 0.2,
            ease: "power1.out",
          }
        );
      }
    }
  }, [loading]);

  const mockCourses = useMemo(() => mockCoursesData, []);

  const coursesGrid = useMemo(
    () => (
      <div
        className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
        ref={coursesRef}
      >
        {mockCourses.map((course, idx) => (
          <div
            key={idx}
            className="bg-base-100 border-base-content/20 flex h-full min-w-[220px] flex-col border-1 shadow-sm transition-all duration-200 hover:shadow-lg sm:min-w-0"
          >
            <Image
              src={course.image}
              alt={course.title}
              width={400}
              height={160}
              className="mb-2 h-32 w-full object-cover sm:mb-3 sm:h-36 md:h-40"
              style={{ width: "100%", height: "auto" }}
              priority={idx === 0}
            />
            <div className="flex-1 p-2 sm:p-3 md:p-4">
              <div className="text-base-content/50 mb-1 truncate text-xs font-medium sm:text-sm">
                {course.title}
              </div>
              <div className="text-base-content/70 mb-2 truncate text-xs font-semibold sm:text-xs">
                {course.subtitle}
              </div>
            </div>
            <div className="border-base-content/20 mt-auto border-t-1 p-2 sm:p-3 md:p-4">
              {course.progress ? (
                <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                  <button className="btn btn-soft btn-primary btn-xs w-full sm:w-auto">
                    Watch Lecture
                  </button>
                  <span
                    className={`text-[10px] font-semibold sm:text-xs ${course.status || ""}`}
                  >
                    {course.progress}
                  </span>
                </div>
              ) : (
                <button className="btn btn-soft btn-primary btn-xs w-full">
                  Watch Lecture
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    ),
    [mockCourses]
  );

  if (loading) {
    return (
      <div className="flex min-h-[400px] w-full flex-col items-center justify-center">
        <div className="relative h-20 w-20">
          <div
            id="gsap-loader"
            className="absolute inset-0 flex items-center justify-center"
          >
            <svg width="64" height="64" viewBox="0 0 64 64">
              <circle
                cx="32"
                cy="32"
                r="28"
                stroke="#6366f1"
                strokeWidth="6"
                fill="none"
                strokeLinecap="round"
                strokeDasharray="44 88"
              >
                <animateTransform
                  attributeName="transform"
                  type="rotate"
                  from="0 32 32"
                  to="360 32 32"
                  dur="1s"
                  repeatCount="indefinite"
                />
              </circle>
            </svg>
          </div>
          <span className="text-base-content/60 mt-8 block text-center text-lg font-semibold">
            Loading dashboard...
          </span>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* Dashboard Stats */}
      <div className="flex w-full flex-col items-start">
        <h3 className="text-base-content/80 mt-2 mb-2 text-lg font-medium sm:mt-0 sm:mb-4 sm:text-2xl">
          Dashboard
        </h3>
        <div
          className="mt-8 mb-8 grid w-full grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-4"
          ref={statsRef}
        >
          <div className="bg-primary/10 flex flex-row items-start gap-4 p-2 sm:p-6">
            <div className="bg-base-100 flex items-center gap-2 p-2">
              <Icon
                icon="icon-park-twotone:play"
                className="text-primary text-4xl md:text-5xl"
              />
            </div>
            <div className="flex flex-col gap-2">
              <span className="text-base-content/80 text-xl font-medium md:text-2xl">
                957
              </span>
              <span className="text-base-content/60 text-xs text-nowrap md:text-sm">
                Enrolled Courses
              </span>
            </div>
          </div>
          <div className="bg-secondary/10 flex flex-row items-start gap-4 p-4 sm:p-6">
            <div className="bg-base-100 flex items-center gap-2 p-2">
              <Icon
                icon="fontisto:checkbox-active"
                className="text-secondary text-4xl md:text-5xl"
              />
            </div>
            <div className="flex flex-col gap-2">
              <span className="text-base-content/80 text-xl font-medium md:text-2xl">
                6
              </span>
              <span className="text-base-content/60 text-xs text-nowrap md:text-sm">
                Active Courses
              </span>
            </div>
          </div>
          <div className="bg-success/10 flex flex-row items-start gap-4 p-4 sm:p-6">
            <div className="bg-base-100 flex items-center gap-2 p-2">
              <Icon
                icon="solar:cup-bold-duotone"
                className="text-success text-4xl md:text-5xl"
              />
            </div>
            <div className="flex flex-col gap-2">
              <span className="text-base-content/80 text-xl font-medium md:text-2xl">
                951
              </span>
              <span className="text-base-content/60 text-xs text-nowrap md:text-sm">
                Completed Courses
              </span>
            </div>
          </div>
          <div className="bg-primary/10 flex flex-row items-start gap-4 p-4 sm:p-6">
            <div className="bg-base-100 flex items-center gap-2 p-2">
              <Icon
                icon="solar:cup-bold-duotone"
                className="text-primary text-4xl md:text-5xl"
              />
            </div>
            <div className="flex flex-col gap-2">
              <span className="text-base-content/80 text-xl font-medium md:text-2xl">
                241
              </span>
              <span className="text-base-content/60 text-xs text-nowrap md:text-sm">
                Course Instructors
              </span>
            </div>
          </div>
        </div>
      </div>
      {/* Courses List */}
      <h3 className="text-base-content mb-4 text-lg font-semibold">
        Let’s start learning, Kevin
        {/* TODO: Add right && left arrow for pagination */}
      </h3>
      {coursesGrid}
    </>
  );
}
