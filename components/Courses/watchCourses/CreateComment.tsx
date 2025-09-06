"use client";

import Icon from "@/components/ui/Icon";
import { createCommentAction } from "@/lib/actions/comment/createCommentAction";
import { useSession } from "next-auth/react";
import Form from "next/form";
import { useActionState, useEffect } from "react";

const CreateComment = () => {
  const { data: session } = useSession();
  const [state, action, pending] = useActionState(createCommentAction, {
    message: "",
    errors: [],
  });

  useEffect(() => {
    console.log("Session data:", session);
  }, [session]);

  return (
    <Form action={action} className="mt-6 flex gap-2">
      <div className="relative flex-1">
        <Icon
          icon="ph:chats-circle"
          className="absolute inset-y-0 left-0 pl-3 text-xl"
        />
        <input
          name="comment"
          type="text"
          placeholder="Write a comment..."
          className="input input-bordered w-full pl-10"
          required
        />
        <input name="refPath" type="hidden" value={session?.user?.role} />
        <input
          name="lecture"
          type="hidden"
          value={"68b479971dbb5cb95ee91f4f"}
        />
        <input name="name" type="hidden" value={session?.user?.name || ""} />
      </div>
      <button type="submit" className="btn btn-primary" disabled={!!pending}>
        {pending ? "Posting..." : "Post Comment"}
      </button>

      {state.errors && state.errors.length > 0 && (
        <div className="mt-2 text-red-500">
          {state.errors.map((error, index) => (
            <p key={index}>{error}</p>
          ))}
        </div>
      )}
    </Form>
  );
};

export default CreateComment;
