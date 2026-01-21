export function rafThrottle(fn: () => void) {
  let raf: number | null = null;
  return () => {
    if (raf) return;
    raf = requestAnimationFrame(() => {
      fn();
      raf = null;
    });
  };
}
