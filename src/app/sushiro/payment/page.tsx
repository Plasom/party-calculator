'use client';

import { PageWithNav } from "@/components/templates/page-with-nav";
import { Section } from "@/components/templates/section";
import { useDishes } from "@/contexts/dishes-context";
import { useMember } from "@/contexts/member-context";
import { useOrder } from "@/contexts/order-context";
import { NumberHelper } from "@/lib/number-helper";
import { PromptPayGenerator } from "@/lib/prompt-pay-generator";
import { useEffect, useState } from "react";
import Image from "next/image";
import { BottomSheet } from "@/components/ui/bottom-sheet/bottom-sheet";
import { AlertModal } from "@/components/ui/modal/alert-modal";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { usePageProtector } from "@/contexts/page-protector-context";

export default function PaymentPage() {
    const { isAllowed } = usePageProtector();
    const { getAllMembersWithOrders, getOrderMemberSummary, clearAllOrders } = useOrder();
    const { members, promptPay, clearMembers } = useMember();
    const { dishes } = useDishes();

    const [qrCodeDataUrl, setQrCodeDataUrl] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isUnsavedModalOpen, setIsUnsavedModalOpen] = useState<boolean>(false);
    const [isPaymentComplete, setIsPaymentComplete] = useState<boolean>(false);
    
    const router = useRouter();

    const handleCompletePayment = () => {
        isAllowed(true);
        clearAllOrders();
        clearMembers();

        setIsUnsavedModalOpen(false);
        setIsPaymentComplete(true);
    };

    const handleBottomSheetButtonClick = () => {
        if (isPaymentComplete) {
            router.replace('/');
        } else {
            setIsUnsavedModalOpen(true);
        }
    };

    useEffect(() => {
        const generateQR = async () => {
            setIsLoading(true);
            try {
                const qrDataUrl = await PromptPayGenerator.generatePromptPayQR(promptPay);
                setQrCodeDataUrl(qrDataUrl);
            } catch (err) {
                console.error('Error generating QR code:', err);
            } finally {
                setIsLoading(false);
            }
        };

        generateQR();
    }, [promptPay]);

    return (
        <PageWithNav style={{ paddingBottom: 120 }} disableBack={isPaymentComplete}>
            <Section
                header="Payment Status"
                hidden={isPaymentComplete}
            >
                <div className="w-full my-2 h-auto flex items-center justify-center">
                    {isLoading && (
                        <div className="text-center">
                            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mx-auto mb-2"></div>
                            <p>กำลังสร้าง QR code...</p>
                        </div>
                    )}
                    {qrCodeDataUrl && !isLoading && (
                        <div className="text-center">
                            <Image
                                src={qrCodeDataUrl}
                                alt="PromptPay QR Code"
                                width={250}
                                height={250}
                                className="max-h-full max-w-full object-contain"
                            />
                            <p className="text-sm text-[#45C2B2]">สแกน QR เพื่อโอนเข้าบัญชี</p>
                            <p className="text-sm text-gray-600">บัญชี: {'x'.repeat(promptPay!.length - 4)}{promptPay?.slice(-4)}</p>
                        </div>
                    )}
                </div>
                <table className="w-full table-fixed border-collapse text-xs pt-2">
                    <thead>
                        <tr className="border-b-[0.5px] text-[var(--color-black-primary)]">
                            <th className="text-left font-normal py-2 px-1">Name</th>
                            <th className="text-right font-normal py-2 px-1">Total incl. fee</th>
                        </tr>
                    </thead>
                    <tbody>
                        {getAllMembersWithOrders().map((memberWithOrder, index) => {
                            const member = members.find((m) => m.id === memberWithOrder.memberId);
                            const memberOrder = getOrderMemberSummary(memberWithOrder.memberId, dishes);
                            return (
                                <tr
                                    key={index}
                                    className={`${index === getAllMembersWithOrders().length - 1 ? '' : 'border-b-[0.5px]'
                                        } hover:bg-gray-50 cursor-pointer text-[var(--color-black-tertiary)]`}
                                >
                                    <td className="text-left py-2 px-1">{member?.name || 'Unknown'}</td>
                                    <td className="text-right py-2 px-1">
                                        {memberOrder ? `${NumberHelper.toFixed(memberOrder.totalPrice, 2)}฿` : '0.00฿'}
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </Section>

            <Section
                hidden={!isPaymentComplete}
                className="fixed inset-0 flex items-center justify-center bg-white z-10"
            >
                <div className="text-center">
                    <div className="flex justify-center mb-6">
                        <Image
                            src="/images/icons/check.svg"
                            alt="Payment Complete"
                            width={80}
                            height={80}
                            className="drop-shadow-lg"
                        />
                    </div>
                    <h2 className="text-2xl font-semibold text-green-600 mb-2">
                        Payment Complete!
                    </h2>
                    <p className="text-gray-600">
                        การชำระเงินเสร็จสิ้นแล้ว
                    </p>
                </div>
            </Section>

            <BottomSheet
                button="hidden"
                isOpen={true}
                disableBackground
            >
                <div className="flex flex-1">
                    <Button
                        label={isPaymentComplete ? "Back to main page" : "Complete"}
                        customSize="md"
                        onClick={handleBottomSheetButtonClick} className="flex-1" />
                </div>
            </BottomSheet>

            <AlertModal
                id="unsaved-changes"
                isOpen={isUnsavedModalOpen}
                onAction={handleCompletePayment}
                onCancel={() => setIsUnsavedModalOpen(false)}
                title="Complete payment?"
                message="Complete the payment? This will clear all saved payment records."
                actionText="Confirm"
            />
        </PageWithNav>
    );
}