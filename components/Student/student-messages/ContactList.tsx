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
      <div className="!z-100 flex h-full w-full flex-col">
        <ChatMessages mockChatMessages={mockChatMessages} />
        <MessageInput />
      </div>
    );

  return (
    <div className="flex-1 overflow-y-auto">
      {mockContacts.map((contact) => (
        <div
          key={contact.id}
          // initial
          // FIXME
          onClick={() => {
            if (window.innerWidth < 768) {
              setChatOpen(true);
            }
          }}
          className={`border-base-200 hover:bg-base-200 flex cursor-pointer items-center gap-3 border-b p-4 ${
            contact.isActive ? "bg-primary/10" : ""
          }`}
        >
          <div className="relative">
            <Image
              src={contact.image}
              alt={contact.name}
              width={48}
              height={48}
              className="rounded-full object-cover"
            />
            {contact.unread && (
              <div className="bg-primary absolute -top-1 -right-1 h-3 w-3 rounded-full"></div>
            )}
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex items-center justify-between">
              <h3 className="text-base-content truncate font-medium">
                {contact.name}
              </h3>
              <span className="text-base-content/50 text-xs">
                {contact.timestamp}
              </span>
            </div>
            <p className="text-base-content/60 truncate text-sm">
              {contact.lastMessage}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ContactList;
