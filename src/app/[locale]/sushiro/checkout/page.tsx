'use client';

import { PageWithNav } from "@/components/templates/page-with-nav";
import { Section } from "@/components/templates/section";
import { IconButton } from "@/components/ui/icon-button";
import { useDishes } from "@/contexts/dishes-context";
import { useMember } from "@/contexts/member-context";
import { useOrder } from "@/contexts/order-context";
import { SortHelper } from "@/lib/sort-helper";
import { NumberHelper } from "@/lib/number-helper";
import { Fragment, useState } from "react";
import { ConfirmPaymentBottomSheet } from "@/components/ui/bottom-sheet/confirm-payment-bottom-sheet";

export default function CheckoutPage() {
    const [isOpenTotal, setIsOpenTotal] = useState<boolean>(false);
    const [isOpenEachBill, setIsOpenEachBill] = useState<boolean>(true);
    const [expandedMembers, setExpandedMembers] = useState<Set<string>>(new Set());

    const { getOrderTotalSummary, getAllMembersWithOrders, getOrderMemberSummary } = useOrder();
    const { dishes } = useDishes();
    const { members } = useMember();

    const handleMemberClick = (memberId: string) => {
        setExpandedMembers(prev => {
            const newSet = new Set(prev);
            if (newSet.has(memberId)) {
                newSet.delete(memberId);
            } else {
                newSet.add(memberId);
            }
            return newSet;
        });
    };

    return (
        <PageWithNav style={{ paddingBottom: 120 }}>
            <Section
                header="Group bill summary"
                className="pt-4"
            >
                <div className="flex flex-row justify-between text-[var(--color-black-tertiary)] font-medium hover:cursor-pointer" onClick={() => setIsOpenTotal(!isOpenTotal)}>
                    <p className="text-xl">Total summary</p>
                    <div className="flex flex-row items-center">
                        {!isOpenTotal && <p className="text-base">{NumberHelper.toFixed(getOrderTotalSummary(dishes).totalPrice, 2)}฿</p>}
                        <IconButton
                            icon={isOpenTotal ? "keyboard_arrow_up" : "keyboard_arrow_down"}
                            type="ghost"
                            customSize="sm"
                        />
                    </div>
                </div>

                <div className={`overflow-hidden transition-all duration-300 ease-in-out ${isOpenTotal ? 'max-h-auto opacity-100 pt-2' : 'max-h-0 opacity-0 py-0'}`}>
                    <div className="text-[var(--color-grey-tertiary)]">
                        <div className="flex flex-row justify-between">
                            <p>Total dishes</p>
                            <p className="font-medium">{getOrderTotalSummary(dishes).totalDishes}</p>
                        </div>
                        <div className="flex flex-row justify-between">
                            <p>Service charge (10.00%)</p>
                            <p className="font-medium">{NumberHelper.toFixed(getOrderTotalSummary(dishes).serviceCharge, 2)}฿</p>
                        </div>
                        <div className="flex flex-row justify-between">
                            <p>Total (incl. service fee)</p>
                            <p className="font-medium">{NumberHelper.toFixed(getOrderTotalSummary(dishes).totalPrice, 2)}฿</p>
                        </div>
                    </div>

                    <div className="pt-2">
                        <table className="w-full table-fixed border-collapse text-xs">
                            <thead>
                                <tr className="border-b-[0.5px] text-[var(--color-black-primary)]">
                                    <th className="text-left font-normal py-2 px-1">Type</th>
                                    <th className="text-center font-normal py-2 px-1">Qty</th>
                                    <th className="text-right font-normal py-2 px-1">Price/Unit</th>
                                    <th className="text-right font-normal py-2 px-1">Subtotal</th>
                                </tr>
                            </thead>
                            <tbody>
                                {getOrderTotalSummary(dishes).dishes.map(dish => (
                                    <tr key={dish.id} className="border-b-[0.5px] text-[var(--color-black-tertiary)]">
                                        <td className="text-left font- py-2 px-1">{dish.id.includes('custom') ? 'Custom' : 'Normal'}</td>
                                        <td className="text-center py-2 px-1">x{dish.amount}</td>
                                        <td className="text-right py-2 px-1">{dish.price}฿</td>
                                        <td className="text-right py-2 px-1">{dish.price! * dish.amount!}฿</td>
                                    </tr>
                                ))}
                            </tbody>
                            <tfoot>
                                <tr className="font-medium">
                                    <td className="text-left py-2 px-1">Total</td>
                                    <td className="text-center py-2 px-1">x{getOrderTotalSummary(dishes).totalDishes}</td>
                                    <td className="text-right py-2 px-1">--</td>
                                    <td className="text-right py-2 px-1">{getOrderTotalSummary(dishes).subTotalPrice}฿</td>
                                </tr>
                            </tfoot>
                        </table>
                    </div>
                </div>
            </Section>

            <Section
                header="x"
                showHeader={false}
            >
                <div className="flex flex-row justify-between text-[var(--color-black-tertiary)] font-medium hover:cursor-pointer" onClick={() => setIsOpenEachBill(!isOpenEachBill)}>
                    <p className="text-xl">Each bill</p>
                    <div className="flex flex-row items-center">
                        <IconButton
                            icon={isOpenEachBill ? "keyboard_arrow_up" : "keyboard_arrow_down"}
                            type="ghost"
                            customSize="sm"
                        />
                    </div>
                </div>

                <div className={`overflow-hidden transition-all duration-300 ease-in-out ${isOpenEachBill ? 'max-h-auto opacity-100 pt-2' : 'max-h-0 opacity-0 py-0'}`}>
                    <table className="w-full table-fixed border-collapse text-xs">
                        <thead>
                            <tr className="border-b-[0.5px] text-[var(--color-black-primary)]">
                                <th className="text-left font-normal py-2 px-1">Name</th>
                                <th className="text-center font-normal py-2 px-1">Qty</th>
                                <th className="text-right font-normal py-2 px-1">Total incl. fee</th>
                                <th className="py-2 px-1 w-8"></th>
                            </tr>
                        </thead>
                        <tbody>
                            {getAllMembersWithOrders().map((memberWithOrder, index) => {
                                const member = members.find(m => m.id === memberWithOrder.memberId);
                                const memberOrder = getOrderMemberSummary(memberWithOrder.memberId, dishes);

                                return (
                                    <Fragment key={memberWithOrder.memberId}>
                                        <tr onClick={() => handleMemberClick(memberWithOrder.memberId)} className={`${expandedMembers.has(memberWithOrder.memberId) || index === getAllMembersWithOrders().length - 1 ? '' : 'border-b-[0.5px]'} hover:bg-gray-50 cursor-pointer text-[var(--color-black-tertiary)]`}>
                                            <td className="text-left py-2 px-1">{member?.name}</td>
                                            <td className="text-center py-2 px-1">x{memberOrder.totalDishes}</td>
                                            <td className="text-right py-2 px-1">{NumberHelper.toFixed(memberOrder.totalPrice, 2)}฿</td>
                                            <td className="text-right py-2 px-1">
                                                <IconButton
                                                    icon={expandedMembers.has(memberWithOrder.memberId) ? "keyboard_arrow_up" : "keyboard_arrow_down"}
                                                    type="ghost"
                                                    customSize="xs"
                                                />
                                            </td>
                                        </tr>
                                        {expandedMembers.has(memberWithOrder.memberId) && (
                                            <>
                                                <tr key={`expand_${memberWithOrder.memberId}`}>
                                                    <td colSpan={4} className="overflow-hidden rounded-xl">
                                                        <table className="w-full table-fixed border-collapse text-xs bg-gray-200 px-8">
                                                            <thead>
                                                                <tr className="border-b-[0.5px] text-[var(--color-black-primary)] px-2 bg-gray-200">
                                                                    <th className="text-left font-normal py-2 px-2">Type</th>
                                                                    <th className="text-center font-normal py-2 px-2">Qty</th>
                                                                    <th className="text-right font-normal py-2 px-2">Price/Unit</th>
                                                                    <th className="text-right font-normal py-2 px-2">Subtotal</th>
                                                                </tr>
                                                            </thead>
                                                            <tbody className="bg-gray-100">
                                                                {SortHelper.multiLevelSort(memberOrder.dishes, [
                                                                    { key: 'isDefault', order: 'asc' },
                                                                    { key: 'price', order: 'asc' }
                                                                ]).map(orderItem => {
                                                                    const dish = dishes.find(d => d.id === orderItem.id);
                                                                    return (
                                                                        <tr key={orderItem.id} className="border-b-[0.5px]-[0.5px] text-[var(--color-black-tertiary)]">
                                                                            <td className="text-left py-2 px-2">{orderItem.id.includes('custom') ? 'Custom' : 'Normal'}</td>
                                                                            <td className="text-center py-2 px-2">x{orderItem.amount}</td>
                                                                            <td className="text-right py-2 px-2">{dish?.price || 0}฿</td>
                                                                            <td className="text-right py-2 px-2">{(dish?.price || 0) * orderItem.amount!}฿</td>
                                                                        </tr>
                                                                    );
                                                                })}
                                                            </tbody>
                                                            <tfoot className="bg-gray-100">
                                                                <tr className="font-medium">
                                                                    <td className="text-left py-2 px-2">Total</td>
                                                                    <td className="text-center py-2 px-2">x{memberWithOrder.total}</td>
                                                                    <td className="text-right py-2 px-2">--</td>
                                                                    <td className="text-right py-2 px-2">{memberOrder.subTotalPrice}฿</td>
                                                                </tr>
                                                            </tfoot>
                                                        </table>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td colSpan={4}>
                                                        <div className="text-[var(--color-grey-tertiary)] py-2">
                                                            <div className="flex flex-row justify-between">
                                                                <p>Total dishes</p>
                                                                <p className="font-medium">{memberWithOrder.total}</p>
                                                            </div>
                                                            <div className="flex flex-row justify-between">
                                                                <p>Service charge (10.00%)</p>
                                                                <p className="font-medium">{NumberHelper.toFixed(memberOrder.serviceCharge, 2)}฿</p>
                                                            </div>
                                                            <div className="flex flex-row justify-between">
                                                                <p>Total (incl. service fee)</p>
                                                                <p className="font-medium">{NumberHelper.toFixed(memberOrder.totalPrice, 2)}฿</p>
                                                            </div>
                                                        </div>
                                                    </td>
                                                </tr>
                                            </>
                                        )}
                                    </Fragment>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </Section>

            <ConfirmPaymentBottomSheet
                isOpen={true}
            />
        </PageWithNav>
    )
}