"use client";

import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import Icon from "@/components/ui/Icon";
import { createCommentAction } from "@/lib/actions/comment/createCommentAction";
import { useSession } from "next-auth/react";
import Form from "next/form";
import { useActionState } from "react";

const CreateComment = () => {
  const { data: session } = useSession();
  const [state, action, pending] = useActionState(createCommentAction, {
    message: "",
    errors: [],
  });

  const userRole = session?.user?.role ?? "";
  const userName = session?.user?.name ?? "";

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
        <input name="refPath" type="hidden" value={userRole} />
        <input
          name="lecture"
          type="hidden"
          value={"68b479971dbb5cb95ee91f4f"}
        />
        <input name="name" type="hidden" value={userName} />
      </div>

      <Dialog>
        <DialogTrigger asChild>
          <button type="button" className="btn btn-primary">
            Post Comment
          </button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Are you absolutely sure?</DialogTitle>
            <DialogDescription>
              Are you sure you want to post this comment?
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="flex gap-2">
            <DialogClose asChild>
              <button type="button" className="btn">
                Cancel
              </button>
            </DialogClose>

            <DialogClose asChild>
              <button
                type="submit"
                className="btn btn-primary"
                disabled={!!pending}
              >
                {pending ? "Posting..." : "Post Comment"}
              </button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>

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
