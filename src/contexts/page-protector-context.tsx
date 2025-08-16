'use client';

import React, { createContext, useContext, useEffect, ReactNode } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useOrder } from './order-context';

interface IPageProtectorContext {
    isOrderRequired: boolean;
    hasOrders: boolean;
    canAccessPage: boolean;
}

const PageProtectorContext = createContext<IPageProtectorContext | undefined>(undefined);

interface PageProtectorProviderProps {
    children: ReactNode;
    requiredOrderPages?: string[]; // หน้าที่ต้องมี order
}

export function PageProtectorProvider({ 
    children, 
    requiredOrderPages = [] 
}: PageProtectorProviderProps) {
    const router = useRouter();
    const pathname = usePathname();
    const { selectedOrders, getAllMembersWithOrders } = useOrder();

    // ตรวจสอบว่ามี order หรือไม่
    const hasOrders = selectedOrders.length > 0 || getAllMembersWithOrders().length > 0;
    
    // ตรวจสอบว่าหน้าปัจจุบันต้องการ order หรือไม่ (เช็ค */checkout, */payment, */summary)
    const isOrderRequired = Boolean(pathname && (
        pathname.includes('/checkout') || 
        pathname.includes('/payment') || 
        pathname.includes('/summary') ||
        requiredOrderPages.some(page => pathname.startsWith(page))
    ));
    
    // สามารถเข้าหน้าได้หรือไม่
    const canAccessPage = !isOrderRequired || hasOrders;

    useEffect(() => {
        // ถ้าเป็นหน้าที่ต้องมี order แต่ไม่มี order ให้ redirect กลับ
        if (isOrderRequired && !hasOrders) {
            // หาหน้าหลักของร้านจาก pathname
            if (pathname?.startsWith('/sushiro')) {
                router.replace('/sushiro');
            } else if (pathname?.startsWith('/teenoi')) {
                router.replace('/teenoi');
            } else {
                router.replace('/');
            }
        }
    }, [pathname, isOrderRequired, hasOrders, router]);

    return (
        <PageProtectorContext.Provider value={{
            isOrderRequired,
            hasOrders,
            canAccessPage
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
