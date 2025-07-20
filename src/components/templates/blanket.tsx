export function Blanket({
    children,
    itemAlignment = 'center',
    onClose
}: {
    children: React.ReactElement | React.ReactElement[];
    itemAlignment?: 'start' | 'center' | 'end';
    onClose?: () => void;
}) {
    const handleBackdropClick = (e: React.MouseEvent) => {
        if (e.target === e.currentTarget) {
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