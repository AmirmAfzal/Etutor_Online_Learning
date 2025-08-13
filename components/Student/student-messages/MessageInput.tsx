import Icon from "@/components/ui/Icon";

function MessageInput() {
  return (
    <div className="border-base-300 bg-base-100 flex items-center gap-2 border-t p-4">
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
  );
}

export default MessageInput;
