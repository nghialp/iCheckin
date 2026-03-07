# 🎨 Stylesheet Extraction Guide

**Hướng dẫn tách StyleSheet từ các page TSX vào file riêng**

---

## 📋 Tổng Quan 3 Cách

| Cách | Tên File | Lợi Ích | Nhược Điểm |
|------|---------|---------|-----------|
| **1** | `LocationDetailPage.styles.ts` | Đơn giản, 1-1 mapping | Nhiều file nhỏ |
| **2** | `styles/location.ts` | Tập trung, dễ tìm | Cần folder structure |
| **3** | `styles/screens/LocationDetailPage.ts` | Best practice, organized | Phức tạp hơn |

---

## ✅ Cách 1: Co-locate (Khuyên Dùng Đơn Giản)

### Bước 1: Tạo file `.styles.ts` cùng thư mục

```
src/screens/app/
├── LocationDetailPage.tsx          ← Component
└── LocationDetailPage.styles.ts    ← Styles (NEW)
```

### Bước 2: Tạo `LocationDetailPage.styles.ts`

```typescript
// LocationDetailPage.styles.ts
import { StyleSheet, Dimensions } from 'react-native';

const screenWidth = Dimensions.get('window').width;

export const styles = StyleSheet.create({
  title: { fontSize: 24, fontWeight: '700' },
  subtitle: { color: '#666', marginBottom: 4 },
  opening: { color: '#0a0', marginBottom: 8 },
  placePhoto: {
    width: screenWidth * 0.7,
    height: 160,
    borderRadius: 10,
    marginRight: 12,
  },
  mapContainer: {
    height: 200,
    borderRadius: 8,
    overflow: 'hidden',
    marginBottom: 12,
  },
  mapMarker: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#0a84ff',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: '#fff',
  },
  mapMarkerText: {
    fontSize: 20,
  },
  checkInButton: {
    backgroundColor: '#0a84ff',
    padding: 12,
    borderRadius: 8,
    marginBottom: 16,
  },
  checkInText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: '600',
    fontSize: 16,
  },
  sectionTitle: { fontSize: 18, fontWeight: '600', marginBottom: 8 },
  reviewCard: {
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#eee',
    borderRadius: 8,
    padding: 12,
    backgroundColor: '#fff',
  },
  userRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 8 },
  avatar: { width: 36, height: 36, borderRadius: 18, marginRight: 8 },
  userName: { fontWeight: '600' },
  timestamp: { color: '#999' },
  caption: { marginBottom: 6 },
  reviewPhoto: {
    width: '100%',
    height: 160,
    borderRadius: 8,
    marginBottom: 6,
  },
  feelings: { fontSize: 18, marginBottom: 4 },
  actionRow: { flexDirection: 'row', justifyContent: 'space-between' },
  closeButton: {
    marginTop: 20,
    padding: 12,
    backgroundColor: '#0a84ff',
    borderRadius: 8,
  },
});
```

### Bước 3: Update `LocationDetailPage.tsx`

**Xóa:**
```typescript
const styles = StyleSheet.create({
  // ... (XÓA TẤT CẢ)
});
```

**Thêm import ở đầu:**
```typescript
import { styles } from './LocationDetailPage.styles';
```

### File cuối cùng:
```typescript
import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  FlatList,
  TouchableOpacity,
  Modal,
  Alert,
  Dimensions,
} from 'react-native';
import MapboxGL from '@rnmapbox/maps';
import { useTranslation } from 'react-i18next';
import { styles } from './LocationDetailPage.styles';  // ← NEW
import { useApolloQueryWrapper } from '../../hooks/useApolloQueryWrapper';
// ... rest of imports

const LocationDetailPage = ({ place_id }: { place_id?: string }) => {
  // ... component code
};

export default LocationDetailPage;
```

---

## 🗂️ Cách 2: Centralized Styles Folder (Best Practice)

### Bước 1: Tạo folder structure

```
src/
├── screens/
│   └── app/
│       └── LocationDetailPage.tsx
├── styles/
│   ├── screens/
│   │   ├── location.ts           ← NEW
│   │   ├── security.ts
│   │   ├── profile.ts
│   │   └── index.ts
│   └── index.ts
└── theme/
```

### Bước 2: Tạo `styles/screens/location.ts`

