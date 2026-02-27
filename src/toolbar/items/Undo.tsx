import {UNDO_COMMAND} from 'lexical';

import {useToolbarState} from '../../context/ToolbarContext';
import {IconUndo} from '../../ui/icons';

export default function Undo({className}: {className?: string}) {
  const {state} = useToolbarState();

  return (
    <button
      type="button"
      disabled={!state.canUndo || !state.isEditable}
      className={`rte-toolbar-item ${className || ''}`.trim()}
      onClick={() =>
        state.activeEditor?.dispatchCommand(UNDO_COMMAND, undefined)
      }
      title="Undo (Ctrl+Z)"
      aria-label="Undo">
      <IconUndo />
    </button>
  );
}
