import { Badge } from "../badge";

interface PriceBadgeProps {
    isSelected?: boolean;
    label?: string;
    value?: number;
    onClick?: () => void;
}

export function PriceBadge({ isSelected, label, onClick }: PriceBadgeProps) {
    return (
        <Badge
            variant="outline"
            className={`${isSelected ? "bg-[var(--components-tag-primary-bg)] text-white" : "bg-[var(--components-tag-secondary-bg)]"} cursor-pointer py-1.5 px-2 rounded-xl`}
            onClick={onClick}
        >
            <span className="text-sm">
            {label} ฿
            </span>
        </Badge>
    );
}
