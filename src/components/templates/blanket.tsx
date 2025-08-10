export function Blanket({
    children,
    itemAlignment = 'center',
    onClose,
    disableClose = false
}: {
    children: React.ReactElement | React.ReactElement[];
    itemAlignment?: 'start' | 'center' | 'end';
    onClose?: () => void;
    disableClose?: boolean;
}) {
    const handleBackdropClick = (e: React.MouseEvent) => {
        if (e.target === e.currentTarget && !disableClose) {
            onClose?.();
        }
    };
    return (
        <div className={`fixed inset-0 z-99 bg-black/50 flex items-${itemAlignment} justify-center`}
        onClick={handleBackdropClick}>
            {children}
        </div>
    )
}