'use client';

import { Url } from "next/dist/shared/lib/router/router";
import Image from "next/image";
import Link from "next/link";

export function CardStore({
    url,
    alt = 'Placeholder Image',
    href = '#',
    label,
    disabled = false,
} : {
    url: string;
    alt?: string;
    href?: Url;
    label: string;
    disabled?: boolean;
}) {
    return (
        <Link href={href} className={`flex flex-col items-center px-5 py-4 w-fit h-fit gap-2 hover:bg-[var(--button-ghost-state-hovered)] rounded-2 select-none ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}>
            <Image
                src={url}
                alt={alt}
                width={122}
                height={122}
                priority={true}
                draggable={false}
            />
            <p className="text-lg font-medium text-[var(--color-black-tertiary)]">{label}</p>
        </Link>
    )
}