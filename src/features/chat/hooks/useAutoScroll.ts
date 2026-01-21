import { useEffect, useRef } from "react"

export function useAutoScroll(ref: any, deps: any[]) {
  const auto = useRef(true)

  useEffect(() => {
    if (auto.current) {
      ref.current?.scrollTo({
        top: ref.current.scrollHeight,
      })
    }
  }, deps)

  return {
    onScroll: () => {
      const el = ref.current
      auto.current =
        el.scrollHeight - el.scrollTop - el.clientHeight < 40
    },
  }
}
