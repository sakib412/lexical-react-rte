import {useCallback, useEffect, useRef, useState} from 'react';
import {
  $getSelection,
  $isRangeSelection,
  COMMAND_PRIORITY_LOW,
  SELECTION_CHANGE_COMMAND,
} from 'lexical';
import {createPortal} from 'react-dom';

import {useLexicalComposerContext} from '@lexical/react/LexicalComposerContext';
import {mergeRegister} from '@lexical/utils';

import ToolbarPlugin from '../plugins/ToolbarPlugin';

import Bold from './items/Bold';
import Code from './items/Code';
import Highlight from './items/Highlight';
import Italic from './items/Italic';
import Link from './items/Link';
import Separator from './items/Separator';
import Strikethrough from './items/Strikethrough';
import Underline from './items/Underline';

import './FloatingToolbar.css';

const VERTICAL_GAP = 10;

function FloatingToolbarContent() {
  const [editor] = useLexicalComposerContext();
  const toolbarRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  const updatePosition = useCallback(() => {
    const nativeSelection = window.getSelection();
    const toolbar = toolbarRef.current;

    if (!nativeSelection || nativeSelection.rangeCount === 0 || !toolbar) {
      return;
    }

    const range = nativeSelection.getRangeAt(0);
    const rect = range.getBoundingClientRect();

    if (rect.width === 0 && rect.height === 0) {
      setIsVisible(false);
      return;
    }

    const toolbarWidth = toolbar.offsetWidth;
    const toolbarHeight = toolbar.offsetHeight;

    let top = rect.top - toolbarHeight - VERTICAL_GAP + window.scrollY;
    let left = rect.left + rect.width / 2 - toolbarWidth / 2 + window.scrollX;

    // Keep within viewport
    if (top < window.scrollY) {
      top = rect.bottom + VERTICAL_GAP + window.scrollY;
    }
    if (left < 4) {
      left = 4;
    }
    if (left + toolbarWidth > window.innerWidth - 4) {
      left = window.innerWidth - toolbarWidth - 4;
    }

    toolbar.style.top = `${top}px`;
    toolbar.style.left = `${left}px`;
  }, []);

  const $updateToolbarVisibility = useCallback(() => {
    editor.getEditorState().read(() => {
      const selection = $getSelection();
      if (
        !$isRangeSelection(selection) ||
        selection.isCollapsed() ||
        selection.getTextContent().trim() === ''
      ) {
        setIsVisible(false);
        return;
      }
      setIsVisible(true);
    });
  }, [editor]);

  useEffect(() => {
    return mergeRegister(
      editor.registerUpdateListener(({editorState}) => {
        editorState.read(() => {
          $updateToolbarVisibility();
        });
      }),
      editor.registerCommand(
        SELECTION_CHANGE_COMMAND,
        () => {
          $updateToolbarVisibility();
          return false;
        },
        COMMAND_PRIORITY_LOW
      )
    );
  }, [editor, $updateToolbarVisibility]);

  useEffect(() => {
    if (isVisible) {
      // Delay slightly so the DOM is painted and we can measure
      requestAnimationFrame(() => {
        updatePosition();
      });
    }
  }, [isVisible, updatePosition]);

  return createPortal(
    <div
      ref={toolbarRef}
      className={`rte-floating-toolbar ${isVisible ? 'rte-floating-toolbar--visible' : ''}`}
      role="toolbar"
      aria-label="Floating text formatting toolbar">
      <Bold />
      <Italic />
      <Underline />
      <Strikethrough />
      <Code />
      <Highlight />
      <Separator />
      <Link />
    </div>,
    document.body
  );
}

export default function FloatingToolbar() {
  return (
    <>
      <ToolbarPlugin />
      <FloatingToolbarContent />
    </>
  );
}
