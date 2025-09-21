"use client"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import React from "react";
import { useRouter, useSearchParams } from "next/navigation";

const StarSelect = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleValueChange = (value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("sort", value);
    router.push(`?${params.toString()}`);
  };

  const currentSort = searchParams.get("sort") || "5";

  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <span className="text-base-content/80 text-xl font-semibold sm:text-2xl">
        Students Feedback
      </span>
      <Select onValueChange={handleValueChange} value={currentSort}>
        <SelectTrigger className="w-40">
          <SelectValue placeholder="5 Star Rating" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="5">5 Star Rating</SelectItem>
          <SelectItem value="4">4 Star Rating</SelectItem>
          <SelectItem value="3">3 Star Rating</SelectItem>
          <SelectItem value="2">2 Star Rating</SelectItem>
          <SelectItem value="1">1 Star Rating</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};

export default StarSelect;
