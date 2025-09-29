import { Icon } from "@iconify/react";
import * as DialogPrimitive from "@radix-ui/react-dialog";

import NewMessageForm from "@/components/Student/student-messages/NewMessageForm";
import SearchContact from "@/components/Student/student-messages/SearchContact";

const MessageHeader = () => {
  return (
    <div className="border-base-300 flex flex-col border-b p-4">
      <div className="flex w-full flex-row items-center justify-between">
        <h2 className="text-base-content text-lg font-semibold">Messages</h2>
        <DialogPrimitive.Root>
          <DialogPrimitive.Trigger asChild>
            <button
              className="btn btn-secondary/20 text-secondary flex items-center gap-2 rounded-md shadow-sm"
            >
              <Icon icon="ph:plus" className="text-lg md:text-xl" />
              <span className="hidden md:inline">Compose</span>
            </button>
          </DialogPrimitive.Trigger>
          <DialogPrimitive.Portal>
            <DialogPrimitive.Overlay className="bg-base-content/50 fixed inset-0 z-40" />
            <DialogPrimitive.Content className="bg-base-100 fixed top-1/2 left-1/2 z-50 w-full max-w-xl -translate-x-1/2 -translate-y-1/2 rounded-xl p-6 shadow-lg">
              <div className="border-base-content/20 flex items-center justify-between border-b pb-2">
                <DialogPrimitive.Title className="text-lg font-semibold">
                  New Message
                </DialogPrimitive.Title>
                <DialogPrimitive.Close asChild>
                  <button className="btn btn-ghost text-base-content/70 text-xl md:text-2xl">
                    &times;
                  </button>
                </DialogPrimitive.Close>
              </div>
              <NewMessageForm />
            </DialogPrimitive.Content>
          </DialogPrimitive.Portal>
        </DialogPrimitive.Root>
      </div>
      <SearchContact />
    </div>
  );
};

export default MessageHeader;
