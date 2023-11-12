import {LexicalComposer} from '@lexical/react/LexicalComposer';
import {RichTextPlugin} from '@lexical/react/LexicalRichTextPlugin';
import LexicalErrorBoundary from '@lexical/react/LexicalErrorBoundary';
import {ContentEditable} from '@lexical/react/LexicalContentEditable';
import {AutoFocusPlugin} from '@lexical/react/LexicalAutoFocusPlugin';
import {HistoryPlugin} from '@lexical/react/LexicalHistoryPlugin';

import editorDefaultConfig from './configs/editorDefaultConfig';
import Placeholder from './ui/Placeholder';

const Editor = () => {
  return (
    <LexicalComposer initialConfig={editorDefaultConfig}>
      <RichTextPlugin
        contentEditable={<ContentEditable />}
        placeholder={<Placeholder />}
        ErrorBoundary={LexicalErrorBoundary}
      />
      <HistoryPlugin />
      <AutoFocusPlugin />
    </LexicalComposer>
  );
};

export default Editor;
