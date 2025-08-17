'use client';

import { useEffect, useState } from 'react';
import { ValidatorHelper } from '@/lib/validator-helper';
import { IconButton } from './icon-button';

interface CounterButtonProps {
    className?: string;
    rightDisabled?: boolean;
    leftDisabled?: boolean;
    callback?: () => void;
    initialQuantity: number;
    iconSize?: 'auto' | 'full';
    onQuantityChange?: (quantity: number) => void;
}

export function CounterButton({ ...props }: CounterButtonProps) {
    const [quantity, setQuantity] = useState(props.initialQuantity);
    const [inputValue, setInputValue] = useState(props.initialQuantity.toString());

    const validator = new ValidatorHelper(0, 999);

    useEffect(() => {
        setQuantity(props.initialQuantity);
        setInputValue(props.initialQuantity.toString());
    }, [props.initialQuantity]);


    const handleDecrease = () => {
        const newQuantity = validator.validateAndClean(quantity - 1);
        setQuantity(newQuantity);
        setInputValue(newQuantity.toString());
        props.onQuantityChange?.(newQuantity);
    };

    const handleIncrease = () => {
        const newQuantity = validator.validateAndClean(quantity + 1);
        setQuantity(newQuantity);
        setInputValue(newQuantity.toString());
        props.onQuantityChange?.(newQuantity);
    };

    const handleRemoveAll = () => {
        setQuantity(0);
        setInputValue('0');
        props.onQuantityChange?.(0);
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const numValue = validator.processStringInput(e.target.value);

        setInputValue(numValue.toString());
        setQuantity(numValue);
        props.onQuantityChange?.(numValue);
    };

    return (
        <div className="flex flex-row gap-1 items-center">
            {!props.leftDisabled && <IconButton
                type="tertiary"
                customSize="sm"
                disabled={quantity === 0}
                icon="check_indeterminate_small"
                onClick={handleDecrease}
                onLongPress={handleRemoveAll}
                className={props.iconSize === 'auto' ? 'w-auto' : 'w-full'}
            />}
            <input
                type="text"
                inputMode="numeric"
                value={inputValue}
                onChange={handleInputChange}
                className="w-[58px] px-2 py-2 h-[32px] text-center border border-[#E5E7EB] rounded-lg bg-white text-lg font-medium text-[var(--color-black-tertiary)] focus:outline-none focus:border-[#D1D5DC]"
                placeholder="0"
            />
            {!props.rightDisabled && <IconButton
                type="tertiary"
                customSize="sm"
                disabled={quantity === 999}
                icon="add"
                onClick={handleIncrease}
                onLongPress={handleRemoveAll}
                className={`${props.iconSize === 'auto' ? 'w-auto' : 'w-full'} p-1`}
            />}
        </div>
    )
}