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
        const newMember: IMember = {
            id: Date.now().toString(),
            name: name
        };

        setMembers(prev => [...prev, newMember]);
    }

    const handleMemberClick = (memberId: string) => {
        setSelectedMember(selectedMember === memberId ? null : memberId);
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
                onClose={() => setIsBottomSheetOpen(false)}
                onAddMember={handleAddMember}
            />
        </PageWithNav>
    )
}