```typescript
// src/styles/screens/location.ts
import { StyleSheet, Dimensions } from 'react-native';
import { colors, spacing } from '@/theme';

const screenWidth = Dimensions.get('window').width;

export const locationStyles = StyleSheet.create({
  // Header
  title: { 
    fontSize: 24, 
    fontWeight: '700' 
  },
  subtitle: { 
    color: colors.textSecondary, 
    marginBottom: spacing.xs 
  },
  opening: { 
    color: colors.success, 
    marginBottom: spacing.sm 
  },

  // Map
  mapContainer: {
    height: 200,
    borderRadius: 8,
    overflow: 'hidden',
    marginBottom: spacing.md,
  },
  mapMarker: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: colors.white,
  },

  // Photos
  placePhoto: {
    width: screenWidth * 0.7,
    height: 160,
    borderRadius: 10,
    marginRight: spacing.md,
  },
  reviewPhoto: {
    width: '100%',
    height: 160,
    borderRadius: 8,
    marginBottom: spacing.sm,
  },

  // Button
  checkInButton: {
    backgroundColor: colors.primary,
    padding: spacing.md,
    borderRadius: 8,
    marginBottom: spacing.lg,
  },
  checkInText: {
    color: colors.white,
    textAlign: 'center',
    fontWeight: '600',
    fontSize: 16,
  },

  // Reviews
  sectionTitle: { 
    fontSize: 18, 
    fontWeight: '600', 
    marginBottom: spacing.sm 
  },
  reviewCard: {
    marginBottom: spacing.lg,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 8,
    padding: spacing.md,
    backgroundColor: colors.white,
  },

  // User Info
  userRow: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    marginBottom: spacing.sm 
  },
  avatar: { 
    width: 36, 
    height: 36, 
    borderRadius: 18, 
    marginRight: spacing.sm 
  },
  userName: { 
    fontWeight: '600' 
  },
  timestamp: { 
    color: colors.textTertiary 
  },

  // Content
  caption: { 
    marginBottom: spacing.sm 
  },
  feelings: { 
    fontSize: 18, 
    marginBottom: spacing.xs 
  },
  actionRow: { 
    flexDirection: 'row', 
    justifyContent: 'space-between' 
  },

  // Modal
  closeButton: {
    marginTop: spacing.lg,
    padding: spacing.md,
    backgroundColor: colors.primary,
    borderRadius: 8,
  },
});
```

### Bước 3: Tạo `styles/screens/index.ts`

```typescript
// src/styles/screens/index.ts
export { locationStyles } from './location';
// export { securityStyles } from './security';
// export { profileStyles } from './profile';
```

### Bước 4: Update component

```typescript
import { locationStyles } from '@/styles/screens';

const LocationDetailPage = ({ place_id }: { place_id?: string }) => {
  // Use: locationStyles.title, locationStyles.mapContainer, etc.
};
```

---

## 🏗️ Cách 3: Advanced - Separate Theme + Styles

### Cấu trúc hoàn chỉnh:

```
src/
├── theme/
│   ├── colors.ts
│   ├── typography.ts
│   ├── spacing.ts
│   └── index.ts
├── styles/
│   ├── common/
│   │   ├── containers.ts
│   │   ├── cards.ts
│   │   ├── buttons.ts
│   │   └── index.ts
│   ├── screens/
│   │   ├── location.ts    ← Screen-specific
│   │   ├── security.ts
│   │   └── index.ts
│   └── index.ts
└── screens/
```

### File `styles/screens/location.ts` dùng theme:

```typescript
import { StyleSheet, Dimensions } from 'react-native';
import { colors, spacing, typography } from '@/theme';
import { cardStyles, buttonStyles } from '@/styles/common';

const screenWidth = Dimensions.get('window').width;

export const locationStyles = StyleSheet.create({
  // Dùng theme tokens
  title: {
    ...typography.heading2,
    marginBottom: spacing.md,
  },
  subtitle: {
    ...typography.bodySmall,
    color: colors.textSecondary,
    marginBottom: spacing.xs,
  },

  // Dùng common styles
  checkInButton: {
    ...buttonStyles.buttonPrimary,
    marginBottom: spacing.lg,
  },

  reviewCard: {
    ...cardStyles.card,
    marginBottom: spacing.lg,
  },

  // Custom styles
  mapContainer: {
    height: 200,
    borderRadius: 8,
    overflow: 'hidden',
    marginBottom: spacing.md,
  },

  placePhoto: {
    width: screenWidth * 0.7,
    height: 160,
    borderRadius: spacing.md,
    marginRight: spacing.md,
  },
});
```

