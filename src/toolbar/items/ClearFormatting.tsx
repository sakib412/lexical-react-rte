import {$getSelection, $isRangeSelection, $isTextNode} from 'lexical';

import {useToolbarState} from '../../context/ToolbarContext';
import {IconClearFormatting} from '../../ui/icons';

export default function ClearFormatting({className}: {className?: string}) {
  const {state} = useToolbarState();

  const clearFormatting = () => {
    state.activeEditor?.update(() => {
      const selection = $getSelection();
      if ($isRangeSelection(selection)) {
        const nodes = selection.getNodes();
        for (const node of nodes) {
          if ($isTextNode(node)) {
            node.setFormat(0);
            node.setStyle('');
          }
        }
      }
    });
  };

  return (
    <button
      type="button"
      disabled={!state.isEditable}
      className={`rte-toolbar-item ${className || ''}`.trim()}
      onClick={clearFormatting}
      title="Clear formatting"
      aria-label="Clear formatting">
      <IconClearFormatting />
    </button>
  );
}
