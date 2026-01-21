import { useVirtualizer } from "@tanstack/react-virtual";

export function useMessageVirtualizer(count: number, ref: any) {
  return useVirtualizer({
    count,
    getScrollElement: () => ref.current,
    estimateSize: () => 200,
    overscan: 5,
  });
}
