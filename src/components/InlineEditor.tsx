import {forwardRef} from 'react';

import FloatingToolbar from '../toolbar/FloatingToolbar';
import type {EditorRef, InlineEditorProps} from '../types';

import EditorShell from './EditorShell';

const InlineEditor = forwardRef<EditorRef, InlineEditorProps>(
  function InlineEditor({children, ...props}, ref) {
    return (
      <EditorShell
        ref={ref}
        after={
          <>
            <FloatingToolbar />
            {children}
          </>
        }
        {...props}
      />
    );
  }
);

export default InlineEditor;
