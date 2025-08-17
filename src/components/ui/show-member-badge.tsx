export function ShowMemberBadge({
  className,
  leftIcon,
  isSelected = false,
  memberName,

}: {
  className?: string;
  leftIcon?: string;
  isSelected?: boolean;
  memberName?: string;
  memberPrice?: string;
  label?: string;
  onClick?: () => void;
}) {
  return (
    <span
    className={
        `inline-flex items-center justify-center rounded-xl border px-1.5 py-2 text-sm font-normal w-fit gap-1 bg-[var(--tag-tertiary-bg)] border-[var(--tag-tertiary-border)] text-[var(--tag-tertiary-first-text)] overflow-hidden${className ? ` ${className}` : ''}`
      }
    >
      {leftIcon && (
        <span className="material-symbols-rounded" style={{ fontSize: 20 }}>
          {leftIcon}
        </span>
      )}
      {isSelected && (
        <span className="material-symbols-rounded" style={{ fontSize: 20 }}>
          check
        </span>
      )}
      {memberName && <span>{memberName}</span>}
    </span>
  );
}
