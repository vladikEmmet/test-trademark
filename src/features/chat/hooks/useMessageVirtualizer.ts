import { useVirtualizer, type Virtualizer } from "@tanstack/react-virtual";

export function useMessageVirtualizer(
  count: number,
  scrollRef: React.RefObject<HTMLDivElement>
): Virtualizer<HTMLDivElement, Element> {
  return useVirtualizer<HTMLDivElement, HTMLDivElement>({
    count,
    getScrollElement: () => scrollRef.current,
    estimateSize: () => 200,
    overscan: 5,
  });
}
