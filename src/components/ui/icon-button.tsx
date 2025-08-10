import { MaterialSymbol } from "material-symbols";

interface IconButtonProps extends React.HTMLAttributes<HTMLDivElement> {
    onClick?: () => void;
    icon: MaterialSymbol;
    size?: number;
    color?: string;
    bgColor?: string;
    fill?: boolean;
    disable?: boolean;
    className?: string;
}

export function IconButton({
    onClick,
    icon,
    size = 24,
    color = 'black',
    bgColor = 'transparent',
    fill = false,
    disable = false,
    className,
    ...props
}: IconButtonProps) {
    return (
        <div className={`flex p-1 justify-center items-center bg-${disable ? '[var(--color-grey-secondary)]' : bgColor} rounded-xl ${onClick && 'cursor-pointer'} ${disable && 'cursor-not-allowed pointer-events-none'} ${className}`} onClick={onClick} {...props}>
            <span className={`material-symbols-rounded ${fill && 'material-setting-fill'}`} style={{ fontSize: size, color }}>
                {icon}
            </span>
        </div>
    )
}