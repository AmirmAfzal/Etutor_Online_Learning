import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Icon } from "@iconify/react";

// FIXME: فعلا مشکلی نداره چون بعد قراره اینارو به سرور وصل کنیم ولی صفحه ای اگر باشه که دیتا داره اونو تو فولدر پایین میزاریم
// مثلا : /lib/data/student/courses.ts
const courses = [
  {
    title: "Graphic Design Masterclass - Learn GREAT Design",
    instructor: "Courtney Henry",
    price: 13.0,
    image: "/images/student-dashboard/course-1.jpg",
  },
  {
    title: "Learn Python Programming Masterclass",
    instructor: "Marvin McKinney",
    price: 39.0,
    image: "/images/student-dashboard/course-2.jpg",
  },
  {
    title: "Instagram Marketing 2021: Complete Guide To Instagram",
    instructor: "Jacob Jones",
    price: 32.0,
    oldPrice: 52.0,
    image: "/images/student-dashboard/course-3.jpg",
  },
];

const paymentMethods = [
  {
    id: "visa",
    icon: "/images/visa-photo.png",
    label: "4855 **** **** ****",
    expiry: "04/24",
    name: "Vako Shtvili",
  },
  {
    id: "mastercard",
    icon: "/images/masterCard.png",
    label: "5795 **** **** ****",
    expiry: "04/24",
    name: "Vako Shtvili",
  },
  {
    id: "paypal",
    icon: "/images/paypal.png",
    label: "PayPal",
    desc: "You will be redirected to the PayPal site after reviewing your order.",
  },
];

const page = () => {
  return (
    <div className="flex w-full flex-col gap-10 md:flex-row">
      <div className="bg-base-100 flex-1 p-8">
        <h2 className="text-base-content mb-8 text-2xl font-bold">
          Payment Method
        </h2>
        <div className="mb-6 space-y-4">
          {paymentMethods.map((pm) => (
            <div
              key={pm.id}
              className={`bg-base-100/80 hover:border-primary/60 border-base-content/10 relative flex cursor-pointer items-center gap-3 border p-4 transition-all`}
            >
              <Image src={pm.icon} alt={pm.id} width={32} height={32} />
              <span className="text-base-content/90 font-medium tracking-widest">
                {pm.label}
              </span>
              <span className="text-base-content/60 ml-auto text-sm">
                {pm.expiry}
              </span>
              <span className="text-base-content/80 ml-4 text-sm">
                {pm.name}
              </span>
              <span className="text-base-content/70 ml-2 text-xs">
                {pm.desc}
              </span>
            </div>
          ))}
        </div>
        <div className="border-success bg-base-100 mb-6 flex items-center border p-4">
          <span className="text-base-content/60 flex items-center gap-2">
            <Icon icon="ph:credit-card" className="text-success text-lg" />
            New Payment Card
          </span>
          <Icon
            icon="ph:check-circle-fill"
            className="text-success ml-auto text-2xl"
          />
        </div>
        <form className="space-y-5">
          <div>
            <Label htmlFor="name" className="mb-1 block">
              Name
            </Label>
            <Input
              id="name"
              placeholder="Name on card"
              className="border-base-content/10"
            />
          </div>
          <div>
            <Label htmlFor="card" className="mb-1 flex items-center gap-1">
              Card Number
              <span className="text-error align-middle text-base">*</span>
            </Label>
            <div className="border-base-content/10 focus-within:border-primary bg-base-100 flex items-center overflow-hidden rounded-lg border">
              <span className="text-primary flex items-center pr-2 pl-3 text-xl">
                <Icon icon="ph:credit-card" />
              </span>
              <span className="bg-base-content/10 mx-2 h-6 w-px" />
              <Input
                id="card"
                type="text"
                placeholder="Label"
                className="text-base-content/80 placeholder:text-base-content/40 flex-1 border-0 bg-transparent px-2 py-3 outline-none focus:ring-0 focus:outline-none"
              />
            </div>
          </div>
          <div className="flex gap-4">
            <div className="flex-1">
              <Label htmlFor="expiry" className="mb-1 block">
                MM / YY
              </Label>
              <Input
                id="expiry"
                placeholder="MM / YY"
                className="border-base-content/10"
              />
            </div>
            <div className="flex-1">
              <Label htmlFor="cvc" className="mb-1 block">
                CVC
              </Label>
              <Input
                id="cvc"
                placeholder="Security Code"
                className="border-base-content/10"
              />
            </div>
          </div>
          <div className="mt-2 flex items-center gap-2">
            <input
              type="checkbox"
              id="remember"
              className="accent-primary h-4 w-4"
              defaultChecked
            />
            <Label htmlFor="remember" className="text-base-content/70 text-xs">
              Remember this card, save it on my card list
            </Label>
          </div>
        </form>
      </div>
      <div className="bg-base-100 border-base-content/10 flex w-full flex-col border p-7 md:mt-10 md:w-[370px]">
        <div className="mb-4 flex items-center justify-between">
          <span className="text-base-content/70 text-lg font-semibold">
            Courses ({courses.length})
          </span>
        </div>

        <div className="mb-7 space-y-2">
          {courses.map((course, idx) => (
            <div
              key={idx}
              className="bg-base-100/80 flex items-center gap-2 p-2"
            >
              <Image
                src={course.image}
                alt={course.title}
                width={100}
                height={100}
                className="object-cover"
              />
              <div className="min-w-0 flex-1">
                <div className="text-base-content/50 truncate text-xs">
                  Course by:
                  <span className="text-base-content/60 ml-1 font-medium">
                    {course.instructor}
                  </span>
                </div>
                <div className="text-base-content truncate text-xs font-semibold">
                  {course.title}
                </div>
                <div className="mt-1 flex items-center gap-2">
                  <span className="text-primary text-md font-semibold">
                    ${course.price.toFixed(2)}
                  </span>
                  {course.oldPrice && (
                    <span className="text-base-content/40 text-xs line-through">
                      ${course.oldPrice.toFixed(2)}
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="border-base-300 mb-2 space-y-4 border-t pt-4">
          <span className="text-base-content/80 mb-4 text-lg font-bold">
            Order Summary
          </span>
          <div className="flex justify-between text-sm">
            <span className="text-base-content/70">Subtotal</span>
            <span className="text-base-content/90 font-medium">$61.97 USD</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-base-content/70">Subtotal</span>
            <span className="text-base-content/90 font-medium">$61.97 USD</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-base-content/70">Coupon Discount</span>
            <span className="text-base-content/90 font-medium">8%</span>
          </div>
          <div className="mt-2 flex justify-between text-lg font-bold">
            <span className="text-base-content/70">Total:</span>
            <span className="text-base-content/90">$75.00 USD</span>
          </div>
        </div>
        <Button className="!btn !btn-primary mt-6 w-full py-3 text-lg font-bold tracking-wide transition-all">
          Complete Payment
        </Button>
      </div>
    </div>
  );
};

export default page;
