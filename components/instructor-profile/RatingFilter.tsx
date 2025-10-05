"use client";

import React from "react";
import { useRouter, useSearchParams } from "next/navigation";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

const RatingFilter = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleChange = (value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("rating", value);
    router.push(`?${params.toString()}`);
  };

  const currentItem = searchParams.get("rating") || "all";

  return (
    <Select onValueChange={handleChange} value={currentItem}>
      <SelectTrigger className="bg-base-100 w-32 border-2">
        <SelectValue placeholder="Rating" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="all">All</SelectItem>
        <SelectItem value="5">5 Star</SelectItem>
        <SelectItem value="4">4 Star</SelectItem>
        <SelectItem value="3">3 Star</SelectItem>
        <SelectItem value="2">2 Star</SelectItem>
        <SelectItem value="1">1 Star</SelectItem>
      </SelectContent>
    </Select>
  );
};

export default RatingFilter;
