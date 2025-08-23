"use client";

import Categories from "./courseFilter/Categories";
import Tools from "./courseFilter/Tools";
import Rating from "./courseFilter/Rating";
import CourseLevel from "./courseFilter/CourseLevel";
import PriceSelect from "./courseFilter/PriceSelect";
import Duration from "./courseFilter/Duration";
import { useState, useCallback } from "react";
import { useRouter, useSearchParams } from "next/navigation";

// FIXME : fixed forms in children components

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
  initialPriceFilters?: { Free: boolean; Paid: boolean };
};

const CourseFilter = ({
  categories,
  tools,
  rating,
  courseLevel,
  duration,
  price,
  initialPriceFilters,
}: Props) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [priceFilters, setPriceFilters] = useState<{
    Free: boolean;
    Paid: boolean;
  }>(initialPriceFilters || { Free: false, Paid: false });

  const handlePriceFilterChange = useCallback(
    (filters: { Free: boolean; Paid: boolean }) => {
      setPriceFilters(filters);

      const params = new URLSearchParams(searchParams.toString());

      if (filters.Free) {
        params.set("priceFree", "true");
      } else {
        params.delete("priceFree");
      }

      if (filters.Paid) {
        params.set("pricePaid", "true");
      } else {
        params.delete("pricePaid");
      }

      if (filters.Free || filters.Paid) {
        params.set("filter", "true");
      }

      const newUrl = `/courses?${params.toString()}`;
      router.push(newUrl);
    },
    [router, searchParams]
  );

  return (
    <aside className="border-base-300 bg-base-100 mt-8 w-full !space-y-1.5 md:mt-0 md:w-5/12 md:border-r md:p-4">
      <Categories categories={categories} />
      <Tools tools={tools} />
      <Rating rating={rating} />
      <CourseLevel courseLevel={courseLevel} />
      <PriceSelect
        price={price}
        onPriceFilterChange={handlePriceFilterChange}
        initialFilters={priceFilters}
      />
      <Duration duration={duration} />
    </aside>
  );
};

export default CourseFilter;
