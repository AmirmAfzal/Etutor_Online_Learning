"use client";

import { useActionState, useEffect, useState } from "react";
import Form from "next/form";

import { addReplyAction } from "@/lib/actions/comment/addReplyAction";
import Icon from "@/components/ui/Icon";

interface CommentReplyFormProps {
  commentId: string;
  parentName?: string;
}

export default function CommentReplyForm({ commentId, parentName }: CommentReplyFormProps) {
    const [active, setActive] = useState(false);

    const [state , action , pending] = useActionState(
      addReplyAction ,  {
        message: "",
        errors: [],
      }
    )

    useEffect(() => {
        if (state.message && state.errors.length === 0) {
            setActive(false);
        }
    }, [state]);

    return (
        <div className="mt-3">
            {!active  ? (
                <button
                    onClick={() => setActive(true)}
                    className="text-base-content/70 text-md flex items-center gap-2 font-semibold hover:text-primary"
                >
                    <Icon icon="ph:chats-circle" className="text-lg" /> REPLY
                </button>
            ) : (
                <Form action={action} className="flex w-full items-center gap-2">
                    <div className="relative flex-1">
                        <Icon icon="ph:chats-circle" className="absolute inset-y-0 left-0 pl-3 text-xl" />
                        <input
                            type="text"
                            name="reply"
                            aria-label="Reply text"
                            placeholder={parentName ? `Reply to ${parentName}` : "Write a new reply"}
                            className="input input-bordered w-full pl-10"
                        />
                      <input name="comment" type="hidden" value={commentId} />
                    </div>
                    <button type="submit" className="btn btn-primary">
                        Post Reply
                    </button>
                    <button
                        type="button"
                        onClick={() => setActive(false)}
                        className="btn btn-ghost border border-base-300 "
                    >
                        Cancel
                    </button>
                    {state.errors && state.errors.length > 0 && (
                        <div className="text-error text-sm mt-2">
                            {state.errors.map((err: string, idx: number) => (
                                <div key={idx}>{err}</div>
                            ))}
                        </div>
                    )}
                </Form>
            )}
        </div>
    );
}
