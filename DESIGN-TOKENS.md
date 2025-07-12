# Design Tokens

Design tokens สำหรับ project นี้ถูกสร้างจาก `tokens.json` และ build โดย custom script

## การใช้งาน

### 1. CSS Custom Properties
```css
.my-button {
  background-color: var(--button-primary-state-default);
  color: var(--button-primary-text);
}

.my-button:hover {
  background-color: var(--button-primary-state-hovered);
}
```

### 2. TypeScript/JavaScript
```typescript
import { tokens, getToken, getCSSVar } from '@/styles/tokens';

// ใช้ token value โดยตรง
const primaryColor = tokens.color.black.tertiary; // '#2d2d2d'

// ใช้ helper function
const navBg = getToken('nav.bg'); // 'rgba(255, 255, 255, 0.4)'

// ใช้ CSS var
const cssVar = getCSSVar('button.primary.text'); // 'var(--button-primary-text)'
```

### 3. Inline Styles (React)
```tsx
<div style={{ backgroundColor: 'var(--nav-bg)' }}>
  Navigation
</div>
```

## การ Build Tokens

```bash
# Build design tokens จาก tokens.json
npm run tokens:build

# ลบ generated files
npm run tokens:clean
```

## Files ที่ถูกสร้าง

- `src/styles/design-tokens.css` - CSS custom properties
- `src/styles/tokens.ts` - TypeScript constants และ helper functions

## การแก้ไข Tokens

1. แก้ไขไฟล์ `tokens.json` ที่ root ของ project
2. รัน `npm run tokens:build` เพื่อ generate files ใหม่
3. ไฟล์ที่ generated จะถูก import ใน `src/app/globals.css` อัตโนมัติ

## Token Categories

### Colors
- `color.white`, `color.black.*`, `color.grey.*`
- `color.neutral.*`, `color.rose.*`

### Components
- `button.*` - Button states และ colors
- `nav.*` - Navigation styles  
- `tag.*` - Tag component styles
- `input.*` - Input component styles

### Usage Examples

```css
/* Button Primary */
.btn-primary {
  background: var(--button-primary-state-default);
  color: var(--button-primary-text);
}

.btn-primary:hover {
  background: var(--button-primary-state-hovered);
}

/* Navigation */
.navbar {
  background: var(--nav-bg);
}

/* Input */
.input {
  background: var(--input-bg);
  border-color: var(--input-state-border-default);
  color: var(--input-state-text-typing);
}
```

## Button Component Examples

Our Button component now uses design tokens. Here are the available variants:

```tsx
import { Button } from '@/components/ui/button';

// Primary button
<Button label="Save" type="primary" size="md" onClick={() => {}} />

// Secondary button  
<Button label="Cancel" type="secondary" size="sm" onClick={() => {}} />

// Ghost button
<Button label="Edit" type="ghost" size="sm" onClick={() => {}} />

// Ghost destructive button
<Button label="Delete" type="ghost-destructive" size="sm" onClick={() => {}} />

// Disabled button
<Button label="Loading..." type="primary" size="md" disabled onClick={() => {}} />

// Button with icons
<Button 
  label="Save" 
  type="primary" 
  size="sm" 
  leftIcon="save"
  onClick={() => {}} 
/>
```

### Button Properties
- `type`: 'primary' | 'secondary' | 'ghost' | 'ghost-destructive'
- `size`: 'xs' | 'sm' | 'md'
- `disabled`: boolean
- `leftIcon`, `rightIcon`: Material Symbols icon name

For a complete showcase, see: `src/components/examples/button-examples.tsx`
