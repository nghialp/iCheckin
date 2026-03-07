# 🎨 StyleSheet Extraction Cheat Sheet

**Tham khảo nhanh - In ra và dán vào máy!**

---

## 3️⃣ Bước Tách StyleSheet

### Step 1: Tạo File `.styles.ts`
```
Folder: src/screens/app/
File:   SecurityScreen.styles.ts (NEW)
```

### Step 2: Copy-Paste Content
```typescript
// SecurityScreen.styles.ts
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  // Paste styles here
  container: { flex: 1 },
  header: { fontSize: 20 },
});
```

### Step 3: Update Original File
```typescript
// SecurityScreen.tsx
// ADD:
import { styles } from './SecurityScreen.styles';

// REMOVE:
const styles = StyleSheet.create({ ... });
```

---

## ✅ File Pair Pattern

```
Component File           Style File
────────────────────────────────────
SecurityScreen.tsx  ↔  SecurityScreen.styles.ts
ProfilePage.tsx     ↔  ProfilePage.styles.ts
HomePage.tsx        ↔  HomePage.styles.ts
```

---

## 🔍 Find StyleSheet to Extract

```bash
# Option 1: In VSCode
Ctrl+F: "const styles = StyleSheet.create"

# Option 2: In Terminal
grep -n "const styles = StyleSheet" SecurityScreen.tsx
# Output: 220:const styles = StyleSheet.create({
```

---

## 📋 Checklist Per Screen

```
Screen: SecurityScreen

PRE-REFACTOR:
  ☐ File opens & runs fine
  ☐ No uncommitted changes
  ☐ Latest version pulled

DURING:
  ☐ Create .styles.ts file
  ☐ Copy StyleSheet block
  ☐ Add export const styles
  ☐ Delete from original .tsx
  ☐ Add import { styles } to .tsx

POST-REFACTOR:
  ☐ pnpm run lint (pass)
  ☐ pnpm run ios (visual ok)
  ☐ git status (2 files changed)
  ☐ git add & commit
```

---

## 🆚 Before & After

### ❌ BEFORE (StyleSheet Inline)
```
SecurityScreen.tsx
├── imports
├── component code (100 lines)
└── const styles = StyleSheet.create({...}) (180 lines)
    Total: 298 lines ⬅ BIG FILE
```

### ✅ AFTER (StyleSheet Separated)
```
SecurityScreen.tsx                 
├── imports (updated)              
└── component code (220 lines)      
   Total: 220 lines ⬅ CLEANER!      
                                    
SecurityScreen.styles.ts (NEW)      
├── imports                         
└── const styles = StyleSheet.create({...}) (80 lines)
   Total: 80 lines ⬅ DEDICATED FILE
```

---

## 🔑 Key Points

### ✅ DO:
```typescript
// ✅ Good - Paired files
SecurityScreen.tsx ↔ SecurityScreen.styles.ts

// ✅ Good - Explicit export
export const styles = StyleSheet.create({...})

// ✅ Good - Relative import
import { styles } from './SecurityScreen.styles';

// ✅ Good - Only styles in file
// SecurityScreen.styles.ts has ONLY styles
```

### ❌ DON'T:
```typescript
// ❌ Bad - Generic name
styles.ts (no reference to screen name)

// ❌ Bad - Forgot export
const styles = StyleSheet.create({...})  // Missing export!

// ❌ Bad - Wrong path
import { styles } from '../styles/SecurityScreen.ts';  // Wrong!

// ❌ Bad - Mixed content
// SecurityScreen.styles.ts has styles + components
```

---

## ⚡ Quick Copy-Paste Template

### File: `ScreenName.styles.ts`
```typescript
import { StyleSheet, Dimensions } from 'react-native';

const screenWidth = Dimensions.get('window').width;

export const styles = StyleSheet.create({
  // Copy your const styles = StyleSheet.create({ ... }) content here
  // Just remove the "const styles = " part
  
  // Example:
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
  },
  // ... rest of styles
});
```

### File: `ScreenName.tsx` (Update)
```typescript
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';  // REMOVE StyleSheet if not used
import { styles } from './ScreenName.styles';          // ADD THIS

// ... rest of component

export default ScreenName;
// DELETE const styles = StyleSheet.create({ ... });
```

---

## 🔧 Troubleshooting

### ❌ Error: "Cannot find styles"
```
Fix: import { styles } from './ScreenName.styles';
                             ↑ Check path!
```

### ❌ Error: "StyleSheet not defined"  
```
Fix: import { StyleSheet } from 'react-native';
     // Add to .styles.ts file
```

### ❌ Visual Broken After Refactor
```
Check:
1. Is export added? export const styles = ...
2. Is import correct? import { styles } from ...
3. Run: pnpm run lint
```

