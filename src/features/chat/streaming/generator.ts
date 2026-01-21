export function generateText(
  onChunk: (c: string) => void,
  onDone?: () => void
): () => void {
  let count = 0;
  const max = 10_000;

  const id = setInterval(() => {
    if (count > max) {
      clearInterval(id);
      onDone?.();
      return;
    }

    const chunk = "Lorem ipsum dolor sit amet ";
    count += chunk.length;
    onChunk(chunk);
  }, 10);

  const stopFn = () => {
    clearInterval(id);
    onDone?.();
  };

  return stopFn;
}
