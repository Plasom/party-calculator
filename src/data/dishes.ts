export interface DishData {
  id: string;
  url: string;
  label: string;
  textColor: "white" | "black";
  isButton: boolean;
  leftIcon?: string;
  price?: number;
  name?: string;
  isDefault?: boolean;
}

export const sushiroDishes: DishData[] = [
  {
    id: "1",
    url: "/images/sushiro_asset/dishes/red/default.svg",
    label: "40.-",
    textColor: "white",
    isButton: true,
    price: 40,
    name: "Red Plate",
    isDefault: true,
  },
  {
    id: "2",
    url: "/images/sushiro_asset/dishes/white/default.svg",
    label: "60.-",
    textColor: "black",
    isButton: true,
    price: 60,
    name: "White Plate",
    isDefault: true,
  },
  {
    id: "3",
    url: "/images/sushiro_asset/dishes/yellow/default.svg",
    label: "80.-",
    textColor: "black",
    isButton: true,
    price: 80,
    name: "Yellow Plate",
    isDefault: true,
  },
  {
    id: "4",
    url: "/images/sushiro_asset/dishes/black/default.svg",
    label: "100.-",
    textColor: "white",
    isButton: true,
    price: 100,
    name: "Black Plate",
    isDefault: true,
  },
  {
    id: "9999",
    url: "/images/sushiro_asset/dishes/custom/default.svg",
    label: "custom",
    textColor: "black",
    leftIcon: "add",
    isButton: false,
    price: 0,
    name: "Custom Dish",
    isDefault: true,
  },
];

export const tenoiDishes: DishData[] = [
  // สามารถเพิ่มข้อมูลสำหรับ teenoi ได้ในอนาคต
];
