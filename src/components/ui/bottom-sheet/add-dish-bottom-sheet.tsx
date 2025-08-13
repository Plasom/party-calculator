'use client';

import { useState, useEffect } from 'react';
import { Button } from '../button';
import { BottomSheet } from './bottom-sheet';

interface AddDishBottomSheetProps {
    isOpen: boolean;
    onClose: () => void;
    onAddDish: (name: string, price: number) => void;
}

export function AddDishBottomSheet({
    isOpen,
    onClose,
    onAddDish
}: AddDishBottomSheetProps) {
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');

    useEffect(() => {
        if (!isOpen) {
            setName('');
            setPrice('');
        }
    }, [isOpen]);

    const handleSubmit = (e?: React.FormEvent) => {
        e?.preventDefault();
        if (name.trim() && price.trim() && !isNaN(Number(price))) {
            onAddDish(name.trim(), Number(price));
            onClose();
        }
    };

    const isFormValid = name.trim() && price.trim() && !isNaN(Number(price)) && Number(price) > 0;

    return (
        <BottomSheet
            isOpen={isOpen}
            onClose={onClose}
            title="Add custom dish"
            description="Create a new dish with custom price"
        >
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <input
                        id="dishName"
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Dish name"
                        className="w-full px-3 py-2 h-[48px] text-[16px] border border-[#E5E7EB] rounded-lg bg-white font-medium text-[var(--color-black-tertiary)] focus:outline-none focus:border-[#D1D5DC] placeholder:text-[#E5E7EB]"
                        autoFocus
                        maxLength={50}
                    />
                </div>

                <div>
                    <input
                        id="dishPrice"
                        type="number"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        placeholder="Price (บาท)"
                        min="1"
                        step="1"
                        className="w-full px-3 py-2 h-[48px] text-[16px] border border-[#E5E7EB] rounded-lg bg-white font-medium text-[var(--color-black-tertiary)] focus:outline-none focus:border-[#D1D5DC] placeholder:text-[#E5E7EB]"
                    />
                </div>

                <div className="h-px bg-gray-200 mx-4 my-2" />

                <div className="flex gap-3 pt-2">
                    <Button
                        type="primary"
                        buttonSize="md"
                        label="Add"
                        fontSize='font-medium'
                        textSize='text-xl'
                        onClick={handleSubmit}
                        disabled={!isFormValid}
                        className="flex-1"
                    />
                </div>
            </form>
        </BottomSheet>
    );
}
