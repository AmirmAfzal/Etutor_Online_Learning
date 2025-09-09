import Image from "next/image";
import { Types } from "mongoose";

import CommentReplyForm from "@/components/Courses/watchCourses/CommentReplyForm";
import { connectDB } from "@/lib/db/db";
import commentModel from "@/lib/db/models/commentModel";

import TruncatedText from "../TruncatedText";
import CreateComment from "./CreateComment";

// Type definitions for the data from the database
interface UserFromDB {
  firstname: string;
  lastname: string;
  avatar: string;
}

interface ReplyFromDB {
  _id: Types.ObjectId;
  userId: UserFromDB;
  reply: string;
  createdAt: Date;
  refPath: string;
}

interface CommentFromDB {
  _id: Types.ObjectId;
  userId: UserFromDB;
  comment: string;
  refPath: string;
  createdAt: Date;
  replies: ReplyFromDB[];
}

// Component-safe type after processing DB data
interface CommentUI {
  id?: string;
  name: string;
  avatar: string;
  time: string;
  star: number;
  comment: string;
  ADMIN: boolean;
  replies?: CommentUI[];
}

interface CommentItemProps {
  comment: CommentUI;
  commentId?: string;
  lectureId: string;
  isReply?: boolean;
}

const CommentItem = ({
  comment,
  commentId,
  lectureId,
  isReply = false,
}: CommentItemProps) => {
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

          {!isReply && (
            <CommentReplyForm parentName={comment.name} commentId={commentId} />
          )}
        </div>
      </div>

      {comment.replies?.map((reply) => (
        <CommentItem
          key={reply.id}
          comment={reply}
          lectureId={lectureId}
          commentId={commentId}
          isReply
        />
      ))}
    </div>
  );
};

export default async function WatchComments({
  lectureId,
}: {
  lectureId: string;
}) {
  if (!lectureId) {
    return (
      <div className="mt-12 w-full">
        <span className="text-base-content/80 text-2xl font-semibold">
          Comments (0)
        </span>
        <p className="text-base-content/60 mt-4 text-sm">
          No comments available for this lecture.
        </p>
      </div>
    );
  }

  await connectDB();

  const populateOptions = {
    path: "userId",
    select: "firstname lastname avatar",
  };

  const populateReplies = {
    path: "replies",
    populate: [
      {
        path: "userId",
        select: "firstname lastname avatar",
        model: "student",
      },
      {
        path: "userId",
        select: "firstname lastname avatar",
        model: "instructor",
      },
    ],
  };

  const studentComments = await commentModel
    .find<CommentFromDB>({ lecture: lectureId, refPath: "Student" })
    .populate({ ...populateOptions, model: "student" })
    .populate(populateReplies)
    .lean();

  const instructorComments = await commentModel
    .find<CommentFromDB>({ lecture: lectureId, refPath: "Instructor" })
    .populate({ ...populateOptions, model: "instructor" })
    .populate(populateReplies)
    .lean();

  const allComments = [...studentComments, ...instructorComments];

  const commentsData: CommentUI[] = allComments.map((comment) => {
    const user = comment.userId;

    const processedReplies: CommentUI[] =
      comment.replies?.map((reply: ReplyFromDB) => {
        const replyUser = reply.userId;
        return {
          id: reply._id?.toString(),
          name: `${replyUser.firstname} ${replyUser.lastname}`,
          avatar: replyUser.avatar || "/default-avatar.png",
          time: reply.createdAt.toISOString(),
          star: 0,
          comment: reply.reply,
          ADMIN: reply.refPath === "Admin",
          replies: [],
        };
      }) || [];

    return {
      id: comment._id?.toString(),
      name: `${user.firstname} ${user.lastname}`,
      avatar: user.avatar || "/default-avatar.png",
      time: comment.createdAt.toISOString(),
      star: 0,
      comment: comment.comment,
      ADMIN: comment.refPath === "Admin",
      replies: processedReplies,
    };
  });

  return (
    <div className="mt-12 w-full space-y-4">
      <span className="text-base-content/80 text-2xl font-semibold">
        Comments ({commentsData.length})
      </span>

      <CreateComment />

      {commentsData.map((comment) => (
        <CommentItem
          key={comment.id}
          comment={comment}
          commentId={comment.id}
          lectureId={lectureId}
        />
      ))}

      <button className="btn btn-soft btn-primary mt-6">Load more..</button>
    </div>
  );
}
