# 🎨 Thực Hành Tách StyleSheet

## ✅ Ví Dụ: LocationDetailPage (Đã Hoàn Thành)

### Trước:
```
LocationDetailPage.tsx (289 lines)
├── imports
├── types
├── component
└── const styles = StyleSheet.create({ ... })  ← 70+ lines
```

### Sau:
```
LocationDetailPage.tsx (213 lines)
├── imports (added: ./LocationDetailPage.styles)
├── types
├── component
└── export default

LocationDetailPage.styles.ts (120 lines)
└── const styles = StyleSheet.create({ ... })
```

### Lợi Ích:
✅ Component file từ 289 → 213 dòng (-24%)  
✅ Dễ đọc, dễ maintain  
✅ Có thể tái sử dụng styles  
✅ Dễ refactor lên theme system sau  

---

## 🚀 Áp Dụng Cho Các Screens Khác

### Step 1: Xác định các screens cần tách

```bash
# Tìm tất cả tsx files có StyleSheet.create
cd src/screens
grep -r "StyleSheet.create" --include="*.tsx" | wc -l
# Kết quả: 25 files
```

### Step 2: Chọn batch refactor

**Batch 1 (Priority):**
```
src/screens/app/
├── SecurityScreen.tsx
├── SupportScreen.tsx
├── ProfilePage.tsx
├── PrivacyScreen.tsx
└── HomePage.tsx
```

**Batch 2 (Next):**
```
src/screens/app/
├── MapPage.tsx
├── CheckInPage.tsx
├── RewardsPage.tsx
└── NotificationsScreen.tsx
```

**Batch 3 (Auth screens):**
```
src/screens/auth/
├── LoginPage.tsx
├── SignUpPage.tsx
├── ForgotPasswordPage.tsx
└── EmailSentPage.tsx
```

### Step 3: Tách từng screen

#### Example: SecurityScreen

**Trước:**
```typescript
// SecurityScreen.tsx
import { StyleSheet } from 'react-native';

const SecurityScreen = () => { /* ... */ };

const styles = StyleSheet.create({
  container: { ... },
  header: { ... },
  // ... 80+ lines
});

export default SecurityScreen;
```

**Sau:**
```typescript
// SecurityScreen.styles.ts
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: { ... },
  header: { ... },
  // ... 80+ lines
});
```

```typescript
// SecurityScreen.tsx
import { styles } from './SecurityScreen.styles';

const SecurityScreen = () => { /* ... */ };

export default SecurityScreen;
```

---

## 🛠️ Quá Trình Tách Thủ Công

### Cách 1: Terminal (Nhanh)

```bash
# 1. Mở file
code src/screens/app/SecurityScreen.tsx

# 2. Copy toàn bộ const styles = StyleSheet.create({ ... })

# 3. Tạo file mới
touch src/screens/app/SecurityScreen.styles.ts

# 4. Paste vào file mới, thêm export
# import { StyleSheet } from 'react-native';
# export const styles = StyleSheet.create({

# 5. Xóa khỏi original file

# 6. Thêm import vào original
# import { styles } from './SecurityScreen.styles';

# 7. Verify & commit
git add src/screens/app/SecurityScreen.*
git commit -m "refactor: extract styles from SecurityScreen"
```

### Cách 2: VS Code Find & Replace (Thông Minh)

1. Mở file `SecurityScreen.tsx`
2. Ctrl+H (Find & Replace)
3. Enable Regex (.*A)
4. Search: `const styles = StyleSheet\.create\(([\s\S]*?)\n\}\);`
5. Replace: Giữ nguyên, tách bằng tay sau

### Cách 3: Script (Tự Động - Coming Soon)

```bash
# Sau khi hoàn thành script extract-styles.sh
./scripts/extract-styles.sh src/screens/app/SecurityScreen.tsx
```

---

## 📋 Checklist Refactor Mỗi Screen

### Pre-refactor
- [ ] File TSX chạy không error
- [ ] Tính toán # lines sẽ tiết kiệm
- [ ] Backup git (commit trước)

### During refactor
- [ ] Copy `const styles = StyleSheet.create({ ... })` đầy đủ
- [ ] Tạo file `.styles.ts` mới
- [ ] Thêm `export` vào styles
- [ ] Xóa `const styles` từ `.tsx`
- [ ] Thêm import `{ styles }` ở đầu
- [ ] Xóa `StyleSheet` import nếu không dùng

### Post-refactor
- [ ] ✅ `npm run lint` hoặc `pnpm run lint`
- [ ] ✅ `pnpm run ios` (test on device)
- [ ] ✅ Verify visual không thay đổi
- [ ] ✅ Commit với message rõ

---

## 🎯 Refactor Batch 1: 5 App Screens

### 1. SecurityScreen
```bash
# Current
Location: src/screens/app/SecurityScreen.tsx
Size: 298 lines
Styles: ~80 lines

# Target
SecurityScreen.tsx: ~220 lines
SecurityScreen.styles.ts: NEW 80 lines
Savings: 18% reduction
```

