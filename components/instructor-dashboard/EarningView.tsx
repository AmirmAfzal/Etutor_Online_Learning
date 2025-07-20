"use client";

import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

type Props = {};

const data = [
  {
    name: "Bar A",
    uv: 4000,
    earn: 3400,
    amt: 2400,
  },
  {
    name: "Bar B",
    uv: 3000,
    earn: 2398,
    amt: 2210,
  },
  {
    name: "Bar C",
    uv: 2000,
    earn: 7800,
    amt: 2290,
  },
  {
    name: "Bar D",
    uv: 2780,
    earn: 3908,
    amt: 2000,
  },
  {
    name: "Bar E",
    uv: 1890,
    earn: 6800,
    amt: 2181,
  },
  {
    name: "Bar F",
    uv: 2390,
    earn: 3800,
    amt: 2500,
  },
  {
    name: "Bar G",
    uv: 3490,
    earn: 4300,
    amt: 2100,
  },
  {
    name: "Bar H",
    uv: 3490,
    earn: 5500,
    amt: 2100,
  },
  {
    name: "Bar I",
    uv: 3490,
    earn: 3400,
    amt: 2100,
  },
];

const EarningView = (props: Props) => {
  return (
    <div className="bg-base-100 h-full w-full">
      <div className="border-base-300 flex flex-row items-center justify-between border-b p-4">
        <h3 className="text-sm font-bold">Profile View</h3>
        <Select>
          <SelectTrigger className="border-0">
            <SelectValue placeholder="Today" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="today">Today</SelectItem>
            <SelectItem value="yesterday">Yesterday</SelectItem>
            <SelectItem value="last-week">Last Week</SelectItem>
            <SelectItem value="last-month">Last Month</SelectItem>
            <SelectItem value="last-year">Last Year</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="p-4">
        <ResponsiveContainer width="100%" height={240}>
          <BarChart
            data={data}
            margin={{
              top: 5,
              right: 0,
              left: 0,
              bottom: 5,
            }}
            barSize={20}
          >
            <Tooltip />
            <Bar dataKey="earn" fill="#23BD33" background={{ fill: "#eee" }} />
          </BarChart>
        </ResponsiveContainer>

        <div className="py-2">
          <p className="font-bold">$7,443</p>
          <p className="text-base-content/60 text-sm">USD Dollar you earned.</p>
        </div>
      </div>
    </div>
  );
};

export default EarningView;
