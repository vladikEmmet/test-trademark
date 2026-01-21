import { create } from "zustand";
import type { Message } from "../types/chat.types";

type ChatStore = {
  messages: Message[];
  isGenerating: boolean;
  append: (m: Message) => void;
  updateLast: (content: string) => void;
  stop: () => void;
};

export const useChatStore = create<ChatStore>((set) => ({
  messages: [],
  isGenerating: false,

  append: (m) => set((s) => ({ messages: [...s.messages, m] })),

  updateLast: (content) =>
    set((s) => {
      const idx = s.messages.length - 1;
      if (idx < 0) return s;

      const updated = {
        ...s.messages[idx],
        content,
      };

      const next = s.messages.slice();
      next[idx] = updated;

      return { messages: next };
    }),

  stop: () => set({ isGenerating: false }),
}));
