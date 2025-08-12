'use client';

import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { usePathname } from 'next/navigation';

export interface OrderItem {
    id: string;
    count: number;
}

export interface MemberOrders {
    [memberId: string]: OrderItem[];
}

interface PathOrders {
    [path: string]: MemberOrders;
}

interface IOrderContext {
    memberOrders: MemberOrders;
    updateMemberOrder: (memberId: string, orderItem: OrderItem) => void;
    clearMemberOrders: (memberId: string) => void;
    clearAllOrders: () => void;
    getMemberOrderTotal: (memberId: string) => number;
    getMemberOrderPrice: (memberId: string, dishesData: Array<{id: string; price?: number}>) => number;
    getAllMembersWithOrders: () => Array<{ memberId: string; orders: OrderItem[]; total: number }>;
    removeAllMemberOrderByOrderId: (dishId: string) => void;
    getOrderDishesTotal: () => number;
    getOrderPriceTotal: () => number;
}

const OrderContext = createContext<IOrderContext | undefined>(undefined);

interface OrderProviderProps {
    children: ReactNode;
}

export function OrderProvider({ children }: OrderProviderProps) {
    const pathname = usePathname();
    const [pathOrders, setPathOrders] = useState<PathOrders>({});

    const getBasePath = (path: string) => {
        if (path.startsWith('/sushiro')) return '/sushiro';
        if (path.startsWith('/teenoi')) return '/teenoi';
        return path;
    };

    const currentPath = getBasePath(pathname || '/');
    const memberOrders = pathOrders[currentPath] || {};

    useEffect(() => {
        console.log(pathOrders)
    },[pathOrders]);

    const updateMemberOrder = (memberId: string, orderItem: OrderItem) => {
        setPathOrders(prev => {
            const currentPathOrders = prev[currentPath] || {};
            const currentMemberOrders = currentPathOrders[memberId] || [];
            const existingIndex = currentMemberOrders.findIndex(item => item.id === orderItem.id);

            let updatedMemberOrders;
            if (existingIndex >= 0) {
                if (orderItem.count === 0) {
                    // Remove item if count is 0
                    updatedMemberOrders = currentMemberOrders.filter(item => item.id !== orderItem.id);
                } else {
                    // Update existing item
                    updatedMemberOrders = [...currentMemberOrders];
                    updatedMemberOrders[existingIndex] = orderItem;
                }
            } else {
                // Add new item if count > 0
                if (orderItem.count > 0) {
                    updatedMemberOrders = [...currentMemberOrders, orderItem];
                } else {
                    updatedMemberOrders = currentMemberOrders;
                }
            }

            return {
                ...prev,
                [currentPath]: {
                    ...currentPathOrders,
                    [memberId]: updatedMemberOrders
                }
            };
        });
    };

    const clearMemberOrders = (memberId: string) => {
        setPathOrders(prev => {
            const currentPathOrders = prev[currentPath] || {};
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            const { [memberId]: _, ...remainingOrders } = currentPathOrders;
            
            return {
                ...prev,
                [currentPath]: remainingOrders
            };
        });
    };

    const clearAllOrders = () => {
        setPathOrders(prev => {
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            const { [currentPath]: _, ...remaining } = prev;
            return remaining;
        });
    };

    const getMemberOrderTotal = (memberId: string): number => {
        const orders = memberOrders[memberId] || [];
        return orders.reduce((sum, item) => sum + item.count, 0);
    };

    const getMemberOrderPrice = (memberId: string, dishesData: Array<{id: string; price?: number}>): number => {
        const orders = memberOrders[memberId] || [];
        return orders.reduce((sum, orderItem) => {
            const dish = dishesData.find(d => d.id === orderItem.id);
            const price = dish?.price || 0;
            return sum + (price * orderItem.count);
        }, 0);
    };

    const getAllMembersWithOrders = (): Array<{ memberId: string; orders: OrderItem[]; total: number }> => {
        return Object.entries(memberOrders).map(([memberId, orders]) => ({
            memberId,
            orders,
            total: orders.reduce((sum, item) => sum + item.count, 0)
        }));
    };

    const removeAllMemberOrderByOrderId = (dishId: string) => {
        setPathOrders(prev => {
            const currentPathOrders = prev[currentPath] || {};
            const updatedOrders = Object.fromEntries(
                Object.entries(currentPathOrders).map(([memberId, orders]) => [
                    memberId,
                    orders.filter(item => item.id !== dishId)
                ])
            );
            return {
                ...prev,
                [currentPath]: updatedOrders
            };
        });
    };

    const getOrderDishesTotal = (): number => {
        return Object.values(memberOrders).reduce((sum, orders) => {
            return sum + orders.reduce((orderSum, item) => orderSum + item.count, 0);
        }, 0);
    };

    const getOrderPriceTotal = (): number => {
        console.log(memberOrders)
        return 1
    };



    return (
        <OrderContext.Provider value={{
            memberOrders,
            updateMemberOrder,
            clearMemberOrders,
            clearAllOrders,
            getMemberOrderTotal,
            getMemberOrderPrice,
            getAllMembersWithOrders,
            removeAllMemberOrderByOrderId,
            getOrderDishesTotal,
            getOrderPriceTotal
        }}>
            {children}
        </OrderContext.Provider>
    );
}

export function useOrder() {
    const context = useContext(OrderContext);
    if (context === undefined) {
        throw new Error('useOrder must be used within an OrderProvider');
    }
    return context;
}
