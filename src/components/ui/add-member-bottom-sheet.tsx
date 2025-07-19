'use client';

import { useState, useEffect } from 'react';
import { Button } from './button';

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

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (name.trim()) {
            onAddMember(name.trim());
            onClose();
        }
    };

    const handleBackdropClick = (e: React.MouseEvent) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    if (!isOpen) return null;

    return (
        <div
            className="fixed inset-0 z-50 bg-black/50 flex items-end justify-center"
            onClick={handleBackdropClick}
        >
            <div
                className={`bg-white rounded-t-3xl w-full max-w-md px-6 pb-6 pt-3 transform transition-transform duration-300 ease-out ${isOpen ? 'animate-slide-up' : 'animate-slide-down'
                    }`}
            >
                <div className="w-12 h-1 bg-gray-300 rounded-full mx-auto mb-4" />

                <div className="flex flex-row items-start justify-between ">
                    <div className="">
                        <h2 className="text-2xl font-semibold text-gray-900">Add Member</h2>
                        <p className="text-gray-500 text-sm mt-1">Use a comma for multiple names</p>
                    </div>
                    <Button
                        type="secondary"
                        size="sm"
                        label="Cancel"
                        onClick={onClose}
                        className="text-gray-500 hover:text-gray-700"
                    />
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <input
                        id="memberName"
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="e.g. John, Bob, Alice"
                        className="mt-4 w-full px-3 py-2 h-[48px] text-[16px] border border-[#E5E7EB] rounded-lg bg-white font-medium text-[var(--color-black-tertiary)] focus:outline-none focus:border-[#D1D5DC] placeholder:text-[#E5E7EB]"
                        autoFocus
                        maxLength={50}
                    />

                    <div className="h-px bg-gray-200 mx-4 my-2" />

                    <div className="flex gap-3 pt-2">
                        <Button
                            type="primary"
                            size="md"
                            label="Add"
                            onClick={() => handleSubmit({ preventDefault: () => { } } as React.FormEvent)}
                            disabled={!name.trim()}
                            className="flex-1"
                        />
                    </div>
                </form>
            </div>
        </div>
    );
}
