'use client';

import { useRef } from 'react';

export function Button({
    className = '',
    label,
    rightIcon,
    leftIcon,
    onClick,
    onLongPress,
    longPressDuration = 300,
    disabled = false,
    type = 'primary',
    size = 'sm',
    fontSize = 'font-normal'
}: {
    className?: string;
    label?: string;
    rightIcon?: React.ReactNode;
    leftIcon?: React.ReactNode;
    onClick: () => void;
    onLongPress?: () => void;
    longPressDuration?: number;
    disabled?: boolean;
    type?: 'primary' | 'secondary' | 'ghost' | 'quartiary';
    size?: 'xs' | 'sm' | 'md';
    fontSize?: 'font-semibold' | 'font-normal' | 'font-bold';
}) {
    const longPressTimer = useRef<NodeJS.Timeout | null>(null);

    const handleMouseDown = () => {
        if (onLongPress && !disabled) {
            longPressTimer.current = setTimeout(() => {
                onLongPress();
            }, longPressDuration);
        }
    };

    const handleMouseUp = () => {
        if (longPressTimer.current) {
            clearTimeout(longPressTimer.current);
            longPressTimer.current = null;
        }
    };

    const handleClick = () => {
        if (!disabled) {
            onClick();
        }
    };
    const classMap = {
        primary: {
            default: 'bg-[var(--components-button-primary-state-default)]',
            hovered: 'hover:bg-[var(--components-button-primary-state-hovered)]',
            pressed: 'active:bg-[var(--components-button-primary-state-pressed)]',
            textColor: 'text-[var(--components-button-primary-text)]'
        },
        secondary: {
            default: 'bg-[var(--components-button-secondary-state-default)]',
            hovered: 'hover:bg-[var(--components-button-secondary-state-hovered)]',
            pressed: 'active:bg-[var(--components-button-secondary-state-pressed)]',
            textColor: 'text-[var(--components-button-secondary-text)]'
        },
        ghost: {
            default: 'bg-transparent',
            hovered: 'hover:bg-[var(--components-button-ghost-state-hovered)]',
            pressed: 'active:bg-[var(--components-button-ghost-state-pressed)]',
            textColor: 'text-[var(--components-button-ghost-text)]'
        },
        quartiary: {
            default: 'bg-[var(--components-button-quartiary-state-default)]',
            hovered: 'hover:bg-[var(--components-button-quartiary-state-hovered)]',
            pressed: 'active:bg-[var(--components-button-quartiary-state-pressed)]',
            textColor: 'text-[var(--components-button-quartiary-text)]'
        }
    }

    const disabledClasses = {
        default: 'bg-[var(--components-button-disabled-state-default)]',
        textColor: 'text-[var(--components-button-disabled-text)]',
        cursor: 'cursor-not-allowed'
    };

    const sizeButton = {
        xs: 'h-[28px]',
        sm: 'h-[32px]',
        md: 'h-[48px]'
    }

    return (
        <button
            className={`flex ${sizeButton[size]} py-1 px-2 items-center justify-center gap-1 rounded-xl transition-colors ${className} ${disabled
                    ? `${disabledClasses.default} ${disabledClasses.textColor} ${disabledClasses.cursor}`
                    : `${classMap[type].default} ${classMap[type].hovered} ${classMap[type].pressed} ${classMap[type].textColor} cursor-pointer`
                }`}
            onClick={handleClick}
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            onTouchStart={handleMouseDown}
            onTouchEnd={handleMouseUp}
            disabled={disabled}
            type="button"
        >
            {leftIcon && <span className="material-symbols-outlined">
                {leftIcon}
            </span>}
            {label && <span className={fontSize}>{label}</span>}
            {rightIcon && <span className="material-symbols-outlined">
                {rightIcon}
            </span>}

        </button>
    )
}