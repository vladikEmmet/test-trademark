import { useChatStore } from "../store/chat.store";
import { StreamBuffer } from "./stream.buffer";

export function createStreamController() {
  const store = useChatStore.getState();

  const messageId = crypto.randomUUID();
  store.append({ id: messageId, role: "agent", content: "" });

  store.setIsGenerating(true);

  const buffer = new StreamBuffer((text) => store.updateLast(text));

  let count = 0;
  const max = 10_000;
  let intervalId: ReturnType<typeof setInterval> | null = null;

  const stopFn = () => {
    if (intervalId) {
      clearInterval(intervalId);
      intervalId = null;
      store.setIsGenerating(false);
    }
  };

  intervalId = setInterval(() => {
    const chunk = "Lorem ipsum dolor sit amet ";
    buffer.push(chunk);
    count += chunk.length;

    if (count >= max) {
      stopFn();
    }
  }, 10);

  return stopFn;
}
