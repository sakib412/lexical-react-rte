import {LinkPlugin} from '@lexical/react/LexicalLinkPlugin';
import {CheckListPlugin} from '@lexical/react/LexicalCheckListPlugin';
import {LexicalComposer} from '@lexical/react/LexicalComposer';
import {ContentEditable} from '@lexical/react/LexicalContentEditable';
import {LexicalErrorBoundary} from '@lexical/react/LexicalErrorBoundary';
import {HistoryPlugin} from '@lexical/react/LexicalHistoryPlugin';
import {AutoFocusPlugin} from '@lexical/react/LexicalAutoFocusPlugin';
import {ListPlugin} from '@lexical/react/LexicalListPlugin';
import {RichTextPlugin} from '@lexical/react/LexicalRichTextPlugin';
import {TabIndentationPlugin} from '@lexical/react/LexicalTabIndentationPlugin';
import type {EditorThemeClasses, SerializedEditorState} from 'lexical';
import {forwardRef, type ReactNode} from 'react';

import {EditorContextProvider} from '../context/EditorContext';
import {ToolbarProvider} from '../context/ToolbarContext';
import editorDefaultConfig from '../configs/editorDefaultConfig';
import AutoLinkPlugin from '../plugins/AutoLinkPlugin';
import CodeHighlightPlugin from '../plugins/CodeHighlightPlugin';
import EditablePlugin from '../plugins/EditablePlugin';
import FloatingLinkEditorPlugin from '../plugins/FloatingLinkEditorPlugin/FloatingLinkEditorPlugin';
import HorizontalRulePlugin from '../plugins/HorizontalRulePlugin';
import InitialValuePlugin from '../plugins/InitialValuePlugin';
import MarkdownShortcutPlugin from '../plugins/MarkdownShortcutPlugin';
import OnChangePlugin from '../plugins/OnChangePlugin';
import Placeholder from '../ui/Placeholder';
import type {BaseEditorProps, EditorRef} from '../types';

import '../styles/editor.css';

interface EditorShellProps extends BaseEditorProps {
  /** Toolbar or other elements rendered before the editor area */
  before?: ReactNode;
  /** Additional plugins or elements rendered after the editor area */
  after?: ReactNode;
}

const EditorShell = forwardRef<EditorRef, EditorShellProps>(
  function EditorShell(
    {
      initialValue,
      placeholder = 'Enter some text...',
      editable = true,
      onChange,
      className,
      classNames = {},
      theme,
      namespace,
      autoFocus = false,
      onError,
      before,
      after,
    },
    ref,
  ) {
    const initialConfig = {
      ...editorDefaultConfig,
      ...(namespace ? {namespace} : {}),
      ...(theme ? {theme: {...editorDefaultConfig.theme, ...theme} as EditorThemeClasses} : {}),
      ...(onError ? {onError} : {}),
      editable,
    };

    const placeholderElement = (
      <Placeholder className={classNames.placeholder}>
        {placeholder}
      </Placeholder>
    );

    return (
      <LexicalComposer initialConfig={initialConfig}>
        <EditorContextProvider ref={ref}>
          <ToolbarProvider>
            <div className={`rte-root ${className || ''} ${classNames.root || ''}`.trim()}>
              {before}
              <div
                className={`rte-editor-container ${classNames.editorContainer || ''}`.trim()}>
                <div
                  className={`rte-editor-inner ${classNames.editorInner || ''}`.trim()}>
                  <RichTextPlugin
                    contentEditable={
                      <ContentEditable
                        className={`rte-content-editable ${classNames.contentEditable || ''}`.trim()}
                      />
                    }
                    placeholder={placeholderElement}
                    ErrorBoundary={LexicalErrorBoundary}
                  />
                </div>
              </div>
              {after}
            </div>

            {/* Core plugins */}
            <HistoryPlugin />
            <ListPlugin />
            <CheckListPlugin />
            <LinkPlugin />
            <TabIndentationPlugin />
            <AutoLinkPlugin />
            <CodeHighlightPlugin />
            <MarkdownShortcutPlugin />
            <HorizontalRulePlugin />
            <FloatingLinkEditorPlugin />

            {/* Prop-driven plugins */}
            <OnChangePlugin onChange={onChange} />
            <InitialValuePlugin
              initialValue={initialValue as SerializedEditorState | string | undefined}
            />
            <EditablePlugin editable={editable} />
            {autoFocus && <AutoFocusPlugin />}
          </ToolbarProvider>
        </EditorContextProvider>
      </LexicalComposer>
    );
  },
);

export default EditorShell;
