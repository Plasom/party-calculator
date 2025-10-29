# วิธีใช้ Translations ในหน้าเว็บ

## 📚 การใช้งานพื้นฐาน

### 1. Import Hook

```tsx
import { useTranslations, useLocale } from "@/i18n";
```

### 2. ใช้ใน Component

```tsx
'use client';

import { useTranslations } from "@/i18n";

export default function MyPage() {
  const t = useTranslations();

  return (
    <div>
      <h1>{t.home.header}</h1>
      <button>{t.common.buttons.save}</button>
      <p>{t.common.messages.loading}</p>
    </div>
  );
}
```

## 🎯 ตัวอย่างการใช้งานจริง

### ตัวอย่าง 1: Home Page (แก้ไขแล้ว)

```tsx
'use client';

import { PageWithNav } from "@/components/templates/page-with-nav";
import { Section } from "@/components/templates/section";
import { useTranslations } from "@/i18n";

export default function Home() {
  const t = useTranslations();

  return (
    <PageWithNav>
      <Section header={t.home.header}>
        {/* เมื่อเปิดหน้านี้:
          - ภาษาอังกฤษจะแสดง: "Pick a restaurant"
          - ภาษาไทยจะแสดง: "เลือกร้านอาหาร"
        */}
        {/* Content */}
      </Section>
    </PageWithNav>
  );
}
```

### ตัวอย่าง 2: Sushiro Page - แก้ไข Buttons

```tsx
'use client';

import { useTranslations } from "@/i18n";

export default function SushiroPage() {
  const t = useTranslations();

  const menuItems = [
    {
      label: t.sushiro.buttons.splitPlate,  // "Split plate" / "แบ่งจาน"
      onClick: () => console.log('Split plate clicked'),
      isShow: false
    },
    {
      label: t.sushiro.buttons.deletePlate,  // "Delete plate" / "ลบจาน"
      onClick: () => handleDeleteDish(),
      textColor: 'text-[var(--button-ghost-desctructive-text)]',
      isShow: true
    }
  ];

  return (
    <div>
      <button>{t.common.buttons.save}</button>
      {/* ภาษาอังกฤษ: "Save" */}
      {/* ภาษาไทย: "บันทึก" */}
      
      <button>{t.common.buttons.cancel}</button>
      {/* ภาษาอังกฤษ: "Cancel" */}
      {/* ภาษาไทย: "ยกเลิก" */}
    </div>
  );
}
```

### ตัวอย่าง 3: Modal Messages

```tsx
'use client';

import { useTranslations } from "@/i18n";
import { AlertModal } from "@/components/ui/modal/alert-modal";

export default function MyComponent() {
  const t = useTranslations();
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <AlertModal
      isOpen={isModalOpen}
      onClose={() => setIsModalOpen(false)}
      title={t.sushiro.modals.deleteMember.title}
      // ภาษาอังกฤษ: "Delete Member"
      // ภาษาไทย: "ลบสมาชิก"
      
      message={t.sushiro.modals.deleteMember.message}
      // ภาษาอังกฤษ: "Are you sure you want to delete this member? All their orders will be removed."
      // ภาษาไทย: "คุณแน่ใจหรือไม่ที่จะลบสมาชิกนี้? รายการสั่งอาหารทั้งหมดจะถูกลบด้วย"
      
      confirmText={t.common.buttons.delete}
      // ภาษาอังกฤษ: "Delete"
      // ภาษาไทย: "ลบ"
      
      cancelText={t.common.buttons.cancel}
      // ภาษาอังกฤษ: "Cancel"
      // ภาษาไทย: "ยกเลิก"
    />
  );
}
```

### ตัวอย่าง 4: Input Placeholders

