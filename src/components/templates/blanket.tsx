import { useEffect } from "react";

interface BlanketProps {
    children: React.ReactElement | React.ReactElement[];
    itemAlignment?: 'start' | 'center' | 'end';
    onClose?: () => void;
    disableClose?: boolean;
    disableBackground?: boolean;
}

export function Blanket({
    children,
    itemAlignment = 'center',
    onClose,
    disableClose = false,
    disableBackground = false,
}: BlanketProps) {
    useEffect(() => {
        if (disableBackground) {
            document.body.style.overflow = 'unset';
        } else {
            document.body.style.overflow = 'hidden';
        }

        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [disableBackground, children]);

    const handleBackdropClick = (e: React.MouseEvent) => {
        if (e.target === e.currentTarget && !disableClose) {
            onClose?.();
        }
    };
    return (
        // <div className={`fixed inset-0 z-99 ${disableBackground ? 'bg-transparent' : 'bg-black/50'} flex items-${itemAlignment} justify-center`}
        // onClick={handleBackdropClick}>
        //     {children}
        // </div>
        <div
            className={`fixed inset-0 z-99 flex items-${itemAlignment} justify-center ${disableBackground
                ? 'bg-transparent pointer-events-none'
                : 'bg-black/50 pointer-events-auto'
                }`}
            onClick={disableBackground ? undefined : handleBackdropClick}
        >
            {children}
        </div>
    )
}