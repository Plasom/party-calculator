# 🎨 Design Tokens Import Guide

คู่มือการ import design tokens จาก Figma และ update ใน project

## 📋 ขั้นตอนทั้งหมด

### 1. Export จาก Figma

#### วิธี A: ใช้ Tokens Studio Plugin
1. เปิด Figma file
2. ติดตั้ง plugin "Tokens Studio for Figma"
3. Export เป็น JSON format
4. Save เป็น `figma-tokens.json`

#### วิธี B: ใช้ Design Tokens Plugin  
1. เปิด Figma file
2. ติดตั้ง plugin "Design Tokens"
3. Export เป็น JSON format
4. Save เป็น `figma-export.json`

### 2. นำไฟล์มาวางใน Project

```bash
# วางไฟล์ใน root directory
/Users/phum-macbook/Desktop/piii-cal-super-app/

# ตัวอย่างไฟล์ที่ได้จาก Figma:
# - figma-tokens.json
# - figma-export.json  
# - design-tokens.json
```

### 3. แปลง Format (ถ้าจำเป็น)

```bash
# ถ้า format ไม่ตรงกับที่เราใช้
npm run tokens:convert figma-tokens.json tokens.json

# หรือแปลงด้วย manual
npm run tokens:convert figma-export.json
```

### 4. Build Tokens ใหม่

```bash
# Build design tokens
npm run tokens:build

# ไฟล์ที่จะถูก generate ใหม่:
# - src/styles/design-tokens.css
# - src/styles/tokens.ts
```

### 5. ตรวจสอบผลลัพธ์

```bash
# Start dev server
npm run dev

# เปิด browser ไปที่:
# http://localhost:3000/tokens-demo
```

## 🔄 Workflow สำหรับการ Update ประจำ

### แบบ Quick Update (แทนที่ไฟล์เดิม)
```bash
# 1. Copy ไฟล์ใหม่จาก Figma มาแทนที่
cp ~/Downloads/figma-tokens.json ./tokens.json

# 2. Build
npm run tokens:build

# 3. Test
npm run dev
```

### แบบ Safe Update (เก็บ backup)
```bash
# 1. Backup ไฟล์เดิม
cp tokens.json tokens.backup.json

# 2. Copy ไฟล์ใหม่
cp ~/Downloads/figma-tokens.json ./tokens.json

# 3. Build และ test
npm run tokens:build
npm run dev

# 4. หากมีปัญหา restore backup
# cp tokens.backup.json tokens.json
# npm run tokens:build
```

## 📁 File Structure หลัง Update

```
project/
├── tokens.json                    # Source tokens จาก Figma
├── convert-figma-tokens.js        # Script แปลง format
├── build-tokens.js                # Script build tokens
├── src/
│   ├── styles/
│   │   ├── design-tokens.css      # Generated CSS variables
│   │   └── tokens.ts              # Generated TypeScript
│   └── app/
│       ├── globals.css            # Import design-tokens.css
│       └── tokens-demo/page.tsx   # Demo page
```

## ⚠️ หมายเหตุสำคัญ

### Token Naming Convention
```json
// Format ที่เราใช้:
{
  "color": {
    "primary": {
      "value": "#000000",
      "type": "color"
    }
  },
  "button": {
    "primary": {
      "state": {
        "default": {
          "value": "{color.primary}",
          "type": "color"
        }
      }
    }
  }
}
```

### สิ่งที่ต้องตรวจสอบหลัง Import
1. ✅ CSS variables ถูก generate ถูกต้อง
2. ✅ Button components แสดงผลถูกต้อง  
3. ✅ Navigation bar ใช้สีใหม่
4. ✅ ไม่มี missing tokens

### การ Debug
```bash
# ดู CSS variables ที่ generated
cat src/styles/design-tokens.css | head -20

# ดู TypeScript tokens
cat src/styles/tokens.ts | head -20

# ตรวจสอบ console errors
# เปิด browser dev tools ดู console
```

## 🚨 Troubleshooting

### ปัญหาที่พบบ่อย:

1. **Token format ไม่ตรงกัน**
   - ใช้ `npm run tokens:convert` 
   - หรือแก้ไข manual ใน `tokens.json`

2. **Missing token references**
   - ตรวจสอบ `{color.primary}` references
   - Build script จะแสดง warning

3. **CSS ไม่ update**
   - ลบ cache: `npm run tokens:clean`
   - Build ใหม่: `npm run tokens:build`
   - Restart dev server

4. **Component ไม่ใช้สีใหม่**
   - ตรวจสอบ CSS class names
   - ดู browser dev tools

## 📝 Best Practices

1. **Always backup** ก่อน import ไฟล์ใหม่
2. **Test ใน demo page** ก่อน deploy
3. **Commit changes** แยกจากการเปลี่ยนแปลงอื่น
4. **Document changes** ใน commit message
5. **Share with team** เมื่อมีการเปลี่ยนแปลง design system
