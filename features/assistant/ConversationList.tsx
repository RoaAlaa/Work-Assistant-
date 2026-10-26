import type { Conversation } from "@/types/assistant";
import { formatDate } from "@/lib/format";
import { cn } from "@/lib/cn";

type ConversationListProps = {
  conversations: Conversation[];
  selectedId: string | null;
  onSelect: (id: string) => void;
};

export function ConversationList({
  conversations,
  selectedId,
  onSelect,
}: ConversationListProps) {
  if (conversations.length === 0) {
    return <p className="px-3 py-6 text-sm text-slate-500">No conversations yet.</p>;
  }

  return (
    <ul className="flex flex-col gap-1">
      {conversations.map((conversation) => (
        <li key={conversation.id}>
          <button
            type="button"
            onClick={() => onSelect(conversation.id)}
            className={cn(
              "w-full rounded-md px-3 py-2 text-left",
              selectedId === conversation.id ? "bg-slate-200" : "hover:bg-slate-100",
            )}
          >
            <span className="block text-sm font-medium text-slate-900">
              {conversation.title}
            </span>
            <span className="block text-xs text-slate-500">
              {formatDate(conversation.updatedAt)}
            </span>
          </button>
        </li>
      ))}
    </ul>
  );
}
