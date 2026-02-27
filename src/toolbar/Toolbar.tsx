import type {ReactNode} from 'react';

import ToolbarPlugin from '../plugins/ToolbarPlugin';

// Items
import Alignment from './items/Alignment';
import BackgroundColor from './items/BackgroundColor';
import BlockType from './items/BlockType';
import Bold from './items/Bold';
import ClearFormatting from './items/ClearFormatting';
import Code from './items/Code';
import FontFamily from './items/FontFamily';
import FontSize from './items/FontSize';
import Highlight from './items/Highlight';
import InsertHorizontalRule from './items/InsertHorizontalRule';
import Italic from './items/Italic';
import Link from './items/Link';
import Redo from './items/Redo';
import Separator from './items/Separator';
import Strikethrough from './items/Strikethrough';
import Subscript from './items/Subscript';
import Superscript from './items/Superscript';
import TextColor from './items/TextColor';
import ToolbarButton from './items/ToolbarButton';
import ToolbarToggle from './items/ToolbarToggle';
import Underline from './items/Underline';
import Undo from './items/Undo';

// Groups
import AlignFormat from './groups/AlignFormat';
import BlockFormat from './groups/BlockFormat';
import ColorFormat from './groups/ColorFormat';
import FontFormat from './groups/FontFormat';
import History from './groups/History';
import InsertGroup from './groups/InsertGroup';
import TextFormat from './groups/TextFormat';

// Default
import DefaultToolbar from './DefaultToolbar';

import './Toolbar.css';

interface ToolbarProps {
  children?: ReactNode;
  className?: string;
}

function Toolbar({children, className}: ToolbarProps) {
  return (
    <>
      <div className={`rte-toolbar ${className || ''}`.trim()}>
        {children ?? <DefaultToolbar />}
      </div>
      <ToolbarPlugin />
    </>
  );
}

// Individual items
Toolbar.Undo = Undo;
Toolbar.Redo = Redo;
Toolbar.Bold = Bold;
Toolbar.Italic = Italic;
Toolbar.Underline = Underline;
Toolbar.Strikethrough = Strikethrough;
Toolbar.Code = Code;
Toolbar.Highlight = Highlight;
Toolbar.Subscript = Subscript;
Toolbar.Superscript = Superscript;
Toolbar.Link = Link;
Toolbar.ClearFormatting = ClearFormatting;
Toolbar.BlockType = BlockType;
Toolbar.FontFamily = FontFamily;
Toolbar.FontSize = FontSize;
Toolbar.TextColor = TextColor;
Toolbar.BackgroundColor = BackgroundColor;
Toolbar.Alignment = Alignment;
Toolbar.InsertHorizontalRule = InsertHorizontalRule;
Toolbar.Separator = Separator;
Toolbar.Button = ToolbarButton;
Toolbar.Toggle = ToolbarToggle;

// Preset groups
Toolbar.History = History;
Toolbar.TextFormat = TextFormat;
Toolbar.BlockFormat = BlockFormat;
Toolbar.ColorFormat = ColorFormat;
Toolbar.FontFormat = FontFormat;
Toolbar.AlignFormat = AlignFormat;
Toolbar.InsertGroup = InsertGroup;

export {Toolbar};
