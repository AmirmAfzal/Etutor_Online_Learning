"use client";
import React, { useState } from "react";
import Icon from "../ui/Icon";

interface CartItem {
  title: string;
  price: number;
  thumbnail: string;
}

const SidebarCart = ({
  fakeSidebarCart,
  fakeCourses,
}: {
  fakeSidebarCart: {
    price: number;
    originalPrice: number;
    discount: string;
    timeLeft: string;
    courseDetails: { label: string; value: string }[];
    includes: string[];
  };
  fakeCourses: { title: string; price: number; thumbnail: string }[];
}) => {
  const [cart, setCart] = useState<CartItem[]>([]);

  const addToCart = (course: CartItem) => {
    setCart((prevCart) => [...prevCart, course]);
    alert(`${course.title} has been added to your cart!`);
  };
  return (
    <div className="md:col-span-1">
      <div className="bg-base-100 sticky top-8 flex flex-col gap-1 p-4 shadow">
        <div className="flex w-full flex-row items-center justify-between">
          <span className="text-base-content/80 mb-1 text-lg font-medium">
            ${fakeSidebarCart.price.toFixed(2)}
            <span className="text-base-content/50 ml-1 text-xs line-through">
              ${fakeSidebarCart.originalPrice.toFixed(2)}
            </span>
          </span>
          <button className="btn btn-soft btn-primary text-xs">
            {fakeSidebarCart.discount}
          </button>
        </div>
        <span className="text-error ml-1 flex flex-row items-start gap-1 text-xs">
          <Icon icon="ph:alarm" className="text-sm" />
          {fakeSidebarCart.timeLeft}
        </span>
        <div className="divider divider-base-300 w-full"></div>

        <div className="flex w-full flex-col gap-1 text-xs text-nowrap">
          {fakeSidebarCart.courseDetails.map((detail, index) => (
            <div
              key={index}
              className="flex flex-row items-center justify-between gap-1"
            >
              <span className="flex items-center gap-1">
                <Icon
                  icon={
                    detail.label === "Course Duration"
                      ? "ph:clock-duotone"
                      : detail.label === "Course Level"
                        ? "ph:chart-bar-duotone"
                        : detail.label === "Students Enrolled"
                          ? "ph:users-duotone"
                          : detail.label === "Language"
                            ? "ph:notebook-duotone"
                            : "ph:notepad-duotone"
                  }
                  className="text-base-content/60 text-sm"
                />
                {detail.label}
              </span>
              <span className="text-base-content/60">{detail.value}</span>
            </div>
          ))}
        </div>

        <div className="divider divider-base-300 my-1 w-full"></div>

        <div className="flex flex-col items-center gap-1">
          <button
            className="btn btn-primary w-full text-xs"
            onClick={() =>
              addToCart({
                title: fakeCourses.title,
                price: fakeSidebarCart.price,
                thumbnail: "/images/courses/Trailer.jpg",
              })
            }
          >
            Add To cart
          </button>
          <button className="btn btn-soft btn-primary w-full text-xs">
            Buy Now
          </button>
          <div className="flex w-full flex-row items-center justify-between">
            <button className="btn btn-ghost border-base-300 w-1/2 border text-xs">
              Add to Wishlist
            </button>
            <button className="btn btn-ghost border-base-300 w-1/2 border text-xs">
              Gift course
            </button>
          </div>
          <span className="text-base-content/60 text-xs">
            Note: all course have 30-days money-back guarantee
          </span>
        </div>

        <div className="divider divider-base-300 my-1 w-full"></div>

        <div>
          <span className="text-base-content/80 text-md font-medium">
            This course includes:
          </span>
          <ul className="text-base-content/60 mt-2 space-y-2 text-xs">
            {fakeSidebarCart.includes.map((item, index) => (
              <li key={index} className="flex items-center gap-1">
                <Icon
                  icon="ph:check-circle-fill"
                  className="text-primary text-sm"
                />
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div className="divider divider-base-300 my-1 w-full"></div>
        {/* TODO : Add Share buttons */}
      </div>
    </div>
  );
};

export default SidebarCart;
