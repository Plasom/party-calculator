'use client';

import { useState, useEffect } from 'react';
import { Button } from '../button';
import { BottomSheet } from './bottom-sheet';
import { Input } from '../input';
import { Divider } from '../divider';

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
            <form onSubmit={handleSubmit} className="space-y-2">
                <Input 
                    id="memberName"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. John, Bob, Alice"
                    autoFocus
                    maxLength={50}
                />

                <Divider />

                <div className="flex gap-3 pt-2">
                    <Button
                        type="primary"
                        buttonSize="md"
                        label="Add"
                        fontSize='font-medium'
                        textSize='text-xl'
                        onClick={handleSubmit}
                        disabled={!name.trim()}
                        className="flex-1"
                    />
                </div>
            </form>
        </BottomSheet>
    );
}
