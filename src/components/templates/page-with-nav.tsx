'use client';

import { usePathname, useRouter } from "next/navigation";
import { NavigationMenu } from "../ui/navigation-menu";
import { Button } from "../ui/button";
import { SectionElement } from "./section";

export function PageWithNav({
    children,
}: {
    children: SectionElement | SectionElement[];
}) {
    const pathname = usePathname();
    const router = useRouter();
    const sections = Array.isArray(children) ? children : [children];
    const hasMultipleSections = sections.length > 1;
    const isHomePage = pathname === '/' || pathname === '/example';

    const handleBackClick = () => {
        router.back();
    };

    return (
        <div className="mobile-width mt-[63px]">
            <NavigationMenu />
            <div className="px-1">
                {!isHomePage && (
                    <Button
                        type="ghost"
                        size="sm"
                        leftIcon="arrow_back"
                        label="back"
                        onClick={handleBackClick}
                        className="font-semibold"
                    />
                )}
            </div>
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