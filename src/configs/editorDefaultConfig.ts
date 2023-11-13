import {InitialConfigType} from '@lexical/react/LexicalComposer';
import defaultNodes from '../nodes/nodes';
import defaultTheme from '../themes/default';

function onError(error: Error) {
  console.error(error);
}

const editorDefaultConfig: InitialConfigType = {
  namespace: 'editor',
  theme: defaultTheme,
  nodes: [...defaultNodes],
  onError,
};

export default editorDefaultConfig;
