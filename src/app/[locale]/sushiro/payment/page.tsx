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
import { usePayment } from "@/contexts/payment-context";
import Link from "next/link";
import { useTranslations } from "@/i18n";

export default function PaymentPage() {
    const t = useTranslations();
    const { isAllowed } = usePageProtector();
    const { getAllMembersWithOrders, getOrderMemberSummary, clearAllOrders } = useOrder();
    const { members, clearMembers } = useMember();
    const { promptPay } = usePayment();
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
                header={t.payment.header}
                hidden={isPaymentComplete}
            >
                <div className="w-full my-2 h-auto flex items-center justify-center">
                    {isLoading && (
                        <div className="text-center">
                            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mx-auto mb-2"></div>
                            <p>{t.payment.messages.generatingQR}</p>
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
                                priority={true}
                                draggable={false}
                            />
                            <p className="text-sm text-[#45C2B2]">{t.payment.labels.scanQR}</p>
                            <p className="text-sm text-gray-600">{t.payment.labels.account} {'x'.repeat(promptPay!.length - 4)}{promptPay?.slice(-4)}</p>
                        </div>
                    )}
                </div>
                <table className="w-full table-fixed border-collapse text-xs pt-2">
                    <thead>
                        <tr className="border-b-[0.5px] text-[var(--color-black-primary)]">
                            <th className="text-left font-normal py-2 px-1">{t.payment.labels.name}</th>
                            <th className="text-right font-normal py-2 px-1">{t.payment.labels.totalInclFee}</th>
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
                <div className="text-center text-[var(--color-black-primary)]">
                    <div className="flex justify-center mb-6">
                        <Image
                            src="/images/icons/check.svg"
                            alt="Payment Complete"
                            width={80}
                            height={80}
                            className="drop-shadow-lg"
                            priority={true}
                            draggable={false}
                        />
                    </div>
                    <p className="font-semibold mb-2">
                        {t.payment.messages.paymentSuccessful}
                    </p>
                    <p className="text-sm">
                        {t.payment.messages.paymentCompletedSuccessfully}
                    </p>
                    <Link className="text-sm underline text-blue-500" href="https://forms.gle/evoepisLFdMSfpTN8">
                        {t.payment.messages.feedbackLink}
                    </Link>
                </div>
            </Section>

            <BottomSheet
                button="hidden"
                isOpen={true}
                disableBackground
            >
                <div className="flex flex-1">
                    <Button
                        label={isPaymentComplete ? t.payment.buttons.backToMainPage : t.payment.buttons.complete}
                        customSize="md"
                        onClick={handleBottomSheetButtonClick} className="flex-1" />
                </div>
            </BottomSheet>

            <AlertModal
                id="unsaved-changes"
                isOpen={isUnsavedModalOpen}
                onAction={handleCompletePayment}
                onCancel={() => setIsUnsavedModalOpen(false)}
                title={t.payment.modals.completePayment.title}
                message={t.payment.modals.completePayment.message}
                actionText={t.payment.modals.completePayment.actionText}
            />
        </PageWithNav>
    );
}