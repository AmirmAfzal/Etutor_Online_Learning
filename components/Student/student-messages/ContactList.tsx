"use client";

import Image from "next/image";
import { useState } from "react";

import ChatMessages from "./ChatMessages";
import MessageInput from "./MessageInput";

const ContactList = ({
  mockContacts,
  mockChatMessages,
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
  mockChatMessages: {
    id: number;
    sender: string;
    message: string;
    timestamp: string;
    isOwn: boolean;
  }[];
}) => {
  const [chatOpen, setChatOpen] = useState(false);

  if (chatOpen)
    return (
      <div className="flex h-full w-full flex-col">
        <ChatMessages mockChatMessages={mockChatMessages} />
        <MessageInput />
      </div>
    );

  return (
    <div className="h-80 flex-1 overflow-y-auto md:h-auto">
      {mockContacts.map((contact) => (
        <button
          key={contact.id}
          // initial
          // FIXME
          onClick={() => {
            if (window.innerWidth < 768) {
              setChatOpen(true);
            }
          }}
          className={`border-base-200 hover:bg-base-200 flex cursor-pointer items-center gap-3 border-b p-1 md:p-4 ${
            contact.isActive ? "bg-primary/10" : ""
          }`}
        >
          <div className="relative mt-1">
            <Image
              src={contact.image}
              alt={contact.name}
              width={48}
              height={48}
              className="rounded-full object-cover"
            />
            {contact.unread && (
              <div className="bg-primary absolute -top-1 -right-1 h-2 w-2 rounded-full md:h-3 md:w-3"></div>
            )}
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex items-center justify-between">
              <h3 className="text-base-content md:text-md truncate text-sm font-medium">
                {contact.name}
              </h3>
              <span className="text-base-content/50 text-xs">
                {contact.timestamp}
              </span>
            </div>
            <p className="text-base-content/60 truncate text-xs md:text-sm">
              {contact.lastMessage}
            </p>
          </div>
        </button>
      ))}
    </div>
  );
};

export default ContactList;
