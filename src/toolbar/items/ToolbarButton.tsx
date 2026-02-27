import type {ToolbarButtonProps} from '../../types';

export default function ToolbarButton({
  onClick,
  icon,
  children,
  className,
  disabled,
  title,
  'aria-label': ariaLabel,
}: ToolbarButtonProps) {
  return (
    <button
      type="button"
      className={`rte-toolbar-item ${className || ''}`.trim()}
      onClick={onClick}
      disabled={disabled}
      title={title}
      aria-label={ariaLabel || title}>
      {icon}
      {children}
    </button>
  );
}
