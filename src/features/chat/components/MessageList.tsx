import { useRef } from "react";
import { useMessageVirtualizer } from "../hooks/useMessageVirtualizer";
import { selectMessages } from "../store/chat.selectors";
import { useChatStore } from "../store/chat.store";
import { MessageMarkdown } from "./MessageMarkdown";

export function MessageList() {
  const messages = useChatStore(selectMessages);
  const ref = useRef<HTMLDivElement>(null);
  const v = useMessageVirtualizer(messages.length, ref);

  return (
    <div
      ref={ref}
      className="flex-1 overflow-auto h-175 border border-gray-300"
    >
      <div style={{ height: v.getTotalSize(), position: "relative" }}>
        {v.getVirtualItems().map((row) => {
          const message = messages[row.index];
          const isUser = message.role === "user";

          return (
            <div
              key={row.key}
              data-index={row.index}
              ref={v.measureElement}
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                transform: `translateY(${row.start}px)`,
              }}
            >
              <div
                className={`flex ${
                  isUser ? "justify-end" : "justify-start"
                } px-4 py-2`}
              >
                <div
                  className={`max-w-[80%] ${
                    isUser ? "bg-blue-600 rounded-2xl px-4 py-2" : ""
                  }`}
                >
                  <MessageMarkdown message={message} />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
