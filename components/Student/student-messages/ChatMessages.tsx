const ChatMessages = ({
  mockChatMessages,
}: {
  mockChatMessages: Array<{
    id: number;
    message: string;
    timestamp: string;
    isOwn: boolean;
  }>;
}) => {
  return (
    <div className="bg-base-100 flex-1 overflow-y-auto p-4">
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
  );
};

export default ChatMessages;
