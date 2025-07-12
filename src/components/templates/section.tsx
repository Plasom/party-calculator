'use client';

export function Section({
    header,
    children,
}: {
    header?: string;
    children?: React.ReactNode;
}) {
    return (
        <div className="px-4 py-2">
            <p className="text-2xl font-bold">{header}</p>
            <div className="py-4">
                {children}
            </div>
        </div>
    );
}