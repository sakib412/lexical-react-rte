import Bold from '../items/Bold';
import Code from '../items/Code';
import Highlight from '../items/Highlight';
import Italic from '../items/Italic';
import Strikethrough from '../items/Strikethrough';
import Subscript from '../items/Subscript';
import Superscript from '../items/Superscript';
import Underline from '../items/Underline';

export default function TextFormat() {
  return (
    <>
      <Bold />
      <Italic />
      <Underline />
      <Strikethrough />
      <Code />
      <Highlight />
      <Subscript />
      <Superscript />
    </>
  );
}
