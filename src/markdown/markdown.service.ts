import { setCached } from "./markdown.cache";

type Listener = (html: string) => void;

const listeners = new Map<string, Listener>();

const worker = new Worker(new URL("./markdown.worker.ts", import.meta.url), { type: "module" });

worker.onmessage = (e) => {
  const { id, html } = e.data;
  setCached(id, html);

  const cb = listeners.get(id);
  if (cb) cb(html);
};

export function parseMarkdown(id: string, text: string, onResult: (html: string) => void) {
  listeners.set(id, onResult);
  worker.postMessage({ id, text });
}
