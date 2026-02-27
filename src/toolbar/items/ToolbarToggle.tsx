import type {ToolbarToggleProps} from '../../types';

export default function ToolbarToggle({
  onClick,
  icon,
  children,
  className,
  disabled,
  title,
  active,
  'aria-label': ariaLabel,
}: ToolbarToggleProps) {
  return (
    <button
      type="button"
      className={`rte-toolbar-item ${active ? 'rte-toolbar-item--active' : ''} ${className || ''}`.trim()}
      onClick={onClick}
      disabled={disabled}
      title={title}
      aria-label={ariaLabel || title}
      aria-pressed={active}>
      {icon}
      {children}
    </button>
  );
}
