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
    return (
        <div className={`flex p-1 justify-center items-center ${disable ? 'bg-[var(--color-grey-secondary)]' : bgColorStyle[bgColor]} rounded-xl ${onClick ? 'cursor-pointer' : ''} ${disable ? 'cursor-not-allowed pointer-events-none' : ''} ${className? className : ''}`} onClick={onClick} {...props}>
            <span className={`material-symbols-rounded ${fill ? 'material-setting-fill' : ''}`} style={{ fontSize: customSize, color: customColor }}>
                {icon}
            </span>
        </div>
    )
}