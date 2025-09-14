"use client";

import React from "react";
import { Document } from "mongoose";

import { CategoryInterface } from "@/lib/db/models/categoryModel";

import Icon from "../ui/Icon";

type Category = Omit<CategoryInterface, keyof Document>;

interface Props {
  category: Category[];
}

const categoryTheme = [
  { bg: "bg-[#EBEBFF]", color: "text-[#564FFD]" },
  { bg: "bg-[#FFEEE8]", color: "text-[#FF6636]" },
  { bg: "bg-[#FFF0F0]", color: "text-[#E34444]" },
  { bg: "bg-[#E1F7E3]", color: "text-[#23BD33]" },
  { bg: "bg-[#FFF2E5]", color: "text-[#FD8E1F]" },
  { bg: "bg-[#F5F7FA]", color: "text-[#1D2026]" },
];

const CategoryCard = ({ category }: Props) => {
  return (
    <div className="grid grid-cols-1 gap-6 px-8 md:grid-cols-3 md:px-0 lg:grid-cols-4">
      {category.map((item, index) => {
        const theme = categoryTheme[index % categoryTheme.length];

        return (
          <div
            key={item.name}
            className={`flex flex-row items-center gap-4 p-4 ${theme.bg}`}
          >
            <div className="bg-base-100 flex h-16 w-16 items-center justify-center">
              <Icon
                icon={item.icon || "ph:cpu-duotone"}
                className={`${theme.color}`}
                width="32"
                height="32"
              />
            </div>
            <div className="flex flex-col gap-2">
              <p className="font-semibold">
                {item.name.charAt(0).toUpperCase() + item.name.slice(1)}
              </p>
              <p className="text-base-content/80 text-sm">Courses</p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default CategoryCard;
