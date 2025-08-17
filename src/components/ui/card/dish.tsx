'use client';

import Image from "next/image";
import { useState, useEffect } from "react";
import { ValidatorHelper } from "@/lib/validator-helper";
import { useLongPress } from "@/hooks/useLongPress";
import { IconButton } from "../icon-button";
import { OrderItem } from "@/contexts/order-context";

export function CardDish({
    id,
    url,
    price,
    alt = 'Placeholder Image',
    onAdd,
    onClick,
    onLongPress,
    label,
    leftIcon,
    initialQuantity = 0,
    textColor = 'white',
    isButton = true
}: {
    id: string;
    price: number;
    url: string;
    alt?: string;
    onAdd?: (data: OrderItem) => void;
    onClick?: () => void;
    onLongPress?: () => void;
    label?: string;
    leftIcon?: string;
    initialQuantity?: number;
    textColor?: 'white' | 'black';
    isButton?: boolean;
}) {
    const [quantity, setQuantity] = useState(initialQuantity);
    const [inputValue, setInputValue] = useState(initialQuantity.toString());

    const validator = new ValidatorHelper(0, 999);

    const longPressHandlers = useLongPress({
        onLongPress,
        disabled: !onLongPress
    });

    useEffect(() => {
        setQuantity(initialQuantity);
        setInputValue(initialQuantity.toString());
    }, [initialQuantity]);

    const handleCardClick = () => {
        const newQuantity = validator.validateAndClean(quantity + 1);
        setQuantity(newQuantity);
        setInputValue(newQuantity.toString());
        onAdd?.({ id, price, count: newQuantity });
        onClick?.();
    };

    const handleDecrease = () => {
        const newQuantity = validator.validateAndClean(quantity - 1);
        setQuantity(newQuantity);
        setInputValue(newQuantity.toString());
        onAdd?.({ id, price, count: newQuantity });
    };

    const handleRemoveAll = () => {
        setQuantity(0);
        setInputValue('0');
        onAdd?.({ id, price, count: 0 });
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const numValue = validator.processStringInput(e.target.value);

        setInputValue(numValue.toString());
        setQuantity(numValue);
        onAdd?.({ id, price, count: numValue });
    };

    return (
        <div
            className="flex flex-col items-center px-5 py-4 w-fit h-fit gap-2 hover:bg-[var(--button-ghost-state-hovered)] rounded-2 cursor-pointer select-none"
        >
            <div
                className="flex w-[120px] h-[120px] relative items-center justify-center transition-transform duration-150 ease-out hover:scale-105 active:scale-95"
                onClick={handleCardClick}
                {...longPressHandlers}
            >
                <Image
                    src={url}
                    alt={alt}
                    loading="lazy"
                    fill
                    className="object-cover rounded-lg pointer-events-none"
                    priority={false}
                    draggable={false}
                />
                <p className={`flex items-center justify-center absolute text-lg font-semibold text-${textColor}`}>
                    {leftIcon && <span className="material-symbols-rounded">
                        {leftIcon}
                    </span>}
                    {label}
                </p>
            </div>

            {isButton && <div className="w-full flex flex-row gap-2 mt-5" onClick={(e) => e.stopPropagation()}>
                <IconButton
                    type="primary"
                    customSize="sm"
                    icon="check_indeterminate_small"
                    onClick={handleDecrease}
                    onLongPress={handleRemoveAll}
                    className="w-[54px]"
                />

                <input
                    type="text"
                    inputMode="numeric"
                    value={inputValue}
                    onChange={handleInputChange}
                    className="w-[58px] px-2 py-2 h-[32px] text-center border border-[#E5E7EB] rounded-lg bg-white text-lg font-medium text-[var(--color-black-tertiary)] focus:outline-none focus:border-[#D1D5DC]"
                    placeholder="0"
                />
            </div>}
        </div>
    )
}