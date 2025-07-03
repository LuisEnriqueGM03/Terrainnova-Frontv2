import { marked } from 'marked';

export function parseChatMarkdown(text: string | undefined | null): string {
  if (typeof text !== 'string') return '';
  const result = marked.parse(text, { breaks: true });
  if (typeof result === 'string') return result;
  // If it's a Promise, this will block rendering until resolved (not recommended for UI)
  throw new Error('Async markdown parsing is not supported in this context.');
}