'use client';

export type SectionElement = React.ReactElement<
  React.ComponentProps<typeof Section>,
  typeof Section
>;

export function Section({
    header,
    description,
    children,
    className,
    disable
}: {
    header?: string;
    description?: string;
    children?: React.ReactNode;
    className?: string;
    disable?: boolean;
}) {
    return (
        <div className="px-4 py-2">
            <p className="text-2xl font-bold">{header}</p>
            <p className="text-sm text-[#99A1AF]">{description}</p>
            <div className={`${className} ${disable ? 'opacity-40 pointer-events-none' : ''}`}>
                {children}
            </div>
        </div>
    );
}