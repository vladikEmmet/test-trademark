# High-Performance AI Chat Interface

**Project**: SPA simulating an AI chat interface (LLM platform) with high-volume text handling and streaming responses without UI blocking.

---

## Features

- **Message Virtualization**: Using `@tanstack/react-virtual` to efficiently render hundreds or thousands of messages without lag.
- **Streaming Text Generation**: Simulates high-speed chunked text generation for assistant messages.
- **Markdown Support**: Code blocks, bold text, and basic Markdown rendered via a Web Worker.
- **Smart Auto-Scroll**: Scrolls to the latest message automatically unless the user scrolls up.
- **Stop Generation**: Ability to stop assistant text generation at any time.
- **Zero UI Freezes**: Smooth UI even with very large messages (>5MB).

---

## Tech Stack

- **Core**: React 18+, TypeScript
- **State Management**: Zustand
- **Virtualization**: `@tanstack/react-virtual`
- **Styling**: Tailwind CSS
- **Build Tool**: Vite
- **Markdown Parsing**: `marked` via Web Worker

---

## Project Structure

src/
├─ components/
│ ├─ ChatInput.tsx # Input component for sending messages & generating responses
│ ├─ MessageList.tsx # Chat message list with virtualization
│ ├─ MessageRow.tsx # Individual message row
│ ├─ MessageMarkdown.tsx # Markdown rendering for messages
├─ hooks/
│ ├─ useStreaming.ts # Streaming text generation logic
│ ├─ useStopGeneration.ts # Hook to stop text generation
│ ├─ useMessageVirtualizer.ts # Message virtualization hook
│ ├─ useAutoScroll.ts # Auto-scroll hook
├─ store/
│ ├─ chat.store.ts # Zustand chat store
│ ├─ chat.selectors.ts # Message selectors
├─ markdown/
│ ├─ markdown.worker.ts # Worker for parsing Markdown
│ ├─ markdown.service.ts # Service to send text to worker
│ ├─ markdown.cache.ts # Cache for parsed Markdown
├─ utils/
│ ├─ nanoid.ts # Unique ID generator
├─ generator/
│ ├─ generator.ts # Streaming Lorem Ipsum text generator
│ ├─ stream.buffer.ts # Buffer for streaming text chunks

---

## Installation

```bash
git clone <repo-url>
cd <project-folder>
npm install
npm run dev

## Usage

### Sending a Message

1. Type a message in the input field.
2. Click the **ArrowUp** button → the message is sent as user input.
3. Assistant starts generating a response in streaming mode.
4. Click the **X** button to stop generation at any time.

### Virtualized Chat

- The message list is fully virtualized using `@tanstack/react-virtual`.
- Supports hundreds or thousands of messages without lag.
- Handles very long messages (3–5k tokens each).

### Markdown Rendering

- Messages support **Markdown**: code blocks, bold, italic, etc.
- Parsing is offloaded to a **Web Worker** to avoid blocking the main thread.
- Parsed results are cached for faster re-rendering.

### Auto-Scroll

- Chat automatically scrolls to the latest message.
- Auto-scroll pauses if the user scrolls up to read previous messages.
- Auto-scroll resumes when the user scrolls near the bottom.

---

## Key Components

- **ChatInput**: Handles user input and triggers streaming text generation.
- **MessageList**: Virtualized container for chat messages.
- **MessageMarkdown**: Safely renders Markdown content using a worker.
- **useStreaming**: Hook for streaming text generation.
- **useStopGeneration**: Hook to stop streaming.
- **useMessageVirtualizer**: Hook for message virtualization.
- **useAutoScroll**: Hook for smart auto-scrolling behavior.

---

## Notes

- Designed for **high-performance chat applications**.
- Can handle **very large message histories** (>5MB).
- Fully responsive and optimized for React 18+.
- Scales for long text messages and multiple concurrent streams.
```
