import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import Icon from "../ui/Icon";

type Props = {};

const RecentActivity = (props: Props) => {
  const recentActivity = [
    {
      id: 1,
      icon: "ph:chat-circle-dots-fill",
      message:
        "Kevin comments on your lecture “What is ux” in “2021 ui/ux design with figma”",
      time: "just now",
    },
    {
      id: 2,
      icon: "ph:star-fill",
      message:
        "John give a 5 star rating on your course “2021 ui/ux design with figma”",
      time: "5 mins ago",
    },
    {
      id: 3,
      icon: "ph:cards-fill",
      message: "Sraboni purchase your course “2021 ui/ux design with figma”",
      time: "6 mins ago",
    },
    {
      id: 4,
      icon: "ph:cards-fill",
      message: "Arif purchase your course “2021 ui/ux design with figma”",
      time: "7 mins ago",
    },
  ];

  return (
    <div className="bg-base-100 h-full w-full">
      <div className="border-base-300 flex flex-row items-center justify-between border-b p-4">
        <h3 className="text-sm font-bold">Recent Activity</h3>
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
      <div className="space-y-4 p-4">
        {recentActivity.map((item) => (
          <div key={item.id} className="flex flex-row items-start gap-4">
            <div className="bg-primary flex items-center justify-center rounded-full p-2">
              <Icon
                icon={item.icon}
                className="text-base-100"
                width="18"
                height="18"
              />
            </div>
            <div className="space-y-2">
              <p className="text-sm font-semibold">{item.message}</p>
              <p className="text-base-content/70 text-xs">{item.time}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentActivity;
