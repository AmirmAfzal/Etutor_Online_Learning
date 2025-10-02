"use client";

import React, { startTransition, useEffect, useState } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

import {
  fetchCourseComments,
  fetchInstructorComments,
} from "@/lib/actions/instructor/getComments";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

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
  chartData: { day: string; comments: number }[];
  courseId?: string;
  instructorId?: string;
}

const CourseOverview = ({ chartData, courseId, instructorId }: Props) => {
  const [month, setMonth] = useState(new Date().getUTCMonth() + 1);
  const [data, setData] = useState(chartData);
  const year = new Date().getFullYear();

  const changeHandler = (value: string) => {
    setMonth(Number(value));
  };

  useEffect(() => {
    const updateData = async () => {
      if (instructorId) {
        const result = await fetchInstructorComments(instructorId, month, year);
        setData(result);
      } else if (courseId) {
        const result = await fetchCourseComments(courseId, month, year);
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
        <h3 className="text-sm font-bold">Course Overview</h3>
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
      <div className="pr-4">
        <ResponsiveContainer width="100%" height={400}>
          <AreaChart data={data}>
            <XAxis
              dataKey="day"
              className="text-base-content/70 text-xs"
              tickLine={false}
              axisLine={false}
            />
            <YAxis
              className="text-base-content/70 text-xs"
              tickLine={false}
              axisLine={false}
            />
            <Tooltip />
            <Area
              type="monotone"
              dataKey="comments"
              stroke="#564FFD"
              strokeWidth={2}
              fill="#EBEBFF"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default CourseOverview;
