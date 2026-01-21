import { useEffect, useRef } from "react";

export function useAutoScroll(ref: any, deps: any[]) {
  const auto = useRef(true);

  useEffect(() => {
    if (auto.current && ref.current) {
      requestAnimationFrame(() => {
        ref.current?.scrollTo({
          top: ref.current.scrollHeight,
          behavior: "smooth",
        });
      });
    }
  }, deps);

  return {
    onScroll: () => {
      const el = ref.current;
      if (!el) return;

      const isNearBottom =
        el.scrollHeight - el.scrollTop - el.clientHeight < 100;
      auto.current = isNearBottom;
    },
  };
}
