"use client";

import {
  Select,
  SelectItem,
  SelectContent,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Form from "next/form";
import { useRef } from "react";

async function formAction(formData: FormData) {
  const data = Object.fromEntries(formData);
  console.log(data);
}

const CoursesSelect = () => {
  const formRef = useRef<HTMLFormElement>(null);

  const handleValueChange = () => {
    if (formRef.current) formRef.current.requestSubmit();
  };

  return (
    <Form action={formAction} ref={formRef} className="flex flex-row gap-2">
      <div className="flex flex-col gap-2">
        <div className="flex flex-row items-center gap-2">
          <label htmlFor="sort" className="text-base-content/60 text-xs">
            Sorted by:
          </label>
        </div>
        <Select name="sort" onValueChange={handleValueChange}>
          <SelectTrigger className="w-40">
            <SelectValue placeholder="Sorted by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Latest">Latest</SelectItem>
            <SelectItem value="Oldest">Oldest</SelectItem>
            <SelectItem value="Most Viewed">Most Viewed</SelectItem>
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
    </Form>
  );
};

export default CoursesSelect;
