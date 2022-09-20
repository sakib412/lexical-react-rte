import { FC } from 'react';

import { $getRoot, $getSelection, EditorState } from 'lexical';

import { LexicalComposer } from '@lexical/react/LexicalComposer';
import { PlainTextPlugin } from '@lexical/react/LexicalPlainTextPlugin';
import { ContentEditable } from '@lexical/react/LexicalContentEditable';
import { HistoryPlugin } from '@lexical/react/LexicalHistoryPlugin';
import { OnChangePlugin } from '@lexical/react/LexicalOnChangePlugin';

export interface EditorProps {
  placeholder: string;
}

const theme = {};

function onChange(editorState: EditorState) {
  editorState.read(() => {
    // Read the contents of the EditorState here.
    const root = $getRoot();
    const selection = $getSelection();

    console.log(root, selection);
  });
}

function onError(error: any) {
  console.error(error);
}

const Editor: FC<EditorProps> = ({ placeholder }) => {
  const initialConfig = {
    namespace: 'LexicalEditor',
    theme,
    onError,
  };
  return (
    <LexicalComposer initialConfig={initialConfig}>
      <PlainTextPlugin
        contentEditable={<ContentEditable />}
        placeholder={<div>{placeholder}</div>}
      />
      <OnChangePlugin onChange={onChange} />
      <HistoryPlugin />
    </LexicalComposer>
  );
};

export default Editor;
