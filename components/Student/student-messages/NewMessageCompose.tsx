"use client";

import Form from "next/form";
import { Textarea } from "@/components/ui/textarea";
import { useActionState, useEffect, useRef } from "react";
import { newMessageCompose } from "@/lib/actions/student/messages/newMessageCompose";
import { usePathname } from "next/navigation";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { Icon } from "@iconify/react";

const NewMessageCompose = ({ receiverId }: { receiverId: string }) => {
  const [state, action] = useActionState(newMessageCompose, {
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



  console.log(pathname)
  console.log(receiverId)
  console.log(receiverRole)
  console.log(state)
  return (

      <Form action={action} ref={formRef}>
        <label
          className="text-base-content/70 mb-1 block text-base font-medium"
          htmlFor="message-textarea"
        >
          Message
        </label>
        <Textarea
          id="message-textarea"
          name="message"
          className="bg-base-100 border-base-300 text-base-content placeholder:text-base-content/40 min-h-[100px] resize-none border"
          placeholder="Write your message here..."
          required
        />
        <input type="hidden" name="pathname" value={pathname} />
        <input type="hidden" name="receiverId" value={receiverId} />
        <input type="hidden" name="receiverRole" value={receiverRole} />

        {state.errors.length > 0 && (
          <div className="text-error absolute bottom-2 left-4 mt-2 text-sm">
            {state.errors.map((error, index) => (
              <p key={index}>{error}</p>
            ))}
          </div>
        )}

        <div className="flex items-center justify-between pt-2">
          <DialogPrimitive.Close asChild>
            <button
              type="button"
              className="btn btn-ghost text-base-content/70 text-sm"
            >
              Cancel
            </button>
          </DialogPrimitive.Close>
          <button
            type="submit"
            className="btn btn-primary flex items-center gap-2 px-8 py-2 font-semibold"
          >
            Send Message
            <Icon icon="ph:paper-plane-right-fill" className="text-xl" />
          </button>
        </div>
      </Form>
  );
};

export default NewMessageCompose;
