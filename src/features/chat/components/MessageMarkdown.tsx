import { useEffect, useState } from "react";
import { getCached } from "../../../markdown/markdown.cache";
import { parseMarkdown } from "../../../markdown/markdown.service";

export function MessageMarkdown({ message }: any) {
    const [html, setHtml] = useState(
        getCached(message.id) ?? ""
    );

    useEffect(() => {
        parseMarkdown(message.id, message.content, setHtml);
    }, [message.content]);

    return (
        <div
            className="prose prose-invert max-w-none"
            dangerouslySetInnerHTML={{ __html: html }}
        />
    );
}
