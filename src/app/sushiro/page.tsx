'use client';

import { PageWithNav } from "@/components/templates/page-with-nav";
import { Section } from "@/components/templates/section";
import { AddMemberBottomSheet } from "@/components/ui/bottom-sheet/add-member-bottom-sheet";
import { AddDishBottomSheet } from "@/components/ui/bottom-sheet/add-dish-bottom-sheet";
import { MemberBadge } from "@/components/ui/member-badge";
import { CardList } from "@/components/ui/card/card-list";
import { CardDish } from "@/components/ui/card/dish";
import React, { useEffect, useRef, useState } from "react";
import { useMember, IMember } from "@/contexts/member-context";
import { useOrder } from "@/contexts/order-context";
import { useDishes } from "@/contexts/dishes-context";
import { MenuBottomSheet, MenuItem } from "@/components/ui/bottom-sheet/menu-bottom-sheet";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { IconButton } from "@/components/ui/icon-button";
import { AlertModal, DeleteModal } from "@/components/ui/modal/alert-modal";
import { CardSummary } from "@/components/ui/card/summary";
import { CheckoutBottomSheet } from "@/components/ui/bottom-sheet/checkout-buttom-sheet";

export default function SushiroPage() {
    // Hooks
    const { members, selectedMember, addMember, changeMemberName, selectMember, removeMember } = useMember();
    const { memberOrders, updateMemberOrder, getMemberOrderPrice, clearMemberOrders, getOrderDishesTotal } = useOrder();
    const { dishes, addDish, removeDish } = useDishes();

    // State
    const [isBottomSheetOpen, setIsBottomSheetOpen] = useState<boolean>(false);
    const [isAddDishBottomSheetOpen, setIsAddDishBottomSheetOpen] = useState<boolean>(false);
    const [isMenuBottomSheetOpen, setIsMenuBottomSheetOpen] = useState<boolean>(false);
    const [isEditMode, setIsEditMode] = useState<boolean>(false);
    const [selectedDishId, setSelectedDishId] = useState<string | null>(null);
    const [selectedMemberNameTemp, setSelectedMemberNameTemp] = useState<string | null>(null);

    // Modal State
    const [isUnsavedModalOpen, setIsUnsavedModalOpen] = useState<boolean>(false);
    const [isDeleteMemberModalOpen, setIsDeleteMemberModalOpen] = useState<boolean>(false);

    // Refs
    const inputChangeNameRef = useRef<HTMLInputElement | null>(null);
    const checkoutBottomSheetRef = useRef<HTMLDivElement | null>(null);

    // Custom hooks
    const orderTotal = getOrderDishesTotal();
    const isCheckoutOpen = !isBottomSheetOpen && !isAddDishBottomSheetOpen && !isMenuBottomSheetOpen && (orderTotal > 0);

    // Object Arrays
    const menuItems: MenuItem[] = [
        {
            label: "Split plate",
            onClick: () => console.log('Split plate clicked'),
            isShow: true
        },
        {
            label: "Delete plate",
            onClick: () => handleDeleteDish(),
            textColor: 'text-[var(--components-button-ghost-desctructive-text)]',
            isShow: !!selectedDishId && dishes.some(dish => dish.id === selectedDishId && !dish.isDefault)
        }
    ]

    // Function & Action
    const handleDishAdd = (data: { id: string; count: number }) => {
        if (!selectedMember) return;

        updateMemberOrder(selectedMember.id, { id: data.id, count: data.count });
    };

    const handleDeleteDish = () => {
        if (!selectedMember || !selectedDishId) return;

        const dishToDelete = dishes.find(dish => dish.id === selectedDishId);
        
        if (dishToDelete && !dishToDelete.isDefault) {
            removeDish(selectedDishId);
        }
        
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

    const handleChangeMemberName = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (selectedMember?.name !== e.target.value) {
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
        setSelectedMemberNameTemp(selectedMember!.name);
        setIsEditMode(false);
    }

    const handleLeaveInput = () => {
        if (isEditMode) {
            setIsUnsavedModalOpen(true);
        }
    }

    const unsavedChangeActionModal = () => {
        setSelectedMemberNameTemp(selectedMember!.name);
        setIsUnsavedModalOpen(false);
        setIsEditMode(false);
    }

    const unsavedChangeCancelModal = () => {
        setIsUnsavedModalOpen(false);
        inputChangeNameRef.current?.focus();
    }

    const handleRemoveMember = () => {
        if (!selectedMember) return;

        removeMember(selectedMember.id);
        clearMemberOrders(selectedMember.id);
        setIsDeleteMemberModalOpen(false);
    }

    // useEffect
    useEffect(() => {
        setSelectedMemberNameTemp(selectedMember?.name || null);
    }, [selectedMember, members]);

    return (
        <PageWithNav style={{ marginBottom: isCheckoutOpen ? 100 : 0 }}>
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
                                        type="primary"
                                        customSize="sm"
                                        onClick={handleSubmitChangeMemberName}
                                        disabled={selectedMemberNameTemp === ""}
                                    />
                                    <Button
                                        type="ghost"
                                        customSize="xs"
                                        label="cancel"
                                        onClick={handleCancelChangeMemberName}
                                    />
                                </>
                                :
                                <IconButton
                                    icon="delete"
                                    type="ghost-desctructive"
                                    customSize="md"
                                    onClick={() => setIsDeleteMemberModalOpen(true)}
                                    fill
                                />}
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
                        const isSelected = selectedMember?.id === member.id;

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
                        const currentMemberOrder = selectedMember && memberOrders[selectedMember.id]
                            ? memberOrders[selectedMember.id].find(item => item.id === dish.id)
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

            <Section>
                header = "Added item list"
                className="pt-4"
                <CardSummary>
                    
                </CardSummary>
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

            <DeleteModal
                id="delete-member"
                isOpen={isDeleteMemberModalOpen}
                onDelete={handleRemoveMember}
                onCancel={() => setIsDeleteMemberModalOpen(false)}
                title="Delete member?"
                message="This will permanently remove the member and their plates. Delete?"
            />

            <CheckoutBottomSheet
                ref={checkoutBottomSheetRef}
                isOpen={isCheckoutOpen}
            />
        </PageWithNav>
    )
}