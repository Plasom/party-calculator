'use client';

import { PageWithNav } from "@/components/templates/page-with-nav";
import { Section } from "@/components/templates/section";
import { IconButton } from "@/components/ui/icon-button";
import { useDishes } from "@/contexts/dishes-context";
import { useOrder } from "@/contexts/order-context";
import { useState } from "react";

export default function CheckoutPage() {
    const [isOpenTotal, setIsOpenTotal] = useState<boolean>(false);

    const { getOrderTotalSummary } = useOrder();
    const { dishes } = useDishes();

    return (
        <PageWithNav>
            <Section
                header="Group bill summary"
                className="pt-4"
            >
                <div className="flex flex-row justify-between text-[var(--color-black-tertiary)] font-medium hover:cursor-pointer" onClick={() => setIsOpenTotal(!isOpenTotal)}>
                    <p className="text-xl">Total summary</p>
                    <div className="flex flex-row items-center">
                        <p className="text-base">{getOrderTotalSummary(dishes).totalPrice}฿</p>
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
                            <p>Total (incl. service fee)</p>
                            <p className="font-medium">{getOrderTotalSummary(dishes).totalPrice}฿</p>
                        </div>
                    </div>

                    <div className="pt-2">
                        <table className="w-full table-fixed border-collapse text-xs">
                            <thead>
                                <tr className="border-b">
                                    <th className="text-left py-2 px-1">Type</th>
                                    <th className="text-center py-2 px-1">Qty</th>
                                    <th className="text-center py-2 px-1">Price/Unit</th>
                                    <th className="text-right py-2 px-1">Subtotal</th>
                                </tr>
                            </thead>
                            <tbody>
                                {getOrderTotalSummary(dishes).dishes.map(dish => (
                                    <tr key={dish.id} className="border-b">
                                        <td className="text-left py-2 px-1">{dish.id.includes('custom') ? 'Custom' : 'Normal'}</td>
                                        <td className="text-center py-2 px-1">x{dish.amount}</td>
                                        <td className="text-center py-2 px-1">{dish.price}฿</td>
                                        <td className="text-right py-2 px-1">{dish.price! * dish.amount!}฿</td>
                                    </tr>
                                ))}
                            </tbody>
                            <tfoot>
                                <tr className="font-medium">
                                    <td className="text-left py-2 px-1">Total</td>
                                    <td className="text-center py-2 px-1">{getOrderTotalSummary(dishes).totalDishes}</td>
                                    <td className="text-center py-2 px-1">--</td>
                                    <td className="text-right py-2 px-1">{getOrderTotalSummary(dishes).totalPrice}฿</td>
                                </tr>
                            </tfoot>
                        </table>
                    </div>
                </div>
            </Section>
        </PageWithNav>
    )
}