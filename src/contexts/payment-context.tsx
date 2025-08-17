'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';



interface IPaymentContext {
    setPromptPay: (value: string) => void;
    promptPay: string;
}

const PaymentContext = createContext<IPaymentContext | undefined>(undefined);

interface PaymentProviderProps {
    children: ReactNode;
}

export function PaymentProvider({ children }: PaymentProviderProps) {
    const [promptPay, setPromptPay] = useState<string>('null');

 
    return (
        <PaymentContext.Provider value={{
            setPromptPay,
            promptPay
        }}>
            {children}
        </PaymentContext.Provider>
    );
}

export function usePayment() {
    const context = useContext(PaymentContext);
    if (context === undefined) {
        throw new Error('usePayment must be used within a PaymentProvider');
    }
    return context;
}
