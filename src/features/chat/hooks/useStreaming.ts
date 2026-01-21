import { nanoid } from "../../../shared/utils/nanoid";
import { useChatStore } from "../store/chat.store";
import { createStreamController } from "../streaming/stream.controller";

export function useStreaming() {
  const append = useChatStore((s) => s.append);

  const start = () => {
    append({
      id: nanoid(),
      role: "agent",
      content: "",
      streaming: true,
    });

    // ❗ ВАЖНО: вернуть stop
    return createStreamController();
  };

  return { start };
}
