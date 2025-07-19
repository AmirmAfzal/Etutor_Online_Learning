"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import StudentProfile from "@/components/StudentProfile";

const mockProfiles = [
  {
    name: "Kevin Gilbert",
    job: "Web Designer & Best-Selling Instructor",
    image: "/images/profile-student.jpg",
  },
];

const tabLinks = [
  { label: "Dashboard", href: "/student" },
  { label: "Courses", href: "/student/courses" },
  { label: "Teachers", href: "/student/teachers" },
  { label: "Message", href: "/student/messages" },
  { label: "Wishlist", href: "/student/wishlist" },
  { label: "Purchase History", href: "/student/purchase-history" },
  { label: "Settings", href: "/student/settings" },
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
            <StudentProfile
              key={idx}
              name={profile.name}
              job={profile.job}
              image={profile.image}
            />
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
