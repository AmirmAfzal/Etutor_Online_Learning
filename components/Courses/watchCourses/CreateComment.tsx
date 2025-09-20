"use client";

import { useActionState, useRef, useState } from "react";
import Form from "next/form";
import { useSession } from "next-auth/react";
import { useSearchParams } from "next/navigation";

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
import Toast from "@/components/Toast";

const CreateComment = () => {
  const { data: session } = useSession();
  const formRef = useRef<HTMLFormElement>(null);

  const [state, action, pending] = useActionState(createCommentAction, {
    message: "",
    messageDetail: "",
    errors: [],
  });

  const searchParams = useSearchParams();
  const currentLectureId = searchParams.get("lectureId");

  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const lectureId = currentLectureId || "";
  const userRole = session?.user?.role ?? "";
  const userName = session?.user?.name ?? "";

  const handlePostComment = () => {
    if (formRef.current) {
      formRef.current.requestSubmit();
    }
  };

  return (
    <Form action={action} ref={formRef} className="mt-6 flex gap-2">
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
        <input name="lectureId" type="hidden" value={lectureId} />
        <input name="name" type="hidden" value={userName} />
      </div>
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
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
            <button
              type="button"
              className="btn btn-primary"
              onClick={handlePostComment}
              disabled={!!pending}
            >
              {pending ? "Posting..." : "Post Comment"}
            </button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      <Toast
        message={state.message}
        messageDetail={state.messageDetail}
        isError={!!state.errors?.length}
        errors={state.errors}
      />
    </Form>
  );
};

export default CreateComment;
