'use client';

import { PageWithNav } from "@/components/templates/page-with-nav";
import { Section } from "@/components/templates/section";
import { useMember } from "@/contexts/member-context";
import { useOrder } from "@/contexts/order-context";
import { useDishes } from "@/contexts/dishes-context";
import Link from "next/link";

export default function SushiroSummaryPage() {
    const { members, selectedMember, clearMembers } = useMember();
    const { getOrderTotalSummary, getAllMembersWithOrders, clearAllOrders } = useOrder();
    const { dishes } = useDishes();

    const orderSummary = getOrderTotalSummary(dishes);
    const membersWithOrders = getAllMembersWithOrders();

    const handleClearAll = () => {
        clearMembers();
        clearAllOrders();
    };

    return (
        <PageWithNav>
            <Section header="🍣 สรุปคำสั่งซื้อ Sushiro" description="ตรวจสอบคำสั่งซื้อของคุณ" className="pt-4">
                <div className="space-y-4">
                    <div className="flex justify-between items-center">
                        <Link 
                            href="/sushiro"
                            className="text-sm text-blue-600 hover:text-blue-800"
                        >
                            ← กลับไปที่ Sushiro
                        </Link>
                        <button 
                            className="px-3 py-1 bg-red-500 text-white text-sm rounded hover:bg-red-600 transition-colors"
                            onClick={handleClearAll}
                        >
                            ล้างทั้งหมด
                        </button>
                    </div>

                    {/* สรุปคำสั่งซื้อทั้งหมด */}
                    <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                        <h3 className="font-semibold text-lg mb-2 text-red-800">สรุปคำสั่งซื้อทั้งหมด</h3>
                        <div className="space-y-2">
                            <div className="flex justify-between">
                                <span>จำนวนจาน:</span>
                                <span className="font-medium">{orderSummary.totalDishes} จาน</span>
                            </div>
                            <div className="flex justify-between">
                                <span>ราคารวม:</span>
                                <span className="font-medium">฿{orderSummary.subTotalPrice}</span>
                            </div>
                            <div className="flex justify-between">
                                <span>ค่าบริการ:</span>
                                <span className="font-medium">฿{orderSummary.serviceCharge}</span>
                            </div>
                            <div className="flex justify-between font-bold text-lg border-t pt-2">
                                <span>ยอดรวมทั้งหมด:</span>
                                <span>฿{orderSummary.totalPrice}</span>
                            </div>
                        </div>
                    </div>

                    {/* รายการสมาชิกที่สั่ง */}
                    <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                        <h3 className="font-semibold text-lg mb-2 text-red-800">
                            สมาชิกที่สั่งอาหาร ({membersWithOrders.length} คน)
                        </h3>
                        {membersWithOrders.length > 0 ? (
                            <div className="space-y-2">
                                {membersWithOrders.map(({ memberId, total }) => {
                                    const member = members.find(m => m.id === memberId);
                                    return (
                                        <div key={memberId} className={`p-2 rounded ${
                                            memberId === selectedMember?.id
                                                ? 'bg-red-200 text-red-900 border border-red-300' 
                                                : 'bg-white text-red-700 border border-red-200'
                                        }`}>
                                            <div className="flex justify-between items-center">
                                                <span>
                                                    {member?.name || `สมาชิก ${memberId}`}
                                                    {memberId === selectedMember?.id && ' (กำลังสั่ง)'}
                                                </span>
                                                <span className="font-medium">{total} จาน</span>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        ) : (
                            <p className="text-red-600">ยังไม่มีใครสั่งอาหาร</p>
                        )}
                    </div>

                    {/* รายการจานที่สั่ง */}
                    {orderSummary.dishes.length > 0 && (
                        <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                            <h3 className="font-semibold text-lg mb-2 text-red-800">รายการอาหารที่สั่ง</h3>
                            <div className="space-y-2">
                                {orderSummary.dishes.map(dish => (
                                    <div key={dish.id} className="flex justify-between items-center p-2 bg-white rounded border border-red-200">
                                        <div>
                                            <span className="font-medium">{dish.name}</span>
                                            <span className="text-sm text-gray-600 ml-2">฿{dish.price}</span>
                                        </div>
                                        <div className="text-right">
                                            <span className="font-medium">{dish.amount} จาน</span>
                                            <div className="text-sm text-gray-600">
                                                ฿{((dish.price || 0) * (dish.amount || 0)).toFixed(2)}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* ปุ่มไปหน้าชำระเงิน */}
                    {orderSummary.totalDishes > 0 && (
                        <div className="pt-4">
                            <Link 
                                href="/sushiro/checkout"
                                className="w-full bg-red-500 text-white py-3 px-4 rounded-lg text-center font-medium hover:bg-red-600 transition-colors block"
                            >
                                ไปหน้าชำระเงิน (฿{orderSummary.totalPrice})
                            </Link>
                        </div>
                    )}
                </div>
            </Section>
        </PageWithNav>
    );
}