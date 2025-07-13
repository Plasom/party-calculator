'use client';

import { useState } from 'react';
import { MemberBadge } from '@/components/ui/member-badge';
import { AddMemberBottomSheet } from '@/components/ui/add-member-bottom-sheet';
import { PageWithNav } from '@/components/templates/page-with-nav';
import { Section } from '@/components/templates/section';

interface Member {
  id: string;
  name: string;
}

export default function MembersPage() {
  const [members, setMembers] = useState<Member[]>([
    { id: '1', name: 'John Doe' },
    { id: '2', name: 'Jane Smith' }
  ]);
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);
  const [selectedMember, setSelectedMember] = useState<string | null>(null);

  const handleAddMember = (name: string) => {
    const newMember: Member = {
      id: Date.now().toString(),
      name: name
    };
    setMembers(prev => [...prev, newMember]);
  };

  const handleMemberClick = (memberId: string) => {
    setSelectedMember(selectedMember === memberId ? null : memberId);
  };

  return (
    <PageWithNav>
      <Section header="Select Members">
        <div className="p-4 space-y-4">
          <div className="flex flex-wrap gap-2">
            {members.map((member) => (
              <MemberBadge
                key={member.id}
                variant="outline"
                isSelected={selectedMember === member.id}
                onClick={() => handleMemberClick(member.id)}
                className="cursor-pointer"
              >
                {member.name}
              </MemberBadge>
            ))}
            
            {/* Add Member Badge */}
            <MemberBadge
              variant="outline"
              leftIcon="add"
              onClick={() => setIsBottomSheetOpen(true)}
              className="cursor-pointer border-dashed border-gray-400 text-gray-600 hover:border-gray-600"
            >
              Add Member
            </MemberBadge>
          </div>

          {selectedMember && (
            <div className="mt-4 p-3 bg-blue-50 rounded-lg">
              <p className="text-sm text-blue-700">
                Selected: {members.find(m => m.id === selectedMember)?.name}
              </p>
            </div>
          )}
        </div>
      </Section>

      <AddMemberBottomSheet
        isOpen={isBottomSheetOpen}
        onClose={() => setIsBottomSheetOpen(false)}
        onAddMember={handleAddMember}
      />
    </PageWithNav>
  );
}
