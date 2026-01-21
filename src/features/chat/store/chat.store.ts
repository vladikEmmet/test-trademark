import { create } from "zustand";

interface Message {
  id: string;
  role: "user" | "agent";
  content: string;
}

interface ChatState {
  messages: Message[];
  isGenerating: boolean;
  append: (msg: Message) => void;
  updateLast: (text: string) => void;
  setIsGenerating: (value: boolean) => void;
}

export const useChatStore = create<ChatState>((set, get) => ({
  messages: [],
  isGenerating: false,
  append: (msg) => set((state) => ({ messages: [...state.messages, msg] })),
  updateLast: (text) =>
    set((state) => {
      const messages = [...state.messages];
      const last = messages[messages.length - 1];
      if (last) last.content = text;
      return { messages };
    }),
  setIsGenerating: (value) => set({ isGenerating: value }),
}));
