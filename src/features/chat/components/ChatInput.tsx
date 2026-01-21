import { useState } from "react";
import { useChatStore } from "../store/chat.store";
import { useStreaming } from "../hooks/useStreaming";
import { useStopGeneration } from "../hooks/useStopGeneration";
import { nanoid } from "../../../shared/utils/nanoid";
import { ArrowUp, X } from "lucide-react";

export function ChatInput() {
  const [input, setInput] = useState("");
  const append = useChatStore((s) => s.append);
  const isGenerating = useChatStore((s) => s.isGenerating);
  const { start } = useStreaming();
  const { setStop, stop } = useStopGeneration();

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage = {
      id: nanoid(),
      role: "user" as const,
      content: input.trim(),
    };
    append(userMessage);
    setInput("");

    const stopFn = start();
    setStop(stopFn);
  };

  return (
    <div className="p-4 flex gap-2">
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Введите сообщение"
        className="flex-1 rounded px-3 py-2 text-black"
      />
      <button
        onClick={isGenerating ? stop : handleSend}
        className={"p-4 rounded-full text-black bg-white"}
      >
        {isGenerating ? <X /> : <ArrowUp />}
      </button>
    </div>
  );
}
