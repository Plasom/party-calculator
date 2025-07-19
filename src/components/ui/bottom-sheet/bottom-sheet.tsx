'use client';

import { useEffect } from 'react';
import { Button } from '../button';

interface BottomSheetProps {
    isOpen: boolean;
    onClose: () => void;
    title?: string;
    description?: string;
    children: React.ReactNode;
    showHandle?: boolean;
    maxWidth?: string;
    isTransparent?: boolean;
    button?: 'cancel' | 'hidden';
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
    button = 'cancel'
}: BottomSheetProps) {

    const buttonGroup = {
        cancel: (
            <Button
                type="secondary"
                size="sm"
                label="Cancel"
                onClick={onClose}
                className="text-gray-500 hover:text-gray-700"
                fontSize="font-semibold"
            />
        ),
        hidden: null
    }
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }

        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isOpen]);

    const handleBackdropClick = (e: React.MouseEvent) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    if (!isOpen) return null;

    return (
        <div
            className="fixed inset-0 z-99 bg-black/50 flex items-end justify-center"
            onClick={handleBackdropClick}
        >
            <div
                className={`${isTransparent ? 'bg-transparent' : 'bg-white'} rounded-t-3xl w-full ${maxWidth} px-6 pb-6 pt-3 transform transition-transform duration-300 ease-out ${isOpen ? 'animate-slide-up' : 'animate-slide-down'
                    }`}
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
        </div>
    );
}


