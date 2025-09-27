import { Icon } from "@iconify/react";
import * as DialogPrimitive from "@radix-ui/react-dialog";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

const NewMessageForm = () => {
  return (
    <form className="mt-4 space-y-6">
      <div>
        <label
          className="text-base-content/70 mb-1 block text-base font-medium"
          htmlFor="teacher-select"
        >
          Teacher:
        </label>
        <Select>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select..." />
          </SelectTrigger>
          <SelectContent>
            {/*{mockContacts.map((contact) => (*/}
            {/*  <SelectItem key={contact.id} value={contact.id.toString()}>*/}
            {/*    {contact.name}*/}
            {/*  </SelectItem>*/}
            {/*))}*/}
          </SelectContent>
        </Select>
      </div>
      <div>
        <label
          className="text-base-content/70 mb-1 block text-base font-medium"
          htmlFor="message-textarea"
        >
          Message
        </label>
        <Textarea
          id="message-textarea"
          className="bg-base-100 border-base-300 text-base-content placeholder:text-base-content/40 min-h-[100px] resize-none border"
          placeholder="Write your message here..."
          required
        />
      </div>
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
          className="btn btn-primary flex items-center gap-2 rounded px-8 py-2 font-semibold"
        >
          Send Message
          <Icon icon="ph:paper-plane-right-fill" className="text-xl" />
        </button>
      </div>
    </form>
  );
};

export default NewMessageForm;
