import Image from "next/image";

export function CardStore({
    url,
    alt = 'Placeholder Image',
    label,
} : {
    url: string;
    alt?: string;
    label: string;
}) {
    return (
        <div className="flex flex-col items-center px-5 py-4 w-fit h-fit gap-2 hover:bg-[var(--button-ghost-state-hovered)] rounded-2 select-none">
            <Image
                src={url}
                alt={alt}
                loading="lazy"
                width={122}
                height={122}
                draggable={false}
            />
            <p className="text-lg font-medium text-[var(--color-black-tertiary)]">{label}</p>
        </div>
    )
}