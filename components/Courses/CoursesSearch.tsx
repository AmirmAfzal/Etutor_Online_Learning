import Form from "next/form";

import { Input } from "@/components/ui/input";

import Icon from "../ui/Icon";

const CoursesSearch = () => {
  return (
    <Form action="/courses" className="relative flex w-full items-center gap-2">
      <button type="submit" className="absolute top-3 left-4 z-10">
        <Icon icon="ph:magnifying-glass" className="text-xl" />
      </button>
      <Input
        type="text"
        name="query"
        // defaultValue={searchParams.query || ""}
        className="w-96 pl-12"
        placeholder="Search courses..."
      />
    </Form>
  );
};

export default CoursesSearch;
