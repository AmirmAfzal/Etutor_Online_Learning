import { Icon } from "@iconify/react";
import * as DialogPrimitive from "@radix-ui/react-dialog";

import { Button } from "@/components/ui/button";
import NewMessageForm from "@/components/Student/student-messages/NewMessageForm";

const MessageHeader = ({
  mockContacts,
}: {
  mockContacts: {
    id: number;
    name: string;
    image: string;
    lastMessage: string;
    timestamp: string;
    isActive: boolean;
    unread: boolean;
  }[];
}) => {
  return (
    <div className="border-base-300 flex items-center justify-between border-b p-4">
      <h2 className="text-base-content text-lg font-semibold">Message</h2>
      <DialogPrimitive.Root>
        <DialogPrimitive.Trigger
          asChild
          className="absolute -bottom-120 md:static"
        >
          <Button
            variant="default"
            size="sm"
            className="!btn !btn-primary z-10 !rounded-full !shadow-md md:!rounded-none md:!shadow-none"
          >
            <Icon icon="ph:plus" />
            Compose
          </Button>
        </DialogPrimitive.Trigger>
        <DialogPrimitive.Portal>
          <DialogPrimitive.Overlay className="bg-base-content/50 fixed inset-0 z-40" />
          <DialogPrimitive.Content className="bg-base-100 fixed top-1/2 left-1/2 z-50 w-full max-w-xl -translate-x-1/2 -translate-y-1/2 p-6">
            <div className="border-base-content/20 flex items-center justify-between border-b pb-2">
              <span className="text-base-content/70 text-md font-semibold md:text-lg">
                New Message
              </span>
              <DialogPrimitive.Close asChild>
                <button className="btn btn-ghost text-base-content/70 text-xl md:text-2xl">
                  &times;
                </button>
              </DialogPrimitive.Close>
            </div>
            <NewMessageForm mockContacts={mockContacts} />
          </DialogPrimitive.Content>
        </DialogPrimitive.Portal>
      </DialogPrimitive.Root>
    </div>
  );
};

export default MessageHeader;
