export class StreamBuffer {
  private buffer = "";
  private raf: number | null = null;

  constructor(private onFlush: (t: string) => void) {}

  push(chunk: string) {
    this.buffer += chunk;
    if (!this.raf) {
      this.raf = requestAnimationFrame(() => {
        this.onFlush(this.buffer);
        this.raf = null;
      });
    }
  }
}
