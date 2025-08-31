"use client";

import { FC, useState } from "react";
import Image from "next/image";

import Icon from "@/components/ui/Icon";

import TruncatedText from "../TruncatedText";

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

const CommentItem: FC<{
  comment: Comment;
  isReply?: boolean;
  onReplyClick?: (name: string) => void;
  activeReply?: string | null;
}> = ({ comment, isReply = false, onReplyClick, activeReply }) => {
  return (
    // TODO : Add comments profile to profile line
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
          {onReplyClick && (
            <button
              onClick={() => onReplyClick(comment.name)}
              className={`text-base-content/70 text-md mt-2 flex items-center gap-2 font-semibold ${activeReply === comment.name && "text-primary"}`}
            >
              <Icon icon="ph:chats-circle" className="text-lg" /> REPLY
            </button>
          )}

          {activeReply === comment.name && (
            <form className="mt-3 flex w-full items-center gap-2">
              <div className="relative flex-1">
                <Icon
                  icon="ph:chats-circle"
                  className="absolute inset-y-0 left-0 pl-3 text-xl"
                />
                <input
                  type="text"
                  placeholder="Write your reply"
                  className="input input-bordered w-full pl-10"
                />
              </div>

              <button type="submit" className="btn btn-primary">
                Post Reply
              </button>
            </form>
          )}
        </div>
      </div>

      {comment.replies?.map((reply) => (
        <CommentItem key={reply.name + reply.comment} comment={reply} isReply />
      ))}
    </div>
  );
};

const WatchComments: FC<CommentsProps> = ({ comments }) => {
  const [activeReply, setActiveReply] = useState<string | null>(null);

  const toggleReply = (name: string) => {
    setActiveReply(activeReply === name ? null : name);
  };

  return (
    <div className="mt-12 w-full space-y-4">
      <span className="text-base-content/80 text-2xl font-semibold">
        Comments ({comments.length})
      </span>

      {comments.map((comment) => (
        <CommentItem
          key={comment.name + comment.comment}
          comment={comment}
          onReplyClick={toggleReply}
          activeReply={activeReply}
        />
      ))}

      <button className="btn btn-soft btn-primary mt-6">Load more..</button>
    </div>
  );
};

export default WatchComments;
