"use client";

import { startTransition, useEffect, useState } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

import {
  fetchCourseRevenue,
  fetchInstructorRevenue,
} from "@/lib/actions/instructor/revenue";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

type RevenuePoint = { day: string; income: number };

interface Props {
  stroke: string;
  fill: string;
  height: number;
  instructorId?: string;
  courseId?: string;
  initialChartData: RevenuePoint[];
}

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

const RevenueView = ({
  stroke,
  fill,
  height,
  instructorId,
  courseId,
  initialChartData,
}: Props) => {
  const [month, setMonth] = useState(new Date().getUTCMonth() + 1);
  const [data, setData] = useState<RevenuePoint[]>(initialChartData);
  const year = new Date().getFullYear();

  const changeHandler = (value: string) => {
    setMonth(Number(value));
  };

  useEffect(() => {
    const updateData = async () => {
      if (instructorId) {
        const result = await fetchInstructorRevenue(instructorId, month, year);
        setData(result);
      } else if (courseId) {
        const result = await fetchCourseRevenue(courseId, month, year);
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
        <h3 className="text-sm font-bold">Revenue</h3>
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

      <ResponsiveContainer width="100%" height={height}>
        <AreaChart
          data={data}
          margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
        >
          <XAxis
            dataKey="day"
            tickLine={false}
            axisLine={false}
            fontSize={12}
          />
          <YAxis fontSize={12} tickLine={false} axisLine={false} />
          <Tooltip />
          <Area
            type="monotone"
            dataKey="income"
            stroke={stroke}
            strokeWidth={2}
            fill={fill}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default RevenueView;
