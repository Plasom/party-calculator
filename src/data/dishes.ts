export interface DishData {
    id: string;
    url: string;
    label: string;
    textColor: "white" | "black";
    isButton: boolean;
    initialQuantity: number;
    leftIcon?: string;
    price?: number;
    name?: string;
}

export const sushiroDishes: DishData[] = [
    {
        id: "1",
        url: "/images/sushiro_asset/dishes/red/default.svg",
        label: "40.-",
        textColor: "white",
        isButton: true,
        initialQuantity: 0,
        price: 40,
        name: "Red Plate"
    },
    {
        id: "2",
        url: "/images/sushiro_asset/dishes/white/default.svg",
        label: "60.-",
        textColor: "black",
        isButton: true,
        initialQuantity: 0,
        price: 60,
        name: "White Plate"
    },
    {
        id: "3",
        url: "/images/sushiro_asset/dishes/yellow/default.svg",
        label: "80.-",
        textColor: "black",
        isButton: true,
        initialQuantity: 0,
        price: 80,
        name: "Yellow Plate"
    },
    {
        id: "4",
        url: "/images/sushiro_asset/dishes/black/default.svg",
        label: "100.-",
        textColor: "white",
        isButton: true,
        initialQuantity: 0,
        price: 100,
        name: "Black Plate"
    },
    {
        id: "9999",
        url: "/images/sushiro_asset/dishes/custom/default.svg",
        label: "custom",
        textColor: "black",
        leftIcon: "add",
        isButton: false,
        initialQuantity: 0,
        price: 0,
        name: "Custom Dish"
    }
];

export const tenoiDishes: DishData[] = [
    // สามารถเพิ่มข้อมูลสำหรับ teenoi ได้ในอนาคต
];

// Helper function to get dishes by restaurant
export const getDishesData = (restaurant: 'sushiro' | 'teenoi'): DishData[] => {
    switch (restaurant) {
        case 'sushiro':
            return sushiroDishes;
        case 'teenoi':
            return tenoiDishes;
        default:
            return [];
    }
};
