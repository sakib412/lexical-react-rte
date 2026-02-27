import {MarkdownShortcutPlugin as LexicalMarkdownShortcutPlugin} from '@lexical/react/LexicalMarkdownShortcutPlugin';
import {TRANSFORMERS} from '@lexical/markdown';

export default function MarkdownShortcutPlugin() {
  return <LexicalMarkdownShortcutPlugin transformers={TRANSFORMERS} />;
}
