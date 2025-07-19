'use client';

import { Button } from "../button";
import { BottomSheet } from "./bottom-sheet";


interface MenuItem {
    label: string;
    onClick: () => void;
}

interface MenuBottomSheetProps {
    isOpen: boolean;
    onClose: () => void;
    menuItems?: MenuItem[];
}

function MenuItemButton({ label, onClick }: MenuItem) {
    return (
        <button
            onClick={onClick}
            className="w-full rounded-xl py-[14px] text-[var(--color-black-tertiary)]"
        >
            {label}
        </button>
    );
}

export function MenuBottomSheet({
    isOpen,
    onClose,
    menuItems
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
                        />
                        {index < menuItems.length - 1 && (
                            <div className="h-px bg-gray-200" />
                        )}
                    </div>
                ))}
            </div>

            <div className="flex gap-3 pt-2 mt-3">
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