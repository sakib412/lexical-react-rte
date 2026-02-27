import type {
  EditorState,
  EditorThemeClasses,
  LexicalEditor,
  SerializedEditorState,
} from 'lexical';
import type {ReactNode, Ref} from 'react';

export type BlockType =
  | 'paragraph'
  | 'h1'
  | 'h2'
  | 'h3'
  | 'h4'
  | 'h5'
  | 'h6'
  | 'bullet'
  | 'number'
  | 'check'
  | 'quote'
  | 'code';

export const blockTypeToBlockName: Record<BlockType, string> = {
  paragraph: 'Normal',
  h1: 'Heading 1',
  h2: 'Heading 2',
  h3: 'Heading 3',
  h4: 'Heading 4',
  h5: 'Heading 5',
  h6: 'Heading 6',
  bullet: 'Bulleted List',
  number: 'Numbered List',
  check: 'Check List',
  quote: 'Quote',
  code: 'Code Block',
};

export interface EditorRef {
  focus: () => void;
  blur: () => void;
  clear: () => void;
  getHTML: () => string;
  getJSON: () => SerializedEditorState;
  getMarkdown: () => string;
  setHTML: (html: string) => void;
  setJSON: (json: SerializedEditorState) => void;
  getEditor: () => LexicalEditor;
}

export interface EditorClassNames {
  root?: string;
  toolbar?: string;
  editorContainer?: string;
  editorInner?: string;
  contentEditable?: string;
  placeholder?: string;
}

export interface BaseEditorProps {
  /** Initial editor content as JSON */
  initialValue?: SerializedEditorState | string;
  /** Placeholder text */
  placeholder?: string | ReactNode;
  /** Whether the editor is editable */
  editable?: boolean;
  /** Called when editor state changes */
  onChange?: (
    editorState: EditorState,
    editor: LexicalEditor,
    tags: Set<string>
  ) => void;
  /** Ref for imperative editor access */
  ref?: Ref<EditorRef>;
  /** Root class name */
  className?: string;
  /** CSS class overrides for inner elements */
  classNames?: EditorClassNames;
  /** Lexical theme class overrides */
  theme?: EditorThemeClasses;
  /** LexicalComposer namespace */
  namespace?: string;
  /** Auto focus on mount */
  autoFocus?: boolean;
  /** Error handler */
  onError?: (error: Error) => void;
}

export interface RichTextEditorProps extends BaseEditorProps {
  /** Custom toolbar via compound components. If omitted, default toolbar renders. */
  children?: ReactNode;
}

export interface InlineEditorProps extends BaseEditorProps {
  /** Custom floating toolbar content */
  children?: ReactNode;
}

export interface ToolbarButtonProps {
  onClick: () => void;
  icon?: ReactNode;
  children?: ReactNode;
  className?: string;
  disabled?: boolean;
  title?: string;
  'aria-label'?: string;
}

export interface ToolbarToggleProps extends ToolbarButtonProps {
  active: boolean;
}
