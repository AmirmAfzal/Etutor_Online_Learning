"use client";

import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import NewMessageCompose from "@/components/Student/student-messages/NewMessageCompose";

interface Instructor {
  _id: string | undefined;
  firstname: string;
  lastname: string;
}

const NewMessageClient = ({ instructors }: { instructors: Instructor[] }) => {
  const [receiverId, setReceiverId] = useState<string | null>(null);

  console.log(receiverId);
  return (
    <>
      <div>
        <label
          className="text-base-content/70 mb-1 block text-base font-medium"
          htmlFor="teacher-select"
        >
          Teacher:
        </label>
        <Select onValueChange={(val) => setReceiverId(val)}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select..." />
          </SelectTrigger>
          <SelectContent>
            {instructors.map((contact) => (
              <SelectItem
                className="hover:bg-base-200 transition-all duration-200"
                key={contact?._id}
                value={contact?._id ?? ""}
              >
                {`${contact.firstname} ${contact.lastname}`}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {receiverId && <NewMessageCompose receiverId={receiverId} />}
    </>
  );
};

export default NewMessageClient;
