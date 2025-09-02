"use client";

import React from "react";
import { Filter } from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import Categories from "./courseFilter/Categories";
import Tools from "./courseFilter/Tools";
import Rating from "./courseFilter/Rating";
import CourseLevel from "./courseFilter/CourseLevel";
import PriceSelect from "./courseFilter/PriceSelect";
import Duration from "./courseFilter/Duration";

type Props = {
  categories: {
    name: string;
    icon: string;
    subcategories: { [key: string]: number };
  }[];
  tools: { [key: string]: number };
  duration: { [key: string]: number };
  courseLevel: { [key: string]: number };
  price: { [key: string]: number };
  rating: {
    label: string;
    count: number;
  }[];
  children?: React.ReactNode;
};

const CourseFilterDialog = ({
  categories,
  tools,
  rating,
  courseLevel,
  duration,
  price,
  children,
}: Props) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        {children || (
          <button className="flex items-center gap-2 rounded-lg border border-neutral-200 bg-white px-4 py-2 text-sm font-medium text-neutral-700 transition-colors hover:bg-neutral-50 dark:border-neutral-800 dark:bg-neutral-950 dark:text-neutral-300 dark:hover:bg-neutral-900">
            <Filter className="h-4 w-4" />
            Filter Courses
          </button>
        )}
      </DialogTrigger>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="text-lg font-semibold text-neutral-900 dark:text-neutral-100">
            Filter Courses
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-6">
          <div className="space-y-4">
            <div className="border-b border-neutral-200 pb-4 dark:border-neutral-800">
              <h3 className="mb-3 text-sm font-semibold tracking-wide text-neutral-700 uppercase dark:text-neutral-300">
                Category
              </h3>
              <Categories categories={categories} />
            </div>

            <div className="border-b border-neutral-200 pb-4 dark:border-neutral-800">
              <h3 className="mb-3 text-sm font-semibold tracking-wide text-neutral-700 uppercase dark:text-neutral-300">
                Tools
              </h3>
              <Tools tools={tools} />
            </div>

            <div className="border-b border-neutral-200 pb-4 dark:border-neutral-800">
              <h3 className="mb-3 text-sm font-semibold tracking-wide text-neutral-700 uppercase dark:text-neutral-300">
                Rating
              </h3>
              <Rating rating={rating} />
            </div>

            <div className="border-b border-neutral-200 pb-4 dark:border-neutral-800">
              <h3 className="mb-3 text-sm font-semibold tracking-wide text-neutral-700 uppercase dark:text-neutral-300">
                Course Level
              </h3>
              <CourseLevel courseLevel={courseLevel} />
            </div>

            <div className="border-b border-neutral-200 pb-4 dark:border-neutral-800">
              <h3 className="mb-3 text-sm font-semibold tracking-wide text-neutral-700 uppercase dark:text-neutral-300">
                Price
              </h3>
              <PriceSelect price={price} />
            </div>

            <div>
              <h3 className="mb-3 text-sm font-semibold tracking-wide text-neutral-700 uppercase dark:text-neutral-300">
                Duration
              </h3>
              <Duration duration={duration} />
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CourseFilterDialog;

