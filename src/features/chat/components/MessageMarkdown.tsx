import { useState, useEffect } from "react";
import { getCached } from "../../../markdown/markdown.cache";
import { parseMarkdown } from "../../../markdown/markdown.service";
import type { Message } from "../types/chat.types";
import cn from "clsx";

export function MessageMarkdown({ message }: { message: Message }) {
  const [html, setHtml] = useState(getCached(message.id) ?? "");

  useEffect(() => {
    parseMarkdown(message.id, message.content, setHtml);
  }, [message.content]);

  return (
    <div
      className={cn(
        "prose prose-invert prose-p:my-0 prose-pre:my-0 max-w-none",
        {
          "text-white": message.role === "user",
        }
      )}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
