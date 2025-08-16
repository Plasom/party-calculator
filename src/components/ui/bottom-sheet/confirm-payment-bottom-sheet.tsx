'use client';

import { useState } from 'react';
import { Button } from '../button';
import { Divider } from '../divider';
import { BottomSheet } from './bottom-sheet';
import { Input } from '../input';
import { NumberHelper } from '@/lib/number-helper';
import { ValidatorHelper } from '@/lib/validator-helper';

interface ConfirmPaymentBottomSheetProps extends React.RefAttributes<HTMLDivElement> {
    isOpen?: boolean;
}

export function ConfirmPaymentBottomSheet({
    isOpen = true,
}: ConfirmPaymentBottomSheetProps) {
    const [isExpanded, setIsExpanded] = useState<boolean>(false);
    const [paymentMethod, setPaymentMethod] = useState<string>('');
    const [isError, setIsError] = useState<boolean>(false);
    const [isButtonDisabled, setIsButtonDisabled] = useState<boolean>(true);

    const handleSubmit = (e?: React.FormEvent) => {
        e?.preventDefault();
        let isValid = false;

        if (paymentMethod.length === 13) {
            isValid = ValidatorHelper.validateIdCard(paymentMethod);
        } else if (paymentMethod.length === 10) {
            isValid = paymentMethod.startsWith('0')
        }

        if (isValid) {
            setIsError(false);
            // go next page
        } else {
            setIsError(true);
        }
    }

    const handleExpand = () => {
        setIsError(false);
        setIsExpanded(!isExpanded);
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        let isValid = false;
        setPaymentMethod(NumberHelper.cleanString(value));

        if (value.length === 13  && !value.startsWith('0')) isValid = true;
        if (value.length === 10 && value.startsWith('0')) isValid = true;

        setIsButtonDisabled(!isValid);
    }

    return (
        <BottomSheet
            isOpen={isOpen}
            button={isExpanded ? 'cancel' : 'hidden'}
            title={isExpanded ? 'Enter PromptPay' : ''}
            onClose={() => handleExpand()}
            disableBackground
        >
            <form onSubmit={handleSubmit} className="flex flex-col text-sm">
                    <div
                        className={`overflow-hidden transition-all duration-300 ease-in-out ${isExpanded ? 'max-h-auto opacity-100' : 'max-h-0 opacity-0'
                            }`}
                    >
                        {isExpanded &&
                            <>
                                <Input
                                    type="text"
                                    inputMode="numeric"
                                    placeholder="e.g. 08x-xxx-xxxx"
                                    value={paymentMethod}
                                    onChange={handleInputChange}
                                />
                                {<span className={`text-rose-700 text-sm ${isError ? 'opacity-100' : 'opacity-0'}`}>PromptPay ID not found. please try again.</span>}

                                <Divider className="my-4" />
                            </>}
                    </div>

                    <Button
                        type="primary"
                        customSize="md"
                        label="Checkout"
                        onClick={isExpanded ? () => handleSubmit() : () => setIsExpanded(true)}
                        disabled={isExpanded && isButtonDisabled}
                    />
            </form>
        </BottomSheet>
    );
}
