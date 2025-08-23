import Categories from "./courseFilter/Categories";
import Tools from "./courseFilter/Tools";
import Rating from "./courseFilter/Rating";
import CourseLevel from "./courseFilter/CourseLevel";
import PriceSelect from "./courseFilter/PriceSelect";
import Duration from "./courseFilter/Duration";

type Props = {
  categories: {
    name: string;
    icon: string;
    subcategories: { [key: string]: number };
  }[];
  tools: { [key: string]: number };
  duration: { [key: string]: number };
  courseLevel: { [key: string]: number };
  price: { [key: string]: number };
  rating: {
    label: string;
    count: number;
  }[];
  currentPriceFilters: { Free: boolean; Paid: boolean };
  searchParams: Promise<{
    query?: string;
    filter?: string;
    priceFree?: string;
    pricePaid?: string;
  }>;
};

const CourseFilter = async ({
  categories,
  tools,
  rating,
  courseLevel,
  duration,
  price,
  currentPriceFilters,
  searchParams,
}: Props) => {
  return (
    <aside className="border-base-300 bg-base-100 mt-8 w-full !space-y-1.5 md:mt-0 md:w-5/12 md:border-r md:p-4">
      <Categories categories={categories} />
      <Tools tools={tools} />
      <Rating rating={rating} />
      <CourseLevel courseLevel={courseLevel} />
      <PriceSelect
        price={price}
        currentPriceFilters={currentPriceFilters}
        searchParams={searchParams}
      />
      <Duration duration={duration} />
    </aside>
  );
};

export default CourseFilter;
