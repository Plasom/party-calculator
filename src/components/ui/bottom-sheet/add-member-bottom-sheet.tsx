'use client';

import { useState, useEffect } from 'react';
import { Button } from '../button';
import { BottomSheet } from './bottom-sheet';

interface AddMemberBottomSheetProps {
    isOpen: boolean;
    onClose: () => void;
    onAddMember: (name: string) => void;
}

export function AddMemberBottomSheet({
    isOpen,
    onClose,
    onAddMember
}: AddMemberBottomSheetProps) {
    const [name, setName] = useState('');

    useEffect(() => {
        if (!isOpen) {
            setName('');
        }
    }, [isOpen]);

    const handleSubmit = (e?: React.FormEvent) => {
        e?.preventDefault();
        if (name.trim()) {
            onAddMember(name.trim());
            onClose();
        }
    };

    return (
        <BottomSheet
            isOpen={isOpen}
            onClose={onClose}
            title="Add members"
            description="Use a comma for multiple names"
        >
            <form onSubmit={handleSubmit} className="space-y-4">
                <input
                    id="memberName"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. John, Bob, Alice"
                    className="w-full px-3 py-2 h-[48px] text-[16px] border border-[#E5E7EB] rounded-lg bg-white font-medium text-[var(--color-black-tertiary)] focus:outline-none focus:border-[#D1D5DC] placeholder:text-[#E5E7EB]"
                    autoFocus
                    maxLength={50}
                />

                <div className="h-px bg-gray-200 mx-4 my-2" />

                <div className="flex gap-3 pt-2">
                    <Button
                        type="primary"
                        size="md"
                        label="Add"
                        onClick={handleSubmit}
                        disabled={!name.trim()}
                        className="flex-1"
                    />
                </div>
            </form>
        </BottomSheet>
    );
}
