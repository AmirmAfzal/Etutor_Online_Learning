"use client";

import { useState } from "react";
import Icon from "@/components/ui/Icon";

export default function CommentReplyForm({ parentName }: { parentName?: string }) {
    const [active, setActive] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setActive(false);
    };

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
                <form onSubmit={handleSubmit} className="flex w-full items-center gap-2">
                    <div className="relative flex-1">
                        <Icon icon="ph:chats-circle" className="absolute inset-y-0 left-0 pl-3 text-xl" />
                        <input
                            type="text"
                            placeholder={parentName ? `Reply to ${parentName}` : "Write a new reply"}
                            className="input input-bordered w-full pl-10"
                        />
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
                </form>
            )}
        </div>
    );
}
