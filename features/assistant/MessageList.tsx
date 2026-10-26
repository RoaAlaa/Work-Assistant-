import type { AssistantMessage } from "@/types/assistant";
import { formatDateTime } from "@/lib/format";
import { cn } from "@/lib/cn";

type MessageListProps = {
  messages: AssistantMessage[];
};

export function MessageList({ messages }: MessageListProps) {
  return (
    <ul className="flex flex-col gap-3">
      {messages.map((message) => {
        const isUser = message.role === "user";
        return (
          <li
            key={message.id}
            className={cn("flex", isUser ? "justify-end" : "justify-start")}
          >
            <article
              className={cn(
                "max-w-[85%] rounded-lg px-3 py-2 text-sm",
                isUser
                  ? "bg-blue-700 text-white"
                  : "border border-slate-200 bg-white text-slate-800",
              )}
            >
              <p className="text-xs opacity-80">{isUser ? "You" : "Assistant"}</p>
              <p className="mt-1 whitespace-pre-wrap">{message.content}</p>
              {message.attachmentNames && message.attachmentNames.length > 0 ? (
                <p className="mt-2 text-xs opacity-80">
                  Attachments: {message.attachmentNames.join(", ")}
                </p>
              ) : null}
              <p className="mt-2 text-[11px] opacity-70">{formatDateTime(message.createdAt)}</p>
            </article>
          </li>
        );
      })}
    </ul>
  );
}
