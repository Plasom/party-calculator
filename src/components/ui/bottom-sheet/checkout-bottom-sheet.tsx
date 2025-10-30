'use client';

import { useOrder } from '@/contexts/order-context';
import { Button } from '../button';
import { Divider } from '../divider';
import { BottomSheet } from './bottom-sheet';
import { useWindowScroll } from '@/hooks/useWindowScroll';
import { useEffect, useState } from 'react';
import { useDishes } from '@/contexts/dishes-context';
import { useRouter } from 'next/navigation';
import { useTranslations } from '@/i18n';

interface CheckoutBottomSheetProps extends React.RefAttributes<HTMLDivElement> {
    isOpen?: boolean;
    onClose?: () => void;
    warningModal?: boolean;
}

export function CheckoutBottomSheet({
    isOpen = true,
    warningModal,
    ...props
}: CheckoutBottomSheetProps) {
    const t = useTranslations();
    const { getOrderTotalSummary } = useOrder();
    const { dishes } = useDishes();

    const [isExpanded, setIsExpanded] = useState<boolean>(false);

    const router = useRouter();
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
                    className={`overflow-hidden transition-all duration-300 ease-in-out ${isExpanded ? 'max-h-20 opacity-100' : 'max-h-0 opacity-0'
                        }`}
                >
                    <div className="flex flex-row justify-between">
                        <span className="text-left">{t.checkout.labels.totalDishes}</span>
                        <span className="text-right font-medium">{getOrderTotalSummary(dishes).totalDishes}</span>
                    </div>
                    <div className="flex flex-row justify-between">
                        <span>{t.checkout.labels.subtotal}</span>
                        <span>{getOrderTotalSummary(dishes).subTotalPrice} ฿</span>
                    </div>
                </div>

                <div className={`transition-opacity duration-300 ${isExpanded ? 'opacity-100' : 'opacity-0'
                    }`}
                >
                    {isExpanded && <Divider className="my-4" />}
                </div>

                <Button
                    type="primary"
                    customSize="md"
                    label={t.checkout.buttons.checkout}
                    onClick={() => !warningModal ? router.push('/sushiro/checkout') : undefined}
                />
            </div>
        </BottomSheet>
    );
}
