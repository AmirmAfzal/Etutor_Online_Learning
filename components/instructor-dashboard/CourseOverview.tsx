"use client";

import React from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/Select";

const data = [
  {
    name: "Sun",
    uv: 5200,
    pv: 5400,
  },
  {
    name: "Mon",
    uv: 4000,
    pv: 4398,
  },
  {
    name: "Tue",
    uv: 6000,
    pv: 8800,
  },
  {
    name: "Wed",
    uv: 3780,
    pv: 3908,
  },
  {
    name: "Thu",
    uv: 5890,
    pv: 4800,
  },
  {
    name: "Fri",
    uv: 4390,
    pv: 3800,
  },
  {
    name: "Sat",
    uv: 3490,
    pv: 4300,
  },
];

const CourseOverview = () => {
  return (
    <div className="bg-base-100 h-full w-full">
      <div className="border-base-300 flex flex-row items-center justify-between border-b p-4">
        <h3 className="text-sm font-bold">Course Overview</h3>
        <Select>
          <SelectTrigger className="border-0">
            <SelectValue placeholder="This Week" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="this-week">This Week</SelectItem>
            <SelectItem value="last-week">Last Week</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="pr-4">
        <ResponsiveContainer width="100%" height={380}>
          <AreaChart data={data}>
            <XAxis
              dataKey="name"
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
              dataKey="uv"
              stackId="1"
              stroke="#FF6636"
              strokeWidth={3}
              fill="#EBEBFF"
            />
            <Area
              type="monotone"
              dataKey="pv"
              stackId="2"
              stroke="#564FFD"
              strokeWidth={3}
              fill="#EBEBFF"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default CourseOverview;
