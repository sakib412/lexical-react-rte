import {TOGGLE_LINK_COMMAND} from '@lexical/link';
import {$getSelection, $isRangeSelection} from 'lexical';

import {useToolbarState} from '../../context/ToolbarContext';
import {IS_APPLE} from '../../shared/environment';
import {IconLink} from '../../ui/icons';
import {sanitizeUrl} from '../../utils/url';

export default function Link({className}: {className?: string}) {
  const {state} = useToolbarState();

  const insertLink = () => {
    if (!state.activeEditor) return;

    if (!state.isLink) {
      state.activeEditor.update(() => {
        const selection = $getSelection();
        if ($isRangeSelection(selection)) {
          state.activeEditor?.dispatchCommand(TOGGLE_LINK_COMMAND, sanitizeUrl('https://'));
        }
      });
    } else {
      state.activeEditor.dispatchCommand(TOGGLE_LINK_COMMAND, null);
    }
  };

  return (
    <button
      type="button"
      disabled={!state.isEditable}
      className={`rte-toolbar-item ${state.isLink ? 'rte-toolbar-item--active' : ''} ${className || ''}`.trim()}
      onClick={insertLink}
      title={IS_APPLE ? 'Insert link (⌘K)' : 'Insert link (Ctrl+K)'}
      aria-label="Insert link"
      aria-pressed={state.isLink}>
      <IconLink />
    </button>
  );
}
