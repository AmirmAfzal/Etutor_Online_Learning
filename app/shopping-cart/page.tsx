import { SlashIcon } from "lucide-react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import CourseShoppingCart from "@/components/shoppingCart/CourseShoppingCart";

interface props {
  id: string;
  title: string;
  image: string;
  rating: number;
  reviews: number;
  instructor: string;
  price: number;
  originalPrice?: number;
}

const fakeCartData: props[] = [
  {
    id: "1",
    title: "The Python Mega Course: Build 10 Real World Applications",
    image: "/images/course-images-1.png",
    rating: 4.8,
    reviews: 1520,
    instructor: "Leslie Alexander",
    price: 37.99,
    originalPrice: 45.0,
  },
  {
    id: "2",
    title: "React & Next.js 15 Bootcamp: Build Fullstack Apps",
    image: "/images/course-images-2.png",
    rating: 4.6,
    reviews: 980,
    instructor: "Jacob Jones",
    price: 29.99,
  },
];

const ShoppingCart = async () => {
  return (
    <section className="flex flex-col items-center justify-start">
      {/* Header */}
      <div className="bg-base-200 flex w-full flex-col items-center justify-center gap-4 px-4 py-8">
        <h3 className="text-lg font-semibold md:text-xl">Shopping Cart</h3>
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/" className="md:text-md text-sm">
                Home
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator>
              <SlashIcon />
            </BreadcrumbSeparator>
            <BreadcrumbItem>
              <BreadcrumbLink
                href="/shopping-cart"
                className="text-base-content/80 md:text-md text-sm"
              >
                shopping cart
              </BreadcrumbLink>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>

      <div className="mt-8 flex w-full max-w-7xl flex-col items-start justify-start px-4">
        <span className="text-md my-4 font-semibold md:text-lg">
          shopping cart ({fakeCartData.length})
        </span>

        <div className="flex w-full flex-col items-center justify-start gap-6 lg:flex-row lg:items-start">
          <div className="bg-base-100 border-base-content/10 w-full border lg:w-8/12">
            <div className="border-base-content/10 bg-base-100 hidden border-b px-6 py-4 md:block">
              <div className="text-base-content/70 grid grid-cols-12 gap-4 text-sm font-medium">
                <div className="col-span-6">COURSE</div>
                <div className="col-span-2 text-center">PRICE</div>
                <div className="col-span-4 text-center">ACTION</div>
              </div>
            </div>

            <div className="divide-base-content/10 divide-y">
              {fakeCartData.map((course) => (
                <CourseShoppingCart key={course.id} {...course} />
              ))}
            </div>
          </div>

          <div className="bg-base-100 border-base-content/10 mt-4 flex w-full flex-col gap-2 border p-4 md:w-[70%] lg:mt-0 lg:w-4/12">
            <div className="mb-2 flex justify-between text-sm">
              <span className="text-base-content/70">Subtotal</span>
              <span className="font-medium">$61.97 USD</span>
            </div>

            <div className="mb-2 flex justify-between text-sm">
              <span className="text-base-content/70">Coupon Discount</span>
              <span className="font-medium">8%</span>
            </div>

            <div className="flex justify-between text-sm">
              <span className="text-base-content/70">Taxes</span>
              <span className="font-medium">$17.99 USD</span>
            </div>

            <div className="divider divider-base-content/80 w-full"></div>

            <div className="mb-4 flex items-center justify-between">
              <span className="text-base-content/70 font-medium">Total:</span>
              <span className="text-2xl font-semibold">$75.00 USD</span>
            </div>

            <button className="btn btn-primary w-full">
              Proceed To Checkout →
            </button>

            <div className="divider divider-base-content/80 w-full"></div>

            <form>
              <label
                className="text-base-content/80 mb-2 block text-sm"
                htmlFor="coupon"
              >
                Apply coupon code
              </label>
              <div className="flex">
                <input
                  type="text"
                  placeholder="Coupon code"
                  className="input input-bordered input-sm flex-1"
                />
                <button
                  type="submit"
                  className="btn btn-sm bg-base-200 ml-2 text-xs font-medium"
                >
                  Apply
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ShoppingCart;
