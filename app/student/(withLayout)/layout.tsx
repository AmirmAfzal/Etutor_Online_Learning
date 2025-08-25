import React from "react";
import Link from "next/link";

import StudentProfile from "@/components/Student/StudentProfile";

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
  return (
    <section className="bg-base-200 flex min-h-screen w-full flex-col items-center">
      <div className="bg-primary/10 flex min-h-[260px] w-full justify-center">
        <div className="w-full max-w-5xl">
          <StudentProfile />
          <div className="bg-base-100 border-primary/20 mb-0 flex justify-between overflow-x-auto border-2 border-t-0 px-6 py-2">
            {tabLinks.map((tab) => (
              // TODO => active tab has a border-b-primary
              <Link
                key={tab.href}
                href={tab.href}
                className={`text-base-content/80 cursor-pointer px-4 py-2 text-lg font-medium`}
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