```tsx
'use client';

import { useTranslations } from "@/i18n";
import { Input } from "@/components/ui/input";

export default function AddMemberForm() {
  const t = useTranslations();

  return (
    <form>
      <Input
        placeholder={t.sushiro.placeholders.memberName}
        // ภาษาอังกฤษ: "Enter member name"
        // ภาษาไทย: "ใส่ชื่อสมาชิก"
      />
      
      <Input
        type="number"
        placeholder={t.sushiro.placeholders.dishPrice}
        // ภาษาอังกฤษ: "Enter price"
        // ภาษาไทย: "ใส่ราคา"
      />
    </form>
  );
}
```

### ตัวอย่าง 5: Section Headers

```tsx
'use client';

import { useTranslations } from "@/i18n";
import { Section } from "@/components/templates/section";

export default function SushiroPage() {
  const t = useTranslations();

  return (
    <>
      <Section header={t.sushiro.sections.members}>
        {/* ภาษาอังกฤษ: "Members" */}
        {/* ภาษาไทย: "สมาชิก" */}
        {/* Member list */}
      </Section>

      <Section header={t.sushiro.sections.dishes}>
        {/* ภาษาอังกฤษ: "Dishes" */}
        {/* ภาษาไทย: "รายการอาหาร" */}
        {/* Dish list */}
      </Section>
    </>
  );
}
```

### ตัวอย่าง 6: ใช้ Locale โดยตรง

```tsx
'use client';

import { useLocale, useTranslations } from "@/i18n";

export default function PriceDisplay() {
  const locale = useLocale();
  const t = useTranslations();
  const price = 1234.56;

  return (
    <div>
      <p>
        {t.common.labels.price}: {" "}
        {new Intl.NumberFormat(locale === "th" ? "th-TH" : "en-US", {
          style: "currency",
          currency: locale === "th" ? "THB" : "USD"
        }).format(price)}
      </p>
      {/* ภาษาอังกฤษ: "Price: $1,234.56" */}
      {/* ภาษาไทย: "ราคา: ฿1,234.56" */}
    </div>
  );
}
```

## 📝 Translation Keys ที่มีให้ใช้

### Common (ใช้ทั่วทั้งแอป)

```typescript
t.common.buttons.save          // "Save" / "บันทึก"
t.common.buttons.cancel        // "Cancel" / "ยกเลิก"
t.common.buttons.delete        // "Delete" / "ลบ"
t.common.buttons.edit          // "Edit" / "แก้ไข"
t.common.buttons.add           // "Add" / "เพิ่ม"
t.common.buttons.close         // "Close" / "ปิด"
t.common.buttons.confirm       // "Confirm" / "ยืนยัน"
t.common.buttons.next          // "Next" / "ถัดไป"
t.common.buttons.back          // "Back" / "กลับ"

t.common.labels.name           // "Name" / "ชื่อ"
t.common.labels.price          // "Price" / "ราคา"
t.common.labels.quantity       // "Quantity" / "จำนวน"
t.common.labels.total          // "Total" / "รวมทั้งหมด"

t.common.messages.loading      // "Loading..." / "กำลังโหลด..."
t.common.messages.success      // "Success!" / "สำเร็จ!"
t.common.messages.error        // "An error occurred" / "เกิดข้อผิดพลาด"
```

### Home Page

```typescript
t.home.header                  // "Pick a restaurant" / "เลือกร้านอาหาร"
```

### Sushiro Page

```typescript
t.sushiro.sections.members     // "Members" / "สมาชิก"
t.sushiro.sections.dishes      // "Dishes" / "รายการอาหาร"

t.sushiro.buttons.addMember    // "Add Member" / "เพิ่มสมาชิก"
t.sushiro.buttons.addDish      // "Add Custom Dish" / "เพิ่มเมนูอาหาร"
t.sushiro.buttons.checkout     // "Checkout" / "สรุปรายการ"
t.sushiro.buttons.splitPlate   // "Split plate" / "แบ่งจาน"
t.sushiro.buttons.deletePlate  // "Delete plate" / "ลบจาน"

t.sushiro.placeholders.memberName  // "Enter member name" / "ใส่ชื่อสมาชิก"
t.sushiro.placeholders.dishName    // "Enter dish name" / "ใส่ชื่ออาหาร"
t.sushiro.placeholders.dishPrice   // "Enter price" / "ใส่ราคา"

t.sushiro.modals.unsavedChanges.title
t.sushiro.modals.unsavedChanges.message
t.sushiro.modals.deleteMember.title
t.sushiro.modals.deleteMember.message
```

