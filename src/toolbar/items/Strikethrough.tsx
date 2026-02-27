import {FORMAT_TEXT_COMMAND} from 'lexical';

import {useToolbarState} from '../../context/ToolbarContext';
import {IconStrikethrough} from '../../ui/icons';

export default function Strikethrough({className}: {className?: string}) {
  const {state} = useToolbarState();

  return (
    <button
      type="button"
      disabled={!state.isEditable}
      className={`rte-toolbar-item ${state.isStrikethrough ? 'rte-toolbar-item--active' : ''} ${className || ''}`.trim()}
      onClick={() =>
        state.activeEditor?.dispatchCommand(
          FORMAT_TEXT_COMMAND,
          'strikethrough'
        )
      }
      title="Strikethrough"
      aria-label="Format strikethrough"
      aria-pressed={state.isStrikethrough}>
      <IconStrikethrough />
    </button>
  );
}
