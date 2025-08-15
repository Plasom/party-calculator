'use client';

import { useLongPress } from "@/hooks/useLongPress";
import { MaterialSymbol } from "material-symbols";

interface IconButtonProps {
    onClick?: () => void;
    onLongPress?: () => void;
    longPressDuration?: number;
    disabled?: boolean;
    icon: MaterialSymbol;
    customSize?: 'xs' | 'sm' | 'md';
    fill?: boolean;
    className?: string;
    type?: 'primary' | 'secondary' | 'tertiary' | 'ghost' | 'ghost-desctructive';
}

export function IconButton({
    onClick,
    onLongPress,
    longPressDuration,
    disabled = false,
    icon,
    customSize = 'xs',
    fill = false,
    type = 'primary',
    className,
}: IconButtonProps) {
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
            default: 'bg-[var(--components-button-primary-state-default)]',
            hovered: 'hover:bg-[var(--components-button-primary-state-hovered)]',
            pressed: 'active:bg-[var(--components-button-primary-state-pressed)]',
            iconColor: 'var(--components-button-primary-icon)'
        },
        secondary: {
            default: 'bg-[var(--components-button-secondary-state-default)]',
            hovered: 'hover:bg-[var(--components-button-secondary-state-hovered)]',
            pressed: 'active:bg-[var(--components-button-secondary-state-pressed)]',
            iconColor: 'var(--components-button-secondary-icon)'
        },
        tertiary: {
            default: 'border-1 border-[var(--components-button-secondary-border)] bg-[var(--components-button-secondary-state-default)]',
            hovered: 'border-1 border-[var(--components-button-secondary-border)] hover:bg-[var(--components-button-secondary-state-hovered)]',
            pressed: 'border-1 border-[var(--components-button-secondary-border)] active:bg-[var(--components-button-secondary-state-pressed)]',
            iconColor: 'var(--components-button-secondary-icon)'
        },
        ghost: {
            default: 'bg-transparent',
            hovered: 'hover:bg-[var(--components-button-ghost-state-hovered)]',
            pressed: 'active:bg-[var(--components-button-ghost-state-pressed)]',
            iconColor: 'var(--components-button-secondary-icon)'
        },
        "ghost-desctructive": {
            default: 'bg-transparent',
            hovered: 'hover:bg-[var(--components-button-ghost-desctructive-state-hovered)]',
            pressed: 'active:bg-[var(--components-button-ghost-desctructive-state-pressed)]',
            iconColor: 'var(--components-button-ghost-desctructive-icon)'
        }
    }

    const disabledClasses = {
        default: 'bg-[var(--components-button-disabled-state-default)]',
        iconColor: 'var(--components-button-disabled-icon)',
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
            className={`flex ${sizeProps[customSize].buttonSize} p-1 items-center justify-center gap-1 rounded-xl transition-colors ${className} ${disabled
                ? `${disabledClasses.default} ${disabledClasses.cursor}`
                : `${typeProps[type].default} ${typeProps[type].hovered} ${typeProps[type].pressed} cursor-pointer`
                }`}
            onClick={handleClick}
            {...longPressHandlers}
            disabled={disabled}
            type="button"
        >
            <span className={`material-symbols-rounded ${fill? 'material-setting-fill' : ''}`} style={{ fontSize: sizeProps[customSize].iconSize, color: disabled ? disabledClasses.iconColor : typeProps[type].iconColor }}>
                {icon}
            </span>
        </button>
    )
}