---

## 🎯 So Sánh 3 Cách

### Cách 1: `.styles.ts` Co-locate
```
LocationDetailPage.tsx
LocationDetailPage.styles.ts ← File kế bên
```
✅ Đơn giản, dễ tìm  
✅ 1-1 mapping rõ ràng  
❌ Nhiều file nhỏ  

### Cách 2: Centralized `/styles/screens/`
```
/src/styles/screens/location.ts
/src/screens/app/LocationDetailPage.tsx
```
✅ Tập trung toàn bộ styles  
✅ Dễ bảo trì, organize  
✅ Có thể reuse styles giữa components  
⚠️ Cần import path dài  

### Cách 3: Theme + Common + Screen Styles
```
/src/theme/colors.ts
/src/styles/common/buttons.ts
/src/styles/screens/location.ts
```
✅ Best practice, professional  
✅ Reusable tokens + patterns  
✅ Global thay đổi dễ  
❌ Setup phức tạp hơn  

---

## 💡 Khuyến Cáo

### Nếu bạn chưa có theme system:
→ **Dùng Cách 1** (Co-locate `.styles.ts`)
- Đơn giản, nhanh
- Sau này dễ migrate

### Nếu bạn đã có theme system:
→ **Dùng Cách 2 hoặc 3** (Centralized `/styles/screens/`)
- Tận dụng theme tokens
- Consistent styling
- Dễ maintain

---

## 🔄 Cách Migrate Từ Inline Styles

### Step 1: Tạo file `.styles.ts` (hoặc `/styles/screens/xxx.ts`)
```bash
cp LocationDetailPage.tsx LocationDetailPage.styles.ts
```

### Step 2: Giữ lại chỉ styles
```typescript
// LocationDetailPage.styles.ts
import { StyleSheet, Dimensions } from 'react-native';

const screenWidth = Dimensions.get('window').width;

export const styles = StyleSheet.create({
  // ... copy từ original
});
```

### Step 3: Update component
```typescript
// LocationDetailPage.tsx
import { styles } from './LocationDetailPage.styles';

// Xóa StyleSheet.create({ ... })
```

### Step 4: Test + Commit
```bash
git add LocationDetailPage.tsx LocationDetailPage.styles.ts
git commit -m "refactor: extract styles from LocationDetailPage"
```

---

## 📝 Naming Convention

### Co-locate Style:
```
PageName.tsx
PageName.styles.ts
```

### Centralized Screen Style:
```
/styles/screens/
├── pageName.ts       (lowercase)
├── anotherPage.ts
└── index.ts
```

### Export naming:
```typescript
// Bad
export const styles = StyleSheet.create({ ... });

// Good
export const locationStyles = StyleSheet.create({ ... });  // Specific
export const screenStyles = StyleSheet.create({ ... });    // Generic
```

---

## ✨ Bonus: Template Tách Nhanh

### `LocationDetailPage.styles.ts`:
```typescript
import { StyleSheet, Dimensions } from 'react-native';
import { colors, spacing, typography } from '@/theme';  // Optional

const screenWidth = Dimensions.get('window').width;

export const styles = StyleSheet.create({
  // [SECTION] Header
  title: { fontSize: 24, fontWeight: '700' },
  subtitle: { color: '#666', marginBottom: 4 },

  // [SECTION] Map
  mapContainer: { height: 200, borderRadius: 8 },

  // [SECTION] Button
  checkInButton: { backgroundColor: '#0a84ff' },

  // [SECTION] Cards
  reviewCard: { borderWidth: 1, borderColor: '#eee' },

  // [SECTION] Modal
  closeButton: { padding: 12 },
});
```

---

## 🚀 Summary

| Bước | Hành động |
|------|---------|
| 1️⃣ | Tạo `LocationDetailPage.styles.ts` |
| 2️⃣ | Copy toàn bộ `StyleSheet.create({ ... })` vào file mới |
| 3️⃣ | Add `export const styles = StyleSheet.create({ ... });` |
| 4️⃣ | Xóa `const styles = StyleSheet.create()` từ `.tsx` |
| 5️⃣ | Import: `import { styles } from './LocationDetailPage.styles';` |
| 6️⃣ | Test + Commit |

**Done!** ✨

---

**Recommend:** Dùng **Cách 1 (Co-locate)** cho nhanh, sau migrate Cách 2 nếu cần organize.
