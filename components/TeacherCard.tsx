import Image from "next/image";
import { Icon } from "@iconify/react";

interface TeacherCardProps {
  name: string;
  title: string;
  image: string;
  rating: number;
  students: number;
}

export default function TeacherCard({
  name,
  title,
  image,
  rating,
  students,
}: TeacherCardProps) {
  return (
    <div className="border-base-content/10 overflow-hidden border transition-all duration-400 hover:translate-y-[-2px]">
      <Image
        src={image}
        alt={name}
        width={800}
        height={800}
        className="h-48 w-full object-cover"
      />
      <div className="p-4">
        <div className="mb-3 text-center">
          <div className="text-base-content/80 mb-1 text-lg font-semibold">
            {name}
          </div>
          <div className="text-base-content/50 text-sm">{title}</div>
        </div>

        <div className="border-base-content/10 border-t pt-3">
          <div className="mb-3 flex items-center justify-between">
            <div className="flex items-center gap-1">
              <Icon icon="ph:star-fill" className="text-sm text-yellow-500" />
              <span className="text-base-content/80 text-sm font-medium">
                {rating}
              </span>
            </div>
            <div className="text-base-content/50 flex flex-row items-center gap-1 text-sm">
              <span className="text-base-content/80 font-medium">
                {students.toLocaleString()}
              </span>
              students
            </div>
          </div>

          <button className="btn btn-soft btn-primary w-full text-sm">
            Send Message
          </button>
        </div>
      </div>
    </div>
  );
}
