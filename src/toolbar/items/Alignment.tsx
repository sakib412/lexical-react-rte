import {
  FORMAT_ELEMENT_COMMAND,
  INDENT_CONTENT_COMMAND,
  OUTDENT_CONTENT_COMMAND,
  type ElementFormatType,
} from 'lexical';

import {useToolbarState} from '../../context/ToolbarContext';
import DropDown, {DropDownItem} from '../../ui/DropDown';
import {
  IconAlignCenter,
  IconAlignJustify,
  IconAlignLeft,
  IconAlignRight,
  IconIndent,
  IconOutdent,
} from '../../ui/icons';

const ELEMENT_FORMAT_OPTIONS: {
  [key in ElementFormatType]: {icon: React.ReactNode; label: string};
} = {
  left: {icon: <IconAlignLeft />, label: 'Left Align'},
  center: {icon: <IconAlignCenter />, label: 'Center Align'},
  right: {icon: <IconAlignRight />, label: 'Right Align'},
  justify: {icon: <IconAlignJustify />, label: 'Justify Align'},
  start: {icon: <IconAlignLeft />, label: 'Start Align'},
  end: {icon: <IconAlignRight />, label: 'End Align'},
  '': {icon: <IconAlignLeft />, label: 'Left Align'},
};

export default function Alignment({className}: {className?: string}) {
  const {state} = useToolbarState();
  const {activeEditor, elementFormat, isEditable, isRTL} = state;

  const currentFormat = ELEMENT_FORMAT_OPTIONS[elementFormat || 'left'];

  return (
    <DropDown
      disabled={!isEditable}
      buttonClassName={`rte-toolbar-dropdown-btn ${className || ''}`.trim()}
      buttonLabel={currentFormat.label}
      buttonAriaLabel="Text alignment">
      <DropDownItem
        className={`rte-dropdown-item ${elementFormat === 'left' ? 'rte-dropdown-item--active' : ''}`}
        onClick={() => activeEditor?.dispatchCommand(FORMAT_ELEMENT_COMMAND, 'left')}>
        <IconAlignLeft /> <span className="rte-dropdown-item-text">Left Align</span>
      </DropDownItem>
      <DropDownItem
        className={`rte-dropdown-item ${elementFormat === 'center' ? 'rte-dropdown-item--active' : ''}`}
        onClick={() => activeEditor?.dispatchCommand(FORMAT_ELEMENT_COMMAND, 'center')}>
        <IconAlignCenter /> <span className="rte-dropdown-item-text">Center Align</span>
      </DropDownItem>
      <DropDownItem
        className={`rte-dropdown-item ${elementFormat === 'right' ? 'rte-dropdown-item--active' : ''}`}
        onClick={() => activeEditor?.dispatchCommand(FORMAT_ELEMENT_COMMAND, 'right')}>
        <IconAlignRight /> <span className="rte-dropdown-item-text">Right Align</span>
      </DropDownItem>
      <DropDownItem
        className={`rte-dropdown-item ${elementFormat === 'justify' ? 'rte-dropdown-item--active' : ''}`}
        onClick={() => activeEditor?.dispatchCommand(FORMAT_ELEMENT_COMMAND, 'justify')}>
        <IconAlignJustify /> <span className="rte-dropdown-item-text">Justify Align</span>
      </DropDownItem>
      <DropDownItem
        className="rte-dropdown-item"
        onClick={() => activeEditor?.dispatchCommand(OUTDENT_CONTENT_COMMAND, undefined)}>
        {isRTL ? <IconIndent /> : <IconOutdent />} <span className="rte-dropdown-item-text">Outdent</span>
      </DropDownItem>
      <DropDownItem
        className="rte-dropdown-item"
        onClick={() => activeEditor?.dispatchCommand(INDENT_CONTENT_COMMAND, undefined)}>
        {isRTL ? <IconOutdent /> : <IconIndent />} <span className="rte-dropdown-item-text">Indent</span>
      </DropDownItem>
    </DropDown>
  );
}
