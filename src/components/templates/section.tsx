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
    showHeader = true,
    showDescription = true,
    ignoreClassName = false,
    disable
}: {
    header?: string;
    description?: string;
    children?: React.ReactNode;
    className?: string;
    showHeader?: boolean;
    showDescription?: boolean;
    ignoreClassName?: boolean;
    disable?: boolean;
}) {
    return (
        <div className="px-4 py-2">
            {showHeader && <p className="text-2xl font-bold">{header}</p>}
            {showDescription && <p className="text-sm text-[#99A1AF]">{description}</p>}
            <div className={`${!ignoreClassName ? className : ''} ${disable ? 'opacity-40 pointer-events-none' : ''}`}>
                {children}
            </div>
        </div>
    );
}