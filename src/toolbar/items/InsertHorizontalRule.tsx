import {INSERT_HORIZONTAL_RULE_COMMAND} from '@lexical/react/LexicalHorizontalRuleNode';

import {useToolbarState} from '../../context/ToolbarContext';
import {IconHorizontalRule} from '../../ui/icons';

export default function InsertHorizontalRule({
  className,
}: {
  className?: string;
}) {
  const {state} = useToolbarState();

  return (
    <button
      type="button"
      disabled={!state.isEditable}
      className={`rte-toolbar-item ${className || ''}`.trim()}
      onClick={() =>
        state.activeEditor?.dispatchCommand(
          INSERT_HORIZONTAL_RULE_COMMAND,
          undefined
        )
      }
      title="Insert horizontal rule"
      aria-label="Insert horizontal rule">
      <IconHorizontalRule />
    </button>
  );
}
