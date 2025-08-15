'use client';

import { useState, useEffect } from 'react';
import { Button } from '../button';
import { BottomSheet } from './bottom-sheet';
import { useDishes } from '@/contexts/dishes-context';
import { Divider } from '../divider';
import { CounterButton } from '../counter-button';
import { PriceBadge } from '../Badge/price-badge';
import { Input } from '../input';
import { Badge } from '../badge';

interface AddDishBottomSheetProps {
    isOpen: boolean;
    onClose: () => void;
    isEditMode?: boolean;
}

export function AddDishBottomSheet({
    isOpen,
    onClose,

}: AddDishBottomSheetProps) {
    const { addDish } = useDishes();

    const [price, setPrice] = useState<number>(0);
    const [idPrice, setIdPrice] = useState<number>(0);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [quantity, setQuantity] = useState<number>(1);

    const priceChoose: number[] = [40, 60, 70, 80, 100, 120, 150, 160, 450, 850]

    useEffect(() => {
        if (!isOpen) {
            setPrice(0);
            setCurrentPage(1);
            setQuantity(1);
        }
    }, [isOpen]);

    const handleAddCustomDish = (price: number, quantity: number) => {
        const newDish = {
            id: `custom-${Date.now()}`,
            url: "/images/sushiro_asset/dishes/custom/default.svg",
            label: `${price}.-`,
            textColor: "black" as const,
            isButton: true,
            initialQuantity: quantity,
            price: price,
            name: 'custom',
            isDefault: false
        };
        addDish(newDish);
    };

    const handleSubmit = (e?: React.FormEvent) => {
        e?.preventDefault();
        if (price && !isNaN(price) && quantity > 0) {
            handleAddCustomDish(price, quantity);
            onClose();
        }
    };

    const handleClose = () => {
        setCurrentPage(1);
        setPrice(0);
        setIdPrice(0);
        setQuantity(1);
        onClose();
    }

    const handleBackToPreviousPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
            // Only reset price and idPrice when going back, keep quantity
            setPrice(0);
            setIdPrice(0);
        }
    }

    const handleNextPage = () => {
        setCurrentPage(currentPage + 1);
    }

    const isFormValid = Boolean(price && !isNaN(price) && price > 0 && quantity > 0);

    // Page configurations - easily add more pages here
    const pageConfigs = {
        1: {
            title: "Select a Price",
            description: "Select a price, or tap 'other'."
        },
        2: {
            title: "Enter Custom Price", 
            description: "Enter a custom price for your dish."
        },
        3: {
            title: "Confirmation",
            description: "Review your selection before adding."
        },
        // Add more pages here as needed
        // 4: {
        //     title: "Additional Options",
        //     description: "Configure additional settings."
        // }
    };

    const currentConfig = pageConfigs[currentPage as keyof typeof pageConfigs] || pageConfigs[1];

    // Helper function to render current page
    const renderCurrentPage = () => {
        switch (currentPage) {
            case 1:
                return (
                    <Page1 
                        priceChoose={priceChoose}
                        idPrice={idPrice}
                        setPrice={setPrice}
                        setIdPrice={setIdPrice}
                        handleNextPage={handleNextPage}
                        handleSubmit={handleSubmit}
                        isFormValid={isFormValid}
                        quantity={quantity}
                        setQuantity={setQuantity}
                    />
                );
            case 2:
                return (
                    <Page2 
                        price={price}
                        setPrice={setPrice}
                        handleSubmit={handleSubmit}
                        handleNextPage={handleNextPage}
                        isFormValid={isFormValid}
                        quantity={quantity}
                        setQuantity={setQuantity}
                    />
                );
            case 3:
                return (
                    <Page3 
                        price={price}
                        handleSubmit={handleSubmit}
                        isFormValid={isFormValid}
                        quantity={quantity}
                        setQuantity={setQuantity}
                    />
                );
            // Add more cases here for additional pages
            // case 4:
            //     return <Page4 {...props} />;
            default:
                return (
                    <Page1 
                        priceChoose={priceChoose}
                        idPrice={idPrice}
                        setPrice={setPrice}
                        setIdPrice={setIdPrice}
                        handleNextPage={handleNextPage}
                        handleSubmit={handleSubmit}
                        isFormValid={isFormValid}
                        quantity={quantity}
                        setQuantity={setQuantity}
                    />
                );
        }
    };

    return (
        <BottomSheet
            isOpen={isOpen}
            onClose={handleClose}
            title={currentConfig.title}
            description={currentConfig.description}
            onBack={currentPage > 1 ? handleBackToPreviousPage : undefined}
        >
            {renderCurrentPage()}
        </BottomSheet>
    );
}

