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

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
      return;
    }

    setInput(e.currentTarget.value);
  };

  return (
    <div className="p-4 flex gap-2">
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Введите сообщение"
        className="flex-1 rounded px-3 py-2 text-black border border-gray-300"
      />
      <button
        onClick={isGenerating ? stop : handleSend}
        className={
          "p-4 rounded-full text-black shadow-md border border-gray-300 hover:shadow-2xl bg-white cursor-pointer"
        }
      >
        {isGenerating ? <X /> : <ArrowUp />}
      </button>
    </div>
  );
}