### ❌ "Module not found"
```
Check:
1. File name correct? ScreenName.styles.ts
2. In same folder? Yes
3. File exists? ls -la ScreenName.styles.ts
```

---

## 📊 Size Estimate (Expected)

```
Screen Refactoring Savings:

SecurityScreen:     298 → 220 lines (-26%)
SupportScreen:      248 → 175 lines (-29%)  
ProfilePage:        213 → 185 lines (-13%)
PrivacyScreen:      315 → 245 lines (-22%)
HomePage:          ~250 → 185 lines (-26%)
────────────────────────────────
Total Batch 1:     ~1400 → 1010 lines (-28%)
                     = ~390 lines saved!
```

---

## 🚀 Command Shortcuts

```bash
# Create new styles file
touch src/screens/app/ScreenName.styles.ts

# Check for StyleSheet in file
grep "const styles = StyleSheet" src/screens/app/ScreenName.tsx

# Lint check
pnpm run lint

# Run on iOS
pnpm run ios

# Create commit
git add src/screens/app/ScreenName.*
git commit -m "refactor: extract styles from ScreenName"

# View changes
git diff --cached src/screens/app/ScreenName.tsx
```

---

## 📱 Testing Checklist

```bash
# 1. No TypeScript errors
pnpm run lint
# Should pass with no errors

# 2. App runs
pnpm run ios
# Should compile and run

# 3. UI unchanged
# Visually check the screen
# Compare colors, spacing, fonts

# 4. Interactions work
# Test all buttons, touches, scrolls
# Should work same as before
```

---

## 📈 Success Metrics

| Task | Status |
|------|--------|
| File created correctly | ✅ |
| Styles copied completely | ✅ |
| Import added to TSX | ✅ |
| StyleSheet removed from TSX | ✅ |
| Lint passes | ✅ |
| App runs | ✅ |
| Visual unchanged | ✅ |
| Committed successfully | ✅ |

**All ✅ = Success!** 🎉

---

## 📞 Help Resources

| Document | Purpose |
|----------|---------|
| STYLESHEET_QUICK_START.md | Quick reference (this area) |
| STYLESHEET_EXTRACTION_GUIDE.md | Detailed guide (3 approaches) |
| STYLESHEET_EXTRACTION_PRACTICE.md | Examples & batch plan |
| STYLESHEET_EXTRACTION_SUMMARY.md | Project overview & timeline |

---

## ⏱️ Time Estimate

```
Per Screen Refactoring:
  Create file:        30 seconds
  Copy content:       1 minute
  Update imports:     1 minute  
  Test:               2 minutes
  Commit:             1 minute
  ──────────────
  Total:              ~5 minutes
  
Full Batch 1 (5 screens):  ~25 minutes
```

---

## 🎯 Next Actions

```
1. Open: STYLESHEET_QUICK_START.md (this file)
   
2. Pick first screen: SecurityScreen
   
3. Follow 3 steps:
   ✓ Create SecurityScreen.styles.ts
   ✓ Copy-paste StyleSheet content
   ✓ Update imports in SecurityScreen.tsx
   
4. Test:
   ✓ pnpm run lint
   ✓ pnpm run ios
   
5. Commit:
   ✓ git add -A
   ✓ git commit -m "refactor: extract styles from SecurityScreen"
   
6. Celebrate! 🎉
```

---

## 💡 Pro Tips

### Tip 1: Do One Screen at a Time
```
✅ GOOD:
Session 1: SecurityScreen
Session 2: SupportScreen
Session 3: ProfilePage

❌ AVOID:
All 5 screens at once
(Too risky, hard to debug)
```

### Tip 2: Keep Git History Clean
```bash
# Good commits
git commit -m "refactor: extract styles from SecurityScreen"
git commit -m "refactor: extract styles from SupportScreen"

# Not:
git commit -m "refactor: extract all styles"
(Can't see which screen caused issue)
```

### Tip 3: Use Same Pattern Everywhere
```typescript
// File name pattern (CONSISTENT)
PageName.tsx ↔ PageName.styles.ts

// Not mixing patterns:
PageName.tsx + styles/page.ts
PageName.tsx + PageNameStylesheet.ts
```

---

## 🎊 Celebrate Each Screen!

```
✅ SecurityScreen done!
   └─ Save file: 26%
   └─ TSX now 220 lines (was 298)
   └─ Commit: "refactor: extract styles from SecurityScreen"
   └─ 🎉 One down, 12 to go!
   
✅ SupportScreen done!
   └─ 🎉 Two down!
   
✅ ProfilePage done!
   └─ 🎉 Three down!
   
✅ PrivacyScreen done!
   └─ 🎉 Four down!
   
✅ HomePage done!
   └─ 🎉 Batch 1 Complete! 🚀
```

---

**Print this and keep it handy!** 📋

**Start with SecurityScreen, you got this!** 💪