interface Page1Props {
    priceChoose: number[];
    idPrice: number;
    setPrice: (price: number) => void;
    setIdPrice: (id: number) => void;
    handleNextPage: () => void;
    handleSubmit: (e?: React.FormEvent) => void;
    isFormValid: boolean;
    quantity: number;
    setQuantity: (quantity: number) => void;
}

const Page1 = ({ 
    priceChoose, 
    idPrice, 
    setPrice, 
    setIdPrice, 
    handleNextPage, 
    handleSubmit, 
    isFormValid,
    quantity,
    setQuantity
}: Page1Props) => {
    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex items-center flex-wrap w-full gap-[7px]">
                {priceChoose.map((price: number, id: number) => {
                    return (
                        <PriceBadge
                            key={id}
                            isSelected={id === idPrice}
                            label={price.toString()}
                            value={price}
                            onClick={() => {
                                setPrice(price);
                                setIdPrice(id);
                            }}
                        />
                    );
                })}
                <Badge
                    className='bg-[var(--components-tag-secondary-bg)] cursor-pointer py-1.5 px-2 rounded-xl'
                    onClick={() => {
                        handleNextPage();
                    }}
                    variant='outline'
                >
                    <span className="text-sm">
                        Other
                    </span>
                </Badge>
            </div>

            <Divider />

            <div className="flex gap-3 pt-2">
                <CounterButton
                    initialQuantity={quantity}
                    iconSize='auto'
                    onQuantityChange={setQuantity}
                />
                <Button
                    type="primary"
                    customSize="md"
                    label="Add"
                    onClick={handleSubmit}
                    disabled={!isFormValid}
                    className="flex-1"
                />
            </div>
        </form>
    )
}

interface Page2Props {
    price: number;
    setPrice: (price: number) => void;
    handleSubmit: (e?: React.FormEvent) => void;
    handleNextPage: () => void;
    isFormValid: boolean;
    quantity: number;
    setQuantity: (quantity: number) => void;
}

const Page2 = ({ price, setPrice, handleSubmit, handleNextPage, isFormValid, quantity, setQuantity }: Page2Props) => {
    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <Input
                id="customPrice"
                type="number"
                value={price}
                onChange={(e) => setPrice(Number(e.target.value))}
                placeholder="e.g. 20, 60, 80, 100"
                autoFocus
                maxLength={50}
            />

            <Divider />

            <div className="flex gap-3 pt-2">
                <CounterButton
                    initialQuantity={quantity}
                    iconSize='auto'
                    onQuantityChange={setQuantity}
                />
                <Button
                    type="secondary"
                    customSize="md"
                    label="Next"
                    onClick={handleNextPage}
                    disabled={!isFormValid}
                    className="flex-1"
                />
                <Button
                    type="primary"
                    customSize="md"
                    label="Add"
                    onClick={handleSubmit}
                    disabled={!isFormValid}
                    className="flex-1"
                />
            </div>
        </form>
    )
}

interface Page3Props {
    price: number;
    handleSubmit: (e?: React.FormEvent) => void;
    isFormValid: boolean;
    quantity: number;
    setQuantity: (quantity: number) => void;
}

const Page3 = ({ price, handleSubmit, isFormValid, quantity, setQuantity }: Page3Props) => {
    return (
        <div className="space-y-4">
            <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="text-lg font-semibold mb-2">Review your selection</h3>
                <div className="flex justify-between items-center mb-2">
                    <span className="text-gray-600">Custom dish price:</span>
                    <span className="text-xl font-bold">{price}.-</span>
                </div>
                <div className="flex justify-between items-center">
                    <span className="text-gray-600">Quantity:</span>
                    <span className="text-xl font-bold">{quantity}</span>
                </div>
                <div className="flex justify-between items-center mt-2 pt-2 border-t border-gray-200">
                    <span className="text-gray-600 font-semibold">Total:</span>
                    <span className="text-xl font-bold text-green-600">{price * quantity}.-</span>
                </div>
            </div>

            <Divider />

            <div className="flex gap-3 pt-2">
                <CounterButton
                    initialQuantity={quantity}
                    iconSize='auto'
                    onQuantityChange={setQuantity}
                />
                <Button
                    type="primary"
                    customSize="md"
                    label="Confirm & Add"
                    onClick={handleSubmit}
                    disabled={!isFormValid}
                    className="flex-1"
                />
            </div>
        </div>
    )
}