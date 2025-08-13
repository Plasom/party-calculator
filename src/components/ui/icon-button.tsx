'use client';

import { MaterialSymbol } from "material-symbols";

interface IconButtonProps extends React.HTMLAttributes<HTMLDivElement> {
    onClick?: () => void;
    icon: MaterialSymbol;
    customSize?: number;
    customColor?: string;
    bgColor?: 'black' | 'white' | 'transparent';
    fill?: boolean;
    disable?: boolean;
    className?: string;
}

export function IconButton({
    onClick,
    icon,
    customSize = 24,
    customColor = 'black',
    bgColor = 'transparent',
    fill = false,
    disable = false,
    className,
    ...props
}: IconButtonProps) {
    const bgColorStyle = {
        black: 'bg-black',
        white: 'bg-white',
        transparent: 'bg-transparent',
    }
    const type = {
        ghost: {
            default: 'bg-transparent',
            hovered: 'hover:bg-[var(--components-button-ghost-state-hovered)]',
            pressed: 'active:bg-[var(--components-button-ghost-state-pressed))]',
            iconColor: 'var(--components-button-ghost-icon)'
        },
        primary:{
            default: 'bg-[var(--components-button-primary-state-default)]',
            hovered: 'hover:bg-[var(--components-button-primary-state-hovered)]',
            pressed: 'active:bg-[var(--components-button-primary-state-pressed))]',
            iconColor: 'var(--components-button-primary-icon)'
        },
        ghost_destructive: {
            default: 'bg-[var(--components-button-destructive-state-default)]',
            hovered: 'hover:bg-[var(--components-button-ghost-destructive-state-hovered)]',
            pressed: 'active:bg-[var(--components-button-ghost-destructive-state-pressed))]',
            iconColor: 'var(--components-button-ghost-destructive-icon)'
        },
        secondary: {
            default: 'bg-[var(--components-button-secondary-state-default)]',
            hovered: 'hover:bg-[var(--components-button-secondary-state-hovered)]',
            pressed: 'active:bg-[var(--components-button-secondary-state-pressed))]',
            iconColor: 'var(--components-button-secondary-icon)'
        },
        disabled: {
            default: 'bg-[var(--components-button-disabled-state-default)]',
            hovered: 'hover:bg-[var(--components-button-disabled-state-hovered)]',
            pressed: 'active:bg-[var(--components-button-disabled-state-pressed))]',
            iconColor: 'var(--components-button-disabled-icon)'
        }
    }
    const sizeButton = {
        xs: 'p-1 h-[16px] w-[16px]',
        sm: 'p-1 h-[24px] w-[24px]',
        md: 'p-1 h-[32px] w-[32px]',
    }

    return (
        <div
            className={`inline-flex items-center justify-center rounded-full ${bgColorStyle[bgColor]} ${sizeButton.md} ${type.primary.default} ${type.primary.iconColor} ${className}`}
            onClick={onClick}
            style={{ fontSize: customSize, color: customColor }}
            {...props}
        >
            <span
                className={`material-symbols-rounded ${fill ? 'material-setting-fill' : ''}`}
                style={{
                    fontSize: customSize,
                    color: customColor
                }}
            >
                {icon}
            </span>
        </div>
    );
}