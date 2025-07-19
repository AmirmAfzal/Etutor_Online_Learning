import React from "react";
import Image from "next/image";
import { Icon } from "@iconify/react";

// Mock data for messages
const mockContacts = [
  {
    id: 1,
    name: "Jane Cooper",
    image: "/images/Teacher-profile-1.jpg",
    lastMessage: "Yeah sure, tell me zafor.",
    timestamp: "just now",
    isActive: true,
    unread: false,
  },
  {
    id: 2,
    name: "Jenny Wilson",
    image: "/images/Teacher-profile-2.jpg",
    lastMessage: "Thank you so much, sir.",
    timestamp: "2 d",
    isActive: false,
    unread: true,
  },
  {
    id: 3,
    name: "Marvin McKinney",
    image: "/images/Teacher-profile-3.jpg",
    lastMessage: "You're Welcome.",
    timestamp: "1 m",
    isActive: false,
    unread: true,
  },
  {
    id: 4,
    name: "Eleanor Pena",
    image: "/images/Teacher-profile-4.jpg",
    lastMessage: "Thank you so much, sir.",
    timestamp: "1 m",
    isActive: false,
    unread: true,
  },
  {
    id: 5,
    name: "Ronald Richards",
    image: "/images/Teacher-profile-1.jpg",
    lastMessage: "Sorry, I can't help you.",
    timestamp: "2 m",
    isActive: false,
    unread: false,
  },
  {
    id: 6,
    name: "Kathryn Murphy",
    image: "/images/Teacher-profile-2.jpg",
    lastMessage: "new message.",
    timestamp: "2 m",
    isActive: false,
    unread: false,
  },
  {
    id: 7,
    name: "Jacob Jones",
    image: "/images/Teacher-profile-3.jpg",
    lastMessage: "Thank you so much, sir.",
    timestamp: "6 m",
    isActive: false,
    unread: false,
  },
  {
    id: 8,
    name: "Cameron Williamson",
    image: "/images/Teacher-profile-4.jpg",
    lastMessage: "It's okay, no problem brother, i will fix everhitn...",
    timestamp: "6 m",
    isActive: false,
    unread: false,
  },
  {
    id: 9,
    name: "Arlene McCoy",
    image: "/images/Teacher-profile-1.jpg",
    lastMessage: "Thank you so much, sir.",
    timestamp: "9 m",
    isActive: false,
    unread: false,
  },
  {
    id: 10,
    name: "Dianne Russell",
    image: "/images/Teacher-profile-2.jpg",
    lastMessage: "You're Welcome.",
    timestamp: "9 m",
    isActive: false,
    unread: false,
  },
];

const mockChatMessages = [
  {
    id: 1,
    sender: "Jane Cooper",
    message:
      "Hello and thanks for signing up to the course. If you have any questions about the course or Adobe XD, feel free to get in touch and I'll be happy to help 😊",
    timestamp: "10:30 AM",
    isOwn: false,
  },
  {
    id: 2,
    sender: "You",
    message: "Hello, Good Evening.",
    timestamp: "10:32 AM",
    isOwn: true,
  },
  {
    id: 3,
    sender: "You",
    message: "I'm Zafor.",
    timestamp: "10:32 AM",
    isOwn: true,
  },
  {
    id: 4,
    sender: "You",
    message:
      "I only have a small doubt about your lecture. can you give me some time for this?",
    timestamp: "10:33 AM",
    isOwn: true,
  },
  {
    id: 5,
    sender: "Jane Cooper",
    message: "Yeah sure, tell me zafor.",
    timestamp: "10:35 AM",
    isOwn: false,
  },
];

export default function MessagesPage() {
  return (
    <div className="bg-base-100 border-base-300 flex h-[calc(100vh-400px)] w-full border">
      {/* Left Pane - Message List */}
      <div className="border-base-300 flex w-1/3 flex-col border-r">
        {/* Header */}
        <div className="border-base-300 flex items-center justify-between border-b p-4">
          <h2 className="text-base-content text-lg font-semibold">Message</h2>
          <button className="btn btn-primary btn-sm gap-2">
            <Icon icon="ph:plus" />
            Compose
          </button>
        </div>

        {/* Search Bar */}
        <div className="border-base-300 flex items-center justify-between border-b p-4">
          <div className="relative w-full">
            <input
              type="text"
              placeholder="Search"
              className="input input-sm w-full pr-10"
            />
            <Icon
              icon="ph:magnifying-glass"
              className="text-base-content/50 absolute top-1/2 right-3 -translate-y-1/2"
            />
          </div>
        </div>

        {/* Contact List */}
        <div className="flex-1 overflow-y-auto">
          {mockContacts.map((contact) => (
            <div
              key={contact.id}
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
      </div>

      {/* Right Pane - Chat Window */}
      <div className="flex w-2/3 flex-col">
        {/* Chat Header */}
        <div className="border-base-300 flex items-center justify-between border-b p-4">
          <div className="flex items-center gap-3">
            <Image
              src="/images/Teacher-profile-1.jpg"
              alt="Jane Cooper"
              width={40}
              height={40}
              className="rounded-full object-cover"
            />
            <div>
              <h3 className="text-base-content font-medium">Jane Cooper</h3>
              <p className="text-success text-xs">Active Now</p>
            </div>
          </div>
          <button className="btn btn-soft btn-sm">
            <Icon icon="ph:dots-three-vertical" className="text-xl" />
          </button>
        </div>

        {/* Chat Messages */}
        <div className="flex-1 overflow-y-auto p-4">
          <div className="space-y-4">
            <div className="text-center">
              <span className="text-base-content/50 text-sm">Today</span>
            </div>

            {mockChatMessages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.isOwn ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-xs px-4 py-2 ${
                    message.isOwn
                      ? "bg-primary text-primary-content"
                      : "bg-primary/20 text-base-content"
                  }`}
                >
                  <p className="text-sm">{message.message}</p>
                  <p className="mt-1 text-xs opacity-70">{message.timestamp}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Message Input */}
        <div className="border-base-300 flex items-center gap-2 border-t p-4">
          <div className="relative flex-1">
            <input
              type="text"
              placeholder="Type your message"
              className="input w-full pr-12"
            />
            <Icon
              icon="ph:pencil-simple-line"
              className="text-primary/50 absolute top-1/2 right-4 -translate-y-1/2 text-lg"
            />
          </div>
          <button className="btn btn-primary btn-sm gap-2 py-6">
            Send
            <Icon icon="ph:paper-plane-right-fill" className="text-xl" />
          </button>
        </div>
      </div>
    </div>
  );
}
