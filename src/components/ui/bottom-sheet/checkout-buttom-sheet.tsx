'use client';

import { useOrder } from '@/contexts/order-context';
import { Button } from '../button';
import { Divider } from '../divider';
import { BottomSheet } from './bottom-sheet';
import { useWindowScroll } from '@/hooks/useWindowScroll';
import { useEffect, useState } from 'react';

interface CheckoutBottomSheetProps extends React.RefAttributes<HTMLDivElement> {
    isOpen?: boolean;
    onClose?: () => void;
}

export function CheckoutBottomSheet({
    isOpen = true,
    ...props
}: CheckoutBottomSheetProps) {
    const { getOrderDishesTotal } = useOrder();
    const [isExpanded, setIsExpanded] = useState<boolean>(false);
    const scrollDirection = useWindowScroll();

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
            <div className={`flex flex-col pt-2 text-sm text-[var(--color-grey-tertiary)]`}>
                
                {isExpanded &&
                    <div className={`${isExpanded ? 'animate-slide-up' : 'animate-slide-down'}`}>
                        <div className="flex flex-row justify-between">
                            <span>Total Dishes</span>
                            <span>{getOrderDishesTotal()}</span>
                        </div>
                        <div className="flex flex-row justify-between">
                            <span>SubTotal</span>
                            <span>80 ฿</span>
                        </div>
                    </div>}

                {isExpanded && <Divider className="my-4" />}

                <Button
                    type="primary"
                    size="md"
                    label="Checkout"
                    onClick={() => console.log('hello world')}
                />
            </div>
        </BottomSheet>
    );
}
