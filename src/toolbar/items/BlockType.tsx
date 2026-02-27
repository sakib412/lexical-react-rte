import {$createCodeNode} from '@lexical/code';
import {
  INSERT_CHECK_LIST_COMMAND,
  INSERT_ORDERED_LIST_COMMAND,
  INSERT_UNORDERED_LIST_COMMAND,
} from '@lexical/list';
import {$createHeadingNode, $createQuoteNode} from '@lexical/rich-text';
import {$setBlocksType} from '@lexical/selection';
import {$createParagraphNode, $getSelection, $isRangeSelection} from 'lexical';

import {useToolbarState} from '../../context/ToolbarContext';
import {blockTypeToBlockName, type BlockType as BlockTypeEnum} from '../../types';
import DropDown, {DropDownItem} from '../../ui/DropDown';
import {
  IconCodeBlock,
  IconHeading1,
  IconHeading2,
  IconHeading3,
  IconListBullet,
  IconListCheck,
  IconListNumber,
  IconParagraph,
  IconQuote,
} from '../../ui/icons';

const blockTypeIcons: Partial<Record<BlockTypeEnum, React.ReactNode>> = {
  paragraph: <IconParagraph />,
  h1: <IconHeading1 />,
  h2: <IconHeading2 />,
  h3: <IconHeading3 />,
  bullet: <IconListBullet />,
  number: <IconListNumber />,
  check: <IconListCheck />,
  quote: <IconQuote />,
  code: <IconCodeBlock />,
};

export default function BlockType({className}: {className?: string}) {
  const {state} = useToolbarState();
  const {activeEditor, blockType, isEditable} = state;

  const formatParagraph = () => {
    activeEditor?.update(() => {
      const selection = $getSelection();
      if ($isRangeSelection(selection)) {
        $setBlocksType(selection, () => $createParagraphNode());
      }
    });
  };

  const formatHeading = (headingSize: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6') => {
    if (blockType !== headingSize) {
      activeEditor?.update(() => {
        const selection = $getSelection();
        if ($isRangeSelection(selection)) {
          $setBlocksType(selection, () => $createHeadingNode(headingSize));
        }
      });
    }
  };

  const formatQuote = () => {
    if (blockType !== 'quote') {
      activeEditor?.update(() => {
        const selection = $getSelection();
        if ($isRangeSelection(selection)) {
          $setBlocksType(selection, () => $createQuoteNode());
        }
      });
    }
  };

  const formatCode = () => {
    if (blockType !== 'code') {
      activeEditor?.update(() => {
        let selection = $getSelection();
        if (selection !== null) {
          if (selection.isCollapsed()) {
            $setBlocksType(selection, () => $createCodeNode());
          } else {
            const textContent = selection.getTextContent();
            const codeNode = $createCodeNode();
            selection.insertNodes([codeNode]);
            selection = $getSelection();
            if ($isRangeSelection(selection)) {
              selection.insertRawText(textContent);
            }
          }
        }
      });
    }
  };

  return (
    <DropDown
      disabled={!isEditable}
      buttonClassName={`rte-toolbar-dropdown-btn ${className || ''}`.trim()}
      buttonLabel={blockTypeToBlockName[blockType] || 'Normal'}
      buttonAriaLabel="Block type">
      <DropDownItem
        className={`rte-dropdown-item ${blockType === 'paragraph' ? 'rte-dropdown-item--active' : ''}`}
        onClick={formatParagraph}>
        <span className="rte-dropdown-item-icon">{blockTypeIcons.paragraph}</span>
        <span className="rte-dropdown-item-text">Normal</span>
      </DropDownItem>
      <DropDownItem
        className={`rte-dropdown-item ${blockType === 'h1' ? 'rte-dropdown-item--active' : ''}`}
        onClick={formatHeading.bind(null, 'h1')}>
        <span className="rte-dropdown-item-icon">{blockTypeIcons.h1}</span>
        <span className="rte-dropdown-item-text">Heading 1</span>
      </DropDownItem>
      <DropDownItem
        className={`rte-dropdown-item ${blockType === 'h2' ? 'rte-dropdown-item--active' : ''}`}
        onClick={formatHeading.bind(null, 'h2')}>
        <span className="rte-dropdown-item-icon">{blockTypeIcons.h2}</span>
        <span className="rte-dropdown-item-text">Heading 2</span>
      </DropDownItem>
      <DropDownItem
        className={`rte-dropdown-item ${blockType === 'h3' ? 'rte-dropdown-item--active' : ''}`}
        onClick={formatHeading.bind(null, 'h3')}>
        <span className="rte-dropdown-item-icon">{blockTypeIcons.h3}</span>
        <span className="rte-dropdown-item-text">Heading 3</span>
      </DropDownItem>
      <DropDownItem
        className={`rte-dropdown-item ${blockType === 'bullet' ? 'rte-dropdown-item--active' : ''}`}
        onClick={() => activeEditor?.dispatchCommand(INSERT_UNORDERED_LIST_COMMAND, undefined)}>
        <span className="rte-dropdown-item-icon">{blockTypeIcons.bullet}</span>
        <span className="rte-dropdown-item-text">Bulleted List</span>
      </DropDownItem>
      <DropDownItem
        className={`rte-dropdown-item ${blockType === 'number' ? 'rte-dropdown-item--active' : ''}`}
        onClick={() => activeEditor?.dispatchCommand(INSERT_ORDERED_LIST_COMMAND, undefined)}>
        <span className="rte-dropdown-item-icon">{blockTypeIcons.number}</span>
        <span className="rte-dropdown-item-text">Numbered List</span>
      </DropDownItem>
      <DropDownItem
        className={`rte-dropdown-item ${blockType === 'check' ? 'rte-dropdown-item--active' : ''}`}
        onClick={() => activeEditor?.dispatchCommand(INSERT_CHECK_LIST_COMMAND, undefined)}>
        <span className="rte-dropdown-item-icon">{blockTypeIcons.check}</span>
        <span className="rte-dropdown-item-text">Check List</span>
      </DropDownItem>
      <DropDownItem
        className={`rte-dropdown-item ${blockType === 'quote' ? 'rte-dropdown-item--active' : ''}`}
        onClick={formatQuote}>
        <span className="rte-dropdown-item-icon">{blockTypeIcons.quote}</span>
        <span className="rte-dropdown-item-text">Quote</span>
      </DropDownItem>
      <DropDownItem
        className={`rte-dropdown-item ${blockType === 'code' ? 'rte-dropdown-item--active' : ''}`}
        onClick={formatCode}>
        <span className="rte-dropdown-item-icon">{blockTypeIcons.code}</span>
        <span className="rte-dropdown-item-text">Code Block</span>
      </DropDownItem>
    </DropDown>
  );
}
