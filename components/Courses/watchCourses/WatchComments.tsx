import Image from "next/image";

import TruncatedText from "../TruncatedText";
import CommentReplyForm from "@/components/Courses/watchCourses/CommentReplyForm";
import { connectDB } from "@/lib/db/db";
import commentModel from "@/lib/db/models/commentModel";
import CreateComment from "./CreateComment";

// Define the Comment type to include a string 'id'
type Comment = {
  id: string;
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
  lectureId: string;
};

const CommentItem = ({
                       comment,
                       commentId, // This will now be a string
                       lectureId,
                       isReply = false,
                     }: {
  comment: Comment;
  commentId: string;
  lectureId: string;
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

          {/* Pass the string commentId */}
          {!isReply && <CommentReplyForm parentName={comment.name} commentId={commentId} />}
        </div>
      </div>

      {comment.replies?.map((reply) => (
        // Ensure reply.id is unique and a string. If reply objects don't have a unique ID,
        // you might need to generate one or use a combination that's highly likely to be unique.
        // Assuming reply objects now have a unique 'id' property (which is a string).
        <CommentItem key={reply.id} comment={reply} lectureId={lectureId} commentId={commentId} isReply />
      ))}
    </div>
  );
};

export default async function WatchComments({
                                              // 'comments' prop is unused here as data is fetched within the component
                                              lectureId,
                                            }: { lectureId: string }) {
  await connectDB();

  const studentComments = await commentModel
    .find({ refPath: "Student" })
    .populate({
      path: "userId",
      select: "firstname lastname avatar",
      model: "student",
    })
    .populate({
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
    })
    .lean();

  const instructorComments = await commentModel
    .find({ refPath: "Instructor" })
    .populate({
      path: "userId",
      select: "firstname lastname avatar",
      model: "instructor",
    })
    .populate({
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
    })
    .lean();

  const allComments = [...studentComments, ...instructorComments];

  const commentsData: Comment[] = allComments.map((comment) => {
    const user = comment.userId;
    const processedReplies = comment.replies?.map((reply) => {
      const replyUser = reply.userId;
      return {
        id: reply._id.toString(),
        name: reply.title,
        avatar: replyUser?.avatar || "/default-avatar.png",
        time: reply?.createdAt?.toString() || "a moment ago",
        star: 0,
        comment: reply.reply,
        ADMIN: reply.refPath === "Admin",
      };
    });

    return {
      id: comment._id.toString(),
      name: user ? `${user.firstname} ${user.lastname}` : "Unknown User",
      avatar: user?.avatar || "/default-avatar.png",
      time: comment?.createdAt?.toString() || "2 hours ago",
      star: 0,
      comment: comment.comment,
      ADMIN: comment.refPath === "Admin",
      replies: processedReplies || [],
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