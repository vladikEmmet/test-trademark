import { useRef } from "react"
import { useMessageVirtualizer } from "../hooks/useMessageVirtualizer"
import { selectMessages } from "../store/chat.selectors"
import { useChatStore } from "../store/chat.store"
import { MessageRow } from "./MessageRow"

export function MessageList() {
    const messages = useChatStore(selectMessages)
    const ref = useRef(null)
    const v = useMessageVirtualizer(messages.length, ref)

    return (
        <div ref={ref} className="flex-1 overflow-auto">
            <div style={{ height: v.getTotalSize() }}>
                {v.getVirtualItems().map((row) => (
                    <MessageRow
                        key={row.key}
                        message={messages[row.index]}
                        style={{
                            transform: `translateY(${row.start}px)`,
                        }}
                    />
                ))}
            </div>
        </div>
    )
}
