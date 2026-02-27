import {
  createContext,
  forwardRef,
  type ReactNode,
  type Ref,
  useContext,
  useImperativeHandle,
  useMemo,
} from 'react';
import type {SerializedEditorState} from 'lexical';
import {$getRoot, $insertNodes} from 'lexical';

import {$generateHtmlFromNodes, $generateNodesFromDOM} from '@lexical/html';
import {$convertToMarkdownString, TRANSFORMERS} from '@lexical/markdown';
import {useLexicalComposerContext} from '@lexical/react/LexicalComposerContext';

import type {EditorRef} from '../types';

interface EditorContextValue {
  editorRef: EditorRef | null;
}

const EditorContext = createContext<EditorContextValue>({editorRef: null});

export function useEditorContext() {
  return useContext(EditorContext);
}

interface EditorContextProviderProps {
  children: ReactNode;
  editorRef?: Ref<EditorRef>;
}

export const EditorContextProvider = forwardRef<
  EditorRef,
  Omit<EditorContextProviderProps, 'editorRef'>
>(function EditorContextProvider({children}, ref) {
  const [editor] = useLexicalComposerContext();

  const editorRefValue: EditorRef = useMemo(
    () => ({
      focus: () => editor.focus(),
      blur: () => editor.blur(),
      clear: () => {
        editor.update(() => {
          const root = $getRoot();
          root.clear();
        });
      },
      getHTML: () => {
        let html = '';
        editor.getEditorState().read(() => {
          html = $generateHtmlFromNodes(editor);
        });
        return html;
      },
      getJSON: () => {
        return editor.getEditorState().toJSON() as SerializedEditorState;
      },
      getMarkdown: () => {
        let markdown = '';
        editor.getEditorState().read(() => {
          markdown = $convertToMarkdownString(TRANSFORMERS);
        });
        return markdown;
      },
      setHTML: (html: string) => {
        editor.update(() => {
          const parser = new DOMParser();
          const dom = parser.parseFromString(html, 'text/html');
          const nodes = $generateNodesFromDOM(editor, dom);
          const root = $getRoot();
          root.clear();
          root.selectEnd();
          $insertNodes(nodes);
        });
      },
      setJSON: (json: SerializedEditorState) => {
        const state = editor.parseEditorState(json);
        editor.setEditorState(state);
      },
      getEditor: () => editor,
    }),
    [editor]
  );

  useImperativeHandle(ref, () => editorRefValue, [editorRefValue]);

  return (
    <EditorContext.Provider value={{editorRef: editorRefValue}}>
      {children}
    </EditorContext.Provider>
  );
});
