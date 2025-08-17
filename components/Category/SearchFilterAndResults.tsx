import Icon from "@/components/ui/Icon";
import Form from "next/form";
import {
  Select,
  SelectItem,
  SelectContent,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import CourseFilter from "@/components/Courses/CourseFilter";

type Category = {
  name: string;
  icon: string;
  subcategories: { [key: string]: number };
};

type Rating = {
  label: string;
  count: number;
};

type SearchFilterAndResultsProps = {
  isFiltered: boolean;
  query?: string;
  coursesCount: number;
  categories: Category[];
  tools: { [key: string]: number };
  rating: Rating[];
  courseLevel: { [key: string]: number };
  duration: { [key: string]: number };
  price: { [key: string]: number };
};

const SearchFilterAndResults = ({
  isFiltered,
  query,
  coursesCount,
  categories,
  tools,
  rating,
  courseLevel,
  duration,
  price,
}: SearchFilterAndResultsProps) => {
  const suggestions = [
    "User interface",
    "User experience",
    "Web design",
    "App",
  ];

  return (
    <>
      <div className="mb-6 flex flex-col flex-wrap items-start justify-between gap-4 sm:flex-row sm:items-center">
        <div className="flex w-full flex-col gap-3 sm:flex-row sm:items-center sm:gap-3">
          <a
            href={isFiltered ? "/category" : "/category?filter=true"}
            className={`hidden items-center gap-3 rounded-none border px-2 py-3 md:flex ${isFiltered ? "border-primary text-primary bg-base-100" : "border-primary/20 text-base-content/80 bg-base-100"}`}
          >
            <Icon icon="ph:faders-fill" className="text-xl" />
            <span className="text-sm">Filter</span>
            <span
              className={`px-2 ${isFiltered ? "bg-primary text-base-100" : "bg-primary/10 text-primary"}`}
            >
              {isFiltered ? "3" : "0"}
            </span>
          </a>

          <Dialog>
            <DialogTrigger className="bg-base-100 border-primary/20 text-base-content/80 flex w-24 items-center gap-3 rounded-none border px-2 py-3 md:hidden">
              <Icon icon="ph:faders-fill" className="text-primary text-xl" />
              <span className="text-sm">Filter</span>
            </DialogTrigger>
            <DialogContent className="">
              <DialogTitle>Filter Courses</DialogTitle>
              <CourseFilter
                categories={categories}
                tools={tools}
                rating={rating}
                courseLevel={courseLevel}
                duration={duration}
                price={price}
                classname="!w-full !overflow-y-auto !h-96 !p-0"
              />
            </DialogContent>
          </Dialog>

          <Form action="/category" className="relative w-full sm:w-72">
            <input
              type="text"
              name="query"
              placeholder="UI/UX Design"
              className="border-base-300 w-full rounded-none border px-4 py-2.5 text-sm sm:py-3 sm:text-base"
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

        <div className="flex flex-row gap-2">
          <div className="flex flex-row items-center gap-2">
            <label
              htmlFor="sort"
              className="text-base-content/60 text-xs sm:text-sm"
            >
              Sorted by:
            </label>
          </div>
          <Select name="sort">
            <SelectTrigger className="w-32 sm:w-40">
              <SelectValue placeholder="Sorted by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Latest">Latest</SelectItem>
              <SelectItem value="Oldest">Oldest</SelectItem>
              <SelectItem value="Most Viewed">Most Viewed</SelectItem>
            </SelectContent>
          </Select>
        </div>
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
        <div>
          <span className="text-base-content/80">
            {query ? (
              <>
                {coursesCount.toLocaleString()}
                <span className="text-base-content/60 ml-2">
                  results for &quot;{query}&quot;
                </span>
              </>
            ) : (
              <>
                {coursesCount.toLocaleString()}
                <span className="text-base-content/60 ml-2">courses</span>
              </>
            )}
          </span>
        </div>
      </div>
    </>
  );
};

export default SearchFilterAndResults;
