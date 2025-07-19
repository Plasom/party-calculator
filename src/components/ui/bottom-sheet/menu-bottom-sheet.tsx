'use client';

import { useState, useEffect } from 'react';
import { BottomSheet } from './bottom-sheet';
import { Button } from '../button';

interface MenuBottomSheetProps {
    isOpen: boolean;
    onClose: () => void;

}

export function MenuBottomSheet({
    isOpen,
    onClose,
}: MenuBottomSheetProps) {
    const [name, setName] = useState('');

    useEffect(() => {
        if (!isOpen) {
            setName('');
        }
    }, [isOpen]);

    return (
        <BottomSheet
            isOpen={isOpen}
            onClose={onClose}
            isTransparent={true}
            button='hidden'
            showHandle={false}
        >
            <div className="flex gap-3 pt-2">
                <Button
                    type="quartiary"
                    size="md"
                    label="Add"
                    onClick={() => console.log('Add button clicked')}
                    className="flex-1"
                />
            </div>
        </BottomSheet>
    );
}
