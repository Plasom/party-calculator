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
            <div className={`flex flex-col text-sm text-[var(--color-grey-tertiary)]`}>
                {isExpanded &&
                    <div className={`${isExpanded ? 'animate-slide-up' : 'animate-slide-down'}`}>
                        <div className="flex flex-row justify-between">
                            <span>Total Dishes</span>
                            <span>{getOrderDishesTotal()}</span>
                        </div>
                        <div className="flex flex-row justify-between">
                            <span>SubTotal</span>
                            <span>{getOrderPriceTotal(dishes)} ฿</span>
                        </div>
                    </div>}

                {isExpanded && <Divider className="my-4" />}

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
