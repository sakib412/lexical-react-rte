import { FC } from "react";

export interface EditorProps {
  text: string
}

const Editor: FC<EditorProps> = ({ text }) => {
  return <div>{text}</div>;
}

export default Editor;
