# 📋 Batch Extraction Plan & Guide

## 📊 Status: SecurityScreen ✅ (1/20)

**Total screens to extract:** ~20 screens  
**Estimated time:** 3-4 hours (manual, careful extraction)  
**Approach:** Batch by batch, test after each batch

---

## 🎯 Batches

### ✅ BATCH 0 (DONE)
- [x] LocationDetailPage → `/src/styles/screens/LocationDetailPage.styles.ts`
- [x] SecurityScreen → `/src/styles/screens/SecurityScreen.styles.ts`

### ⏳ BATCH 1 (Next - 4 screens)
- [ ] SupportScreen
- [ ] ProfilePage  
- [ ] PrivacyScreen
- [ ] HomePage

### 📅 BATCH 2 (5 screens)
- [ ] MapPage
- [ ] SearchScreen
- [ ] CheckInScreen
- [ ] CheckInDetailScreen
- [ ] NotificationsScreen

### 📅 BATCH 3 (5 screens)
- [ ] RewardsPage
- [ ] RedeemHistoryScreen
- [ ] PersonalDetailsScreen
- [ ] RewardDetailScreen
- [ ] CheckInPage

### 📅 BATCH 4 (4 screens)
- [ ] SettingsPage
- [ ] GeneralSettingsScreen
- [ ] MapPageTest
- [ ] DebugLoginTest

### 📅 BATCH 5 (2 screens - Auth)
- [ ] ChangePasswordPage
- [ ] ForgotPasswordScreen

---

## 🔄 Process for Each Batch

### Step 1: Extract StyleSheet
```bash
# For each screen:
1. Read file content
2. Find: const styles = StyleSheet.create({...});
3. Copy entire block
```

### Step 2: Create .styles.ts File
```
Create: src/styles/screens/ScreenName.styles.ts

Import theme & styles:
import { StyleSheet, Dimensions } from 'react-native';
import { colors, spacing, typography } from '../../theme';
import { headerStyles, cardStyles, containerStyles, ... } from '../../styles';

const screenWidth = Dimensions.get('window').width;

export const styles = StyleSheet.create({
  // Paste styles here
});
```

### Step 3: Update TSX File
```
1. Remove: StyleSheet from react-native import
2. Add: import { styles } from '../../styles/screens/ScreenName.styles';
3. Remove: const styles = StyleSheet.create({...});
```

### Step 4: Test
```bash
pnpm run lint
pnpm run ios
```

### Step 5: Commit
```bash
git add src/screens/app/ScreenName.tsx src/styles/screens/ScreenName.styles.ts
git commit -m "refactor: extract styles from ScreenName to separate file"
```

---

## 📝 Screens With Stylesheets (Found)

```
Auth screens:
  - ChangePasswordPage.tsx (line 200)
  - ForgotPasswordScreen.tsx (line 145)

App screens:
  - HomePage.tsx (line 89)
  - MapPage.tsx (line 163)
  - SearchScreen.tsx (line 196)
  - MapPageTest.tsx (line 14)
  - RewardsPage.tsx (line 334)
  - RedeemHistoryScreen.tsx (line 239)
  - ProfilePage.tsx (line 132)
  - SecurityScreen.tsx (line 208) ✅ DONE
  - SupportScreen.tsx (line 209)
  - PrivacyScreen.tsx (line 213)
  - CheckInScreen.tsx (line 284)
  - CheckInDetailScreen.tsx (line 343)
  - NotificationsScreen.tsx (line 203)
  - PersonalDetailsScreen.tsx (line 341)
  - SettingsPage.tsx (line 123)
  - GeneralSettingsScreen.tsx (line 33)
  - RewardDetailScreen.tsx (line 320)
  - CheckInPage.tsx (line 351)
  - LocationDetailPage.tsx ✅ DONE

Debug screens:
  - DebugLoginTest.tsx (line 249)
```

---

## ✨ Next Actions

### Immediate (Right Now):
1. Start with BATCH 1 (4 screens)
2. Each screen: ~10-15 minutes
3. Total: ~45 minutes

### Process:
1. Read this guide
2. Extract SupportScreen first
3. Follow the process above
4. Test & commit
5. Continue with next screens

---

## 💡 Tips

✅ **Do this first:**
- Create all `.styles.ts` files in `/src/styles/screens/`
- Move LocationDetailPage.styles.ts here too

✅ **Common imports for styles files:**
```typescript
import { StyleSheet, Dimensions } from 'react-native';
import { colors, spacing, typography } from '../../theme';
import { headerStyles, cardStyles, containerStyles, buttonStyles, inputStyles, sectionStyles, textStyles, dividerStyles, layoutStyles } from '../../styles';

const screenWidth = Dimensions.get('window').width;
```

✅ **After all extractions:**
- Create `/src/styles/screens/index.ts` with all exports
- Test whole app: `pnpm run ios`
- Final commit: "refactor: complete stylesheet extraction to centralized styles folder"

---

## 🎯 Success Criteria

✅ All 20 screens have `.styles.ts` files  
✅ All TSX files updated with new imports  
✅ No `StyleSheet` inline in TSX files  
✅ All styles in `/src/styles/screens/`  
✅ `pnpm run lint` passes  
✅ App runs on iOS device  
✅ Visual unchanged  
✅ Git history clean (one commit per batch)  

---

## 📊 Tracking Progress

**Current:** 2/20 (10%)
```
████░░░░░░░░░░░░░░░░  10%
```

**After Batch 1:** 6/20 (30%)
**After Batch 2:** 11/20 (55%)
**After Batch 3:** 16/20 (80%)
**After Batch 4:** 20/20 (100%) ✅

---

**Ready to start Batch 1?** Let's go! 🚀
