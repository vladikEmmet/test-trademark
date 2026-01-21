import { marked } from "marked";

onmessage = (e) => {
  postMessage({
    id: e.data.id,
    html: marked.parse(e.data.text),
  });
};
