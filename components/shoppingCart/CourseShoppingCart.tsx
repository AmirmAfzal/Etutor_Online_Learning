// components/CourseShoppingCart.tsx
import Image from "next/image";
import Icon from "@/components/ui/Icon";

interface Props {
  id: string;
  title: string;
  image: string;
  rating: number;
  reviews?: number;
  instructor: string;
  price: number;
  originalPrice?: number;
}

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
    <div className="hover:bg-base-200/30 flex flex-row px-2 py-4 transition-colors">
      <button className="mx-4">
        <Icon icon="ph:x-circle" className="text-xl" />
      </button>
      <div className="grid grid-cols-12 items-center gap-6">
        <div className="col-span-6">
          <div className="flex items-center gap-5">
            <div className="flex-shrink-0">
              <Image
                src={image}
                alt={title}
                width={96}
                height={64}
                className="h-30 w-40 object-cover"
              />
            </div>
            <div className="min-w-0 flex-1">
              <div className="mb-2 flex items-center gap-1">
                <Icon icon="ph:star-fill" className="text-primary text-sm" />
                <span className="text-base-content/70 text-xs font-semibold">
                  {rating} ({reviews.toLocaleString()} Review)
                </span>
              </div>
              <h3 className="text-base-content/80 mb-2 text-sm font-medium">
                {title}
              </h3>
              <span className="text-base-content/70 text-xs">
                <span className="text-base-content/50">Course by: </span>
                {instructor}
              </span>
            </div>
          </div>
        </div>

        <div className="col-span-3 text-center">
          <div className="flex flex-row items-center gap-1">
            <span className="text-primary text-xl font-medium">{price}</span>
            {originalPrice && (
              <span className="text-base-content/40 text-xs line-through">
                {originalPrice}
              </span>
            )}
          </div>
        </div>

        <div className="col-span-2 ml-8 text-center text-nowrap">
          <div className="flex items-center justify-center gap-3">
            <button className="btn btn-soft btn-primary h-10 w-28 text-xs">
              Move to Wishlist
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseShoppingCart;
