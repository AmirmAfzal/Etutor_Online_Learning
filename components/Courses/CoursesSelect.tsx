"use client";

import { useRouter, useSearchParams } from "next/navigation";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Props {
  className?: string;
}

const CoursesSelect = ({ className }: Props) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleValueChange = (value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("sorted", value);
    router.push(`?${params.toString()}`);
  };

  const currentSort = searchParams.get("sorted") || "trending";

  return (
    <div
      className={
        `flex w-full flex-row items-center justify-between gap-3 sm:justify-end ${className}`
      }
    >
      <label htmlFor="sorted" className="text-base-content/60 text-sm">
        Sorted by:
      </label>

      <Select onValueChange={handleValueChange} value={currentSort}>
        <SelectTrigger className="text-base-content/60 border-0 font-medium">
          <SelectValue placeholder="Select" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="trending">Trending</SelectItem>
          <SelectItem value="newest">Newest</SelectItem>
          <SelectItem value="oldest">Oldest</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};

export default CoursesSelect;
