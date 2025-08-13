'use client';

import { useLongPress } from '@/hooks/useLongPress';

interface ButtonProps {
    className?: string;
    label?: string;
    rightIcon?: React.ReactNode;
    leftIcon?: React.ReactNode;
    onClick: () => void;
    onLongPress?: () => void;
    longPressDuration?: number;
    disabled?: boolean;
    type?: 'primary' | 'secondary' | 'ghost' | 'quartiary';
    buttonSize?: 'xs' | 'sm' | 'md';
    fontSize?: 'font-semibold' | 'font-normal' | 'font-medium' | 'font-bold';
    textSize?: 'text-xs' | 'text-sm' | 'text-md' | 'text-lg' | 'text-xl';
    textColor?: string;
}

export function Button({
    className = '',
    label,
    rightIcon,
    leftIcon,
    onClick,
    onLongPress,
    longPressDuration,
    disabled = false,
    type = 'primary',
    buttonSize = 'sm',
    fontSize = 'font-normal',
    textSize = 'text-xs',
    textColor
}: ButtonProps) {
    const longPressHandlers = useLongPress({
        onLongPress,
        duration: longPressDuration,
        disabled
    });

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
            className={`flex ${sizeButton[buttonSize]} py-1 px-2 items-center justify-center gap-1 rounded-xl transition-colors ${className} ${disabled
                    ? `${disabledClasses.default} ${disabledClasses.textColor} ${disabledClasses.cursor}`
                    : `${classMap[type].default} ${classMap[type].hovered} ${classMap[type].pressed} ${textColor ? textColor : classMap[type].textColor} cursor-pointer`
                }`}
            onClick={handleClick}
            {...longPressHandlers}
            disabled={disabled}
            type="button"
        >
            {leftIcon && <span className="material-symbols-rounded">
                {leftIcon}
            </span>}
            {label && <span className={`${fontSize} ${textSize}`}>{label}</span>}
            {rightIcon && <span className="material-symbols-rounded">
                {rightIcon}
            </span>}

        </button>
    )
}