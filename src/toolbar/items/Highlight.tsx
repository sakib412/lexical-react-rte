import {FORMAT_TEXT_COMMAND} from 'lexical';

import {useToolbarState} from '../../context/ToolbarContext';
import {IconHighlight} from '../../ui/icons';

export default function Highlight({className}: {className?: string}) {
  const {state} = useToolbarState();

  return (
    <button
      type="button"
      disabled={!state.isEditable}
      className={`rte-toolbar-item ${state.isHighlight ? 'rte-toolbar-item--active' : ''} ${className || ''}`.trim()}
      onClick={() =>
        state.activeEditor?.dispatchCommand(FORMAT_TEXT_COMMAND, 'highlight')
      }
      title="Highlight"
      aria-label="Format highlight"
      aria-pressed={state.isHighlight}>
      <IconHighlight />
    </button>
  );
}
