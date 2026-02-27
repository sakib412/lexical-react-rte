import {FORMAT_TEXT_COMMAND} from 'lexical';

import {useToolbarState} from '../../context/ToolbarContext';
import {IconSubscript} from '../../ui/icons';

export default function Subscript({className}: {className?: string}) {
  const {state} = useToolbarState();

  return (
    <button
      type="button"
      disabled={!state.isEditable}
      className={`rte-toolbar-item ${state.isSubscript ? 'rte-toolbar-item--active' : ''} ${className || ''}`.trim()}
      onClick={() =>
        state.activeEditor?.dispatchCommand(FORMAT_TEXT_COMMAND, 'subscript')
      }
      title="Subscript"
      aria-label="Format subscript"
      aria-pressed={state.isSubscript}>
      <IconSubscript />
    </button>
  );
}
