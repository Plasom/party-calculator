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
import { DishData } from '@/data/dishes';
import { useMember } from '@/contexts/member-context';
import { useOrder } from '@/contexts/order-context';
import { ValidatorHelper } from '@/lib/validator-helper';
import { useTranslations } from '@/i18n';

interface AddDishBottomSheetProps {
    isOpen: boolean;
    onClose: () => void;
    isEditMode?: boolean;
}

export function AddDishBottomSheet({
    isOpen,
    onClose,

}: AddDishBottomSheetProps) {
    const t = useTranslations();
    const { addDish, dishes } = useDishes();
    const { selectedMember } = useMember();
    const { updateMemberOrder, memberOrders } = useOrder();

    const [price, setPrice] = useState<number>(0);
    const [idPrice, setIdPrice] = useState<number>(999);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [quantity, setQuantity] = useState<number>(0);

    const priceChoose: number[] = [40, 60, 70, 80, 100, 120, 150, 160, 450, 850]

    useEffect(() => {
        if (!isOpen) {
            setPrice(0);
            setIdPrice(999);
            setCurrentPage(1);
            setQuantity(0);
        }
    }, [isOpen]);

    const handleAddCustomDish = (price: number, quantity: number) => {
        const newDish: DishData = {
            id: `custom-${price}`,
            url: "/images/sushiro_asset/dishes/custom/default.svg",
            label: `${price}.-`,
            textColor: "black",
            isButton: true,
            price: price,
            amount: 0,
            name: 'custom',
            isDefault: false
        };

        const existingDish = dishes.find(dish => dish.price === newDish.price && dish.name === 'custom');
        const existingMember = memberOrders[selectedMember!.id]?.find(item => item.id === existingDish?.id);
        if (existingDish && existingMember) {
            updateMemberOrder(selectedMember!.id, { id: existingDish.id, price: existingDish.price, count: existingMember.count + quantity });
        } else {
            addDish(newDish);
            updateMemberOrder(selectedMember!.id, { id: newDish.id, price: newDish.price, count: quantity });
        }
    };

    const handleSubmit = (e?: React.FormEvent) => {
        e?.preventDefault();
        if (price && !isNaN(price) && quantity > 0) {
            handleAddCustomDish(price, quantity);
            onClose();
        }
    };

    const handleClose = () => {
        onClose();
    }

    const handleBackToPreviousPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
            setPrice(0);
            setIdPrice(0);
        }
    }

    const handleNextPage = () => {
        setCurrentPage(currentPage + 1);
    }

    const isFormValid = Boolean(price && !isNaN(price) && price > 0 && quantity > 0);

    const pageConfigs = {
        1: {
            title: t.modal.addDish.selectPrice.title,
            description: t.modal.addDish.selectPrice.description
        },
        2: {
            title: t.modal.addDish.enterPrice.title,
            description: t.modal.addDish.enterPrice.description
        },
    };

    const currentConfig = pageConfigs[currentPage as keyof typeof pageConfigs] || pageConfigs[1];

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
                        t={t}
                    />
                );
            case 2:
                return (
                    <Page2
                        price={price}
                        setPrice={setPrice}
                        handleSubmit={handleSubmit}
                        isFormValid={isFormValid}
                        quantity={quantity}
                        setQuantity={setQuantity}
                        t={t}
                    />
                );
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
                        t={t}
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
    t: any;
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
    setQuantity,
    t
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
                    className='bg-[var(--tag-secondary-bg)] cursor-pointer py-1.5 px-2 rounded-xl'
                    onClick={() => {
                        handleNextPage();
                    }}
                    variant='outline'
                >
                    <span className="text-sm">
                        {t.modal.addDish.other}
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
                    label={t.modal.button.add}
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
    isFormValid: boolean;
    quantity: number;
    setQuantity: (quantity: number) => void;
    t: any;
}

const Page2 = ({ price, setPrice, handleSubmit, isFormValid, quantity, setQuantity, t }: Page2Props) => {
    const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const validator = new ValidatorHelper(0, 9999);
        const numValue = validator.processStringInput(e.target.value);

        setPrice(numValue);
    };
    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <Input
                id="customPrice"
                type="text"
                inputMode="numeric"
                value={price}
                onChange={(e) => handleOnChange(e)}
                placeholder={t.modal.addDish.placeholder}
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
                    type="primary"
                    customSize="md"
                    label={t.modal.button.add}
                    onClick={handleSubmit}
                    disabled={!isFormValid}
                    className="flex-1"
                />
            </div>
        </form>
    )
}