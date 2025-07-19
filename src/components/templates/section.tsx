'use client';

export type SectionElement = React.ReactElement<
  React.ComponentProps<typeof Section>,
  typeof Section
>;

export function Section({
    header,
    description,
    children,
    className
}: {
    header?: string;
    description?: string;
    children?: React.ReactNode;
    className?: string;
}) {
    return (
        <div className="px-4 py-2">
            <p className="text-2xl font-bold">{header}</p>
            <p className="text-sm text-[#99A1AF]">{description}</p>
            <div className={className}>
                {children}
            </div>
        </div>
    );
}