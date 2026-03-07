# 📖 StyleSheet Extraction - Quick Start

**Hướng dẫn nhanh tách StyleSheet từ TSX sang .styles.ts**

---

## ⚡ 3 Bước Tách StyleSheet

### Bước 1: Copy StyleSheet Content
```
Tìm trong file TSX:
const styles = StyleSheet.create({
  ...
});
```

### Bước 2: Tạo File `.styles.ts`
Tên: `PageName.styles.ts` (same folder as `PageName.tsx`)

Nội dung:
```typescript
import { StyleSheet, Dimensions } from 'react-native';

const screenWidth = Dimensions.get('window').width;

export const styles = StyleSheet.create({
  // Paste styles here
  title: { fontSize: 24, fontWeight: '700' },
  // ... etc
});
```

### Bước 3: Update Original TSX
Thêm import ở đầu:
```typescript
import { styles } from './PageName.styles';
```

Xóa:
1. `StyleSheet,` từ react-native import
2. `const styles = StyleSheet.create({ ... });` ở cuối file

---

## ✅ Complete Example: SecurityScreen

### Step 1: SecurityScreen.tsx (BEFORE)
```typescript
import { StyleSheet } from 'react-native';

export default SecurityScreen = () => {
  // Component code...
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: { fontSize: 20 },
  // ... 80 lines
});
```

### Step 2: SecurityScreen.styles.ts (NEW)
```typescript
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: { flex: 1 },
  header: { fontSize: 20 },
  // ... 80 lines
});
```

### Step 3: SecurityScreen.tsx (AFTER)
```typescript
import { styles } from './SecurityScreen.styles';

export default SecurityScreen = () => {
  // Component code...
};
// StyleSheet removed ✓
```

---

## 🎯 Screens to Extract (Priority Order)

### 🔴 Batch 1 (This Week)
- [ ] SecurityScreen
- [ ] SupportScreen
- [ ] ProfilePage
- [ ] PrivacyScreen
- [ ] HomePage

### 🟡 Batch 2 (Next Week)
- [ ] MapPage
- [ ] CheckInPage
- [ ] RewardsPage
- [ ] SearchScreen

### 🟢 Batch 3 (Future)
- [ ] LoginPage
- [ ] SignUpPage
- [ ] ForgotPasswordPage

---

## 🚀 Quick Refactor (5 minutes per screen)

```bash
# 1. Open file
code src/screens/app/SecurityScreen.tsx

# 2. Create new file
touch src/screens/app/SecurityScreen.styles.ts

# 3. Copy styles block to new file
# - Add: import { StyleSheet } from 'react-native';
# - Add: export const styles = StyleSheet.create({
# - Paste: All styles
# - Add: });

# 4. Remove from original
# - Delete: const styles = StyleSheet.create({ ... });
# - Delete: StyleSheet import if not used elsewhere
# - Add: import { styles } from './SecurityScreen.styles';

# 5. Test
pnpm run lint

# 6. Commit
git add src/screens/app/SecurityScreen.*
git commit -m "refactor: extract styles from SecurityScreen"
```

---

## ✨ Key Points

✅ **Do:**
- Keep file names paired: `PageName.tsx` + `PageName.styles.ts`
- Add `export` to styles object
- Use `import { styles } from './PageName.styles';`
- Test after each refactor
- Commit per screen

❌ **Don't:**
- Don't create generic `styles.ts` files
- Don't forget `export` keyword
- Don't skip importing styles in TSX
- Don't refactor too many at once
- Don't commit broken builds

---

## 📋 Checklist Per Screen

```
Screen: SecurityScreen

Before:
  [ ] 298 lines (code + styles mixed)
  [ ] StyleSheet inline
  
During:
  [ ] Create SecurityScreen.styles.ts
  [ ] Copy styles content
  [ ] Update imports
  [ ] Remove StyleSheet from original
  
After:
  [ ] SecurityScreen.tsx: ~220 lines ✓
  [ ] SecurityScreen.styles.ts: ~78 lines ✓
  [ ] Zero compile errors ✓
  [ ] Visual unchanged ✓
  [ ] Git clean ✓
```

---

## 🆘 Troubleshooting

### ❌ Error: "Cannot find styles"
```
Solution: 
import { styles } from './PageName.styles';
                      ↑ check path is relative
```

### ❌ Error: "StyleSheet is not defined"
```
Solution:
import { StyleSheet } from 'react-native';
// Add this to PageName.styles.ts
```

### ❌ Error: "styles is already defined"
```
Solution:
// Remove old definition:
const styles = StyleSheet.create({ ... });
// Keep only import
```

---

## 📊 Progress Tracking

```
✅ LocationDetailPage (example - DONE)
⏳ SecurityScreen (ready to start)
⏳ SupportScreen
⏳ ProfilePage  
⏳ PrivacyScreen
⏳ HomePage
⏳ MapPage
⏳ CheckInPage
⏳ RewardsPage
⏳ SearchScreen
⏳ LoginPage
⏳ SignUpPage
⏳ ForgotPasswordPage
```

---

## 💡 After Refactoring (Next Steps)

Once all stylesheets extracted, can migrate to theme system:

```typescript
// Before extraction (inline styles)
const styles = StyleSheet.create({
  title: { fontSize: 24, fontWeight: '700' }
});

// After extraction + theme migration
import { typography, colors, spacing } from '@/theme';

export const styles = StyleSheet.create({
  title: {
    ...typography.heading2,
    color: colors.textPrimary,
    marginBottom: spacing.md,
  }
});
```

---

## 🎓 Documentation Files

- **STYLESHEET_EXTRACTION_GUIDE.md** - Full detailed guide (3 approaches)
- **STYLESHEET_EXTRACTION_PRACTICE.md** - Practical walkthrough with examples
- **THEME_QUICK_REFERENCE.md** - Quick reference for theme system
- **STYLING_GUIDE.md** - Complete theme system guide

---

## 📞 Need Help?

1. Read **STYLESHEET_EXTRACTION_GUIDE.md** for detailed approach
2. Check **STYLESHEET_EXTRACTION_PRACTICE.md** for batch examples
3. Use **this guide** for quick reference

---

**Time to refactor:** ⏱️ ~5 min per screen  
**Total for Batch 1:** ~25 min (5 screens)  
**Difficulty:** ⭐ Easy

Ready to start? Let's go! 🚀
