'use client';

import { usePathname, useRouter } from "next/navigation";
import { NavigationMenu } from "../ui/navigation-menu";
import { Button } from "../ui/button";
import { SectionElement } from "./section";

interface PageWithNavProps extends React.HTMLAttributes<HTMLDivElement> {
    children: SectionElement | SectionElement[];
}

export function PageWithNav({
    children,
    ...props
}: PageWithNavProps) {
    const pathname = usePathname();
    const router = useRouter();
    const sections = Array.isArray(children) ? children : [children];
    
    const sectionCount = sections.filter(section => 
        section?.props?.header !== undefined
    ).length;
    const hasMultipleSections = sectionCount > 1;
    const isHomePage = pathname === '/' || pathname === '/example';

    const handleBackClick = () => {
        router.back();
    };

    return (
        <div className={`mobile-width mt-16 ${props.className || ''}`} {...props}>
            <NavigationMenu />
            <div className="px-1">
                {!isHomePage && (
                    <Button
                        type="ghost"
                        buttonSize="sm"
                        leftIcon="arrow_back"
                        label="back"
                        onClick={handleBackClick}
                    />
                )}
            </div>
            <div className="space-y-2">
                {sections.map((section, index) => {
                    const isSection = section?.props?.header !== undefined;
                    const nextSection = sections[index + 1];
                    const nextIsSection = nextSection?.props?.header !== undefined;
                    
                    return (
                        <div key={index}>
                            {section}
                            {hasMultipleSections && isSection && nextIsSection && (
                                <div className="h-px bg-gray-200 mx-4 my-2" />
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );
}