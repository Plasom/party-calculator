'use client';

import { PageWithNav } from "@/components/templates/page-with-nav";
import { Section } from "@/components/templates/section";
import { AddMemberBottomSheet } from "@/components/ui/bottom-sheet/add-member-bottom-sheet";
import { AddDishBottomSheet } from "@/components/ui/bottom-sheet/add-dish-bottom-sheet";
import { MemberBadge } from "@/components/ui/member-badge";
import { CardList } from "@/components/ui/card/card-list";
import { CardDish } from "@/components/ui/card/dish";
import React, { useEffect, useState } from "react";
import { useMember, IMember } from "@/contexts/member-context";
import { useOrder } from "@/contexts/order-context";
import { useDishes } from "@/contexts/dishes-context";
import { MenuBottomSheet, MenuItem } from "@/components/ui/bottom-sheet/menu-bottom-sheet";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { IconButton } from "@/components/ui/icon-button";
import { AlertModal } from "@/components/ui/modal/alert-modal";

export default function SushiroPage() {
    const { members, selectedMember, selectedMemberName, addMember, changeMemberName, selectMember } = useMember();
    const { memberOrders, updateMemberOrder, getMemberOrderPrice } = useOrder();
    const { dishes, addDish } = useDishes();
    const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);
    const [isAddDishBottomSheetOpen, setIsAddDishBottomSheetOpen] = useState(false);
    const [isMenuBottomSheetOpen, setIsMenuBottomSheetOpen] = useState(false);
    const [selectedDishId, setSelectedDishId] = useState<string | null>(null);
    const [selectedMemberNameTemp, setSelectedMemberNameTemp] = useState<string | null>(null);
    const [isEditMode, setIsEditMode] = useState(false);
    const [isUnsavedModalOpen, setIsUnsavedModalOpen] = useState(false);
    const inputChangeNameRef = React.useRef<HTMLInputElement | null>(null);

    const handleDishAdd = (data: { id: string; count: number }) => {
        if (!selectedMember) return;

        updateMemberOrder(selectedMember, { id: data.id, count: data.count });
    };

    const handleDeleteDish = () => {
        if (!selectedMember || !selectedDishId) return;

        updateMemberOrder(selectedMember, { id: selectedDishId, count: 0 });
        setSelectedDishId(null);
    };

    const handleDishLongPress = (dishId: string) => {
        setSelectedDishId(dishId);
        setIsMenuBottomSheetOpen(true);
    };

    const handleCustomDishClick = () => {
        setIsAddDishBottomSheetOpen(true);
    };

    const handleAddCustomDish = (name: string, price: number) => {
        const newDish = {
            id: `custom-${Date.now()}`,
            url: "/images/sushiro_asset/dishes/custom/default.svg",
            label: `${price}.-`,
            textColor: "black" as const,
            isButton: true,
            initialQuantity: 0,
            price: price,
            name: name,
            isDefault: false
        };
        addDish(newDish);
    };

    const menuItems: MenuItem[] = [
        {
            label: "Delete plate",
            onClick: () => handleDeleteDish(),
            textColor: 'red'
        }
    ]

    const handleChangeMemberName = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (selectedMemberName !== e.target.value) {
            setIsEditMode(true)
        } else {
            setIsEditMode(false);
        }

        setSelectedMemberNameTemp(e.target.value);
    }

    const handleSubmitChangeMemberName = () => {
        changeMemberName(selectedMemberNameTemp!);
        setIsEditMode(false);
    }

    const handleCancelChangeMemberName = () => {
        setSelectedMemberNameTemp(selectedMemberName);
        setIsEditMode(false);
    }

    const handleLeaveInput = () => {
        if (isEditMode) {
            setIsUnsavedModalOpen(true);
        }
    }

    const unsavedChangeActionModal = () => {
        setSelectedMemberNameTemp(selectedMemberName);
        setIsUnsavedModalOpen(false);
        setIsEditMode(false);
    }

    const unsavedChangeCancelModal = () => {
        setIsUnsavedModalOpen(false);
        inputChangeNameRef.current?.focus();
    }

    useEffect(() => {
        setSelectedMemberNameTemp(selectedMember ? members.find(member => member.id === selectedMember)?.name || null : null);
    }, [selectedMember, members]);

    return (
        <PageWithNav>
            <Section
                header="Who's eating?"
                description="Add members to track their dishes."
                className="pt-4"
                showHeader={members.length === 0}
                showDescription={members.length === 0}
                ignoreClassName={members.length > 0}

            >
                {members.length > 0 &&
                    <div className="flex flex-row mb-4 gap-2 items-center">
                        <Input
                            id="memberName"
                            type="text"
                            value={selectedMemberNameTemp || ""}
                            customSize="xl"
                            onChange={(e) => handleChangeMemberName(e)}
                            autoFocus
                            maxLength={50}
                            className="truncate"
                            onBlur={handleLeaveInput}
                            ref={inputChangeNameRef}
                        />
                        <div className="flex flex-row gap-2" onMouseDown={(e) => e.preventDefault()}>
                            {isEditMode ?
                                <>
                                    <IconButton
                                        icon="check"
                                        onClick={handleSubmitChangeMemberName}
                                        color="white"
                                        bgColor="black"
                                        disable={selectedMemberNameTemp === ""}
                                    />
                                    <Button
                                        type="ghost"
                                        size="xs"
                                        label="cancel"
                                        onClick={handleCancelChangeMemberName}
                                    />
                                </>
                                :
                                <span className="material-symbols-rounded cursor-pointer" style={{ fontSize: 32, color: 'var(--color-rose-700)' }}>
                                    delete
                                </span>}
                        </div>
                    </div>}
                <div className="flex items-center flex-wrap w-full gap-1.5">
                    <MemberBadge
                        variant="outline"
                        leftIcon="add"
                        className="text-sm"
                        label="Member"
                        onClick={() => setIsBottomSheetOpen(true)}
                    />
                    {members && members.map((member: IMember) => {
                        const memberPrice = getMemberOrderPrice(member.id, dishes);
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
                    {dishes.map((dish) => {
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
                                onClick={dish.isButton ? undefined : handleCustomDishClick}
                                onLongPress={dish.isButton ? () => handleDishLongPress(dish.id) : undefined}
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

            <AddDishBottomSheet
                isOpen={isAddDishBottomSheetOpen}
                onClose={() => {
                    setIsAddDishBottomSheetOpen(false);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                onAddDish={handleAddCustomDish}
            />

            <MenuBottomSheet
                isOpen={isMenuBottomSheetOpen}
                onClose={() => setIsMenuBottomSheetOpen(false)}
                menuItems={menuItems}
            />

            <AlertModal
                id="unsaved-changes"
                isOpen={isUnsavedModalOpen}
                onAction={unsavedChangeActionModal}
                onCancel={unsavedChangeCancelModal}
                title="Unsaved changes"
                message="Changes you made may not be saved. Are you sure you want to leave?"
                actionText="Leave"
            />
        </PageWithNav>
    )
}