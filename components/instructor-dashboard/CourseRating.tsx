"use client";

import React from "react";
import { AreaChart, Area, Tooltip, ResponsiveContainer } from "recharts";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import Icon from "../ui/Icon";

const data = [
  { name: "Aug 01", uv: 4.5, pv: 2400, amt: 2400 },
  { name: "Aug 05", uv: 3.4, pv: 1398, amt: 2210 },
  { name: "Aug 10", uv: 2.5, pv: 9800, amt: 2290 },
  { name: "Aug 15", uv: 5, pv: 3908, amt: 2000 },
  { name: "Aug 20", uv: 3, pv: 4800, amt: 2181 },
  { name: "Aug 25", uv: 4.5, pv: 3800, amt: 2500 },
  { name: "Aug 30", uv: 3.7, pv: 4300, amt: 2100 },
];

const ratings = [
  { stars: 5, percentage: 56 },
  { stars: 4, percentage: 37 },
  { stars: 3, percentage: 8 },
  { stars: 2, percentage: 1 },
  { stars: 1, percentage: 0.5 },
];

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

const CourseRating = () => {
  return (
    <div className="bg-base-100 h-full w-full">
      <div className="border-base-300 flex flex-row items-center justify-between border-b p-4">
        <h3 className="text-sm font-bold">Overall Course Rating</h3>
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
      <div className="border-base-300 grid grid-cols-8 gap-4 border-b p-4">
        <div className="bg-primary/10 col-span-3 flex flex-col items-center justify-center gap-2">
          <h3 className="text-3xl font-bold">4.6</h3>
          <div className="flex flex-row items-center gap-1">
            {[1, 2, 3, 4].map((star) => (
              <Icon
                key={star}
                icon="ph:star-fill"
                className="text-primary"
                width="20"
                height="20"
              />
            ))}

            <Icon
              icon="ph:star"
              className="text-primary"
              width="20"
              height="20"
            />
          </div>
          <p className="text-base-content/70 text-sm">Overall Rating</p>
        </div>
        <ResponsiveContainer width="100%" height={180} className="col-span-5">
          <AreaChart
            data={data}
            margin={{ top: 10, right: 0, left: 0, bottom: 0 }}
          >
            <Tooltip />
            <Area
              type="monotone"
              dataKey="uv"
              stroke="#FD8E1F"
              strokeWidth={2}
              fill="#FFF2E5"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <div className="p-4">
        <div className="w-full space-y-2">
          {ratings.map(({ stars, percentage }) => (
            <div key={stars} className="flex items-center space-x-1">
              <div className="flex space-x-0.5 rtl:space-x-reverse">
                <StarIcons count={stars} />
              </div>
              <div className="text-base-content/70 text-sm">{stars} Stars</div>
              <div className="bg-base-300 h-2 flex-1">
                <div
                  className="bg-primary h-full"
                  style={{ width: `${percentage}%` }}
                />
              </div>
              <div className="w-10 text-sm">
                {percentage < 1 ? "<1%" : `${percentage}%`}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CourseRating;
