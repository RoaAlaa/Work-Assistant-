/**
 * INTEGRATION POINT — start capturing microphone audio.
 * Do not call getUserMedia or MediaRecorder until you implement this.
 */
export async function startVoiceRecording(): Promise<{ recordingId: string }> {
  throw new Error(
    "Not implemented: connect startVoiceRecording() in lib/ai/voice.ts.",
  );
}

/**
 * INTEGRATION POINT — stop recording and return an audio blob.
 */
export async function stopVoiceRecording(
  _recordingId: string,
): Promise<{ audio: Blob }> {
  throw new Error(
    "Not implemented: connect stopVoiceRecording() in lib/ai/voice.ts.",
  );
}

/**
 * INTEGRATION POINT — speech-to-text.
 */
export async function transcribeAudio(_audio: Blob): Promise<{ text: string }> {
  throw new Error("Not implemented: connect transcribeAudio() in lib/ai/voice.ts.");
}

/**
 * INTEGRATION POINT — text-to-speech for assistant replies.
 */
export async function speakText(_text: string): Promise<void> {
  throw new Error("Not implemented: connect speakText() in lib/ai/voice.ts.");
}
