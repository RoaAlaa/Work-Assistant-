"use client";

import { useMemo, useRef, useState } from "react";
import { mockConversations, mockMessages } from "@/data/conversations";
import { sendAssistantMessage } from "@/lib/ai/assistant";
import { startVoiceRecording } from "@/lib/ai/voice";
import { Button } from "@/components/ui/Button";
import { EmptyState } from "@/components/ui/EmptyState";
import { ErrorState } from "@/components/ui/ErrorState";
import { LoadingState } from "@/components/ui/LoadingState";
import { Notice } from "@/components/ui/Notice";
import { ConversationList } from "@/features/assistant/ConversationList";
import { MessageComposer } from "@/features/assistant/MessageComposer";
import { MessageList } from "@/features/assistant/MessageList";
import type { AssistantMessage, Conversation } from "@/types/assistant";

type ViewState = "ready" | "loading" | "error";

export function AssistantShell() {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [conversations, setConversations] = useState<Conversation[]>(mockConversations);
  const [selectedId, setSelectedId] = useState<string | null>(mockConversations[0]?.id ?? null);
  const [messages, setMessages] = useState<AssistantMessage[]>(mockMessages);
  const [draft, setDraft] = useState("");
  const [attachmentNames, setAttachmentNames] = useState<string[]>([]);
  const [voiceStatus, setVoiceStatus] = useState<string | null>(
    "Voice status: idle. Recording is not connected.",
  );
  const [notice, setNotice] = useState<string | null>(null);
  const [viewState, setViewState] = useState<ViewState>("ready");
  const [historyOpen, setHistoryOpen] = useState(false);

  const visibleMessages = useMemo(
    () => messages.filter((message) => message.conversationId === selectedId),
    [messages, selectedId],
  );

  function handleNewConversation() {
    const id = `local-${Date.now()}`;
    const conversation: Conversation = {
      id,
      title: "New conversation",
      updatedAt: new Date().toISOString(),
    };
    setConversations((current) => [conversation, ...current]);
    setSelectedId(id);
    setNotice("Created a local conversation only. Persistence is not connected.");
    setDraft("");
    setAttachmentNames([]);
  }

  async function handleSend() {
    if (!selectedId || draft.trim().length === 0) {
      return;
    }

    const userMessage: AssistantMessage = {
      id: `local-msg-${Date.now()}`,
      conversationId: selectedId,
      role: "user",
      content: draft.trim(),
      createdAt: new Date().toISOString(),
      attachmentNames: attachmentNames.length > 0 ? attachmentNames : undefined,
    };

    setMessages((current) => [...current, userMessage]);
    setDraft("");
    setAttachmentNames([]);

    try {
      await sendAssistantMessage({
        conversationId: selectedId,
        content: userMessage.content,
        attachmentNames: userMessage.attachmentNames,
      });
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : "Assistant is not connected yet.";
      setNotice(message);
    }
  }

  async function handleMic() {
    try {
      await startVoiceRecording();
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Voice input is not connected yet.";
      setVoiceStatus(`Voice status: ${message}`);
    }
  }

  function handleAttach() {
    fileInputRef.current?.click();
  }

  function handleFilesSelected(fileList: FileList | null) {
    if (!fileList) {
      return;
    }
    const names = Array.from(fileList).map((file) => file.name);
    setAttachmentNames(names);
    setNotice("Files were selected in the browser only. Document analysis is not connected.");
  }

  return (
    <div className="flex h-[calc(100vh-7.5rem)] min-h-[32rem] overflow-hidden rounded-lg border border-slate-200 bg-slate-50">
      <aside
        className={`w-64 shrink-0 border-r border-slate-200 bg-white ${historyOpen ? "block" : "hidden"} md:block`}
      >
        <div className="flex items-center justify-between border-b border-slate-200 p-3">
          <h2 className="text-sm font-semibold">History</h2>
          <Button size="sm" variant="secondary" onClick={handleNewConversation}>
            New
          </Button>
        </div>
        <ConversationList
          conversations={conversations}
          selectedId={selectedId}
          onSelect={(id) => {
            setSelectedId(id);
            setHistoryOpen(false);
            setNotice(null);
          }}
        />
      </aside>

      <section className="flex min-w-0 flex-1 flex-col">
        <div className="flex items-center justify-between gap-2 border-b border-slate-200 bg-white px-4 py-3">
          <div>
            <h2 className="text-sm font-semibold text-slate-900">Conversation</h2>
            <p className="text-xs text-slate-500">UI shell only — no LLM, voice, or RAG yet.</p>
          </div>
          <div className="flex items-center gap-2">
            <Button
              size="sm"
              variant="ghost"
              onClick={() => setViewState("loading")}
            >
              Preview loading
            </Button>
            <Button size="sm" variant="ghost" onClick={() => setViewState("error")}>
              Preview error
            </Button>
            <Button
              size="sm"
              variant="secondary"
              className="md:hidden"
              onClick={() => setHistoryOpen((open) => !open)}
            >
              History
            </Button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-4">
          {notice ? (
            <div className="mb-3">
              <Notice>{notice}</Notice>
            </div>
          ) : null}

          {viewState === "loading" ? (
            <LoadingState label="Loading conversation history…" />
          ) : null}

          {viewState === "error" ? (
            <ErrorState
              message="Could not load this conversation. History loading is not connected to a backend."
              onRetry={() => setViewState("ready")}
            />
          ) : null}

          {viewState === "ready" && visibleMessages.length === 0 ? (
            <EmptyState
              title="No messages in this conversation"
              description="Send a message to see it appear here. The assistant will not reply until you implement sendAssistantMessage()."
            />
          ) : null}

          {viewState === "ready" && visibleMessages.length > 0 ? (
            <MessageList messages={visibleMessages} />
          ) : null}
        </div>

        <input
          ref={fileInputRef}
          type="file"
          className="hidden"
          multiple
          onChange={(event) => {
            handleFilesSelected(event.target.files);
            event.target.value = "";
          }}
        />

        <MessageComposer
          value={draft}
          attachmentNames={attachmentNames}
          voiceStatus={voiceStatus}
          onChange={setDraft}
          onSend={handleSend}
          onAttach={handleAttach}
          onMic={handleMic}
        />
      </section>
    </div>
  );
}
