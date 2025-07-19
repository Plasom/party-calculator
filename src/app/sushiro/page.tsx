'use client';

import { PageWithNav } from "@/components/templates/page-with-nav";
import { Section } from "@/components/templates/section";
import { AddMemberBottomSheet } from "@/components/ui/add-member-bottom-sheet";
import { MemberBadge } from "@/components/ui/member-badge";
import { CardList } from "@/components/ui/card/card-list";
import { CardDish } from "@/components/ui/card/dish";
import { useState } from "react";
import { useMember, IMember } from "@/contexts/member-context";
import { useOrder } from "@/contexts/order-context";
import { sushiroDishes } from "@/data/dishes";

export default function SushiroPage() {
    const { members, selectedMember, addMember, selectMember } = useMember();
    const { memberOrders, updateMemberOrder, getMemberOrderPrice } = useOrder();
    const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);

    const handleDishAdd = (data: { id: string; count: number }) => {
        if (!selectedMember) return; // ถ้าไม่มีสมาชิกที่เลือกให้หยุด

        updateMemberOrder(selectedMember, { id: data.id, count: data.count });
    };

    return (
        <PageWithNav>
            <Section header="Who's eating?" description="Add members to track their dishes." className="pt-4">
                <div className="flex items-center flex-wrap w-full gap-1.5">
                    <MemberBadge
                        variant="outline"
                        leftIcon="add"
                        className="text-sm"
                        label="Add Member"
                        onClick={() => setIsBottomSheetOpen(true)}
                    />
                    {members && members.map((member: IMember) => {
                        const memberPrice = getMemberOrderPrice(member.id, sushiroDishes);
                        const isSelected = selectedMember === member.id;

                        return (
                            <MemberBadge
                                key={member.id}
                                variant="outline"
                                isSelected={isSelected}
                                onClick={() => selectMember(member.id)}
                                className="text-sm"
                                memberName={member.name}
                                memberPrice={memberPrice > 0 ? String(memberPrice) : ""}
                            />
                        );
                    })}
                </div>
            </Section>

            <Section
                header="Add a plate"
                className="pt-4"
                disable={!selectedMember}
            >
                <CardList>
                    {sushiroDishes.map((dish) => {
                        const currentMemberOrder = selectedMember && memberOrders[selectedMember]
                            ? memberOrders[selectedMember].find(item => item.id === dish.id)
                            : null;
                        const currentQuantity = currentMemberOrder ? currentMemberOrder.count : 0;

                        return (
                            <CardDish
                                key={`${dish.id}-${selectedMember || 'no-member'}`}
                                id={dish.id}
                                url={dish.url}
                                label={dish.label}
                                textColor={dish.textColor as "white" | "black"}
                                leftIcon={dish.leftIcon}
                                isButton={dish.isButton}
                                initialQuantity={currentQuantity}
                                onAdd={dish.isButton ? handleDishAdd : undefined}
                                onClick={dish.isButton ? undefined : () => console.log(`Custom dish clicked`)}
                            />
                        );
                    })}
                </CardList>
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