import Image from "next/image";
import React from "react";

import Icon from "./ui/Icon";

interface Props {
  thumbnail: string;
  name: string;
  category: string;
  price: number;
  rating: number;
  students: number;
}

const CourseCard = (props: Props) => {
  return (
    <div className="bg-base-100 border-base-300 border">
      <Image src={props.thumbnail} alt={props.name} width={400} height={200} />
      <div className="space-y-2 p-4">
        <div className="flex flex-row items-center justify-between">
          <span className="bg-base-200 p-1 text-xs">{props.category}</span>
          <span className="text-primary text-2xl font-semibold">${props.price}</span>
        </div>
        <div className="">
          <span className="text-lg font-medium">{props.name}</span>
        </div>
      </div>
      <div className="border-base-300 flex flex-row items-center justify-between border-t p-4">
        <div className="flex flex-row items-center gap-1">
          <Icon width={20} className="text-primary" icon="ph:star-fill" />
          {props.rating}
        </div>
        <div className="flex items-center gap-2 font-semibold">
          <Icon icon="ph:user" width={24} className="text-secondary" />
          {props.students}
          <span className="text-base-content/60 font-normal"> students</span>
        </div>
      </div>
    </div>
  );
};

export default CourseCard;
