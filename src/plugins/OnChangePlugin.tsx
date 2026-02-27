import {OnChangePlugin as LexicalOnChangePlugin} from '@lexical/react/LexicalOnChangePlugin';
import type {EditorState, LexicalEditor} from 'lexical';

interface OnChangePluginProps {
  onChange?: (
    editorState: EditorState,
    editor: LexicalEditor,
    tags: Set<string>,
  ) => void;
}

export default function OnChangePlugin({onChange}: OnChangePluginProps) {
  if (!onChange) return null;
  return <LexicalOnChangePlugin onChange={onChange} ignoreSelectionChange />;
}
