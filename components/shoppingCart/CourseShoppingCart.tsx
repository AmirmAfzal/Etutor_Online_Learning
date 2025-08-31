// components/CourseShoppingCart.tsx
import Image from "next/image";

import Icon from "@/components/ui/Icon";

type Props = {
  id: string;
  title: string;
  image: string;
  rating: number;
  reviews?: number;
  instructor: string;
  price: number;
  originalPrice?: number;
};

const CourseShoppingCart = ({
  title,
  image,
  rating,
  reviews = 0,
  instructor,
  price,
  originalPrice,
}: Props) => {
  return (
    <div className="hover:bg-base-200/30 flex flex-col gap-4 p-4 transition-colors md:flex-row md:items-center">
      <button className="self-start md:mr-4 md:self-center">
        <Icon
          icon="ph:x-circle"
          className="text-base-content/70 hover:text-error text-xl"
        />
      </button>

      <div className="flex flex-1 flex-col gap-3 md:flex-row md:items-center md:gap-6">
        <div className="mx-auto flex-shrink-0 md:mx-0">
          <Image
            src={image}
            alt={title}
            width={160}
            height={100}
            className="h-36 w-48 object-cover transition-transform duration-300 hover:scale-105 md:h-28 md:w-40"
          />
        </div>

        <div className="min-w-0 flex-1">
          <div className="mb-1 flex items-center gap-1">
            <Icon icon="ph:star-fill" className="text-primary text-sm" />
            <span className="text-base-content/70 text-xs font-semibold">
              {rating} ({reviews.toLocaleString()} Review
              {reviews !== 1 && "s"})
            </span>
          </div>
          <h3 className="text-base-content/80 mb-2 line-clamp-2 text-sm font-medium">
            {title}
          </h3>
          <span className="text-base-content/70 text-xs">
            <span className="text-base-content/50">Course by: </span>
            {instructor}
          </span>
        </div>
      </div>

      <div className="flex flex-col gap-2 md:ml-auto md:flex-row md:items-center md:gap-4">
        <div className="flex items-center gap-2 md:justify-end">
          <span className="text-primary text-lg font-semibold">{price}$</span>
          {originalPrice && (
            <span className="text-base-content/40 text-sm line-through">
              {originalPrice}$
            </span>
          )}
        </div>

        <button className="btn btn-soft btn-primary h-10 w-full text-xs md:w-36">
          Move to Wishlist
        </button>
      </div>
    </div>
  );
};

export default CourseShoppingCart;
