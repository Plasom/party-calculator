'use client';

import { useState, useEffect, useRef } from 'react';
import { Button } from '../button';
import { BottomSheet } from './bottom-sheet';
import { Input } from '../input';
import { Divider } from '../divider';
import { useTranslations } from '@/i18n';

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
    const t = useTranslations();
    const [name, setName] = useState('');
    const inputRef = useRef<HTMLInputElement>(null);

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
            title={t.modal.addMember.header}
            description={t.modal.addMember.description}
        >
            <form onSubmit={handleSubmit} className="space-y-2">
                <Input
                    ref={inputRef}
                    id="memberName"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder={t.modal.addMember.input.placeHolder1}
                    autoFocus
                    maxLength={50}
                />

                <Divider />

                <div className="flex gap-3 pt-2">
                    <Button
                        type="primary"
                        customSize="md"
                        label={t.modal.button.add}
                        onClick={handleSubmit}
                        disabled={!name.trim()}
                        className="flex-1"
                    />
                </div>
            </form>
        </BottomSheet>
    );
}
