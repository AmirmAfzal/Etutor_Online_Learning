"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/Select";
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
    <Form className="flex flex-row items-center gap-3" action={formAction}>
      <label htmlFor="sorted" className="text-base-content/60 text-sm">
        Sorted by:
      </label>
      <Select onValueChange={handleValueChange}>
        <SelectTrigger className="text-base-100 border-0">
          <SelectValue placeholder="Select" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="trending">Trending</SelectItem>
          <SelectItem value="newest">Newest</SelectItem>
          <SelectItem value="oldest">Oldest</SelectItem>
        </SelectContent>
      </Select>
    </Form>
  );
};

export default CoursesSelect;
