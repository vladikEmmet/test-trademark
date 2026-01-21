import { useRef } from "react";

export function useStopGeneration() {
  const stopRef = useRef<() => void>(null);

  return {
    setStop: (fn: () => void) => (stopRef.current = fn),
    stop: () => stopRef.current?.(),
  };
}
