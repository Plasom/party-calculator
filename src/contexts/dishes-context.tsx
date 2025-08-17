'use client';

import React, { createContext, useContext, useState, ReactNode, useMemo } from 'react';
import { usePathname } from 'next/navigation';
import { DishData, sushiroDishes, tenoiDishes } from '@/data/dishes';
import { SortHelper } from '@/lib/sort-helper';

interface DishesContextType {
    dishes: DishData[];
    addDish: (dish: DishData) => void;
    removeDish: (dishId: string) => void;
    updateDish: (dishId: string, updatedDish: Partial<DishData>) => void;
    resetToDefault: () => void;
}

interface IPathDishes {
    [path: string]: DishData[];
}

const DishesContext = createContext<DishesContextType | undefined>(undefined);

interface DishesProviderProps {
    children: ReactNode;
}

export function DishesProvider({ children }: DishesProviderProps) {
    const pathname = usePathname();
    const [pathDishes, setPathDishes] = useState<IPathDishes>({});

    const getBasePath = (path: string) => {
        if (path.startsWith('/sushiro')) return '/sushiro';
        if (path.startsWith('/teenoi')) return '/teenoi';
        return path;
    };

    const getDefaultDishes = (path: string): DishData[] => {
        if (path.startsWith('/sushiro')) return sushiroDishes;
        if (path.startsWith('/teenoi')) return tenoiDishes;
        return [];
    };

    const currentPath = useMemo(() => {
        return getBasePath(pathname || '/');
    }, [pathname]);

    const currentDishes = useMemo(() => {
        return SortHelper.multiLevelSort((pathDishes[currentPath] || getDefaultDishes(currentPath)), [
            { key: 'isDefault', order: 'desc' },
            { key: 'price', order: 'asc' }
        ]);
    }, [pathDishes, currentPath]);

    const addDish = (dish: DishData) => {
        setPathDishes(prev => ({
            ...prev,
            [currentPath]: [...currentDishes.slice(0, currentDishes.length - 1), { ...dish, isDefault: false }, currentDishes[currentDishes.length - 1]]
        }));
    };

    const removeDish = (dishId: string) => {
        setPathDishes(prev => {
            const dishToRemove = currentDishes.find(dish => dish.id === dishId);
            if (dishToRemove?.isDefault) {
                console.warn(`Cannot remove default dish: ${dishToRemove.name}`);
                return prev;
            }
            return {
                ...prev,
                [currentPath]: currentDishes.filter(dish => dish.id !== dishId)
            };
        });
    };

    const updateDish = (dishId: string, updatedDish: Partial<DishData>) => {
        setPathDishes(prev => ({
            ...prev,
            [currentPath]: currentDishes.map(dish =>
                dish.id === dishId
                    ? { ...dish, ...updatedDish }
                    : dish
            )
        }));
    };

    const resetToDefault = () => {
        setPathDishes(prev => ({
            ...prev,
            [currentPath]: getDefaultDishes(currentPath)
        }));
    };

    const value: DishesContextType = {
        dishes: currentDishes,
        addDish,
        removeDish,
        updateDish,
        resetToDefault
    };

    return (
        <DishesContext.Provider value={value}>
            {children}
        </DishesContext.Provider>
    );
}

export function useDishes() {
    const context = useContext(DishesContext);
    if (context === undefined) {
        throw new Error('useDishes must be used within a DishesProvider');
    }
    return context;
}