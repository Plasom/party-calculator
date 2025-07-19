'use client';

import { PageWithNav } from "@/components/templates/page-with-nav";
import { Section } from "@/components/templates/section";
import { AddMemberBottomSheet } from "@/components/ui/add-member-bottom-sheet";
import { MemberBadge } from "@/components/ui/member-badge"
import { useState } from "react";
import { useMember, IMember } from "@/contexts/member-context";
import Link from "next/link";

export default function SushiroPage() {
    const { members, selectedMember, addMember, selectMember } = useMember();
    const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);

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
                                onClick={() => selectMember(member.id)}
                                className="text-sm"
                            >
                                {member.name}
                            </MemberBadge>
                        );
                    })}
                </div>
            </Section>

            {/* Show current path for debugging */}
            <Section header="Debug Info" className="pt-4">
                <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                    <div className="flex justify-between items-center mb-2">
                        <div>
                            <p className="text-sm text-red-800">Current path: /sushiro</p>
                            <p className="text-sm text-red-800">Members count: {members.length}</p>
                            <p className="text-sm text-red-800">Selected: {selectedMember || 'None'}</p>
                        </div>
                        <Link 
                            href="/sushiro/summary"
                            className="px-3 py-1 bg-red-600 text-white text-sm rounded hover:bg-red-700 transition-colors"
                        >
                            View Summary
                        </Link>
                    </div>
                </div>
            </Section>

            <AddMemberBottomSheet
                isOpen={isBottomSheetOpen}
                onClose={() => {
                    setIsBottomSheetOpen(false)
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                onAddMember={addMember}
            />
        </PageWithNav>
    )
}