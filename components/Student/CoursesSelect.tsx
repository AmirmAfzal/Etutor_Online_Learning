"use client";



import {
  Select,
  SelectItem,
  SelectContent,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useRouter, useSearchParams } from "next/navigation";

const CoursesSelect = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleValueChange = (value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("sorted", value);
    router.push(`?${params.toString()}`);
  };

  const currentSort = searchParams.get("sorted") || "Latest";

  return (
    <div className="flex flex-row gap-2">
      <div className="flex flex-col gap-2">
        <div className="flex flex-row items-center gap-2">
          <label htmlFor="sort" className="text-base-content/60 text-xs">
            Sorted by:
          </label>
        </div>
        <Select name="sort" onValueChange={handleValueChange} value={currentSort}>
          <SelectTrigger className="w-40 text-base-content/60 ">
            <SelectValue placeholder="select" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Latest">Latest</SelectItem>
            <SelectItem value="Oldest">Oldest</SelectItem>
            <SelectItem value="MostViewed">Most Viewed</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="flex flex-col gap-2">
        <div className="flex flex-row items-center gap-2">
          <label htmlFor="status" className="text-base-content/60 text-xs">
            Status:
          </label>
        </div>
        <Select name="status" onValueChange={handleValueChange}>
          <SelectTrigger className="w-40">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="All Courses">All Courses</SelectItem>
            <SelectItem value="Ongoing">Ongoing</SelectItem>
            <SelectItem value="Completed">Completed</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="flex flex-col gap-2">
        <div className="flex flex-row items-center gap-2">
          <label htmlFor="teacher" className="text-base-content/60 text-xs">
            Teacher:
          </label>
        </div>
        <Select name="teacher" onValueChange={handleValueChange}>
          <SelectTrigger className="w-40">
            <SelectValue placeholder="Teacher" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="All Teachers">All Teachers</SelectItem>
            <SelectItem value="Mr. Ahmadi">Mr. Ahmadi</SelectItem>
            <SelectItem value="Mr. Rezaei">Mr. Rezaei</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <button type="submit" className="hidden" />
    </div>
  );
};

export default CoursesSelect;
