"use client";

import React, { startTransition, useEffect, useState } from "react";
import { AreaChart, Area, Tooltip, ResponsiveContainer, XAxis } from "recharts";
import { Rating } from "@fluentui/react-rating";

import {
  fetchAllCoursesRating,
  fetchCourseRating,
} from "@/lib/actions/instructor/getRating";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import Icon from "../ui/Icon";

type ChartData = {
  courseId?: string;
  instructorId?: string;
  averageRating: number;
  totalFeedbacks: number;
  dailyStats: {
    date: string;
    averageRating: number;
    totalFeedbacks: number;
  }[];
  ratingDistribution: Record<number, { count: number; percent: number }>;
};

const months = [
  { value: 1, label: "Jan" },
  { value: 2, label: "Feb" },
  { value: 3, label: "Mar" },
  { value: 4, label: "Apr" },
  { value: 5, label: "May" },
  { value: 6, label: "Jun" },
  { value: 7, label: "Jul" },
  { value: 8, label: "Aug" },
  { value: 9, label: "Sep" },
  { value: 10, label: "Oct" },
  { value: 11, label: "Nov" },
  { value: 12, label: "Dec" },
];

interface Props {
  chartData: ChartData;
  instructorId?: string;
  courseId?: string;
}

const CourseRating = ({ chartData, instructorId, courseId }: Props) => {
  const [month, setMonth] = useState(new Date().getUTCMonth() + 1);
  const [data, setData] = useState(chartData);
  const year = new Date().getFullYear();

  const changeHandler = (value: string) => {
    setMonth(Number(value));
  };

  useEffect(() => {
    const updateData = async () => {
      if (instructorId) {
        const result = await fetchAllCoursesRating(instructorId, month, year);
        setData(result);
      } else if (courseId) {
        const result = await fetchCourseRating(courseId, month, year);
        setData(result);
      }
    };

    startTransition(() => {
      updateData();
    });
  }, [month, instructorId, courseId, year]);

  return (
    <div className="bg-base-100 h-full w-full">
      <div className="border-base-300 flex flex-row items-center justify-between border-b p-4">
        <h3 className="text-sm font-bold">Overall Course Rating</h3>
        <Select value={month.toString()} onValueChange={changeHandler}>
          <SelectTrigger className="border-0">
            <SelectValue placeholder="This Month" />
          </SelectTrigger>
          <SelectContent>
            {months.map((m) => (
              <SelectItem key={m.value} value={m.value.toString()}>
                {m.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="border-base-300 grid grid-cols-8 gap-4 border-b p-4">
        <div className="bg-primary/10 col-span-3 flex flex-col items-center justify-center gap-2">
          <h3 className="text-3xl font-bold">
            {chartData.averageRating.toFixed(1)}
          </h3>
          <Rating
            className="text-primary"
            value={Number(chartData.averageRating.toFixed(1))}
            max={5}
          />
          <p className="text-base-content/70 text-sm">
            {chartData.courseId ? "Course" : "Overall"} Rating
          </p>
        </div>
        <ResponsiveContainer width="100%" height={180} className="col-span-5">
          <AreaChart
            data={data.dailyStats}
            margin={{ top: 0, right: 0, left: 0, bottom: 4 }}
          >
            <XAxis dataKey="date" hide={true} />
            <Tooltip />
            <Area
              type="monotone"
              dataKey="averageRating"
              stroke="#FD8E1F"
              strokeWidth={2}
              fill="#FFF2E5"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <div className="p-4">
        <div className="w-full space-y-2">
          {[5, 4, 3, 2, 1].map((stars) => {
            const data = chartData.ratingDistribution[stars];
            const percentage = data?.percent || 0;
            return (
              <div key={stars} className="flex items-center space-x-1">
                <div className="flex space-x-0.5 rtl:space-x-reverse">
                  <StarIcons count={stars} />
                </div>
                <div className="text-base-content/70 text-sm">
                  {stars} Stars
                </div>
                <div className="bg-base-300 h-2 flex-1">
                  <div
                    className="bg-primary h-full"
                    style={{ width: `${percentage}%` }}
                  />
                </div>
                <div className="w-10 text-sm">
                  {percentage < 1 ? "<1%" : `${percentage.toFixed(1)}%`}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

const StarIcons = ({ count }: { count: number }) => {
  const filled = Array(count).fill(
    <Icon icon="ph:star-fill" className="text-primary" width={18} height={18} />
  );
  const empty = Array(5 - count).fill(
    <Icon icon="ph:star" className="text-primary" width={18} height={18} />
  );
  return (
    <div className="flex space-x-0.5 rtl:space-x-reverse">
      {filled.map((icon, i) => (
        <span key={`f-${i}`}>{icon}</span>
      ))}
      {empty.map((icon, i) => (
        <span key={`e-${i}`}>{icon}</span>
      ))}
    </div>
  );
};

export default CourseRating;
