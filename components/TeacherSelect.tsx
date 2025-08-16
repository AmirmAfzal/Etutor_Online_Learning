import Form from "next/form";

import {
  Select,
  SelectItem,
  SelectContent,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/Select";
const TeacherSelect = () => {
  return (
    <Form className="flex flex-1 flex-row gap-2" action="">
      <div className="flex flex-2 flex-col gap-2">
        <div className="flex flex-row items-center gap-2">
          <label htmlFor="sort" className="text-base-content/60 text-xs">
            Courses:
          </label>
        </div>
        <Select name="courses">
          <SelectTrigger className="w-40">
            <SelectValue placeholder="Courses" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="All">All Courses</SelectItem>
            <SelectItem value="1">1 Course</SelectItem>
            <SelectItem value="2">2 Courses</SelectItem>
            <SelectItem value="3">3 Courses</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="flex flex-1 flex-col gap-2">
        <div className="flex flex-row items-center gap-2">
          <label htmlFor="sort" className="text-base-content/60 text-xs">
            Sort by:
          </label>
        </div>
        <Select name="sort">
          <SelectTrigger className="w-40">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Latest">Latest</SelectItem>
            <SelectItem value="Oldest">Oldest</SelectItem>
            <SelectItem value="Most Students">Most Students</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <button type="submit" className="hidden" />
    </Form>
  );
};

export default TeacherSelect;
