import { useStopGeneration } from "../hooks/useStopGeneration"
import { useStreaming } from "../hooks/useStreaming"

export function ChatInput() {
    const { start } = useStreaming()
    const { setStop, stop } = useStopGeneration()

    const onGenerate = () => {
        const stopFn = start()
        setStop(stopFn)
    }

    return (
        <div className="p-4 flex gap-2">
            <button onClick={onGenerate}>Generate</button>
            <button onClick={stop}>Stop</button>
        </div>
    )
}
