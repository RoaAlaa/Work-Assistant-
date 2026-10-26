import { FormEvent } from "react";
import { Button } from "@/components/ui/Button";
import { Textarea } from "@/components/ui/Textarea";

type MessageComposerProps = {
  value: string;
  attachmentNames: string[];
  voiceStatus: string | null;
  disabled?: boolean;
  onChange: (value: string) => void;
  onSend: () => void;
  onAttach: () => void;
  onMic: () => void;
};

export function MessageComposer({
  value,
  attachmentNames,
  voiceStatus,
  disabled,
  onChange,
  onSend,
  onAttach,
  onMic,
}: MessageComposerProps) {
  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    onSend();
  }

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-3 border-t border-slate-200 bg-white p-3">
      {attachmentNames.length > 0 ? (
        <p className="text-xs text-slate-600">
          Selected files (local only): {attachmentNames.join(", ")}
        </p>
      ) : null}
      {voiceStatus ? <p className="text-xs text-slate-600">{voiceStatus}</p> : null}
      <Textarea
        id="assistant-message"
        label="Message"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder="Type a message. AI replies are not connected yet."
        rows={3}
        disabled={disabled}
      />
      <div className="flex flex-wrap items-center gap-2">
        <Button type="submit" disabled={disabled || value.trim().length === 0}>
          Send
        </Button>
        <Button type="button" variant="secondary" onClick={onAttach} disabled={disabled}>
          Attach document
        </Button>
        <Button type="button" variant="secondary" onClick={onMic} disabled={disabled}>
          Microphone
        </Button>
      </div>
    </form>
  );
}
