import Image from "next/image";
import React from "react";
import { Icon } from "@iconify/react";
import TeacherSendMessageBtn from "@/components/Student/TeacherSendMessageBtn";
import { ObjectId } from "mongoose";

interface TeacherCardProps {
  id: ObjectId;
  name: string;
  title: string;
  image: string;
  rating: number;
  students: number;
  sendMessage?: boolean;
  className?: string;
}

export default function TeacherCard({
  id,
  name,
  title,
  image,
  rating,
  students,
  sendMessage = true,
}: TeacherCardProps) {
  return (
    <div className="border-base-content/10 flex flex-col overflow-hidden border transition-all duration-300 hover:translate-y-[-2px]">
      {image ? (
        <Image
          src={image}
          alt={name}
          width={800}
          height={800}
          className="h-48 w-full object-cover sm:h-56 md:h-64"
        />
      ) : (
        <Icon
          icon="ph:user"
          className="align-center h-48 w-full text-5xl sm:h-56 md:h-64"
        />
      )}

      <div className="flex flex-1 flex-col">
        <div className="py-3 text-center">
          <div className="text-base-content/80 mb-1 text-lg font-semibold">
            {name}
          </div>
          <div className="text-base-content/50 text-sm">{title}</div>
        </div>

        <div className="border-base-content/10 mt-auto border-t p-3">
          <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
            <div className="flex items-center gap-1">
              <Icon icon="ph:star-fill" className="text-primary text-sm" />
              <span className="text-base-content/80 text-sm font-medium">
                {rating}
              </span>
            </div>
            <div className="text-base-content/50 flex items-center gap-1 text-sm">
              <span className="text-base-content/80 font-medium">
                {students.toLocaleString()}
              </span>
              students
            </div>
          </div>

          {sendMessage && <TeacherSendMessageBtn id={id} />}
        </div>
      </div>
    </div>
  );
}
