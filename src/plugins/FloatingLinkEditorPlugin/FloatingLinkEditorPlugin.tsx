import {$isLinkNode, TOGGLE_LINK_COMMAND} from '@lexical/link';
import {useLexicalComposerContext} from '@lexical/react/LexicalComposerContext';
import {$findMatchingParent, mergeRegister} from '@lexical/utils';
import {
  $getSelection,
  $isRangeSelection,
  COMMAND_PRIORITY_LOW,
  KEY_ESCAPE_COMMAND,
  SELECTION_CHANGE_COMMAND,
} from 'lexical';
import {useCallback, useEffect, useRef, useState} from 'react';
import {createPortal} from 'react-dom';

import {getSelectedNode} from '../../utils/getSelectedNode';
import {sanitizeUrl} from '../../utils/url';

import './FloatingLinkEditorPlugin.css';

function FloatingLinkEditor({
  editor,
  anchorElem,
}: {
  editor: ReturnType<typeof useLexicalComposerContext>[0];
  anchorElem: HTMLElement;
}) {
  const editorRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [linkUrl, setLinkUrl] = useState('');
  const [editedLinkUrl, setEditedLinkUrl] = useState('');
  const [isEditMode, setIsEditMode] = useState(false);
  const [lastSelection, setLastSelection] = useState<ReturnType<typeof $getSelection> | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  const updatePosition = useCallback(() => {
    const editorElem = editorRef.current;
    const nativeSelection = window.getSelection();

    if (!editorElem || !nativeSelection || nativeSelection.rangeCount === 0) {
      return;
    }

    const rootElement = editor.getRootElement();
    if (
      rootElement !== null &&
      rootElement.contains(nativeSelection.anchorNode)
    ) {
      const range = nativeSelection.getRangeAt(0);
      const rect = range.getBoundingClientRect();

      editorElem.style.top = `${rect.bottom + 8 + window.scrollY}px`;
      editorElem.style.left = `${rect.left + window.scrollX}px`;
    }
  }, [editor]);

  const $updateLinkEditor = useCallback(() => {
    const selection = $getSelection();
    if ($isRangeSelection(selection)) {
      const node = getSelectedNode(selection);
      const linkParent = $findMatchingParent(node, $isLinkNode);

      if (linkParent) {
        setLinkUrl(linkParent.getURL());
        setIsVisible(true);
      } else if ($isLinkNode(node)) {
        setLinkUrl(node.getURL());
        setIsVisible(true);
      } else {
        setLinkUrl('');
        setIsVisible(false);
        setIsEditMode(false);
      }
    }

    setLastSelection(selection);
  }, []);

  // Position the editor after it becomes visible
  useEffect(() => {
    if (isVisible) {
      requestAnimationFrame(() => {
        updatePosition();
      });
    }
  }, [isVisible, linkUrl, updatePosition]);

  useEffect(() => {
    return mergeRegister(
      editor.registerUpdateListener(() => {
        editor.read(() => {
          $updateLinkEditor();
        });
      }),
      editor.registerCommand(
        SELECTION_CHANGE_COMMAND,
        () => {
          $updateLinkEditor();
          requestAnimationFrame(() => {
            updatePosition();
          });
          return true;
        },
        COMMAND_PRIORITY_LOW,
      ),
      editor.registerCommand(
        KEY_ESCAPE_COMMAND,
        () => {
          if (isVisible) {
            setIsVisible(false);
            setIsEditMode(false);
            return true;
          }
          return false;
        },
        COMMAND_PRIORITY_LOW,
      ),
    );
  }, [editor, $updateLinkEditor, updatePosition, isVisible]);

  useEffect(() => {
    if (isEditMode && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isEditMode]);

  const monitorInputInteraction = (
    event: React.KeyboardEvent<HTMLInputElement>,
  ) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      handleLinkSubmission();
    } else if (event.key === 'Escape') {
      event.preventDefault();
      setIsEditMode(false);
    }
  };

  const handleLinkSubmission = () => {
    if (lastSelection !== null) {
      if (editedLinkUrl !== '') {
        editor.update(() => {
          const selection = $getSelection();
          if ($isRangeSelection(selection)) {
            const node = getSelectedNode(selection);
            const linkParent = $findMatchingParent(node, $isLinkNode);
            if (linkParent) {
              linkParent.setURL(sanitizeUrl(editedLinkUrl));
            } else if ($isLinkNode(node)) {
              node.setURL(sanitizeUrl(editedLinkUrl));
            }
          }
        });
      }
      setIsEditMode(false);
    }
  };

  const handleRemoveLink = () => {
    editor.dispatchCommand(TOGGLE_LINK_COMMAND, null);
    setIsVisible(false);
    setIsEditMode(false);
  };

  if (!isVisible) return null;

  return createPortal(
    <div ref={editorRef} className="rte-link-editor">
      {isEditMode ? (
        <input
          ref={inputRef}
          className="rte-link-editor-input"
          value={editedLinkUrl}
          onChange={(e) => setEditedLinkUrl(e.target.value)}
          onKeyDown={monitorInputInteraction}
          placeholder="Enter URL..."
        />
      ) : (
        <a
          href={sanitizeUrl(linkUrl)}
          target="_blank"
          rel="noopener noreferrer">
          {linkUrl}
        </a>
      )}
      <div className="rte-link-editor-actions">
        {isEditMode ? (
          <button
            type="button"
            className="rte-link-editor-btn"
            onClick={handleLinkSubmission}
            aria-label="Confirm link"
            title="Confirm">
            ✓
          </button>
        ) : (
          <>
            <button
              type="button"
              className="rte-link-editor-btn"
              onClick={() => {
                setEditedLinkUrl(linkUrl);
                setIsEditMode(true);
              }}
              aria-label="Edit link"
              title="Edit">
              ✎
            </button>
            <button
              type="button"
              className="rte-link-editor-btn rte-link-editor-btn--remove"
              onClick={handleRemoveLink}
              aria-label="Remove link"
              title="Remove link">
              ✕
            </button>
          </>
        )}
      </div>
    </div>,
    anchorElem,
  );
}

export default function FloatingLinkEditorPlugin({
  anchorElem = document.body,
}: {
  anchorElem?: HTMLElement;
}) {
  const [editor] = useLexicalComposerContext();
  return <FloatingLinkEditor editor={editor} anchorElem={anchorElem} />;
}
