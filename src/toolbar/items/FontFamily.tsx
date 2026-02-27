import {$getSelection, $isRangeSelection} from 'lexical';

import {$patchStyleText} from '@lexical/selection';

import {useToolbarState} from '../../context/ToolbarContext';
import DropDown, {DropDownItem} from '../../ui/DropDown';

const FONT_FAMILY_OPTIONS: [string, string][] = [
  ['Arial', 'Arial'],
  ['Courier New', 'Courier New'],
  ['Georgia', 'Georgia'],
  ['Times New Roman', 'Times New Roman'],
  ['Trebuchet MS', 'Trebuchet MS'],
  ['Verdana', 'Verdana'],
];

export default function FontFamily({className}: {className?: string}) {
  const {state} = useToolbarState();

  const onFontFamilySelect = (fontFamily: string) => {
    state.activeEditor?.update(() => {
      const selection = $getSelection();
      if ($isRangeSelection(selection)) {
        $patchStyleText(selection, {'font-family': fontFamily});
      }
    });
  };

  return (
    <DropDown
      disabled={!state.isEditable}
      buttonClassName={`rte-toolbar-dropdown-btn ${className || ''}`.trim()}
      buttonLabel={state.fontFamily}
      buttonAriaLabel="Font family">
      {FONT_FAMILY_OPTIONS.map(([option, label]) => (
        <DropDownItem
          className={`rte-dropdown-item ${state.fontFamily === option ? 'rte-dropdown-item--active' : ''}`}
          onClick={() => onFontFamilySelect(option)}
          key={option}>
          <span className="rte-dropdown-item-text" style={{fontFamily: option}}>
            {label}
          </span>
        </DropDownItem>
      ))}
    </DropDown>
  );
}
