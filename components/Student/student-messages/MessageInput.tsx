"use client";

import Icon from "@/components/ui/Icon";
import { useActionState, useRef, useEffect } from "react";
import { createMessageAction } from "@/lib/actions/student/messages/createMessage";
import { usePathname } from "next/navigation";

const MessageInput = ({ receiverId }: { receiverId: string}) => {
  const [state, action] = useActionState(createMessageAction, {
    message: "",
    errors: [],
  });
  const pathname = usePathname();

  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state.message === "SUCCESS") {
      formRef.current?.reset();
    }
  }, [state.message]);

  const receiverRole = pathname.includes("instructor")
    ? "STUDENT"
    : "INSTRUCTOR";

  return (
    <form
      ref={formRef}
      action={action}
      className="border-base-300 bg-base-100 flex items-center gap-2 border-t p-4"
    >
      <div className="relative flex-1">
        <input
          type="text"
          name="message"
          id="message-input"
          placeholder="Type your message"
          className="input w-full pr-12"
        />
        <input type="hidden" name="pathname" value={pathname} />
        <input type="hidden" name="receiverId" value={receiverId} />
        <input type="hidden" name="receiverRole" value={receiverRole} />

        <Icon
          icon="ph:pencil-simple-line"
          className="text-primary/50 text-md absolute top-1/2 right-4 -translate-y-1/2 md:text-lg"
        />
      </div>
      <button className="btn btn-primary btn-sm gap-2 py-6" type="submit">
        Send
        <Icon icon="ph:paper-plane-right-fill" className="md:xt-xl text-lg" />
      </button>

      {state.errors.length > 0 && (
        <div className="text-error absolute bottom-2 left-4 mt-2 text-sm">
          {state.errors.map((error, index) => (
            <p key={index}>{error}</p>
          ))}
        </div>
      )}
    </form>
  );
};

export default MessageInput;
