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
    customSize = 'sm',
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
        // ปิดคีย์บอร์ดเมื่อคลิกปุ่ม
        const active = document.activeElement as HTMLElement | null;

        if (active && active.tagName === "INPUT") {
            const hidden = document.createElement("input");
            hidden.style.position = "absolute";
            hidden.style.opacity = "0";
            hidden.style.height = "0";
            hidden.style.fontSize = "16px";

            document.body.appendChild(hidden);
            hidden.focus();
            hidden.blur();
            document.body.removeChild(hidden);
        }
        
        if (!disabled) {
            onClick?.();
        }
    };

    const typeProps = {
        primary: {
            default: 'bg-[var(--button-primary-state-default)]',
            hovered: 'hover:bg-[var(--button-primary-state-hovered)]',
            pressed: 'active:bg-[var(--button-primary-state-pressed)]',
            iconColor: 'var(--button-primary-icon)'
        },
        secondary: {
            default: 'bg-[var(--button-secondary-state-default)]',
            hovered: 'hover:bg-[var(--button-secondary-state-hovered)]',
            pressed: 'active:bg-[var(--button-secondary-state-pressed)]',
            iconColor: 'var(--button-secondary-icon)'
        },
        tertiary: {
            default: 'border-1 border-[var(--button-secondary-border)] bg-[var(--button-secondary-state-default)]',
            hovered: 'border-1 border-[var(--button-secondary-border)] hover:bg-[var(--button-secondary-state-hovered)]',
            pressed: 'border-1 border-[var(--button-secondary-border)] active:bg-[var(--button-secondary-state-pressed)]',
            iconColor: 'var(--button-secondary-icon)'
        },
        ghost: {
            default: 'bg-transparent',
            hovered: 'hover:bg-[var(--button-ghost-state-hovered)]',
            pressed: 'active:bg-[var(--button-ghost-state-pressed)]',
            iconColor: 'var(--button-secondary-icon)'
        },
        "ghost-desctructive": {
            default: 'bg-transparent',
            hovered: 'hover:bg-[var(--button-ghost-desctructive-state-hovered)]',
            pressed: 'active:bg-[var(--button-ghost-desctructive-state-pressed)]',
            iconColor: 'var(--button-ghost-desctructive-icon)'
        }
    }

    const disabledClasses = {
        default: 'bg-[var(--button-disabled-state-default)]',
        iconColor: 'var(--button-disabled-icon)',
        cursor: 'cursor-not-allowed'
    };

    const sizeProps = {
        xs: {
            textSize: 'text-sm font-medium',
            iconSize: 16
        },
        sm: {
            textSize: 'text-base font-medium',
            iconSize: 24
        },
        md: {
            textSize: 'text-xl font-medium',
            iconSize: 32
        }
    }

    return (
        <button
            className={`flex p-1 items-center justify-center gap-1 rounded-xl transition-colors ${className} ${disabled
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