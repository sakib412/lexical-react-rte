import {useState} from 'react';

import {AutoFocusPlugin} from '@lexical/react/LexicalAutoFocusPlugin';
import {LexicalComposer} from '@lexical/react/LexicalComposer';
import {ContentEditable} from '@lexical/react/LexicalContentEditable';
import {LexicalErrorBoundary} from '@lexical/react/LexicalErrorBoundary';
import {HistoryPlugin} from '@lexical/react/LexicalHistoryPlugin';
import {RichTextPlugin} from '@lexical/react/LexicalRichTextPlugin';

import editorDefaultConfig from './configs/editorDefaultConfig';
import ToolbarPlugin from './plugins/ToolbarPlugin/ToolbarPlugin';
import Placeholder from './ui/Placeholder';

import './styles/editor.css';

function Editor() {
  const [, setIsLinkEditMode] = useState<boolean>(false);
  return (
    <LexicalComposer initialConfig={editorDefaultConfig}>
      <ToolbarPlugin setIsLinkEditMode={setIsLinkEditMode} />
      <div className="editor-container">
        <div className="editor-inner">
          <RichTextPlugin
            contentEditable={<ContentEditable className="editor-input" />}
            placeholder={<Placeholder />}
            ErrorBoundary={LexicalErrorBoundary}
          />
          <AutoFocusPlugin />
          <HistoryPlugin />
        </div>
      </div>
    </LexicalComposer>
  );
}

export default Editor;
