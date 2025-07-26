import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Image from "next/image";
import Icon from "@/components/ui/Icon";
import { FC } from "react";

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
    <div className="mt-12 w-full space-y-4">
      <div className="flex w-full items-center justify-between">
        <span className="text-base-content/80 text-2xl font-semibold">
          Students Feedback
        </span>
        <Select>
          <SelectTrigger>
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
          className="border-base-300 flex items-start gap-4 border-b py-4"
        >
          <Image
            width={48}
            height={48}
            src={comment.avatar}
            alt={comment.name}
            className="h-12 w-12 rounded-full"
          />
          <div>
            <span className="font-semibold">{comment.name}</span>
            <span className="text-base-content/60 ml-4">{comment.time}</span>
            <div>
              {[...Array(comment.star)].map((_, index) => (
                <Icon
                  key={index}
                  icon="ph:star-fill"
                  className="text-primary text-sm"
                />
              ))}
              <p className="text-base-content/60">{comment.comment}</p>
            </div>
          </div>
        </div>
      ))}

      <button className="btn btn-soft btn-primary mt-6">Load more..</button>
    </div>
  );
};

export default Comments;
