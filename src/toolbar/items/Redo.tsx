import {REDO_COMMAND} from 'lexical';

import {useToolbarState} from '../../context/ToolbarContext';
import {IconRedo} from '../../ui/icons';

export default function Redo({className}: {className?: string}) {
  const {state} = useToolbarState();

  return (
    <button
      type="button"
      disabled={!state.canRedo || !state.isEditable}
      className={`rte-toolbar-item ${className || ''}`.trim()}
      onClick={() => state.activeEditor?.dispatchCommand(REDO_COMMAND, undefined)}
      title="Redo (Ctrl+Y)"
      aria-label="Redo">
      <IconRedo />
    </button>
  );
}
