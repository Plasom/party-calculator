'use client';

export type SectionElement = React.ReactElement<
  React.ComponentProps<typeof Section>,
  typeof Section
>;

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
            <div className="">
                {children}
            </div>
        </div>
    );
}