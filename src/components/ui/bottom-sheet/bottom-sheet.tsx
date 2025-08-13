'use client';

import { Button } from '../button';
import { Blanket } from '@/components/templates/blanket';

interface BottomSheetProps extends React.HTMLAttributes<HTMLDivElement> {
    isOpen: boolean;
    onClose?: () => void;
    title?: string;
    description?: string;
    children: React.ReactNode;
    showHandle?: boolean;
    maxWidth?: string;
    isTransparent?: boolean;
    button?: 'cancel' | 'hidden';
    disableBackground?: boolean;
}

export function BottomSheet({
    isOpen,
    onClose,
    title,
    description,
    children,
    showHandle = true,
    maxWidth = "max-w-md",
    isTransparent = false,
    button = 'cancel',
    disableBackground = false,
    ...props
}: BottomSheetProps) {

    const buttonGroup = {
        cancel: (
            <Button
                type="secondary"
                label="Cancel"
                onClick={onClose!}
                fontSize="font-medium"
                textSize="text-sm"
            />
        ),
        hidden: null
    }

    if (!isOpen) return null;

    return (
        <Blanket onClose={onClose} itemAlignment="end" disableBackground={disableBackground}>
            <div
                className={`${isTransparent ? 'bg-transparent' : 'bg-zinc-100'} flex-1 rounded-t-3xl w-full ${maxWidth} px-4 pb-6 pt-[6px] transform transition-transform ease-out ${isOpen ? 'animate-slide-up' : 'animate-slide-down'}`}
                style={{ transitionDuration: 'var(--transition-duration)' }}
                {...props}
            >
                {/* Handle bar */}
                {showHandle && (
                    <div className="w-12 h-1 bg-gray-300 rounded-full mx-auto mb-4" />
                )}

                <div className="flex flex-row w-full justify-between">
                    {/* Header */}
                    {(title || description) && (
                        <div className="mb-4">
                            {title && (
                                <h2 className="text-2xl font-semibold text-gray-900">
                                    {title}
                                </h2>
                            )}
                            {description && (
                                <p className="text-gray-500 text-sm mt-1">
                                    {description}
                                </p>
                            )}
                        </div>
                    )}
                    {buttonGroup[button]}
                </div>

                {/* Content */}
                {children}
            </div>
        </Blanket>
    );
}


