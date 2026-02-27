import {useEffect, useRef} from 'react';
import type {SerializedEditorState} from 'lexical';
import {$getRoot, $insertNodes} from 'lexical';

import {$generateNodesFromDOM} from '@lexical/html';
import {useLexicalComposerContext} from '@lexical/react/LexicalComposerContext';

interface InitialValuePluginProps {
  initialValue?: SerializedEditorState | string;
}

export default function InitialValuePlugin({
  initialValue,
}: InitialValuePluginProps) {
  const [editor] = useLexicalComposerContext();
  const hasInitialized = useRef(false);

  useEffect(() => {
    if (!initialValue || hasInitialized.current) return;
    hasInitialized.current = true;

    if (typeof initialValue === 'string') {
      // HTML string
      editor.update(() => {
        const parser = new DOMParser();
        const dom = parser.parseFromString(initialValue, 'text/html');
        const nodes = $generateNodesFromDOM(editor, dom);
        const root = $getRoot();
        root.clear();
        root.selectEnd();
        $insertNodes(nodes);
      });
    } else {
      // SerializedEditorState JSON
      const state = editor.parseEditorState(initialValue);
      editor.setEditorState(state);
    }
  }, [editor, initialValue]);

  return null;
}
