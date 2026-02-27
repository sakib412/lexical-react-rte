import {FORMAT_TEXT_COMMAND} from 'lexical';

import {useToolbarState} from '../../context/ToolbarContext';
import {IconCode} from '../../ui/icons';

export default function Code({className}: {className?: string}) {
  const {state} = useToolbarState();

  return (
    <button
      type="button"
      disabled={!state.isEditable}
      className={`rte-toolbar-item ${state.isCode ? 'rte-toolbar-item--active' : ''} ${className || ''}`.trim()}
      onClick={() => state.activeEditor?.dispatchCommand(FORMAT_TEXT_COMMAND, 'code')}
      title="Inline code"
      aria-label="Format code"
      aria-pressed={state.isCode}>
      <IconCode />
    </button>
  );
}
