'use client';

import React, { createContext, useContext, useEffect, ReactNode, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useOrder } from './order-context';

interface IPageProtectorContext {
    isOrderRequired: boolean;
    hasOrders: boolean;
    canAccessPage: boolean;
    isAllowed: (bool: boolean) => void;
}

const PageProtectorContext = createContext<IPageProtectorContext | undefined>(undefined);

interface PageProtectorProviderProps {
    children: ReactNode;
    requiredOrderPages?: string[];
}

export function PageProtectorProvider({ 
    children, 
    requiredOrderPages = [],
}: PageProtectorProviderProps) {
    const router = useRouter();
    const pathname = usePathname();
    const { selectedOrders, getAllMembersWithOrders } = useOrder();
    const [byPassPageProtection, setByPassPageProtection] = useState<boolean>(false);

    const hasOrders = selectedOrders.length > 0 || getAllMembersWithOrders().length > 0;
    
    const isOrderRequired = Boolean(pathname && (
        pathname.includes('/checkout') || 
        pathname.includes('/payment') || 
        pathname.includes('/summary') ||
        requiredOrderPages.some(page => pathname.startsWith(page))
    ));

    const canAccessPage = !isOrderRequired || hasOrders || byPassPageProtection;

    useEffect(() => {
        if (!byPassPageProtection && isOrderRequired && !hasOrders) {
            // Remove locale prefix for path matching
            const pathWithoutLocale = pathname?.replace(/^\/(en|th)/, '') || '';
            
            if (pathWithoutLocale.startsWith('/sushiro')) {
                // Extract locale from current pathname
                const locale = pathname?.match(/^\/(en|th)/)?.[1] || 'en';
                router.replace(`/${locale}/sushiro`);
            } else if (pathWithoutLocale.startsWith('/teenoi')) {
                const locale = pathname?.match(/^\/(en|th)/)?.[1] || 'en';
                router.replace(`/${locale}/teenoi`);
            } else {
                const locale = pathname?.match(/^\/(en|th)/)?.[1] || 'en';
                router.replace(`/${locale}`);
            }
        }

    }, [pathname, isOrderRequired, hasOrders, router, byPassPageProtection]);

    useEffect(() => {
        setByPassPageProtection(false);
    }, [pathname]);

    const isAllowed = (bool: boolean): void => {
        setByPassPageProtection(bool);
    }

    return (
        <PageProtectorContext.Provider value={{
            isOrderRequired,
            hasOrders,
            canAccessPage,
            isAllowed
        }}>
            {canAccessPage ? children : (
                <div className="flex items-center justify-center min-h-screen">
                    <div className="text-center">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-red-500 mx-auto mb-4"></div>
                        <p className="text-gray-600">กำลังนำกลับไปหน้าหลัก</p>
                    </div>
                </div>
            )}
        </PageProtectorContext.Provider>
    );
}

export function usePageProtector() {
    const context = useContext(PageProtectorContext);
    if (context === undefined) {
        throw new Error('usePageProtector must be used within a PageProtectorProvider');
    }
    return context;
}
