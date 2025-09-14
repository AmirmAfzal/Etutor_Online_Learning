"use client";

import React from "react";
import { Document } from "mongoose";

import { CategoryInterface } from "@/lib/db/models/categoryModel";

import Icon from "../ui/Icon";

type Category = Omit<CategoryInterface, keyof Document>;

interface Props {
  category: Category[];
}

const categoryThemes = {
  "development": {
    icon: "ph:code-duotone",
    bg: "bg-[#EBEBFF]",
    color: "text-[#564FFD]",
  },
  "design": {
    icon: "ph:pen-nib-duotone",
    bg: "bg-[#FFEEE8]",
    color: "text-[#FF6636]",
  },
  "marketing": {
    icon: "ph:megaphone-simple-duotone",
    bg: "bg-[#EBEBFF]",
    color: "text-[#564FFD]",
  },
  "it & software": {
    icon: "ph:chart-bar-horizontal-duotone",
    bg: "bg-[#FFF0F0]",
    color: "text-[#E34444]",
  },
  "business": {
    icon: "ph:handshake-duotone",
    bg: "bg-[#E1F7E3]",
    color: "text-[#23BD33]",
  },
  "music": {
    icon: "ph:headphones-duotone",
    bg: "bg-[#FFF2E5]",
    color: "text-[#FD8E1F]",
  },
  "lifestyle": {
    icon: "ph:package-duotone",
    bg: "bg-[#FFF2E5]",
    color: "text-[#FD8E1F]",
  },
  "photography & video": {
    icon: "ph:camera-duotone",
    bg: "bg-[#F5F7FA]",
    color: "text-[#1D2026]",
  },
  "office productivity": {
    icon: "ph:receipt-duotone",
    bg: "bg-[#F5F7FA]",
    color: "text-[#1D2026]",
  },
  "personal development": {
    icon: "ph:bug-droid-duotone",
    bg: "bg-[#FFEEE8]",
    color: "text-[#FD8E1F]",
  },
  "finance & accounting": {
    icon: "ph:credit-card-duotone",
    bg: "bg-[#FFF2E5]",
    color: "text-[#FD8E1F]",
  },
  "label": {
    icon: "ph:cpu-duotone",
    bg: "bg-[#EBEBFF]",
    color: "text-[#564FFD]",
  },
};

const CategoryCard = ({ category }: Props) => {
  const getTheme = (name: string) => {
    return (
      categoryThemes[name.toLowerCase() as keyof typeof categoryThemes] ||
      categoryThemes.label
    );
  };

  return (
    <div className="grid grid-cols-1 gap-6 px-8 md:grid-cols-3 md:px-0 lg:grid-cols-4">
      {category.map((item) => {
        const theme = getTheme(item.name);
        return (
          <div
            key={item.name}
            className={`flex flex-row items-center gap-4 p-4 ${theme.bg}`}
          >
            <div className="bg-base-100 flex h-16 w-16 items-center justify-center">
              <Icon
                icon={theme.icon}
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
