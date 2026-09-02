import React from "react";
import Link from "next/link";

import StudentProfile from "@/components/Student/StudentProfile";

export const dynamic = "force-dynamic";

const tabLinks = [
  { label: "Dashboard", href: "/student" },
  { label: "Courses", href: "/student/courses" },
  { label: "Teachers", href: "/student/teachers" },
  { label: "Message", href: "/student/messages" },
  { label: "Wishlist", href: "/student/wishlist" },
  { label: "Purchase History", href: "/student/purchase-history" },
  { label: "Settings", href: "/student/settings" },
];

interface Props {
  children: React.ReactNode;
}

export default function StudentDashboardLayout({ children }: Props) {
  return (
    <section className="bg-base-200 flex min-h-screen w-full flex-col items-center">
      <div className="bg-primary/10 flex w-full justify-center">
        <div className="mx-2 w-full max-w-5xl">
          <StudentProfile />

          <div className="bg-base-100 border-primary/20 border-b">
            <nav className="scrollbar-hide flex w-full justify-center gap-1 overflow-x-auto px-2 py-2 md:justify-between md:gap-2 md:px-6">
              <div className="flex w-full items-start gap-1 md:gap-2">
                {tabLinks.map((tab) => {
                  return (
                    <Link
                      key={tab.href}
                      href={tab.href}
                      className="text-base-content/70 hover:text-primary px-4 py-2.5 text-sm font-medium whitespace-nowrap transition-colors sm:px-5 sm:py-3 sm:text-base md:text-lg"
                    >
                      {tab.label}
                    </Link>
                  );
                })}
              </div>
            </nav>
          </div>
        </div>
      </div>

      <div className="bg-base-100 flex w-full justify-center pb-16">
        <div className="mt-6 w-full max-w-5xl px-3 md:mt-10 md:px-0">
          {children}
        </div>
      </div>
    </section>
  );
}
