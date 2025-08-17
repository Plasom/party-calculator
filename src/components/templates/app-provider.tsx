// AppProviders.tsx
import { DishesProvider } from "@/contexts/dishes-context";
import { MemberProvider } from "@/contexts/member-context";
import { OrderProvider } from "@/contexts/order-context";
import { PageProtectorProvider } from "@/contexts/page-protector-context";
import { PaymentProvider } from "@/contexts/payment-context";
import { ReactNode } from "react";

interface AppProvidersProps {
  children: ReactNode;
}

export function AppProviders({ children }: AppProvidersProps) {
  return (
    <MemberProvider>
      <OrderProvider>
        <DishesProvider>
          <PaymentProvider>
            <PageProtectorProvider>
              {children}
            </PageProtectorProvider>
          </PaymentProvider>
        </DishesProvider>
      </OrderProvider>
    </MemberProvider>
  );
}