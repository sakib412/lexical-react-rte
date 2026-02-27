import {TRANSFORMERS} from '@lexical/markdown';
import {MarkdownShortcutPlugin as LexicalMarkdownShortcutPlugin} from '@lexical/react/LexicalMarkdownShortcutPlugin';

export default function MarkdownShortcutPlugin() {
  return <LexicalMarkdownShortcutPlugin transformers={TRANSFORMERS} />;
}
