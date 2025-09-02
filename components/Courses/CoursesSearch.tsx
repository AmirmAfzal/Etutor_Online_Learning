import Form from "next/form";

import { Input } from "@/components/ui/input";

import Icon from "../ui/Icon";

const CoursesSearch = () => {
  return (
    <Form
      action="/courses"
      className="relative flex w-full max-w-full items-center"
    >
      <button
        type="submit"
        className="absolute top-1/2 left-4 z-10 -translate-y-1/2"
      >
        <Icon icon="ph:magnifying-glass" className="text-lg md:text-xl" />
      </button>
      <Input
        type="text"
        name="query"
        className="w-full py-2 pl-12 text-sm sm:w-75 md:w-96 md:py-3 md:text-base"
        placeholder="Search courses..."
      />
    </Form>
  );
};

export default CoursesSearch;
