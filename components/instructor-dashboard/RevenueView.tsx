"use client";

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
} from "../ui/select";

const data = [
  { name: "Aug 01", uv: 4000, pv: 2400, amt: 2400 },
  { name: "Aug 05", uv: 3000, pv: 1398, amt: 2210 },
  { name: "Aug 10", uv: 2000, pv: 9800, amt: 2290 },
  { name: "Aug 15", uv: 2780, pv: 3908, amt: 2000 },
  { name: "Aug 20", uv: 1890, pv: 4800, amt: 2181 },
  { name: "Aug 25", uv: 2390, pv: 3800, amt: 2500 },
  { name: "Aug 30", uv: 3490, pv: 4300, amt: 2100 },
];

interface Props {
  stroke: string;
  fill: string;
  height: number;
}

const RevenueView = ({ stroke, fill, height }: Props) => {
  return (
    <div className="bg-base-100 h-full w-full">
      <div className="border-base-300 flex flex-row items-center justify-between border-b p-4">
        <h3 className="text-sm font-bold">Revenue</h3>
        <Select>
          <SelectTrigger className="border-0">
            <SelectValue placeholder="This Month" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="this-month">This Month</SelectItem>
            <SelectItem value="last-month">Last Month</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <ResponsiveContainer width="100%" height={height}>
        <AreaChart
          data={data}
          margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
        >
          <XAxis
            dataKey="name"
            tickLine={false}
            axisLine={false}
            fontSize={12}
          />
          <YAxis fontSize={12} tickLine={false} axisLine={false} />
          <Tooltip />
          <Area
            type="monotone"
            dataKey="uv"
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
