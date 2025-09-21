import Form from "next/form";
import Link from "next/link";

import Icon from "@/components/ui/Icon";
import {
  Select,
  SelectItem,
  SelectContent,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import CourseFilter from "@/components/Courses/CourseFilter";

import FilterMobile from "../Courses/courseFilter/FilterMobile";
import CoursesSelect from "@/components/Courses/CoursesSelect";

interface Props {
  searchParams: Promise<{
    query?: string;
    minPrice?: string;
    maxPrice?: string;
    level?: string;
    rating?: string;
    duration?: string;
    tool?: string;
    category?: string;
    subCategories?: string;
    filter?: string;
    priceFree?: string;
    pricePaid?: string;
  }>;
}

const suggestions = ["User interface", "User experience", "Web design", "App"];
const SearchFilterAndResults = async (props: Props) => {
  const searchParams = await props.searchParams;
  const isFilterPanelVisible = searchParams.filter === "true";

  const filterUrl = new URLSearchParams(searchParams);
  if (isFilterPanelVisible) {
    filterUrl.delete("filter");
  } else {
    filterUrl.set("filter", "true");
  }

  return (
    <>
      <div className="mb-6 flex flex-col flex-wrap items-start justify-between gap-4 sm:flex-row sm:items-center">
        <div className="flex w-full flex-col gap-3 sm:flex-row sm:items-center sm:gap-3">
          <Link
            href={`/category?${filterUrl.toString()}`}
            className={`bg-base-100 flex-row items-center gap-3 rounded-none border p-2 md:flex ${
              isFilterPanelVisible
                ? "border-primary text-primary"
                : "border-primary/20 text-base-content/80"
            } hidden`}
          >
            <Icon icon="ph:faders-fill" className="text-xl" />
            <span className="text-sm">Filter</span>
            <span
              className={`${
                isFilterPanelVisible
                  ? "text-base-100 bg-primary px-2"
                  : "text-primary bg-primary/10 px-2"
              }`}
            >
              {isFilterPanelVisible ? "1" : "0"}
            </span>
          </Link>
          <FilterMobile searchParams={searchParams}>
            <CourseFilter searchParams={Promise.resolve(searchParams)} />
          </FilterMobile>

          <Form action="/category" className="relative w-full sm:w-72">
            <input
              type="text"
              name="query"
              placeholder="UI/UX Design"
              className="border-base-300 w-full rounded-none border px-4 py-2.5 pl-8 text-sm sm:py-3 sm:text-base"
            />
            <Icon
              icon="ph:magnifying-glass"
              className="text-base-content/50 absolute top-1/2 left-3 -translate-y-1/2"
            />
            <button type="submit" className="sr-only">
              Search
            </button>
          </Form>
        </div>

        <CoursesSelect className="sm:!justify-start" />
      </div>

      <div className="border-base-300 flex flex-col items-start justify-between gap-3 border-b pb-4 text-sm sm:flex-row sm:items-center sm:text-base">
        <div className="text-primary flex flex-wrap items-center gap-2">
          <span className="text-base-content">Suggestion:</span>
          {suggestions.map((suggestion) => (
            <button key={suggestion} className="hover:underline">
              {suggestion}
            </button>
          ))}
        </div>
      </div>
    </>
  );
};

export default SearchFilterAndResults;
