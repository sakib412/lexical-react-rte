import {forwardRef} from 'react';

import {Toolbar} from '../toolbar/Toolbar';
import type {EditorRef, RichTextEditorProps} from '../types';

import EditorShell from './EditorShell';

const RichTextEditor = forwardRef<EditorRef, RichTextEditorProps>(
  function RichTextEditor({children, ...props}, ref) {
    // If children are provided, use them as-is (should be <Toolbar>).
    // Otherwise, render the default Toolbar.
    const toolbar = children ?? <Toolbar />;

    return <EditorShell ref={ref} before={toolbar} {...props} />;
  }
);

export default RichTextEditor;
