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
} from "@/components/ui/select";

const data = [
  { name: "Aug 01", uv: 4000 },
  { name: "Aug 02", uv: 4050 },
  { name: "Aug 03", uv: 4500 },
  { name: "Aug 04", uv: 4900 },
  { name: "Aug 05", uv: 3200 },
  { name: "Aug 06", uv: 3500 },
  { name: "Aug 07", uv: 3800 },
  { name: "Aug 08", uv: 3000 },
  { name: "Aug 09", uv: 3400 },
  { name: "Aug 10", uv: 2200 },
  { name: "Aug 11", uv: 2800 },
  { name: "Aug 12", uv: 5300 },
  { name: "Aug 13", uv: 2600 },
  { name: "Aug 14", uv: 2800 },
  { name: "Aug 15", uv: 2880 },
  { name: "Aug 16", uv: 2780 },
  { name: "Aug 17", uv: 2780 },
  { name: "Aug 18", uv: 2180 },
  { name: "Aug 19", uv: 2980 },
  { name: "Aug 20", uv: 1890 },
  { name: "Aug 21", uv: 3890 },
  { name: "Aug 22", uv: 4890 },
  { name: "Aug 23", uv: 2890 },
  { name: "Aug 24", uv: 4890 },
  { name: "Aug 25", uv: 3390 },
  { name: "Aug 26", uv: 5390 },
  { name: "Aug 27", uv: 2590 },
  { name: "Aug 28", uv: 3390 },
  { name: "Aug 29", uv: 5390 },
  { name: "Aug 30", uv: 3490 },
];

interface Props {
  stroke: string;
  fill: string;
  height: number;
}

const Statistic = ({ stroke, fill, height }: Props) => {
  return (
    <div className="bg-base-100 h-full w-full">
      <div className="border-base-300 flex flex-row items-center justify-between border-b p-4">
        <h3 className="text-sm font-bold">Statistic</h3>
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

export default Statistic;
