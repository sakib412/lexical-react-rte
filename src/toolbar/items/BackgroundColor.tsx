import {$getSelection, $isRangeSelection} from 'lexical';

import {$patchStyleText} from '@lexical/selection';

import {useToolbarState} from '../../context/ToolbarContext';
import DropdownColorPicker from '../../ui/DropdownColorPicker';
import {IconBgColor} from '../../ui/icons';

export default function BackgroundColor({className}: {className?: string}) {
  const {state} = useToolbarState();

  const onColorChange = (color: string) => {
    state.activeEditor?.update(() => {
      const selection = $getSelection();
      if ($isRangeSelection(selection)) {
        $patchStyleText(selection, {'background-color': color});
      }
    });
  };

  return (
    <DropdownColorPicker
      disabled={!state.isEditable}
      buttonClassName={`rte-toolbar-item rte-toolbar-color-swatch ${className || ''}`.trim()}
      buttonAriaLabel="Background color"
      buttonIcon={
        <>
          <IconBgColor />
          <span
            className="rte-toolbar-color-indicator"
            style={{backgroundColor: state.bgColor}}
          />
        </>
      }
      color={state.bgColor}
      onChange={onColorChange}
      title="Background color"
    />
  );
}
