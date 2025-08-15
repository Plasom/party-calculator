'use client';

import { useOrder } from '@/contexts/order-context';
import { Button } from '../button';
import { Divider } from '../divider';
import { BottomSheet } from './bottom-sheet';
import { useWindowScroll } from '@/hooks/useWindowScroll';
import { useEffect, useState } from 'react';
import { useDishes } from '@/contexts/dishes-context';

interface CheckoutBottomSheetProps extends React.RefAttributes<HTMLDivElement> {
    isOpen?: boolean;
    onClose?: () => void;
}

export function CheckoutBottomSheet({
    isOpen = true,
    ...props
}: CheckoutBottomSheetProps) {
    const { getOrderDishesTotal, getOrderPriceTotal } = useOrder();
    const { dishes } = useDishes();

    const [isExpanded, setIsExpanded] = useState<boolean>(false);
    const scrollDirection = useWindowScroll(5);

    useEffect(() => {
        if (scrollDirection === 'down') {
            setIsExpanded(false)
        } else {
            setIsExpanded(true);
        }
    }, [scrollDirection]);

    return (
        <BottomSheet
            isOpen={isOpen}
            button='hidden'
            disableBackground
            {...props}
        >
            <div className="flex flex-col text-sm text-[var(--color-grey-tertiary)]">
                <div 
                    className={`overflow-hidden transition-all duration-300 ease-in-out ${
                        isExpanded ? 'max-h-20 opacity-100' : 'max-h-0 opacity-0'
                    }`}
                >
                    <div className="pb-2">
                        <div className="flex flex-row justify-between py-1 min-h-[24px]">
                            <span className="text-left">Total Dishes</span>
                            <span className="text-right font-medium">{getOrderDishesTotal()}</span>
                        </div>
                        <div className="flex flex-row justify-between">
                            <span>SubTotal</span>
                            <span>{getOrderPriceTotal(dishes)} ฿</span>
                        </div>
                    </div>
                </div>

                <div className={`transition-opacity duration-300 ${
                        isExpanded ? 'opacity-100' : 'opacity-0'
                    }`}
                >
                    {isExpanded && <Divider className="my-4" />}
                </div>

                <Button
                    type="primary"
                    customSize="md"
                    label="Checkout"
                    onClick={() => console.log('hello world')}
                />
            </div>
        </BottomSheet>
    );
}
