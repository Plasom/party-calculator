'use client';

import { useRef } from 'react';

export function Button({
    label,
    rightIcon,
    leftIcon,
    onClick,
    onLongPress,
    longPressDuration = 300,
    disabled = false,
    type = 'primary',
    size = 'sm'
}: {
    className?: string;
    label?: string;
    rightIcon?: React.ReactNode;
    leftIcon?: React.ReactNode;
    onClick: () => void;
    onLongPress?: () => void;
    longPressDuration?: number;
    disabled?: boolean;
    type?: 'primary' | 'secondary' | 'ghost';
    size?: 'xs' | 'sm' | 'md';
}) {
    const longPressTimer = useRef<NodeJS.Timeout | null>(null);

    const handleMouseDown = () => {
        if (onLongPress && !disabled) {
            console.log('Long press started');
            longPressTimer.current = setTimeout(() => {
                console.log('dfdf')
                onLongPress();
            }, longPressDuration);
        }
    };

    const handleMouseUp = () => {
        if (longPressTimer.current) {
            console.log('Long press ended');
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
            default: 'bg-[var(--button-primary-state-default)]',
            hovered: 'hover:bg-[var(--button-primary-state-hovered)]',
            pressed: 'active:bg-[var(--button-primary-state-pressed)]',
            textColor: 'text-[var(--button-primary-text)]'
        },
        secondary: {
            default: 'bg-[var(--button-secondary-state-default)]',
            hovered: 'hover:bg-[var(--button-secondary-state-hovered)]',
            pressed: 'active:bg-[var(--button-secondary-state-pressed)]',
            textColor: 'text-[var(--button-secondary-text)]'
        },
        ghost: {
            default: 'bg-transparent',
            hovered: 'hover:bg-[var(--button-ghost-state-hovered)]',
            pressed: 'active:bg-[var(--button-ghost-state-pressed)]',
            textColor: 'text-[var(--button-ghost-text)]'
        }
    }

    const disabledClasses = {
        default: 'bg-[var(--button-disabled-state-default)]',
        textColor: 'text-[var(--button-disabled-text)]',
        cursor: 'cursor-not-allowed'
    };

    const sizeButton = {
        xs: 'h-[28px]',
        sm: 'h-[32px]',
        md: 'h-[48px]'
    }
    
    return (
        <button 
            className={`flex ${sizeButton[size]} py-1 px-2 items-center justify-center gap-1 rounded-xl transition-colors ${
                disabled 
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
            {label}
            {rightIcon && <span className="material-symbols-outlined">
                {rightIcon}
            </span>}

        </button>
    )
}