import { SlashIcon } from "lucide-react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import CourseShoppingCart from "@/components/shoppingCart/CourseShoppingCart";
import { connectDB } from "@/lib/db/db";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth/authOptions";
import studentModel from "@/lib/db/models/studentModel";

interface CourseCartItem {
  id: string;
  title: string;
  image: string;
  rating: number;
  reviews: number;
  instructor: string;
  price: number;
  originalPrice?: number;
}

const fakeCartData: CourseCartItem[] = [
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
      <div className="bg-base-200 flex w-screen flex-col items-center justify-center gap-4 py-8">
        <h3 className="text-xl font-semibold">Shopping Cart</h3>
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator>
              <SlashIcon />
            </BreadcrumbSeparator>
            <BreadcrumbItem>
              <BreadcrumbLink
                href="/shopping-cart"
                className="text-base-content/80"
              >
                shopping cart
              </BreadcrumbLink>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>

      <div className="flex max-w-7xl flex-col items-start justify-start">
        <span className="my-4 text-lg font-semibold">shopping cart (03)</span>
        <div className="flex w-full flex-row items-start justify-start gap-4">
          <div className="bg-base-100 border-base-content/10 w-8/12 border">
            <div className="border-base-content/10 bg-base-100 border-b px-8 py-5">
              <div className="text-base-content/70 grid grid-cols-12 gap-4 text-base font-medium">
                <div className="col-span-6">COURSE</div>
                <div className="col-span-1 text-center">PRICES</div>
                <div className="col-span-4 text-center">ACTION</div>
              </div>
            </div>

            <div className="divide-base-content/10 divide-y">
              {fakeCartData.map((course) => (
                <CourseShoppingCart key={course.id} item={course} />
              ))}
            </div>
          </div>
          <div className="bg-base-100 flex w-3/12 flex-col gap-2 p-4 pt-0">
            {/* Subtotal */}
            <div className="mb-2 flex justify-between text-sm">
              <span className="text-base-content/70">Subtotal</span>
              <span className="font-medium">$61.97 USD</span>
            </div>

            {/* Coupon Discount */}
            <div className="mb-2 flex justify-between text-sm">
              <span className="text-base-content/70">Coupon Discount</span>
              <span className="font-medium">8%</span>
            </div>

            {/* Taxes */}
            <div className="flex justify-between text-sm">
              <span className="text-base-content/70">Taxes</span>
              <span className="font-medium">$17.99 USD</span>
            </div>

            <div className="divider divider-base-content/80 w-full"></div>

            {/* Total */}
            <div className="mb-4 flex items-center justify-between">
              <span className="text-base-content/70 font-medium">Total:</span>
              <span className="text-2xl font-semibold">$75.00 USD</span>
            </div>

            {/* Checkout Button */}
            <button className="btn btn-primary">Proceed To Checkout →</button>

            <div className="divider divider-base-content/80 w-full"></div>

            {/* Coupon Input */}
            <div>
              <label className="text-base-content/80 mb-2 block text-sm">
                Apply coupon code
              </label>
              <div className="flex">
                <input
                  type="text"
                  placeholder="Coupon code"
                  className="input input-bordered input-sm flex-1"
                />
                <button className="btn btn-sm btn-base-content/80 ml-2">
                  Apply
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ShoppingCart;
