import React from "react";

import Icon from "../ui/Icon";

interface InstructorOverviewProps {
  courseCount: number;
  studentCount: number;
}

const InstructorOverview = ({
  courseCount,
  studentCount,
}: InstructorOverviewProps) => {
  const overviewData = [
    {
      icon: "ph:play-circle-duotone",
      name: "My Courses",
      value: courseCount.toString(),
      bg: "bg-[#FFEEE8]",
      color: "text-[#FF6636]",
    },
    {
      icon: "ph:users-duotone",
      name: "Students",
      value: studentCount.toLocaleString(),
      bg: "bg-[#EBEBFF]",
      color: "text-[#564FFD]",
    },
    {
      icon: "ph:star-duotone",
      name: "Rating",
      value: "—",
      bg: "bg-[#FFF2E5]",
      color: "text-[#FD8E1F]",
    },
    {
      icon: "ph:chart-line-duotone",
      name: "Total Earnings",
      value: "—",
      bg: "bg-[#E1F7E3]",
      color: "text-[#23BD33]",
    },
  ];
  return (
    <div className="container mx-auto grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
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
            <p className="text-base-content/80 text-xs">{data.name}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default InstructorOverview;
