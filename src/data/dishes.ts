export interface DishData {
  id: string;
  url: string;
  label: string;
  textColor: "white" | "black";
  isButton: boolean;
  leftIcon?: string;
  price: number;
  name?: string;
  amount?: number;
  isDefault: boolean;
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
    label: "120.-",
    textColor: "white",
    isButton: true,
    price: 120,
    name: "Black Plate",
    isDefault: true,
  },
  {
    id: "NO_ID_JUST_OBJECT",
    url: "/images/sushiro_asset/dishes/custom/default.svg",
    label: "custom",
    textColor: "black",
    leftIcon: "add",
    isButton: false,
    price: 99999,
    name: "Custom Dish",
    isDefault: false,
  },
];

export const tenoiDishes: DishData[] = [
  // สามารถเพิ่มข้อมูลสำหรับ teenoi ได้ในอนาคต
];
