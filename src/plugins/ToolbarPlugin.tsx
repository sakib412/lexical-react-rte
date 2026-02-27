import {$isCodeNode, CODE_LANGUAGE_MAP} from '@lexical/code';
import {$isLinkNode} from '@lexical/link';
import {$isListNode, ListNode} from '@lexical/list';
import {useLexicalComposerContext} from '@lexical/react/LexicalComposerContext';
import {$isHeadingNode} from '@lexical/rich-text';
import {
  $getSelectionStyleValueForProperty,
  $isParentElementRTL,
} from '@lexical/selection';
import {$isTableNode, $isTableSelection} from '@lexical/table';
import {$findMatchingParent, $getNearestNodeOfType, mergeRegister} from '@lexical/utils';
import {
  $getSelection,
  $isElementNode,
  $isRangeSelection,
  $isRootOrShadowRoot,
  CAN_REDO_COMMAND,
  CAN_UNDO_COMMAND,
  COMMAND_PRIORITY_CRITICAL,
  SELECTION_CHANGE_COMMAND,
} from 'lexical';
import {useCallback, useEffect, useState} from 'react';

import {useToolbarState} from '../context/ToolbarContext';
import {getSelectedNode} from '../utils/getSelectedNode';
import type {BlockType} from '../types';

function getCodeLanguageFriendlyName(lang: string) {
  const map: Record<string, string> = CODE_LANGUAGE_MAP;
  return map[lang] || lang;
}

export default function ToolbarPlugin() {
  const [editor] = useLexicalComposerContext();
  const {updateToolbarState} = useToolbarState();
  const [activeEditor, setActiveEditor] = useState(editor);

  const $updateToolbar = useCallback(() => {
    const selection = $getSelection();

    if ($isRangeSelection(selection)) {
      // Text formats
      updateToolbarState('isBold', selection.hasFormat('bold'));
      updateToolbarState('isItalic', selection.hasFormat('italic'));
      updateToolbarState('isUnderline', selection.hasFormat('underline'));
      updateToolbarState('isStrikethrough', selection.hasFormat('strikethrough'));
      updateToolbarState('isCode', selection.hasFormat('code'));
      updateToolbarState('isHighlight', selection.hasFormat('highlight'));
      updateToolbarState('isSubscript', selection.hasFormat('subscript'));
      updateToolbarState('isSuperscript', selection.hasFormat('superscript'));

      // RTL
      updateToolbarState('isRTL', $isParentElementRTL(selection));

      // Link
      const node = getSelectedNode(selection);
      const parent = node.getParent();
      updateToolbarState('isLink', $isLinkNode(parent) || $isLinkNode(node));

      // Font styles
      updateToolbarState(
        'fontColor',
        $getSelectionStyleValueForProperty(selection, 'color', '#000'),
      );
      updateToolbarState(
        'bgColor',
        $getSelectionStyleValueForProperty(
          selection,
          'background-color',
          '#fff',
        ),
      );
      updateToolbarState(
        'fontFamily',
        $getSelectionStyleValueForProperty(selection, 'font-family', 'Arial'),
      );
      updateToolbarState(
        'fontSize',
        $getSelectionStyleValueForProperty(selection, 'font-size', '15px'),
      );

      // Block type
      const anchorNode = selection.anchor.getNode();
      let element =
        anchorNode.getKey() === 'root'
          ? anchorNode
          : $findMatchingParent(anchorNode, (e) => {
              const parent = e.getParent();
              return parent !== null && $isRootOrShadowRoot(parent);
            });

      if (element === null) {
        element = anchorNode.getTopLevelElementOrThrow();
      }

      const elementKey = element.getKey();
      const elementDOM = activeEditor.getElementByKey(elementKey);

      updateToolbarState('selectedElementKey', elementKey);

      if (elementDOM !== null) {
        if ($isListNode(element)) {
          const parentList = $getNearestNodeOfType<ListNode>(
            anchorNode,
            ListNode,
          );
          const type = parentList
            ? parentList.getListType()
            : element.getListType();
          updateToolbarState('blockType', type as BlockType);
        } else {
          const type = $isHeadingNode(element)
            ? element.getTag()
            : element.getType();
          if (type in blockTypeMap) {
            updateToolbarState('blockType', type as BlockType);
          }

          if ($isCodeNode(element)) {
            const language = element.getLanguage();
            updateToolbarState(
              'codeLanguage',
              language ? getCodeLanguageFriendlyName(language) : '',
            );
          }
        }
      }

      // Root type
      const tableNode = $findMatchingParent(anchorNode, $isTableNode);
      updateToolbarState('rootType', tableNode ? 'table' : 'root');

      // Element format (alignment)
      let matchingParent;
      if ($isLinkNode(parent)) {
        matchingParent = $findMatchingParent(
          node,
          (parentNode) => $isElementNode(parentNode) && !parentNode.isInline(),
        );
      }
      const formatElement = matchingParent ?? ($isElementNode(element) ? element : null);
      updateToolbarState(
        'elementFormat',
        formatElement && $isElementNode(formatElement) ? formatElement.getFormatType() || 'left' : 'left',
      );
    } else if ($isTableSelection(selection)) {
      // Table selection - keep current toolbar state
    }
  }, [activeEditor, updateToolbarState]);

  // Sync active editor and update on selection change
  useEffect(() => {
    return editor.registerCommand(
      SELECTION_CHANGE_COMMAND,
      (_payload, newEditor) => {
        setActiveEditor(newEditor);
        $updateToolbar();
        return false;
      },
      COMMAND_PRIORITY_CRITICAL,
    );
  }, [editor, $updateToolbar]);

  // Sync active editor to context
  useEffect(() => {
    updateToolbarState('activeEditor', activeEditor);
  }, [activeEditor, updateToolbarState]);

  // Read initial state from active editor
  useEffect(() => {
    activeEditor.read(() => {
      $updateToolbar();
    });
  }, [activeEditor, $updateToolbar]);

  // Listen for updates + undo/redo availability
  useEffect(() => {
    return mergeRegister(
      editor.registerEditableListener((editable) => {
        updateToolbarState('isEditable', editable);
      }),
      activeEditor.registerUpdateListener(() => {
        activeEditor.read(() => {
          $updateToolbar();
        });
      }),
      activeEditor.registerCommand<boolean>(
        CAN_UNDO_COMMAND,
        (payload) => {
          updateToolbarState('canUndo', payload);
          return false;
        },
        COMMAND_PRIORITY_CRITICAL,
      ),
      activeEditor.registerCommand<boolean>(
        CAN_REDO_COMMAND,
        (payload) => {
          updateToolbarState('canRedo', payload);
          return false;
        },
        COMMAND_PRIORITY_CRITICAL,
      ),
    );
  }, [$updateToolbar, activeEditor, editor, updateToolbarState]);

  return null;
}

const blockTypeMap: Record<string, boolean> = {
  paragraph: true,
  h1: true,
  h2: true,
  h3: true,
  h4: true,
  h5: true,
  h6: true,
  bullet: true,
  number: true,
  check: true,
  quote: true,
  code: true,
};
