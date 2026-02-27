import type {ReactNode} from 'react';

interface PlaceholderProps {
  children?: ReactNode;
  className?: string;
}

export default function Placeholder({children, className}: PlaceholderProps) {
  return (
    <div className={className || 'rte-placeholder'}>
      {children || 'Enter some text...'}
    </div>
  );
}
