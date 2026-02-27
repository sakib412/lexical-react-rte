import {$getSelection, $isRangeSelection} from 'lexical';
import {$patchStyleText} from '@lexical/selection';
import {useCallback, useEffect, useState} from 'react';

import {useToolbarState} from '../../context/ToolbarContext';
import {IconMinus, IconPlus} from '../../ui/icons';

const MIN_FONT_SIZE = 8;
const MAX_FONT_SIZE = 72;

export default function FontSize({className}: {className?: string}) {
  const {state} = useToolbarState();
  const [inputValue, setInputValue] = useState(
    state.fontSize.replace('px', ''),
  );

  useEffect(() => {
    setInputValue(state.fontSize.replace('px', ''));
  }, [state.fontSize]);

  const updateFontSize = useCallback(
    (newSize: number) => {
      const clamped = Math.max(MIN_FONT_SIZE, Math.min(MAX_FONT_SIZE, newSize));
      state.activeEditor?.update(() => {
        const selection = $getSelection();
        if ($isRangeSelection(selection)) {
          $patchStyleText(selection, {'font-size': `${clamped}px`});
        }
      });
    },
    [state.activeEditor],
  );

  const currentSize = parseInt(state.fontSize) || 15;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setInputValue(val);
  };

  const handleInputBlur = () => {
    const parsed = parseInt(inputValue);
    if (!isNaN(parsed)) {
      updateFontSize(parsed);
    } else {
      setInputValue(state.fontSize.replace('px', ''));
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleInputBlur();
    }
  };

  return (
    <div className={`rte-toolbar-font-size ${className || ''}`.trim()}>
      <button
        type="button"
        disabled={!state.isEditable || currentSize <= MIN_FONT_SIZE}
        onClick={() => updateFontSize(currentSize - 1)}
        aria-label="Decrease font size"
        title="Decrease font size">
        <IconMinus width={14} height={14} />
      </button>
      <input
        type="text"
        value={inputValue}
        disabled={!state.isEditable}
        onChange={handleInputChange}
        onBlur={handleInputBlur}
        onKeyDown={handleKeyDown}
        aria-label="Font size"
      />
      <button
        type="button"
        disabled={!state.isEditable || currentSize >= MAX_FONT_SIZE}
        onClick={() => updateFontSize(currentSize + 1)}
        aria-label="Increase font size"
        title="Increase font size">
        <IconPlus width={14} height={14} />
      </button>
    </div>
  );
}
