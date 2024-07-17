import './styles/editor.css';
import {useState} from 'react';
import {LexicalComposer} from '@lexical/react/LexicalComposer';
import {RichTextPlugin} from '@lexical/react/LexicalRichTextPlugin';
import LexicalErrorBoundary from '@lexical/react/LexicalErrorBoundary';
import {ContentEditable} from '@lexical/react/LexicalContentEditable';
import {AutoFocusPlugin} from '@lexical/react/LexicalAutoFocusPlugin';
import {HistoryPlugin} from '@lexical/react/LexicalHistoryPlugin';

import editorDefaultConfig from './configs/editorDefaultConfig';
import Placeholder from './ui/Placeholder';
import ToolbarPlugin from './plugins/ToolbarPlugin/ToolbarPlugin';

function Editor() {
  const [, setIsLinkEditMode] = useState<boolean>(false);
  return (
    <LexicalComposer initialConfig={editorDefaultConfig}>
      <div className="editor-container">
        <div className="editor-inner">
          <RichTextPlugin
            contentEditable={<ContentEditable className="editor-input" />}
            placeholder={<Placeholder />}
            ErrorBoundary={LexicalErrorBoundary}
          />
          <AutoFocusPlugin />
          <HistoryPlugin />
          <ToolbarPlugin setIsLinkEditMode={setIsLinkEditMode} />
        </div>
      </div>
    </LexicalComposer>
  );
}

export default Editor;
