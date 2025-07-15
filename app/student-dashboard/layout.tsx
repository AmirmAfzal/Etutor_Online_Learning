"use client";

import React from "react";
import { Icon } from "@iconify/react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const mockProfiles = [
  {
    name: "Kevin Gilbert",
    job: "Web Designer & Best-Selling Instructor",
    image: "/images/profile-student.jpg",
  },
];

const tabLinks = [
  { label: "Dashboard", href: "/student-dashboard" },
  { label: "Courses", href: "/student-dashboard/courses" },
  { label: "Teachers", href: "/student-dashboard/teachers" },
  { label: "Message", href: "/student-dashboard/messages" },
  { label: "Wishlist", href: "/student-dashboard/wishlist" },
  { label: "Purchase History", href: "/student-dashboard/purchase-history" },
  { label: "Settings", href: "/student-dashboard/settings" },
];

export default function StudentDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  return (
    <section className="bg-base-200 flex min-h-screen w-full flex-col items-center">
      <div
        className="bg-primary/10 flex w-full justify-center"
        style={{ minHeight: 260 }}
      >
        <div className="w-full max-w-5xl">
          {/* Profile Card */}
          {mockProfiles.map((profile, idx) => (
            <div
              key={idx}
              className="bg-base-100 border-primary/20 relative mt-8 mb-0 flex flex-col items-center gap-4 border-2 p-4 sm:gap-6 sm:p-6 md:flex-row md:items-center"
            >
              <Image
                src={profile.image}
                alt="Profile"
                width={112}
                height={112}
                className="h-20 w-20 rounded-full object-cover sm:h-28 sm:w-28"
                style={{ width: "auto", height: "auto" }}
                priority={true}
              />
              <div className="flex flex-1 flex-col items-center text-center md:items-start md:text-left">
                <h2 className="text-base-content text-lg font-bold sm:text-2xl">
                  {profile.name}
                </h2>
                <p className="text-base-content/50 mt-2 text-xs sm:mt-4 sm:text-base">
                  {profile.job}
                </p>
              </div>
              <button className="btn btn-soft btn-primary mt-2 w-full gap-2 font-bold md:static md:top-6 md:right-6 md:mt-0 md:ml-auto md:w-auto">
                Become Instructor
                <Icon
                  icon="solar:arrow-right-outline"
                  className="text-xl sm:text-2xl"
                />
              </button>
            </div>
          ))}
          {/* Tabs (Dynamic Links) */}
          <div className="bg-base-100 border-primary/20 mb-0 flex justify-between overflow-x-auto border-2 border-t-0 px-6 py-2">
            {tabLinks.map((tab) => (
              <Link
                key={tab.href}
                href={tab.href}
                className={`cursor-pointer px-4 py-2 font-medium ${pathname === tab.href ? "border-primary text-base-content/80 border-b-3 font-bold" : "text-base-content/50"}`}
                prefetch={false}
              >
                {tab.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
      {/* Main white content */}
      <div className="bg-base-100 flex w-full justify-center pb-16">
        <div className="mt-10 w-full max-w-5xl">{children}</div>
      </div>
    </section>
  );
}
