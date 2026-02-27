import type {InitialConfigType} from '@lexical/react/LexicalComposer';

import editorNodes from './nodes';
import defaultTheme from '../themes/default';

function onError(error: Error) {
  console.error(error);
}

const editorDefaultConfig: InitialConfigType = {
  namespace: 'lexical-react-rte',
  theme: defaultTheme,
  nodes: [...editorNodes],
  onError,
};

export default editorDefaultConfig;
