'use client';

import { usePathname, useRouter } from "next/navigation";
import { NavigationMenu } from "../ui/navigation-menu";
import { Button } from "../ui/button";
import { SectionElement } from "./section";
import Link from "next/link";
import packageJson from "../../../package.json"
import { useTranslations } from "@/i18n/hooks";

interface PageWithNavProps extends React.HTMLAttributes<HTMLDivElement> {
    children: SectionElement | SectionElement[];
    disableBack?: boolean;
}

export function PageWithNav({
    children,
    disableBack,
    ...props
}: PageWithNavProps) {
    const t = useTranslations();
    
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
        <div className={`mobile-width mt-16 flex flex-col`} {...props}>
            <NavigationMenu />
            <div className="px-1">
                {!isHomePage && !disableBack && (
                    <Button
                        type="ghost"
                        customSize="sm"
                        leftIcon="arrow_back"
                        label={t.common.buttons.back}
                        onClick={handleBackClick}
                    />
                )}
            </div>
            <div className="space-y-2 flex-1">
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
            {isHomePage &&<Footer />}
        </div>
    );
}

export default function Footer() {
    return (
        <footer className="flex flex-col items-center justify-center w-full py-4 border-t text-sm mt-8">
            <div className="flex items-center gap-1 text-gray-600">
                <span>©2025 | Made with</span>
                <span className="text-red-500 text-base">♥</span>
                <span>by</span>
                <Link 
                    href="https://github.com/Plasom" 
                    className="font-semibold text-gray-800 hover:text-blue-600 transition-colors"
                >
                    Plasom Team 🐡
                </Link>
                <span className="font-bold text-[#0070f3] text-xs">
                    v{packageJson.version}
                </span>
            </div>
        </footer>
    )
}