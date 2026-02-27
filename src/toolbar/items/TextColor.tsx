import {$getSelection, $isRangeSelection} from 'lexical';

import {$patchStyleText} from '@lexical/selection';

import {useToolbarState} from '../../context/ToolbarContext';
import DropdownColorPicker from '../../ui/DropdownColorPicker';
import {IconFontColor} from '../../ui/icons';

export default function TextColor({className}: {className?: string}) {
  const {state} = useToolbarState();

  const onColorChange = (color: string) => {
    state.activeEditor?.update(() => {
      const selection = $getSelection();
      if ($isRangeSelection(selection)) {
        $patchStyleText(selection, {color});
      }
    });
  };

  return (
    <DropdownColorPicker
      disabled={!state.isEditable}
      buttonClassName={`rte-toolbar-item rte-toolbar-color-swatch ${className || ''}`.trim()}
      buttonAriaLabel="Font color"
      buttonIcon={
        <>
          <IconFontColor />
          <span
            className="rte-toolbar-color-indicator"
            style={{backgroundColor: state.fontColor}}
          />
        </>
      }
      color={state.fontColor}
      onChange={onColorChange}
      title="Font color"
    />
  );
}
