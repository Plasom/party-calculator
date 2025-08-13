'use client';

import { Button } from "../button";
import { BottomSheet } from "./bottom-sheet";


export interface MenuItem {
    label: string;
    onClick: () => void;
    textColor?: string;
    isShow?: boolean;
}

interface MenuBottomSheetProps {
    isOpen: boolean;
    onClose: () => void;
    menuItems?: MenuItem[];
}

function MenuItemButton({ label, onClick, textColor }: MenuItem) {
    return (
        <>
            <Button
                type="ghost"
                customSize="md"
                customFontSize="sm"
                label={label}
                onClick={() => {
                    onClick();
                }}
                textColor={textColor}
                className="w-full"
            />
        </>
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
            <div className="bg-[var(--components-button-quartiary-state-default)] rounded-xl w-full">
                {menuItems?.map((item, index) => (
                    <div key={index}>
                        {item.isShow && <MenuItemButton
                            key={index}
                            label={item.label}
                            onClick={() => {
                                item.onClick();
                                onClose();
                            }}
                            isShow={item.isShow}
                            textColor={item.textColor}
                        />}
                        {index < menuItems.filter(item => item.isShow).length - 1 && (
                            <div className="h-px bg-gray-200" />
                        )}
                    </div>
                ))}
            </div>

            <div className="flex mt-3">
                <Button
                    type="quartiary"
                    customSize="md"
                    customFontSize="sm"
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