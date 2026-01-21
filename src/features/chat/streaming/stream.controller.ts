import { useChatStore } from "../store/chat.store";
import { generateText } from "./generator";
import { StreamBuffer } from "./stream.buffer";

export function createStreamController() {
  const store = useChatStore.getState();

  const buffer = new StreamBuffer((text) => {
    store.updateLast(text);
  });

  const stop = generateText((chunk) => buffer.push(chunk));

  store.isGenerating = true;

  return () => {
    stop();
    store.stop();
  };
}
