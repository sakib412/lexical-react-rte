import {FORMAT_TEXT_COMMAND} from 'lexical';

import {useToolbarState} from '../../context/ToolbarContext';
import {IS_APPLE} from '../../shared/environment';
import {IconUnderline} from '../../ui/icons';

export default function Underline({className}: {className?: string}) {
  const {state} = useToolbarState();

  return (
    <button
      type="button"
      disabled={!state.isEditable}
      className={`rte-toolbar-item ${state.isUnderline ? 'rte-toolbar-item--active' : ''} ${className || ''}`.trim()}
      onClick={() =>
        state.activeEditor?.dispatchCommand(FORMAT_TEXT_COMMAND, 'underline')
      }
      title={IS_APPLE ? 'Underline (⌘U)' : 'Underline (Ctrl+U)'}
      aria-label="Format underline"
      aria-pressed={state.isUnderline}>
      <IconUnderline />
    </button>
  );
}
