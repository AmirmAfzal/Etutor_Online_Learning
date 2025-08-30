import React from "react";
import Image from "next/image";
import { Icon } from "@iconify/react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { connectDB } from "@/lib/db/db";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth/authOptions";
import studentModel, { StudentInterface } from "@/lib/db/models/studentModel";
import { redirect } from "next/navigation";
import PaymentBtn from "@/components/Student/PaymentBtn";

interface Props {
  id?: string;
  title?: string;
  image: string;
  instructor?: string;
  price: number;
  offer?: number;
}

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

const Page = async () => {
  await connectDB();

  const session = await getServerSession(authOptions);
  const foundStudent: StudentInterface | null = await studentModel
    .findOne({
      user: session?.user.id,
    })
    .populate("coursesCart");
  if (!foundStudent) return redirect("/auth/signin");

  const coursesCart = foundStudent?.coursesCart;

  const courseData: Props[] = coursesCart.map((course: any) => ({
    id: typeof course._id === "string" ? course._id : course._id?.toString(),
    title: course.title,
    image: course.thumbnail,
    instructor: course.instructor,
    price: course.price,
    offer: course.offer || "0",
  }));

  const subtotal = courseData.reduce((acc, c) => acc + c.price, 0);
  const total = courseData.reduce((acc, c) => {
    const discountAmount = c.offer ? (c.price * c.offer) / 100 : 0;
    return acc + (c.price - discountAmount);
  }, 0);

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
              className="bg-base-100/80 hover:border-primary/60 border-base-content/10 relative flex cursor-pointer items-center gap-3 border p-4 transition-all"
            >
              <Image src={pm.icon} alt={pm.id} width={32} height={32} />
              <span className="text-base-content/90 font-medium tracking-widest">
                {pm.label}
              </span>
              {pm.expiry && (
                <span className="text-base-content/60 ml-auto text-sm">
                  {pm.expiry}
                </span>
              )}
              {pm.name && (
                <span className="text-base-content/80 ml-4 text-sm">
                  {pm.name}
                </span>
              )}
              {pm.desc && (
                <span className="text-base-content/70 ml-2 text-xs">
                  {pm.desc}
                </span>
              )}
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
            <div className="border-base-content/10 focus-within:border-primary bg-base-100 flex items-center overflow-hidden border">
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
            Courses ({courseData.length})
          </span>
        </div>

        <div className="mb-7 space-y-2">
          {courseData.map((course, idx) => {
            const discountAmount = course.offer
              ? (course.price * course.offer) / 100
              : 0;
            const finalPrice = course.price - discountAmount;

            return (
              <div
                key={idx}
                className="bg-base-100/80 flex items-center gap-2 p-2"
              >
                <Image
                  src={course.image}
                  alt={course.title || "course image"}
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
                      ${finalPrice.toFixed(2)}
                    </span>
                    {course.offer && (
                      <span className="text-base-content/60 text-xs line-through">
                        ${course.offer}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="border-base-300 mb-2 space-y-4 border-t pt-4">
          <span className="text-base-content/80 mb-4 text-lg font-bold">
            Order Summary
          </span>
          <div className="flex justify-between text-sm">
            <span className="text-base-content/70">Subtotal</span>
            <span className="text-base-content/90 font-medium">
              $ {subtotal.toFixed(2)} USD
            </span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-base-content/70">Total Discount</span>
            <span className="text-base-content/90 font-medium">
              $ -{(subtotal - total).toFixed(2)} USD
            </span>
          </div>
          <div className="mt-2 flex justify-between text-lg font-bold">
            <span className="text-base-content/70">Total:</span>
            <span className="text-base-content/90">
              ${total.toFixed(2)} USD
            </span>
          </div>
        </div>
        <PaymentBtn
          courseIds={courseData.map((course) => course.id!).filter(Boolean)}
        />
      </div>
    </div>
  );
};

export default Page;