**Styles in this file:**
```typescript
// heading styles
heading3 font styling
// card styles  
cardRow styling (shadow, border, padding)
// section styles
section spacing
// toggle styles
toggleSwitch styling
// action styles
actionRow styling
```

### 2. SupportScreen
```bash
Location: src/screens/app/SupportScreen.tsx
Size: 248 lines
Styles: ~70 lines
Target savings: 15%
```

### 3. ProfilePage
```bash
Location: src/screens/app/ProfilePage.tsx
Size: 213 lines
Styles: ~50 lines
Target savings: 12%
```

### 4. PrivacyScreen
```bash
Location: src/screens/app/PrivacyScreen.tsx
Size: 315 lines
Styles: ~100 lines
Target savings: 16%
```

### 5. HomePage
```bash
Location: src/screens/app/HomePage.tsx
Size: ~250 lines (estimated)
Styles: ~70 lines
Target savings: 14%
```

---

## 📊 Expected Results

**Before:**
```
5 screens × ~280 lines avg = 1,400 lines total
Includes: component + styles mixed
```

**After:**
```
5 screens × ~230 lines avg = 1,150 lines (TSX)
5 styles files × 70 lines avg = 350 lines (STYLES)
Total: 1,500 lines (but organized!)

Benefits:
- Component logic isolated from styling
- Faster to find/edit styles
- Can reuse styles across components
- Clear separation of concerns
```

---

## 🔄 Migration Path

### Phase 1: Manual Examples (Done ✅)
- [x] LocationDetailPage (guide example)
- [ ] SecurityScreen (first app screen)
- [ ] SupportScreen (second app screen)

### Phase 2: Batch Extract (In Progress)
- [ ] ProfilePage
- [ ] PrivacyScreen
- [ ] HomePage

### Phase 3: Complete Coverage
- [ ] All remaining app screens
- [ ] All auth screens
- [ ] All dialog/modal styles

### Phase 4: Theme Integration (Future)
- [ ] Upgrade to use theme tokens
- [ ] Add dark mode variants
- [ ] Create responsive presets

---

## 💡 Pro Tips

### 1. Keep Original File Names Consistent
```
SecurityScreen.tsx          ✅ Good
SecurityScreen.styles.ts    ✅ Good (obvious pair)

SecurityScreenStyles.tsx    ❌ Confusing
styles.ts (generic)         ❌ Hard to find
```

### 2. Add Helpful Comments
```typescript
// SecurityScreen.styles.ts

// [SECTION] Header
const headerStyles = { ... };

// [SECTION] Cards  
const cardStyles = { ... };

// [SECTION] Toggle Switches
const toggleStyles = { ... };
```

### 3. Keep Related Styles Together
```typescript
// ❌ Bad - scattered
card: { ... },
cardTitle: { ... },
cardFooter: { ... },
avatar: { ... },

// ✅ Good - grouped
// Card
card: { ... },
cardTitle: { ... },
cardFooter: { ... },

// Avatar
avatar: { ... },
```

### 4. Organize by Sections
```typescript
export const styles = StyleSheet.create({
  // ===== [SECTION] Layout =====
  container: { flex: 1 },
  
  // ===== [SECTION] Header =====
  header: { ... },
  headerTitle: { ... },
  
  // ===== [SECTION] Content =====
  content: { ... },
  contentPadded: { ... },
  
  // ===== [SECTION] Cards =====
  card: { ... },
  cardRow: { ... },
});
```

---

## 🧪 Testing Checklist

```bash
# 1. TypeScript errors
pnpm run lint

# 2. No runtime errors
pnpm run ios
# or
pnpm run android

# 3. Visual unchanged
# Navigate to each screen in app
# Compare with original

# 4. Git clean
git status
# Should show:
# M src/screens/app/SecurityScreen.tsx
# A src/screens/app/SecurityScreen.styles.ts
```

---

## 📝 Commit Template

```bash
git add src/screens/app/SecurityScreen.*

git commit -m "refactor: extract styles from SecurityScreen

- Moved 80 lines of StyleSheet to separate file
- Reduced component file size by 27%
- No functional changes
- All tests passing"
```

---

## 🎊 Success Metrics

| Metric | Target | Status |
|--------|--------|--------|
| Batch 1 screens refactored | 5 | ⏳ In Progress |
| Lines removed from TSX | 15% avg | ⏳ Pending |
| Styles files created | 5 | ⏳ Pending |
| Code clarity improved | Yes | ⏳ Pending |
| Zero breaking changes | 100% | ⏳ Pending |

---

## 🚀 Next Actions

### Immediate (Today):
1. [ ] Review STYLESHEET_EXTRACTION_GUIDE.md
2. [ ] Run `pnpm run lint` to verify no errors
3. [ ] Test LocationDetailPage on device

### This Week:
1. [ ] Extract Batch 1 (5 app screens)
2. [ ] Create commit for each screen
3. [ ] Document findings

### Next Week:
1. [ ] Extract Batch 2 (app screens)
2. [ ] Extract Batch 3 (auth screens)
3. [ ] Create refactoring summary

---

**Status:** ✅ LocationDetailPage Done | ⏳ Batch 1 Ready to Start

Ready to refactor SecurityScreen next? 🚀
