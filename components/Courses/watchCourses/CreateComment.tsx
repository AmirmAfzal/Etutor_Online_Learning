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
import Form from "next/form";
import { createCommentAction } from "@/lib/actions/comment/createCommentAction";
import { useSession } from "next-auth/react";
import { useActionState, useRef, useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";

interface ToastState {
  message: string;
  errors?: string[];
}


const CreateComment = () => {
  const { data: session } = useSession();
  const [showToast, setShowToast] = useState(false);
  const [state, action, pending] = useActionState(createCommentAction, {
    message: "",
    errors: [],
  });

  const searchParams = useSearchParams();
  const lectureId = searchParams.get("lectureId");


  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  const userRole = session?.user?.role ?? "";
  const userName = session?.user?.name ?? "";

  useEffect(() => {
    if (!pending && state.message) {
      setIsDialogOpen(false);
    }
  }, [pending, state.message]);

  useEffect(() => {
    if (state.message) {
      setShowToast(true);
      const timer = setTimeout(() => setShowToast(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [state.message]);

  const handlePostComment = () => {
    if (formRef.current) {
      formRef.current.requestSubmit();
    }
  };

  // FIXME : replace with render toast component
  const renderToast = (show: boolean, state: ToastState) => (
    <div className="toast toast-top toast-end">
      {show && state.message && (
        <div
          role="alert"
          className={`alert ${
            state.errors?.length ? "alert-error" : "alert-success"
          }`}
        >
          <Icon
            icon={state.errors?.length ? "ph:x-circle" : "ph:check-circle"}
            className="text-lg"
          />
          <span className="text-xs">{state.message}</span>
        </div>
      )}
    </div>
  );

  return (
    <Form ref={formRef} action={action} className="mt-6 flex gap-2">
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
          value={lectureId ?? ""}
        />
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
      {renderToast(showToast, state)}
    </Form>
  );
};

export default CreateComment;
