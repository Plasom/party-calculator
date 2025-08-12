'use client';

interface DividerProps {
    className?: string;
}

export function Divider({ className }: DividerProps) {
    return <div className={`h-px bg-[var(--color-grey-primary)] ${className ? className : 'my-2'}`} />
}