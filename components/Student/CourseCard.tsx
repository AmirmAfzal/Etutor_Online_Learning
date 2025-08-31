import Image from "next/image";
import Link from "next/link";
import React from "react";
import Icon from "../ui/Icon";

interface Props {
  id?: string;
  thumbnail: string;
  name: string;
  category: string;
  price: number;
  rating: number;
  students: number;
}

const CourseCard = (props: Props) => {
  return (
    <Link href={`/courses/${props.id}`} className="block">
      <div className="bg-base-100 border-base-300 h-max border">
        <Image
          src={props.thumbnail}
          alt={props.name}
          width={400}
          height={200}
          className="w-full object-cover"
        />
        <div className="space-y-2 p-2 md:p-4">
          <div className="flex flex-row items-center justify-between">
            <span className="bg-base-200 p-0 text-xs whitespace-nowrap md:p-1">
              {props.category}
            </span>
            <span className="text-primary text-lg font-semibold md:text-2xl">
              ${props.price}
            </span>
          </div>
          <div className="">
            <span className="text-md font-medium md:text-lg">{props.name}</span>
          </div>
        </div>
        <div className="border-base-300 flex flex-row items-center justify-between gap-2 border-t p-2 sm:p-3 md:p-4">
          <span className="md:text-md flex flex-row items-center gap-1 text-sm">
            <Icon width={20} className="text-primary" icon="ph:star-fill" />
            {props.rating}
          </span>
          <span className="md:text-md flex items-center gap-1 text-sm font-semibold">
            <Icon icon="ph:user" width={24} className="text-secondary" />
            {props.students}
            <span className="text-base-content/60 md:text-md text-sm font-normal">
              students
            </span>
          </span>
        </div>
      </div>
    </Link>
  );
};

export default CourseCard;
