"use client";

import { useActionState, useRef, useState } from "react";
import Form from "next/form";

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
import { addReplyAction } from "@/lib/actions/comment/addReplyAction";
import Icon from "@/components/ui/Icon";
import Toast from "@/components/Toast";

interface CommentReplyFormProps {
  commentId?: string;
  parentName?: string;
}

export default function CommentReplyForm({
  commentId,
  parentName,
}: CommentReplyFormProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [active, setActive] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);
  const [state, action, pending] = useActionState(addReplyAction, {
    message: "",
    messageDetail: "",
    errors: [],
  });

  const handlePostComment = () => {
    if (formRef.current) {
      formRef.current.requestSubmit();
    }
  };

  // FIXME : replace with render toast component

  return (
    <div className="mt-3">
      {!active ? (
        <button
          onClick={() => setActive(true)}
          className="text-base-content/70 text-md hover:text-primary flex items-center gap-2 font-semibold"
        >
          <Icon icon="ph:chats-circle" className="text-lg" /> REPLY
        </button>
      ) : (
        <Form
          action={action}
          ref={formRef}
          className="flex w-full items-center gap-2"
        >
          <div className="relative flex-1">
            <Icon
              icon="ph:chats-circle"
              className="absolute inset-y-0 left-0 pl-3 text-xl"
            />
            <input
              type="text"
              name="reply"
              aria-label="Reply text"
              placeholder={
                parentName ? `Reply to ${parentName}` : "Write a new reply"
              }
              className="input input-bordered w-full pl-10"
            />
            <input name="comment" type="hidden" value={commentId} />
          </div>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <button type="button" className="btn btn-primary">
                Post Reply
              </button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Are you absolutely sure?</DialogTitle>
                <DialogDescription>
                  Are you sure you want to post this reply?
                </DialogDescription>
              </DialogHeader>
              <DialogFooter className="flex gap-2">
                <DialogClose asChild>
                  <button type="button" className="btn">
                    Cancel
                  </button>
                </DialogClose>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={handlePostComment}
                  disabled={!!pending}
                >
                  {pending ? "Posting..." : "Post Reply"}
                </button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
          <button
            type="button"
            onClick={() => setActive(false)}
            className="btn btn-ghost border-base-300 border"
          >
            Cancel
          </button>
          {state.errors && state.errors.length > 0 && (
            <div className="text-error mt-2 text-sm">
              {state.errors.map((err: string, idx: number) => (
                <div key={idx}>{err}</div>
              ))}
            </div>
          )}
        </Form>
      )}
      <Toast
        message={state.message}
        messageDetail={state.messageDetail}
        isError={!!state.errors?.length}
        errors={state.errors}
      />
    </div>
  );
}
