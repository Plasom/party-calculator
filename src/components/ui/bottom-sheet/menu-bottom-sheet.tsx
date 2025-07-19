'use client';

import { Button } from "../button";
import { BottomSheet } from "./bottom-sheet";


export interface MenuItem {
    label: string;
    onClick: () => void;
    textColor?: 'black' | 'red';
}

interface MenuBottomSheetProps {
    isOpen: boolean;
    onClose: () => void;
    menuItems?: MenuItem[];
}

function MenuItemButton({ label, onClick, textColor='black'}: MenuItem) {
    const textColorClass = {
        black: 'text-black',
        red: 'text-[var(--components-button-ghost-desctructive-text)]'
    };

    return (
        <button
            onClick={onClick}
            className={`w-full rounded-xl py-[14px] ${textColorClass[textColor]}`}
        >
            <span className={textColorClass[textColor]}>{label}</span>
        </button>
    );
}

export function MenuBottomSheet({
    isOpen,
    onClose,
    menuItems,
}: MenuBottomSheetProps) {

    return (
        <BottomSheet
            isOpen={isOpen}
            onClose={onClose}
            isTransparent={true}
            button='hidden'
            showHandle={false}
        >
            <div className="bg-[var(--components-button-quartiary-state-default)] rounded-xl w-full ">
                {menuItems?.map((item, index) => (
                    <div key={index}>
                        <MenuItemButton
                            key={index}
                            label={item.label}
                            onClick={() => {
                                item.onClick();
                                onClose();
                            }}
                            textColor={item.textColor}
                        />
                        {index < menuItems.length - 1 && (
                            <div className="h-px bg-gray-200" />
                        )}
                    </div>
                ))}
            </div>

            <div className="flex mt-3">
                <Button
                    type="quartiary"
                    size="md"
                    label="Cancel"
                    onClick={() => {
                        onClose();
                    }}
                    className="flex-1"
                />
            </div>
        </BottomSheet>
    );
}