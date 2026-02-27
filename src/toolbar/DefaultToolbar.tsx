import AlignFormat from './groups/AlignFormat';
import BlockFormat from './groups/BlockFormat';
import ColorFormat from './groups/ColorFormat';
import FontFormat from './groups/FontFormat';
import History from './groups/History';
import InsertGroup from './groups/InsertGroup';
import TextFormat from './groups/TextFormat';
import ClearFormatting from './items/ClearFormatting';
import Separator from './items/Separator';

export default function DefaultToolbar() {
  return (
    <>
      <History />
      <Separator />
      <BlockFormat />
      <Separator />
      <FontFormat />
      <Separator />
      <TextFormat />
      <Separator />
      <ColorFormat />
      <Separator />
      <InsertGroup />
      <Separator />
      <AlignFormat />
      <Separator />
      <ClearFormatting />
    </>
  );
}
