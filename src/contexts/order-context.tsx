'use client';

import React, { createContext, useContext, useState, ReactNode, useMemo, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { DishData } from '@/data/dishes';
import { SortHelper } from '@/lib/sort-helper';
import { NumberHelper } from '@/lib/number-helper';
import { SERVICE_CHARGE_RATE } from '@/config/constants';

export interface OrderItem {
    id: string;
    price: number;
    count: number;
}

export interface MemberOrders {
    [memberId: string]: OrderItem[];
}

export interface OrderTotalSummary {
    dishes: DishData[];
    totalDishes: number;
    serviceCharge: number;
    subTotalPrice: number;
    totalPrice: number;
}

interface PathOrders {
    [path: string]: MemberOrders;
}

interface IOrderContext {
    memberOrders: MemberOrders;
    selectedOrders: OrderItem[];
    updateMemberOrder: (memberId: string, orderItem: OrderItem) => void;
    clearMemberOrders: (memberId: string) => void;
    clearAllOrders: () => void;
    getMemberOrderTotal: (memberId: string) => number;
    getMemberOrderPrice: (memberId: string, dishesData: Array<{ id: string; price?: number }>) => number;
    getAllMembersWithOrders: () => Array<{ memberId: string; orders: OrderItem[]; total: number }>;
    removeAllMemberOrderByOrderId: (dishId: string) => void;
    getOrderTotalSummary: (dishes: DishData[]) => OrderTotalSummary;
    getOrderMemberSummary: (memberId: string, dishes: DishData[]) => OrderTotalSummary;
}

const OrderContext = createContext<IOrderContext | undefined>(undefined);

interface OrderProviderProps {
    children: ReactNode;
}

export function OrderProvider({ children }: OrderProviderProps) {
    const pathname = usePathname();
    const [pathOrders, setPathOrders] = useState<PathOrders>({});
    const [selectedOrders, setSelectedOrders] = useState<OrderItem[]>([]);

    const getBasePath = (path: string) => {
        if (path.startsWith('/sushiro')) return '/sushiro';
        if (path.startsWith('/teenoi')) return '/teenoi';
        return path;
    };

    const currentPath = getBasePath(pathname || '/');
    const memberOrders = useMemo(() => pathOrders[currentPath] || {}, [pathOrders, currentPath]);

    useEffect(() => {
        const allOrders: OrderItem[] = [];
        const orderMap = new Map<string, number>();
        
        Object.values(memberOrders).forEach((memberOrderList) => {
            memberOrderList.forEach((orderItem) => {
                const existingCount = orderMap.get(orderItem.id) || 0;
                orderMap.set(orderItem.id, existingCount + orderItem.count);
            });
        });
        orderMap.forEach((count, id) => {
            if (count > 0) {
                const price = selectedOrders.find(item => item.id === id)?.price || 0;
                allOrders.push({ id, price, count });
            }
        });
        
        setSelectedOrders(allOrders);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [memberOrders]);

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

    const getMemberOrderPrice = (memberId: string, dishesData: Array<{ id: string; price?: number }>): number => {
        const orders = memberOrders[memberId] || [];
        const total = orders.reduce((sum, orderItem) => {
            const dish = dishesData.find(d => d.id === orderItem.id);
            const price = dish?.price || 0;
            return sum + (price * orderItem.count);
        }, 0);
        return NumberHelper.parse(NumberHelper.toFixed(total, 2));
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

    const getOrderPriceTotal = (dishes: DishData[]): number => {
        const dishesData = Object.values(memberOrders).flatMap(orders => orders);
        return dishesData.reduce((sum, item) => {
            const dish = dishes.find(d => d.id === item.id);
            const price = dish?.price || 0;
            return sum + (price * item.count);
        }, 0);
    };

    const getOrderTotalSummary = (dishes: DishData[]): OrderTotalSummary => {
        const totalDishes = getOrderDishesTotal();
        const subTotalPrice = getOrderPriceTotal(dishes);
        const serviceCharge = NumberHelper.multiply(SERVICE_CHARGE_RATE.SUSHISO, subTotalPrice);
        const totalPrice = subTotalPrice + serviceCharge;


        const orderedDishes = SortHelper.multiLevelSort(selectedOrders.flatMap(orderItem =>{
            const dish: DishData = dishes.find(d => d.id === orderItem.id)!;
            if (dish) {
                dish.amount = orderItem.count;
            }

            return dish ? [dish] : [];
        }), [
            { key: 'isDefault', order: 'desc' },
            { key: 'price', order: 'asc' }
        ]);

        return {
            dishes: orderedDishes || [],
            totalDishes,
            subTotalPrice: subTotalPrice,
            serviceCharge: serviceCharge,
            totalPrice
        };
    };

    const getOrderMemberSummary = (memberId: string, dishes: DishData[]): OrderTotalSummary => {
        const orders = memberOrders[memberId] || [];

        const totalDishes = orders.reduce((sum, item) => sum + item.count, 0);
        const subTotalPrice = orders.reduce((sum, item) => {
            const dish = dishes.find(d => d.id === item.id);
            const price = dish?.price || 0;
            return sum + (price * item.count);
        }, 0);
        const serviceCharge = NumberHelper.multiply(SERVICE_CHARGE_RATE.SUSHISO, subTotalPrice);
        const totalPrice = subTotalPrice + serviceCharge

        const orderedDishes = SortHelper.multiLevelSort(orders.flatMap(orderItem =>{
            const dish: DishData = dishes.find(d => d.id === orderItem.id)!;
            if (dish) {
                dish.amount = orderItem.count;
            }

            return dish ? [dish] : [];
        }), [
            { key: 'isDefault', order: 'desc' },
            { key: 'price', order: 'asc' }
        ]);

        return {
            dishes: orderedDishes,
            totalDishes,
            subTotalPrice: subTotalPrice,
            serviceCharge: serviceCharge,
            totalPrice
        };
    };

    return (
        <OrderContext.Provider value={{
            memberOrders,
            selectedOrders,
            updateMemberOrder,
            clearMemberOrders,
            clearAllOrders,
            getMemberOrderTotal,
            getMemberOrderPrice,
            getAllMembersWithOrders,
            removeAllMemberOrderByOrderId,
            getOrderTotalSummary,
            getOrderMemberSummary
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
