import StudentProfile from "@/components/Student/StudentProfile";
import React from "react";

export default function StudentDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="bg-base-200 flex min-h-screen w-full flex-col items-center">
      {/* Main white content */}
      <StudentProfile name={""} job={""} image={""} />
      <div className="bg-base-100 flex w-full justify-center pb-16">
        <div className="mt-10 w-full max-w-5xl">{children}</div>
      </div>
    </section>
  );
}
