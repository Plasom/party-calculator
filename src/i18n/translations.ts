import { Locale } from "./config";

export const translations = {
  en: {
    metadata: {
      title: "Party Calculator",
      titleTemplate: "%s | Party Calculator",
      description:
        "Smart restaurant bill splitting app for groups. Calculate individual portions, split bills fairly, and generate QR codes for easy payment. Perfect for dining out with friends!",
      keywords: [
        "bill splitting",
        "restaurant",
        "group dining",
        "payment calculator",
        "QR code",
        "PromptPay",
        "dining",
        "friends",
        "food calculator",
      ],
      og: {
        title: "Party Calculator - Smart Restaurant Bill Splitting",
        description:
          "Smart restaurant bill splitting app for groups. Calculate individual portions, split bills fairly, and generate QR codes for easy payment.",
      },
      notFound: {
        title: "Page Not Found",
        description: "The page you are looking for could not be found.",
      },
      sushiro: {
        title: "Sushiro",
        description:
          "Order sushiro dishes for your group and split the bill easily. Add members, select dishes, and calculate individual portions automatically.",
        keywords: [
          "Sushiro",
          "sushi",
          "Japanese restaurant",
          "bill splitting",
          "group order",
          "menu",
          "food calculator",
        ],
        og: {
          title: "Sushiro",
          description:
            "Order sushiro dishes for your group and split the bill easily. Add members, select dishes, and calculate individual portions automatically.",
        },
      },
      checkout: {
        title: "Checkout",
        description: "Review your order and split the bill among group members.",
      },
      payment: {
        title: "Payment",
        description: "Complete your payment with QR code via PromptPay.",
      },
    },
    // UI Translations
    common: {
      buttons: {
        save: "Save",
        cancel: "Cancel",
        delete: "Delete",
        edit: "Edit",
        add: "Add",
        close: "Close",
        confirm: "Confirm",
        next: "Next",
        back: "Back",
        goHome: "Go Back Home",
      },
      labels: {
        name: "Name",
        price: "Price",
        quantity: "Quantity",
        total: "Total",
        subtotal: "Subtotal",
        member: "Member",
        members: "Members",
        dish: "Dish",
        dishes: "Dishes",
      },
      messages: {
        loading: "Loading...",
        success: "Success!",
        error: "An error occurred",
        noData: "No data available",
      },
    },
    home: {
      header: "Pick a restaurant",
      restaurantDisabled: "Coming soon",
    },
    sushiro: {
      sections: {
        members: "Members",
        dishes: "Dishes",
      },
      buttons: {
        addMember: "Add Member",
        addDish: "Add Custom Dish",
        checkout: "Checkout",
        splitPlate: "Split plate",
        deletePlate: "Delete plate",
      },
      placeholders: {
        memberName: "Enter member name",
        dishName: "Enter dish name",
        dishPrice: "Enter price",
      },
      modals: {
        unsavedChanges: {
          title: "Unsaved Changes",
          message: "You have unsaved changes. Do you want to discard them?",
        },
        deleteMember: {
          title: "Delete Member",
          message: "Are you sure you want to delete this member? All their orders will be removed.",
        },
        deleteDish: {
          title: "Delete Dish",
          message: "Are you sure you want to delete this dish?",
        },
      },
    },
    checkout: {
      header: "Checkout",
      sections: {
        total: "Total",
        eachBill: "Each Bill",
      },
      labels: {
        totalDishes: "Total Dishes",
        totalPrice: "Total Price",
        memberName: "Member",
        orderDetails: "Order Details",
      },
      buttons: {
        proceedToPayment: "Proceed to Payment",
      },
    },
    payment: {
      header: "Payment",
      labels: {
        scanQR: "Scan QR Code to Pay",
        promptPayNumber: "PromptPay Number",
        amount: "Amount to Pay",
      },
      buttons: {
        downloadQR: "Download QR Code",
        completePayment: "Complete Payment",
        backToHome: "Back to Home",
      },
      messages: {
        generatingQR: "Generating QR Code...",
        paymentComplete: "Payment completed successfully!",
      },
    },
  },
  th: {
    metadata: {
      title: "Party Calculator",
      titleTemplate: "%s | Party Calculator",
      description:
        "แอปแบ่งบิลร้านอาหารอัจฉริยะสำหรับกลุ่ม คำนวณส่วนแต่ละคน แบ่งบิลอย่างยุติธรรม และสร้าง QR Code เพื่อการชำระเงินที่ง่ายดาย เหมาะสำหรับทานอาหารกับเพื่อน!",
      keywords: [
        "แบ่งบิล",
        "ร้านอาหาร",
        "ทานอาหารเป็นกลุ่ม",
        "คำนวณค่าอาหาร",
        "คิวอาร์โค้ด",
        "พร้อมเพย์",
        "ทานอาหาร",
        "เพื่อน",
        "คำนวณค่าอาหาร",
      ],
      og: {
        title: "Party Calculator - แบ่งบิลร้านอาหารอัจฉริยะ",
        description:
          "แอปแบ่งบิลร้านอาหารอัจฉริยะสำหรับกลุ่ม คำนวณส่วนแต่ละคน แบ่งบิลอย่างยุติธรรม และสร้าง QR Code เพื่อการชำระเงินที่ง่ายดาย",
      },
      notFound: {
        title: "ไม่พบหน้านี้",
        description: "ไม่พบหน้าที่คุณกำลังค้นหา",
      },
      sushiro: {
        title: "Sushiro",
        description:
          "สั่งอาหาร Sushiro สำหรับกลุ่มของคุณและแบ่งบิลได้ง่ายๆ เพิ่มสมาชิก เลือกเมนู และคำนวณส่วนของแต่ละคนโดยอัตโนมัติ",
        keywords: [
          "Sushiro",
          "ซูชิ",
          "ร้านอาหารญี่ปุ่น",
          "แบ่งบิล",
          "สั่งอาหารกลุ่ม",
          "เมนู",
          "คำนวณค่าอาหาร",
        ],
        og: {
          title: "Sushiro",
          description:
            "สั่งอาหาร Sushiro สำหรับกลุ่มของคุณและแบ่งบิลได้ง่ายๆ เพิ่มสมาชิก เลือกเมนู และคำนวณส่วนของแต่ละคนโดยอัตโนมัติ",
        },
      },
      checkout: {
        title: "สรุปรายการ",
        description: "ตรวจสอบรายการสั่งซื้อและแบ่งบิลระหว่างสมาชิกในกลุ่ม",
      },
      payment: {
        title: "ชำระเงิน",
        description: "ชำระเงินด้วย QR Code ผ่านพร้อมเพย์",
      },
    },
    // UI Translations
    common: {
      buttons: {
        save: "บันทึก",
        cancel: "ยกเลิก",
        delete: "ลบ",
        edit: "แก้ไข",
        add: "เพิ่ม",
        close: "ปิด",
        confirm: "ยืนยัน",
        next: "ถัดไป",
        back: "กลับ",
        goHome: "กลับหน้าหลัก",
      },
      labels: {
        name: "ชื่อ",
        price: "ราคา",
        quantity: "จำนวน",
        total: "รวมทั้งหมด",
        subtotal: "รวมย่อย",
        member: "สมาชิก",
        members: "สมาชิก",
        dish: "จาน",
        dishes: "จาน",
      },
      messages: {
        loading: "กำลังโหลด...",
        success: "สำเร็จ!",
        error: "เกิดข้อผิดพลาด",
        noData: "ไม่มีข้อมูล",
      },
    },
    home: {
      header: "เลือกร้านอาหาร",
      restaurantDisabled: "เร็วๆ นี้",
    },
    sushiro: {
      sections: {
        members: "สมาชิก",
        dishes: "รายการอาหาร",
      },
      buttons: {
        addMember: "เพิ่มสมาชิก",
        addDish: "เพิ่มเมนูอาหาร",
        checkout: "สรุปรายการ",
        splitPlate: "แบ่งจาน",
        deletePlate: "ลบจาน",
      },
      placeholders: {
        memberName: "ใส่ชื่อสมาชิก",
        dishName: "ใส่ชื่ออาหาร",
        dishPrice: "ใส่ราคา",
      },
      modals: {
        unsavedChanges: {
          title: "มีการเปลี่ยนแปลงที่ยังไม่ได้บันทึก",
          message: "คุณมีการเปลี่ยนแปลงที่ยังไม่ได้บันทึก ต้องการยกเลิกหรือไม่?",
        },
        deleteMember: {
          title: "ลบสมาชิก",
          message: "คุณแน่ใจหรือไม่ที่จะลบสมาชิกนี้? รายการสั่งอาหารทั้งหมดจะถูกลบด้วย",
        },
        deleteDish: {
          title: "ลบเมนูอาหาร",
          message: "คุณแน่ใจหรือไม่ที่จะลบเมนูอาหารนี้?",
        },
      },
    },
    checkout: {
      header: "สรุปรายการ",
      sections: {
        total: "ยอดรวม",
        eachBill: "แต่ละคน",
      },
      labels: {
        totalDishes: "จำนวนจาน",
        totalPrice: "ยอดรวมทั้งหมด",
        memberName: "สมาชิก",
        orderDetails: "รายละเอียดออเดอร์",
      },
      buttons: {
        proceedToPayment: "ไปหน้าชำระเงิน",
      },
    },
    payment: {
      header: "ชำระเงิน",
      labels: {
        scanQR: "สแกน QR Code เพื่อชำระเงิน",
        promptPayNumber: "เลขพร้อมเพย์",
        amount: "ยอดที่ต้องชำระ",
      },
      buttons: {
        downloadQR: "ดาวน์โหลด QR Code",
        completePayment: "ชำระเงินเสร็จสิ้น",
        backToHome: "กลับหน้าหลัก",
      },
      messages: {
        generatingQR: "กำลังสร้าง QR Code...",
        paymentComplete: "ชำระเงินเสร็จสิ้นเรียบร้อย!",
      },
    },
  },
} as const;

export function getTranslation(locale: Locale) {
  return translations[locale] || translations.en;
}
