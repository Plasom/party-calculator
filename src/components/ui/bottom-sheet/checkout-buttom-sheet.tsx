'use client';

import { useOrder } from '@/contexts/order-context';
import { Button } from '../button';
import { Divider } from '../divider';
import { BottomSheet } from './bottom-sheet';

interface CheckoutBottomSheetProps extends React.RefAttributes<HTMLDivElement> {
    isOpen?: boolean;
    onClose?: () => void;
}

export function CheckoutBottomSheet({
    isOpen = true,
    ...props
}: CheckoutBottomSheetProps) {
    const { getOrderTotal } = useOrder();

    console.log(getOrderTotal());

    return (
        <BottomSheet
            isOpen={isOpen}
            button='hidden'
            disableBackground
            {...props}
        >
            <div className="flex flex-col pt-2 text-sm text-[var(--color-grey-tertiary)]">
                <div className="flex flex-row justify-between">
                    <span>Total Dishes</span>
                    <span>2</span>
                </div>
                <div className="flex flex-row justify-between">
                    <span>SubTotal</span>
                    <span>80 ฿</span>
                </div>

                <Divider className="my-4" />
                
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
