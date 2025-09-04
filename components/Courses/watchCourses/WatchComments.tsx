import Image from "next/image";

import Icon from "@/components/ui/Icon";
import TruncatedText from "../TruncatedText";
import CommentReplyForm from "@/components/Courses/watchCourses/CommentReplyForm";
import Form from "next/form";

type Comment = {
  name: string;
  avatar: string;
  time: string;
  star: number;
  comment: string;
  ADMIN: boolean;
  replies?: Comment[];
};

type CommentsProps = {
  comments: Comment[];
};

const CommentItem = ({
  comment,
  isReply = false,
}: {
  comment: Comment;
  isReply?: boolean;
}) => {
  return (
    <div className={`${isReply ? "ml-10 border-l pl-4" : ""}`}>
      <div className="flex flex-col items-start gap-4 py-4">
        <div className="flex items-center gap-3">
          <Image
            width={48}
            height={48}
            src={comment.avatar}
            alt={comment.name}
            className="h-12 w-12 rounded-full"
          />
          <span className="text-md font-semibold md:text-lg">
            {comment.name}
          </span>
          {comment.ADMIN && (
            <span className="bg-secondary text-base-100 p-1 text-xs">
              ADMIN
            </span>
          )}
          <span className="text-base-content/60 ml-4 text-sm">
            {comment.time}
          </span>
        </div>

        <div className="ml-6 flex w-full flex-col">
          <TruncatedText text={comment.comment} maxLength={60} />

          {!isReply && <CommentReplyForm parentName={comment.name} />}
        </div>
      </div>

      {comment.replies?.map((reply) => (
        <CommentItem key={reply.name + reply.comment} comment={reply} isReply />
      ))}
    </div>
  );
};

export default async function WatchComments({ comments }: CommentsProps) {
  return (
    <div className="mt-12 w-full space-y-4">
      <span className="text-base-content/80 text-2xl font-semibold">
        Comments ({comments.length})
      </span>

      <Form action="" className="flex gap-2 mt-6">
          <div className="relative flex-1">
              <Icon icon="ph:chats-circle" className="absolute inset-y-0 left-0 pl-3 text-xl" />
              <input
                  type="text"
                  placeholder="Write a comment..."
                  className="input input-bordered w-full pl-10"
              />
          </div>
          <button type="submit" className="btn btn-primary">
              Post Comment
          </button>
      </Form>

      {comments.map((comment) => (
        <CommentItem key={comment.name + comment.comment} comment={comment} />
      ))}

      <button className="btn btn-soft btn-primary mt-6">Load more..</button>
    </div>
  );
}
