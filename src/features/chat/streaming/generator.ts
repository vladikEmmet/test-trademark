export function generateText(onChunk: (c: string) => void) {
  let count = 0;
  const max = 10_000;

  const id = setInterval(() => {
    if (count > max) {
      clearInterval(id);
      return;
    }

    const chunk = "Lorem ipsum dolor sit amet ";
    count += chunk.length;
    onChunk(chunk);
  }, 10);

  return () => clearInterval(id);
}
