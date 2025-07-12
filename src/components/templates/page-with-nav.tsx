'use client';

import { NavigationMenu } from "../ui/navigation-menu";

export function PageWithNav({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="mobile-width border border-red-500 mt-[63px]">
            <NavigationMenu />
            <div>
                {children}
            </div>
        </div>
    );
}