import Image from "next/image";

import Icon from "@/components/ui/Icon";
import WishlistBuyNow from "@/components/Student/student-wishlist/WishlistBuyNow";

interface Props {
  id: string;
  title: string;
  image: string;
  instructors: string;
  price: string;
  originalPrice: string | null;
  rating: number;
  reviews: number;
}

const WishlistCourseRow = ({
  id,
  title,
  image,
  instructors,
  price,
  originalPrice,
  rating,
  reviews,
}: Props) => {
  return (
    <div className="hover:bg-base-200/60 px-2 py-4 transition-colors">
      <div className="grid grid-cols-2 !items-center !justify-center gap-6 md:grid-cols-10 lg:grid-cols-12">
        <div className="md:col-span-4 lg:col-span-6">
          <div className="flex w-full flex-row items-center gap-5">
            <div className="flex-shrink-0">
              <Image
                src={image}
                alt={title}
                width={96}
                height={64}
                className="h-35 w-55 object-cover md:h-30 md:w-40"
              />
            </div>

            <div className="min-w-0 flex-1 space-y-0 whitespace-nowrap">
              <div className="mb-2 flex items-center gap-1">
                <Icon icon="ph:star-fill" className="text-primary text-sm" />
                <span className="text-base-content/70 text-sm font-semibold md:text-xs">
                  {rating} ({reviews.toLocaleString()} Review)
                </span>
              </div>

              <h3 className="text-base-content/80 md:text-md text-lg font-medium md:mb-2">
                {title}
              </h3>

              <span className="text-base-content/70 text-xs">
                <span className="text-base-content/50"> Course by: </span>
                {instructors}
              </span>
            </div>
          </div>
        </div>

        <div className="col-span-3 text-center">
          <div className="flex flex-row items-center justify-center gap-1">
            <span className="text-primary text-xl font-medium">{price}</span>
            {originalPrice && (
              <span className="text-base-content/40 text-xs line-through">
                {originalPrice}
              </span>
            )}
          </div>
        </div>

        <div className="col-span-2 ml-8 text-center text-nowrap">
          <div className="flex items-center justify-center gap-2">
            <WishlistBuyNow  id={id}/>

            <form method="POST" action="/api/cart/add">
              <input type="hidden" name="courseId" value={id} />
              <button
                type="submit"
                className="btn btn-primary h-10 w-28 text-sm"
              >
                Add To Cart
              </button>
            </form>

            <form method="POST" action="/api/wishlist/remove">
              <input type="hidden" name="courseId" value={id} />
              <button
                type="submit"
                className="btn btn-soft btn-primary h-8 w-8 p-0"
                title="Remove from wishlist"
              >
                <Icon icon="ph:heart-fill" className="text-sm" />
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WishlistCourseRow;
