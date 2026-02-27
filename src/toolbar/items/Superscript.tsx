import {FORMAT_TEXT_COMMAND} from 'lexical';

import {useToolbarState} from '../../context/ToolbarContext';
import {IconSuperscript} from '../../ui/icons';

export default function Superscript({className}: {className?: string}) {
  const {state} = useToolbarState();

  return (
    <button
      type="button"
      disabled={!state.isEditable}
      className={`rte-toolbar-item ${state.isSuperscript ? 'rte-toolbar-item--active' : ''} ${className || ''}`.trim()}
      onClick={() =>
        state.activeEditor?.dispatchCommand(FORMAT_TEXT_COMMAND, 'superscript')
      }
      title="Superscript"
      aria-label="Format superscript"
      aria-pressed={state.isSuperscript}>
      <IconSuperscript />
    </button>
  );
}
