'use client';

export type SectionElement = React.ReactElement<
  React.ComponentProps<typeof Section>,
  typeof Section
>;

export function Section({
    header,
    description,
    children,
}: {
    header?: string;
    description?: string;
    children?: React.ReactNode;
}) {
    return (
        <div className="px-4 py-2">
            <p className="text-2xl font-bold">{header}</p>
            <p className="text-sm text-[#99A1AF]">{description}</p>
            <div className="">
                {children}
            </div>
        </div>
    );
}