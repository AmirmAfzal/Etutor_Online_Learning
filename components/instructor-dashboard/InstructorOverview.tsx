import React from "react";

import Icon from "../ui/Icon";

const InstructorOverview = () => {
  const overviewData = [
    {
      icon: "ph:play-circle-duotone",
      name: "Enrolled Courses",
      value: "957",
      bg: "bg-[#FFEEE8]",
      color: "text-[#FF6636]",
    },
    {
      icon: "ph:check-square-offset-duotone",
      name: "Active Courses",
      value: "19",
      bg: "bg-[#EBEBFF]",
      color: "text-[#564FFD]",
    },
    {
      icon: "ph:users-duotone",
      name: "Course Instructors",
      value: "241",
      bg: "bg-[#FFF2E5]",
      color: "text-[#FD8E1F]",
    },
    {
      icon: "ph:trophy-duotone",
      name: "Completed Courses",
      value: "951",
      bg: "bg-[#E1F7E3]",
      color: "text-[#23BD33]",
    },
    {
      icon: "ph:user-circle-duotone",
      name: "Students",
      value: "1,674,767",
      bg: "bg-[#FFF0F0]",
      color: "text-[#E34444]",
    },
    {
      icon: "ph:notepad-duotone",
      name: "Online Courses",
      value: "3",
      bg: "bg-[#E1F7E3]",
      color: "text-[#23BD33]",
    },
    {
      icon: "ph:credit-card-duotone",
      name: "USD Total Earning",
      value: "$7,461,767",
      bg: "bg-[#F5F7FA]",
      color: "text-[#1D2026]",
    },
    {
      icon: "ph:stack-duotone",
      name: "Course Sold",
      value: "56,489",
      bg: "bg-[#EBEBFF]",
      color: "text-[#564FFD]",
    },
  ];
  return (
    <div className="container mx-auto grid grid-cols-4 gap-6">
      {overviewData.map((data) => (
        <div
          key={data.name}
          className="bg-base-100 flex flex-row items-center gap-4 p-4"
        >
          <div
            className={`flex h-16 w-16 items-center justify-center ${data.bg}`}
          >
            <Icon
              icon={data.icon}
              className={data.color}
              width="32"
              height="32"
            />
          </div>
          <div className="flex flex-col gap-2">
            <p className="font-semibold">{data.value}</p>
            <p className="text-base-content/80 text-xs">{data.name} Courses</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default InstructorOverview;
