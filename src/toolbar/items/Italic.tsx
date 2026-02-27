import {FORMAT_TEXT_COMMAND} from 'lexical';

import {useToolbarState} from '../../context/ToolbarContext';
import {IS_APPLE} from '../../shared/environment';
import {IconItalic} from '../../ui/icons';

export default function Italic({className}: {className?: string}) {
  const {state} = useToolbarState();

  return (
    <button
      type="button"
      disabled={!state.isEditable}
      className={`rte-toolbar-item ${state.isItalic ? 'rte-toolbar-item--active' : ''} ${className || ''}`.trim()}
      onClick={() =>
        state.activeEditor?.dispatchCommand(FORMAT_TEXT_COMMAND, 'italic')
      }
      title={IS_APPLE ? 'Italic (⌘I)' : 'Italic (Ctrl+I)'}
      aria-label="Format italic"
      aria-pressed={state.isItalic}>
      <IconItalic />
    </button>
  );
}
