import Link from "next/link";
import { Document } from "mongoose";

import { connectDB } from "@/lib/db/db";
import categoryModel, {
  CategoryInterface,
} from "@/lib/db/models/categoryModel";

import Icon from "../ui/Icon";
import CategoryCard from "./CategoryCard";

type Category = Omit<CategoryInterface, keyof Document>;

const Category = async () => {
  await connectDB();
  const category: Category[] = JSON.parse(
    JSON.stringify(await categoryModel.find().lean())
  );

  return (
    <section className="container mx-auto space-y-8 py-16">
      <h3 className="text-center text-2xl font-bold md:text-3xl">
        Browse top category
      </h3>
      <CategoryCard category={category} />
      <div className="flex flex-col items-center justify-center gap-4 md:flex-row">
        <p className="text-base-content/80 text-sm">
          We have more category & subcategory.
        </p>
        <Link
          href="/category"
          className="text-primary flex flex-row items-center gap-2"
        >
          Browse All
          <Icon icon="ph:arrow-right" width="24" height="24" />
        </Link>
      </div>
    </section>
  );
};

export default Category;
