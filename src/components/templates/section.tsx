'use client';

export function Section({
    header,
    children,
}: {
    header?: string;
    children?: React.ReactNode;
}) {
    return (
        <div className="">
            <p>{header}</p>
            {children}
        </div>
    );
}