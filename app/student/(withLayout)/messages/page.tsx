import React from "react";

import MessageHeader from "@/components/Student/student-messages/MessageHeader";
import ChatMessages from "@/components/Student/student-messages/ChatMessages";
import ContactList from "@/components/Student/student-messages/ContactList";
import MessageInput from "@/components/Student/student-messages/MessageInput";

// Mock data for messages
const mockContacts = [
  {
    id: 1,
    name: "Jane Cooper",
    image: "/images/student-dashboard/Teacher-profile-1.jpg",
    lastMessage: "Yeah sure, tell me zafor.",
    timestamp: "just now",
    isActive: true,
    unread: false,
  },
  {
    id: 2,
    name: "Jenny Wilson",
    image: "/images/student-dashboard/Teacher-profile-2.jpg",
    lastMessage: "Thank you so much, sir.",
    timestamp: "2 d",
    isActive: false,
    unread: true,
  },
  {
    id: 3,
    name: "Marvin McKinney",
    image: "/images/student-dashboard/Teacher-profile-3.jpg",
    lastMessage: "You're Welcome.",
    timestamp: "1 m",
    isActive: false,
    unread: true,
  },
  {
    id: 4,
    name: "Eleanor Pena",
    image: "/images/student-dashboard/Teacher-profile-4.jpg",
    lastMessage: "Thank you so much, sir.",
    timestamp: "1 m",
    isActive: false,
    unread: true,
  },
  {
    id: 5,
    name: "Ronald Richards",
    image: "/images/student-dashboard/Teacher-profile-1.jpg",
    lastMessage: "Sorry, I can't help you.",
    timestamp: "2 m",
    isActive: false,
    unread: false,
  },
  {
    id: 6,
    name: "Kathryn Murphy",
    image: "/images/student-dashboard/Teacher-profile-2.jpg",
    lastMessage: "new message.",
    timestamp: "2 m",
    isActive: false,
    unread: false,
  },
  {
    id: 7,
    name: "Jacob Jones",
    image: "/images/student-dashboard/Teacher-profile-3.jpg",
    lastMessage: "Thank you so much, sir.",
    timestamp: "6 m",
    isActive: false,
    unread: false,
  },
  {
    id: 8,
    name: "Cameron Williamson",
    image: "/images/student-dashboard/Teacher-profile-4.jpg",
    lastMessage: "It's okay, no problem brother, i will fix everhitn...",
    timestamp: "6 m",
    isActive: false,
    unread: false,
  },
  {
    id: 9,
    name: "Arlene McCoy",
    image: "/images/student-dashboard/Teacher-profile-1.jpg",
    lastMessage: "Thank you so much, sir.",
    timestamp: "9 m",
    isActive: false,
    unread: false,
  },
  {
    id: 10,
    name: "Dianne Russell",
    image: "/images/student-dashboard/Teacher-profile-2.jpg",
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

export default function MessagesPage({
  searchParams,
}: {
  searchParams: Promise<{
    id: string;
  }>;
}) {
  return (
    <div className="bg-base-100 border-base-300 flex h-screen w-full border">
      <div className="border-base-300 flex w-full flex-col border-r md:w-1/3">
        <MessageHeader mockContacts={mockContacts} />
        <ContactList
          mockContacts={mockContacts}
          mockChatMessages={mockChatMessages}
        />
      </div>

      <div className="hidden w-2/3 flex-col md:flex">
        <ChatMessages searchParams={searchParams} />
        <MessageInput />
      </div>
    </div>
  );
}
