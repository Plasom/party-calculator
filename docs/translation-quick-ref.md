# 🌍 Translation Quick Reference

## Setup (ทำครั้งเดียว)

```tsx
import { useTranslations } from "@/i18n";

const t = useTranslations();
```

## Common Buttons

```tsx
{t.common.buttons.save}      // Save / บันทึก
{t.common.buttons.cancel}    // Cancel / ยกเลิก
{t.common.buttons.delete}    // Delete / ลบ
{t.common.buttons.edit}      // Edit / แก้ไข
{t.common.buttons.add}       // Add / เพิ่ม
{t.common.buttons.confirm}   // Confirm / ยืนยัน
```

## Common Labels

```tsx
{t.common.labels.name}       // Name / ชื่อ
{t.common.labels.price}      // Price / ราคา
{t.common.labels.quantity}   // Quantity / จำนวน
{t.common.labels.total}      // Total / รวมทั้งหมด
```

## Page-Specific

### Home
```tsx
{t.home.header}              // Pick a restaurant / เลือกร้านอาหาร
```

### Sushiro
```tsx
{t.sushiro.buttons.addMember}      // Add Member / เพิ่มสมาชิก
{t.sushiro.buttons.addDish}        // Add Custom Dish / เพิ่มเมนูอาหาร
{t.sushiro.buttons.checkout}       // Checkout / สรุปรายการ

{t.sushiro.placeholders.memberName} // Enter member name / ใส่ชื่อสมาชิก
{t.sushiro.placeholders.dishPrice}  // Enter price / ใส่ราคา

{t.sushiro.modals.deleteMember.title}    // Delete Member / ลบสมาชิก
{t.sushiro.modals.deleteMember.message}  // Full message
```

### Checkout
```tsx
{t.checkout.header}                // Checkout / สรุปรายการ
{t.checkout.labels.totalDishes}    // Total Dishes / จำนวนจาน
{t.checkout.labels.totalPrice}     // Total Price / ยอดรวมทั้งหมด
{t.checkout.buttons.proceedToPayment} // Proceed to Payment / ไปหน้าชำระเงิน
```

### Payment
```tsx
{t.payment.header}                 // Payment / ชำระเงิน
{t.payment.labels.scanQR}          // Scan QR Code to Pay / สแกน QR Code เพื่อชำระเงิน
{t.payment.buttons.downloadQR}     // Download QR Code / ดาวน์โหลด QR Code
{t.payment.messages.generatingQR}  // Generating QR Code... / กำลังสร้าง QR Code...
```

## Example Usage

```tsx
'use client';

import { useTranslations } from "@/i18n";

export default function MyComponent() {
  const t = useTranslations();

  return (
    <div>
      <h1>{t.home.header}</h1>
      <button>{t.common.buttons.save}</button>
      <input placeholder={t.sushiro.placeholders.memberName} />
    </div>
  );
}
```

## ดูเพิ่มเติม
- 📖 Full documentation: `docs/how-to-use-translations.md`
- 🔧 All keys: `src/i18n/translations.ts`
