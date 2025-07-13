'use client';

import { NavigationMenu } from "../ui/navigation-menu";
import { SectionElement } from "./section";

export function PageWithNav({
    children,
}: {
    children: SectionElement | SectionElement[];
}) {
    const sections = Array.isArray(children) ? children : [children];
    const hasMultipleSections = sections.length > 1;

    return (
        <div className="mobile-width mt-[63px]">
            <NavigationMenu />
            <div className="space-y-2">
                {sections.map((section, index) => (
                    <div key={index}>
                        {section}
                        {hasMultipleSections && index < sections.length - 1 && (
                            <div className="h-px bg-gray-200 mx-4 my-2" />
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}