"use client";

import React, {
  ChangeEvent,
  startTransition,
  useActionState,
  useState,
} from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { findCourses } from "@/lib/actions/instructor/findCourses";
import { CourseTypes } from "@/app/page";

import { Input } from "../ui/input";
import Icon from "../ui/Icon";
import InstructorProfile from "./InstructorProfile";

interface Props {
  children: React.ReactNode;
}

const Navbar = ({ children }: Props) => {
  const [openSearchResult, setOpenSearchResult] = useState(false);
  const [state, searchFormAction, pending] = useActionState(findCourses, {
    message: "",
    errors: [],
    data: [],
  });

  const pathName = usePathname();
  const urlArr = pathName.split("/");
  const pageUrl = urlArr[urlArr.length - 1];

  function pageNameHandler(): string {
    let header;
    switch (pageUrl) {
      case "dashboard":
        header = "Dashboard";
        break;
      case "create-course":
        header = "Create a new course";
        break;
      case "my-courses":
        header = "My Courses";
        break;
      case "earning":
        header = "Earning";
        break;
      case "message":
        header = "Message";
        break;
      case "settings":
        header = "Settings";
        break;

      default:
        header = "Dashboard";
        break;
    }
    if (urlArr.includes("my-courses")) {
      header = "My Courses";
    }
    return header;
  }

  const foundCourseHandler = (e: ChangeEvent<HTMLInputElement>) => {
    startTransition(() => {
      searchFormAction(e.target.value);
    });
  };

  return (
    <nav className="w-full p-6">
      <div className="container mx-auto flex flex-col justify-between gap-4 md:flex-row">
        <div className="flex flex-row items-center gap-4">
          {children}
          <div>
            <p className="text-base-content/70 text-xs">Good Morning</p>
            <h2 className="text-lg font-bold">{pageNameHandler()}</h2>
          </div>
        </div>
        <div className="flex flex-row items-center justify-between gap-4">
          <div className="relative">
            <Icon
              icon="ph:magnifying-glass"
              width="20"
              height="20"
              className="absolute top-2 left-2 z-10"
            />
            <Input
              type="text"
              className="bg-base-300 w-48 rounded-none pl-8 md:w-96"
              placeholder="Search in courses"
              onChange={foundCourseHandler}
              onFocus={() => setOpenSearchResult(true)}
            />
            {openSearchResult && (
              <div className="bg-base-100 absolute z-10 w-full p-2">
                <div className="flex flex-row items-center justify-between">
                  <div className="">Search Result</div>
                  <button
                    onClick={() => setOpenSearchResult(false)}
                    className="text-error cursor-pointer"
                  >
                    <Icon icon="ph:x" width="24" height="24" />
                  </button>
                </div>
                <div className="mt-2 max-h-86 w-full space-y-2 overflow-y-scroll">
                  {state.data && pending ? (
                    <div className="flex h-full w-full items-center justify-center py-8">
                      <div className="loading loading-spinner" />
                    </div>
                  ) : state.data.length == 0 ? (
                    <div className="flex h-full w-full items-center justify-center py-8">
                      <p>No Result</p>
                    </div>
                  ) : (
                    state.data.map((course: CourseTypes) => (
                      <div
                        className="flex flex-row items-center"
                        key={course._id}
                      >
                        <Image
                          src={course.thumbnail}
                          alt={course.title}
                          width={200}
                          height={100}
                          className="max-w-32 min-w-32"
                        />
                        <div className="flex h-full w-full flex-col justify-between gap-2 px-2">
                          <Link href={`/courses/${course._id}`}>
                            {course.title}
                          </Link>
                          <div className="flex flex-row items-center justify-between">
                            <p className="text-xs">
                              {course.duration} {course.durationUnit}
                            </p>
                            <p className="text-primary text-sm">
                              ${course.price}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}
          </div>
          <div className="bg-base-300 flex items-center justify-center p-2">
            <Icon icon="ph:bell" width="20" height="20" />
          </div>
          <div>
            <InstructorProfile className="h-11 w-11" />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
