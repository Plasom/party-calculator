'use client';

import { PageWithNav } from "@/components/templates/page-with-nav";
import { Section } from "@/components/templates/section";
import { AddMemberBottomSheet } from "@/components/ui/add-member-bottom-sheet";
import { MemberBadge } from "@/components/ui/member-badge"
import { useState } from "react";

interface IMember {
    id: string;
    name: string;
}

export default function SushiroPage() {
    const [members, setMembers] = useState<IMember[]>([]);
    const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);
    const [selectedMember, setSelectedMember] = useState<string | null>(null);

    const handleAddMember = (name: string) => {
        const names = name.split(',').map(n => n.trim()).filter(n => n.length > 0);

        setMembers(prev => {
            const newMembers = names.map((memberName, index) => ({
                id: (prev.length + index).toString(),
                name: memberName
            }));
            const updatedMembers = [...prev, ...newMembers];
            
            if (!selectedMember && updatedMembers.length > 0) {
                setSelectedMember(updatedMembers[0].id);
            }
            
            return updatedMembers;
        });
    }

    const handleMemberClick = (memberId: string) => {
        if (selectedMember === memberId) return;
        setSelectedMember(memberId);
    }

    return (
        <PageWithNav>
            <Section header="Who's eating?" description="Add members to track their dishes." className="pt-4">
                <div className="flex items-center justiry-center flex-wrap w-full gap-1.5">
                    <MemberBadge
                        variant="outline"
                        leftIcon="add"
                        className="text-sm"
                        onClick={() => setIsBottomSheetOpen(true)}>Member</MemberBadge>
                    {members && members.map((member: IMember) => {
                        return (
                            <MemberBadge
                                key={member.id}
                                variant="outline"
                                isSelected={selectedMember === member.id}
                                onClick={() => handleMemberClick(member.id)}
                                className="text-sm"
                            >
                                {member.name}
                            </MemberBadge>
                        );
                    })}
                </div>
            </Section>

            <AddMemberBottomSheet
                isOpen={isBottomSheetOpen}
                onClose={() => {
                    setIsBottomSheetOpen(false)
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                onAddMember={handleAddMember}
            />
        </PageWithNav>
    )
}