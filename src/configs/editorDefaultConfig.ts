import type {InitialConfigType} from '@lexical/react/LexicalComposer';

import defaultTheme from '../themes/default';

import editorNodes from './nodes';

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