### Checkout Page

```typescript
t.checkout.header              // "Checkout" / "สรุปรายการ"
t.checkout.sections.total      // "Total" / "ยอดรวม"
t.checkout.sections.eachBill   // "Each Bill" / "แต่ละคน"

t.checkout.labels.totalDishes  // "Total Dishes" / "จำนวนจาน"
t.checkout.labels.totalPrice   // "Total Price" / "ยอดรวมทั้งหมด"
```

### Payment Page

```typescript
t.payment.header               // "Payment" / "ชำระเงิน"
t.payment.labels.scanQR        // "Scan QR Code to Pay" / "สแกน QR Code เพื่อชำระเงิน"
t.payment.labels.amount        // "Amount to Pay" / "ยอดที่ต้องชำระ"

t.payment.buttons.downloadQR   // "Download QR Code" / "ดาวน์โหลด QR Code"
t.payment.buttons.completePayment  // "Complete Payment" / "ชำระเงินเสร็จสิ้น"

t.payment.messages.generatingQR    // "Generating QR Code..." / "กำลังสร้าง QR Code..."
t.payment.messages.paymentComplete // "Payment completed successfully!" / "ชำระเงินเสร็จสิ้นเรียบร้อย!"
```

## 🔧 วิธีเพิ่ม Translation Keys ใหม่

### 1. เพิ่มใน `translations.ts`

```typescript
// src/i18n/translations.ts

export const translations = {
  en: {
    // ... existing translations
    myNewSection: {
      title: "My New Title",
      description: "My description",
      buttons: {
        action: "Do Action"
      }
    }
  },
  th: {
    // ... existing translations
    myNewSection: {
      title: "หัวข้อใหม่ของฉัน",
      description: "คำอธิบายของฉัน",
      buttons: {
        action: "ทำแอคชั่น"
      }
    }
  }
}
```

### 2. ใช้งานใน Component

```tsx
const t = useTranslations();

<div>
  <h1>{t.myNewSection.title}</h1>
  <p>{t.myNewSection.description}</p>
  <button>{t.myNewSection.buttons.action}</button>
</div>
```

## ✅ Best Practices

1. **ใช้ Keys ที่มีความหมาย**: ตั้งชื่อ key ให้บอกถึงที่ใช้งานและความหมาย
2. **จัดกลุ่มตามหน้า**: แยก translations ตามหน้าหรือ feature
3. **ใช้ Common สำหรับข้อความที่ใช้บ่อย**: buttons, labels ที่ใช้หลายที่
4. **ตรวจสอบทั้งสองภาษา**: ทดสอบให้แน่ใจว่าแสดงผลถูกต้องทั้ง en และ th
5. **Type Safety**: TypeScript จะช่วย autocomplete และตรวจสอบ keys

## 🎨 Tips & Tricks

### Conditional Text

```tsx
const t = useTranslations();
const locale = useLocale();

<p>
  {locale === "th" 
    ? `ยินดีต้อนรับ ${name}` 
    : `Welcome ${name}`
  }
</p>
```

### Dynamic Values

```tsx
const t = useTranslations();
const count = 5;

// สำหรับข้อความที่ต้องใส่ค่าตัวเลข อาจต้องสร้าง function แยก
const getDishCountText = (count: number) => {
  return locale === "th" 
    ? `${count} จาน`
    : `${count} ${count === 1 ? 'dish' : 'dishes'}`;
};
```

## 📖 เอกสารเพิ่มเติม

- ดู `src/i18n/translations.ts` สำหรับ translation keys ทั้งหมด
- ดู `docs/i18n.md` สำหรับข้อมูลเกี่ยวกับระบบ i18n
- ดู `src/app/[locale]/page.tsx` สำหรับตัวอย่างการใช้งานจริง
