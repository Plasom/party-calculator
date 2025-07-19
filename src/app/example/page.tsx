'use client';

import { PageWithNav } from "@/components/templates/page-with-nav";
import { Section } from "@/components/templates/section";
import { MenuBottomSheet } from "@/components/ui/bottom-sheet/menu-bottom-sheet";
import { CardList } from "@/components/ui/card/card-list";
import { CardDish } from "@/components/ui/card/dish";
import { CardStore } from "@/components/ui/card/store";
import { useState } from "react";

interface OrderItem {
  id: string;
  count: number;
}

export default function Home() {
  const [orderItems, setOrderItems] = useState<OrderItem[]>([]);
  const [isMenuBottomSheetOpen, setIsMenuBottomSheetOpen] = useState(true);

  const dishesData = [
    {
      id: "1",
      url: "/images/sushiro_asset/dishes/red/default.svg",
      label: "40.-",
      textColor: "white",
      isButton: true,
      initialQuantity: 0,
      onAdd: () => handleDishAdd
    },
    {
      id: "2", 
      url: "/images/sushiro_asset/dishes/white/default.svg",
      label: "60.-",
      textColor: "black",
      isButton: true,
      initialQuantity: 0,
      onAdd: () => handleDishAdd
    },
    {
      id: "9999",
      url: "/images/sushiro_asset/dishes/custom/default.svg", 
      label: "custom",
      textColor: "black",
      leftIcon: "add",
      isButton: false,
      onClick: () => console.log('Custom Dish Clicked'),
      initialQuantity: 0
    }
  ];

  const handleDishAdd = (data: { id: string; count: number }) => {  
    setOrderItems(prev => {
      const existingIndex = prev.findIndex(item => item.id === data.id);
      
      if (data.count === 0) {
        return prev.filter(item => item.id !== data.id);
      }
      
      if (existingIndex >= 0) {
        const updated = [...prev];
        updated[existingIndex] = { ...updated[existingIndex], count: data.count };
        return updated;
      } else {
        return [...prev, { id: data.id, count: data.count }];
      }
    });
  };

  const sections = [
    <Section key="restaurants" header="Pick a restaurant">
      <CardList>
        <CardStore url="/images/restaurant/sushiro.png" label="Sushiro" />
        <CardStore url="/images/restaurant/teenoi.png" label="Teenoi" />
      </CardList>
    </Section>,
    
    <Section key="dishes" header="Add a plate">
      <CardList>
        {dishesData.map((dish) => (
          <CardDish
            key={dish.id}
            id={dish.id}
            url={dish.url}
            label={dish.label}
            textColor={dish.textColor as "white" | "black"}
            leftIcon={dish.leftIcon}
            isButton={dish.isButton}
            initialQuantity={dish.initialQuantity}
            onAdd={dish.isButton ? handleDishAdd : undefined}
            onClick={dish.onClick}
          />
        ))}
      </CardList>
    </Section>
  ];

  if (orderItems.length > 0) {
    sections.push(
      <Section key="order-summary" header="Order Summary">
        <div className="bg-gray-50 p-4 rounded-lg space-y-2">
          {orderItems.map(item => (
            <div key={item.id} className="flex justify-between items-center py-2 px-3 bg-white rounded">
              <span className="font-medium">Dish {item.id}</span>
              <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full font-semibold">
                {item.count}
              </span>
            </div>
          ))}
          <div className="border-t pt-3 mt-3">
            <div className="flex justify-between items-center font-bold text-lg">
              <span>Total Items:</span>
              <span className="text-blue-600">{orderItems.reduce((sum, item) => sum + item.count, 0)}</span>
            </div>
          </div>
        </div>
      </Section>
    );
  }

  return (
    <PageWithNav>
      {/* {sections} */}
      <MenuBottomSheet
          isOpen={isMenuBottomSheetOpen}
          onClose={() => setIsMenuBottomSheetOpen(false)}
        />
    </PageWithNav>
  );
}
