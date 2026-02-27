import type {ElementFormatType, LexicalEditor, NodeKey} from 'lexical';
import {createContext, useCallback, useContext, useState, type ReactNode} from 'react';

import type {BlockType} from '../types';

export interface ToolbarState {
  // Text formats
  isBold: boolean;
  isItalic: boolean;
  isUnderline: boolean;
  isStrikethrough: boolean;
  isCode: boolean;
  isHighlight: boolean;
  isSubscript: boolean;
  isSuperscript: boolean;

  // Block type
  blockType: BlockType;
  rootType: 'root' | 'table';

  // Links
  isLink: boolean;

  // Font
  fontSize: string;
  fontFamily: string;
  fontColor: string;
  bgColor: string;

  // Alignment
  elementFormat: ElementFormatType;

  // Direction
  isRTL: boolean;

  // History
  canUndo: boolean;
  canRedo: boolean;

  // Editor
  isEditable: boolean;
  activeEditor: LexicalEditor | null;

  // Code block
  codeLanguage: string;
  selectedElementKey: NodeKey | null;
}

const INITIAL_TOOLBAR_STATE: ToolbarState = {
  isBold: false,
  isItalic: false,
  isUnderline: false,
  isStrikethrough: false,
  isCode: false,
  isHighlight: false,
  isSubscript: false,
  isSuperscript: false,
  blockType: 'paragraph',
  rootType: 'root',
  isLink: false,
  fontSize: '15px',
  fontFamily: 'Arial',
  fontColor: '#000',
  bgColor: '#fff',
  elementFormat: 'left',
  isRTL: false,
  canUndo: false,
  canRedo: false,
  isEditable: true,
  activeEditor: null,
  codeLanguage: '',
  selectedElementKey: null,
};

export type ToolbarStateKey = keyof ToolbarState;

interface ToolbarContextValue {
  state: ToolbarState;
  updateToolbarState: <K extends ToolbarStateKey>(
    key: K,
    value: ToolbarState[K],
  ) => void;
}

const ToolbarContext = createContext<ToolbarContextValue | null>(null);

export function useToolbarState(): ToolbarContextValue {
  const context = useContext(ToolbarContext);
  if (context === null) {
    throw new Error('useToolbarState must be used within ToolbarProvider');
  }
  return context;
}

interface ToolbarProviderProps {
  children: ReactNode;
}

export function ToolbarProvider({children}: ToolbarProviderProps) {
  const [toolbarState, setToolbarState] =
    useState<ToolbarState>(INITIAL_TOOLBAR_STATE);

  const updateToolbarState = useCallback(
    <K extends ToolbarStateKey>(key: K, value: ToolbarState[K]) => {
      setToolbarState((prev) => {
        if (prev[key] === value) return prev;
        return {...prev, [key]: value};
      });
    },
    [],
  );

  return (
    <ToolbarContext.Provider
      value={{state: toolbarState, updateToolbarState}}>
      {children}
    </ToolbarContext.Provider>
  );
}
