//
import Categories from "./courseFilter/Categories";
import Tools from "./courseFilter/Tools";
import Rating from "./courseFilter/Rating";
import CourseLevel from "./courseFilter/CourseLevel";
import PriceSelect from "./courseFilter/PriceSelect";
import Duration from "./courseFilter/Duration";

// FIXME : fixed forms in children components

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
};

const CourseFilter = ({
  categories,
  tools,
  rating,
  courseLevel,
  duration,
  price,
}: Props) => {
  return (
    <aside className="border-base-300 bg-base-100 w-5/12 border-r p-4">
      <Categories categories={categories} />
      <Tools tools={tools} />
      <Rating rating={rating} />
      <CourseLevel courseLevel={courseLevel} />
      <PriceSelect price={price} />
      <Duration duration={duration} />
    </aside>
  );
};

export default CourseFilter;
