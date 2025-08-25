import { FC } from "react";
import Image from "next/image";

import Icon from "@/components/ui/Icon";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type Comment = {
  name: string;
  avatar: string;
  time: string;
  star: number;
  comment: string;
};

type CommentsProps = {
  studentsComments: Comment[];
};

const Comments: FC<CommentsProps> = ({ studentsComments }) => {
  return (
    <div className="mt-12 w-full space-y-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <span className="text-base-content/80 text-xl font-semibold sm:text-2xl">
          Students Feedback
        </span>
        <Select>
          <SelectTrigger className="w-40">
            <SelectValue placeholder="5 Star Rating" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="5">5 Star Rating</SelectItem>
            <SelectItem value="4">4 Star Rating</SelectItem>
            <SelectItem value="3">3 Star Rating</SelectItem>
            <SelectItem value="2">2 Star Rating</SelectItem>
            <SelectItem value="1">1 Star Rating</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {studentsComments.map((comment) => (
        <div
          key={comment.name}
          className="border-base-300 flex items-start gap-4 border-b pb-4"
        >
          <Image
            width={48}
            height={48}
            src={comment.avatar}
            alt={comment.name}
            className="h-10 w-10 shrink-0 rounded-full object-cover sm:h-12 sm:w-12"
          />

          <div className="flex flex-1 flex-col gap-1">
            <div className="flex flex-wrap items-center gap-2">
              <span className="font-semibold">{comment.name}</span>
              <span className="text-base-content/60 text-xs sm:text-sm">
                {comment.time}
              </span>
            </div>

            <div className="flex items-center gap-1">
              {[...Array(comment.star)].map((_, index) => (
                <Icon
                  key={index}
                  icon="ph:star-fill"
                  className="text-primary text-sm"
                />
              ))}
            </div>

            <p className="text-base-content/70 text-sm leading-relaxed">
              {comment.comment}
            </p>
          </div>
        </div>
      ))}

      <div className="flex justify-center">
        <button className="btn btn-soft btn-primary mt-4">Load more..</button>
      </div>
    </div>
  );
};

export default Comments;
