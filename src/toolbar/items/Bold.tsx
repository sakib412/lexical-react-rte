import {FORMAT_TEXT_COMMAND} from 'lexical';

import {useToolbarState} from '../../context/ToolbarContext';
import {IS_APPLE} from '../../shared/environment';
import {IconBold} from '../../ui/icons';

export default function Bold({className}: {className?: string}) {
  const {state} = useToolbarState();

  return (
    <button
      type="button"
      disabled={!state.isEditable}
      className={`rte-toolbar-item ${state.isBold ? 'rte-toolbar-item--active' : ''} ${className || ''}`.trim()}
      onClick={() =>
        state.activeEditor?.dispatchCommand(FORMAT_TEXT_COMMAND, 'bold')
      }
      title={IS_APPLE ? 'Bold (⌘B)' : 'Bold (Ctrl+B)'}
      aria-label="Format bold"
      aria-pressed={state.isBold}>
      <IconBold />
    </button>
  );
}
