import { memo } from "react"
import { MessageMarkdown } from "./MessageMarkdown"

export const MessageRow = memo(({ message, style }: any) => {
    return (
        <div style={style} className="p-4">
            <MessageMarkdown message={message} />
        </div>
    )
})
