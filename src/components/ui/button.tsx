'use client';

import { useLongPress } from '@/hooks/useLongPress';
import { MaterialSymbol } from 'material-symbols';

interface ButtonProps {
    className?: string;
    label?: string;
    rightIcon?: MaterialSymbol;
    leftIcon?: MaterialSymbol;
    onClick?: () => void;
    onLongPress?: () => void;
    longPressDuration?: number;
    disabled?: boolean;
    type?: 'primary' | 'secondary' | 'ghost' | 'quartiary';
    customSize?: 'xs' | 'sm' | 'md';
    customFontSize?: 'xs' | 'sm' | 'md';
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
    customSize = 'sm',
    customFontSize,
    textColor,
}: ButtonProps) {
    const longPressHandlers = useLongPress({
        onLongPress,
        duration: longPressDuration,
        disabled
    });

    const handleClick = () => {
        if (!disabled) {
            onClick?.();
        }
    };

    const typeProps = {
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
        },
        quartiary: {
            default: 'bg-[var(--button-quartiary-state-default)]',
            hovered: 'hover:bg-[var(--button-quartiary-state-hovered)]',
            pressed: 'active:bg-[var(--button-quartiary-state-pressed)]',
            textColor: 'text-[var(--button-quartiary-text)]'
        }
    }

    const disabledClasses = {
        default: 'bg-[var(--button-disabled-state-default)]',
        textColor: 'text-[var(--button-disabled-text)]',
        cursor: 'cursor-not-allowed'
    };

    const sizeProps = {
        xs: {
            buttonSize: 'h-[28px] text-sm font-medium',
            textSize: 'text-sm font-medium',
            iconSize: 16
        },
        sm: {
            buttonSize: 'h-[32px] text-base font-medium',
            textSize: 'text-base font-medium',
            iconSize: 24
        },
        md: {
            buttonSize: 'h-[48px] text-md font-medium',
            textSize: 'text-xl font-medium',
            iconSize: 32
        }
    }

    return (
        <button
            className={`flex ${sizeProps[customSize].buttonSize} py-1 px-2 items-center justify-center gap-1 rounded-xl transition-colors ${className} ${disabled
                ? `${disabledClasses.default} ${disabledClasses.textColor} ${disabledClasses.cursor}`
                : `${typeProps[type].default} ${typeProps[type].hovered} ${typeProps[type].pressed} ${textColor ? textColor : typeProps[type].textColor} cursor-pointer`
                }`}
            onClick={handleClick}
            {...longPressHandlers}
            disabled={disabled}
            type="button"
        >
            {leftIcon && <span className="material-symbols-rounded" style={{ fontSize: sizeProps[customSize].iconSize }}>
                {leftIcon}
            </span>}
            {label && <span className={customFontSize ? sizeProps[customFontSize].textSize : sizeProps[customSize].textSize}>{label}</span>}
            {rightIcon && <span className="material-symbols-rounded" style={{ fontSize: sizeProps[customSize].iconSize }}>
                {rightIcon}
            </span>}
        </button>
    )
}