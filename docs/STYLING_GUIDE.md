# 🎨 iCheckin Styling Guide

Complete guide for using the centralized theme system and styling patterns in the iCheckin app.

## Table of Contents

1. [Theme System Overview](#theme-system-overview)
2. [Colors](#colors)
3. [Typography](#typography)
4. [Spacing](#spacing)
5. [Shadows](#shadows)
6. [Border Radius](#border-radius)
7. [Common Styles](#common-styles)
8. [Style Factory](#style-factory)
9. [Best Practices](#best-practices)
10. [Examples](#examples)

---

## Theme System Overview

The theme system is centralized in `/src/theme/` and provides all design tokens needed to build consistent, professional UIs.

### Core Modules

```
src/theme/
├── colors.ts              # Color palette and aliases
├── typography.ts          # Font sizes, weights, line heights
├── spacing.ts             # Padding, margin, gap (8px grid)
├── shadows.ts             # Platform-specific shadows
├── borderRadius.ts        # Border radius presets
├── authTheme.ts           # Legacy auth theme
└── index.ts               # Central export

src/styles/
├── commonStyles.ts        # Reusable style patterns
├── styleFactory.ts        # Dynamic style generators
└── index.ts               # Central export
```

### Quick Import

```typescript
// Import theme tokens
import {
  colors,
  typography,
  spacing,
  shadows,
  borderRadius,
} from '@/theme';

// Import reusable styles
import {
  containerStyles,
  headerStyles,
  cardStyles,
  buttonStyles,
  inputStyles,
} from '@/styles';

// Import style generators
import {
  createButtonStyle,
  createTextStyle,
  createCardStyle,
} from '@/styles';
```

---

## Colors

### Color Palette

The app uses a professional color system with primary, secondary, neutral, and semantic colors.

```typescript
import { colors, colorAliases } from '@/theme';

// Primary colors
colors.primary          // #0066CC (main brand)
colors.primaryLight     // #E6F0FF (light variant)
colors.primaryDark      // #0052A3 (dark variant)

// Secondary colors
colors.secondary        // #10B981 (green/success)
colors.secondaryLight
colors.secondaryDark

// Neutral colors (gray scale)
colors.black            // #000000
colors.white            // #FFFFFF
colors.gray900          // #111827 (darkest)
colors.gray800
colors.gray700
colors.gray600
colors.gray500
colors.gray400
colors.gray300
colors.gray200
colors.gray100
colors.gray50           // #F9FAFB (lightest)

// Semantic colors
colors.success          // #10B981
colors.error            // #EF4444
colors.warning          // #F59E0B
colors.info             // #3B82F6

// Text colors
colors.textPrimary      // Gray 900 (main text)
colors.textSecondary    // Gray 500 (secondary text)
colors.textTertiary     // Gray 400 (disabled/hint text)
colors.textInverse      // White (on dark backgrounds)

// Backgrounds
colors.background       // #F5F5F5 (default app bg)
colors.surface          // #FFFFFF (cards, surfaces)
colors.surfaceVariant   // #F9FAFB (subtle alternative)

// Borders
colors.border           // Gray 200 (default)
colors.borderLight      // Gray 100 (light)
colors.divider          // Gray 300 (divider line)
```

### Color Aliases

For semantic usage:

```typescript
import { colorAliases } from '@/theme';

// Navigation
colorAliases.tabBarBackground
colorAliases.tabBarActive
colorAliases.tabBarInactive

// Buttons
colorAliases.buttonPrimary
colorAliases.buttonSecondary
colorAliases.buttonDisabled
colorAliases.buttonDisabledText

// Inputs
colorAliases.inputBackground
colorAliases.inputBorder
colorAliases.inputBorderFocus
colorAliases.inputText
colorAliases.inputPlaceholder

// Cards
colorAliases.cardBackground
colorAliases.cardBorder

// Status
colorAliases.statusSuccess
colorAliases.statusError
colorAliases.statusWarning
colorAliases.statusInfo
```

### Usage Example

```typescript
const styles = StyleSheet.create({
  button: {
    backgroundColor: colors.primary,
    color: colors.white,
  },
  header: {
    backgroundColor: colorAliases.headerBackground,
    borderBottomColor: colorAliases.headerBorder,
  },
});
```

---

## Typography

### Font Sizes

```typescript
import { fontSizes, typography } from '@/theme';

// Display
fontSizes.display       // 32px (hero text)

// Headings
fontSizes.h1            // 28px
fontSizes.h2            // 24px
fontSizes.h3            // 20px
fontSizes.h4            // 18px
fontSizes.h5            // 16px
fontSizes.h6            // 14px

// Body
fontSizes.bodyLarge     // 16px
fontSizes.bodyMedium    // 14px
fontSizes.bodySmall     // 12px

// Label
fontSizes.label         // 14px
fontSizes.labelSmall    // 12px

// Caption
fontSizes.caption       // 12px
fontSizes.captionSmall  // 11px
```

### Font Weights

```typescript
fontWeights.light       // '300'
fontWeights.regular     // '400'
fontWeights.medium      // '500'
fontWeights.semibold    // '600'
fontWeights.bold        // '700'
fontWeights.extrabold   // '800'
```

### Predefined Typography Styles

```typescript
// Use predefined styles for consistency
typography.displayLarge
typography.heading1
typography.heading2
typography.heading3
typography.bodyLarge
typography.bodyMedium
typography.bodySmall
typography.label
typography.labelSmall
typography.button
typography.caption
typography.captionSmall
typography.hint
```

### Usage Example

```typescript
import { typography, fontWeights } from '@/theme';

const styles = StyleSheet.create({
  title: {
    ...typography.heading2,        // Includes fontSize, fontWeight, lineHeight
    color: colors.textPrimary,
  },
  buttonText: {
    ...typography.button,
    fontWeight: fontWeights.semibold,
  },
});
```

---

## Spacing

Uses 8px grid system for consistency and rhythm.

### Spacing Units

```typescript
import { spacing, padding, margin, gap } from '@/theme';

// Base units (multiples of 8px)
spacing.xs              // 4px
spacing.sm              // 8px
spacing.md              // 16px
spacing.lg              // 24px
spacing.xl              // 32px
spacing.xxl             // 40px
spacing.xxxl            // 48px
```

### Padding Presets

```typescript
// Container padding
padding.container       // 16px (default container)
padding.containerLarge  // 24px
padding.containerSmall  // 8px

// Component padding
padding.component       // 16px
padding.componentLarge  // 24px
padding.componentSmall  // 8px

// Button padding
padding.button.vertical   // 14px
padding.button.horizontal // 16px

// Input padding
padding.input.vertical    // 10px
padding.input.horizontal  // 16px

// Card padding
padding.card            // 16px
padding.cardLarge       // 24px

// Section padding
padding.section         // 24px
padding.sectionSmall    // 16px
```

### Margin Presets

```typescript
// Component margins
margin.component        // 16px
margin.componentLarge   // 24px
margin.componentSmall   // 8px
margin.componentTiny    // 4px

// Section margins
margin.section          // 24px
margin.sectionLarge     // 32px
margin.betweenSections  // 32px

// Text margins
margin.text             // 8px
margin.textLarge        // 16px
```

### Gap (Flexbox)

```typescript
gap.xs                  // 4px
gap.sm                  // 8px
gap.md                  // 16px
gap.lg                  // 24px
gap.xl                  // 32px
gap.xxl                 // 40px
```

### Usage Example

```typescript
const styles = StyleSheet.create({
  container: {
    paddingHorizontal: padding.container,
    paddingVertical: spacing.md,
  },
  button: {
    marginBottom: margin.component,
  },
  section: {
    marginBottom: margin.section,
    paddingHorizontal: padding.container,
  },
});
```

---

## Shadows

Cross-platform shadows that work consistently on iOS and Android.

### Elevation Levels

```typescript
import { shadows, shadowPresets, getShadow } from '@/theme';

// 5 elevation levels
shadows.elevation1      // Subtle (cards, small elements)
shadows.elevation2      // Light (cards, buttons)
shadows.elevation3      // Medium (elevated cards)
shadows.elevation4      // Prominent (modals)
shadows.elevation5      // Maximum (maximum elevation)
```

### Shadow Presets

```typescript
// Component shadows
shadowPresets.card          // elevation2 (standard card)
shadowPresets.cardHover     // elevation3 (card on hover)
shadowPresets.modal         // elevation4 (modal dialog)
shadowPresets.button        // elevation1 (button)
shadowPresets.buttonHover   // elevation2 (button on hover)
shadowPresets.fab           // elevation3 (floating action button)
shadowPresets.fabHover      // elevation4 (fab on hover)
shadowPresets.none          // No shadow
```

### Get Shadow Helper

```typescript
// Get shadow for current platform automatically
const cardShadow = getShadow('elevation2');

// Returns appropriate shadow for iOS or Android
const styles = StyleSheet.create({
  card: {
    ...cardShadow,
  },
});
```

### Usage Example

```typescript
import { shadowPresets } from '@/theme';

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.white,
    borderRadius: borderRadius.lg,
    padding: spacing.md,
    ...shadowPresets.card,      // Applies elevation2
  },
  cardOnHover: {
    ...shadowPresets.cardHover, // Applies elevation3
  },
});
```

---

## Border Radius

Consistent border radius values for all components.

```typescript
import { borderRadius, borderRadiusPresets } from '@/theme';

// Base units
borderRadius.xs             // 4px (small elements)
borderRadius.sm             // 6px (small inputs)
borderRadius.md             // 8px (standard)
borderRadius.lg             // 12px (cards, buttons)
borderRadius.xl             // 16px (large cards)
borderRadius.xxl            // 20px (extra large)
borderRadius.full           // 999px (fully rounded)

// Component presets
borderRadiusPresets.button          // 8px
borderRadiusPresets.buttonLarge     // 12px
borderRadiusPresets.buttonSmall     // 6px
borderRadiusPresets.input           // 12px
borderRadiusPresets.card            // 12px
borderRadiusPresets.cardLarge       // 16px
borderRadiusPresets.modal           // 16px
borderRadiusPresets.image           // 8px
borderRadiusPresets.imageRound      // 999px (circle)
borderRadiusPresets.chip            // 999px (fully rounded)
borderRadiusPresets.avatar          // 999px (circle)
```

### Usage Example

```typescript
const styles = StyleSheet.create({
  card: {
    borderRadius: borderRadiusPresets.card,    // 12px
  },
  button: {
    borderRadius: borderRadiusPresets.button,  // 8px
  },
  avatar: {
    borderRadius: borderRadiusPresets.avatar,  // 999px (circle)
  },
});
```

---

## Common Styles

Pre-built style collections for common UI patterns.

### Available Common Style Collections

```typescript
import {
  containerStyles,
  headerStyles,
  cardStyles,
  buttonStyles,
  inputStyles,
  sectionStyles,
  textStyles,
  dividerStyles,
  layoutStyles,
} from '@/styles';
```

### Container Styles

```typescript
containerStyles.flex         // flex: 1
containerStyles.screen       // Full screen with background
containerStyles.screenPadded // Full screen with padding
containerStyles.surface      // Surface background
```

### Header Styles

```typescript
headerStyles.header          // Row layout with border
headerStyles.headerCompact   // Compact header
headerStyles.headerTitle     // Styled header title
headerStyles.headerSubtitle  // Styled header subtitle
```

### Card Styles

```typescript
cardStyles.card              // Basic card with shadow
cardStyles.cardLarge         // Card with larger padding
cardStyles.cardFlat          // Card without shadow
cardStyles.cardElevated      // Card with elevated shadow
cardStyles.cardRow           // Horizontal card layout
cardStyles.cardOutlined      // Outlined card variant
```

### Button Styles

```typescript
buttonStyles.button              // Base button container
buttonStyles.buttonPrimary       // Primary button background
buttonStyles.buttonPrimaryText   // Primary button text
buttonStyles.buttonSecondary     // Secondary button
buttonStyles.buttonSecondaryText // Secondary button text
buttonStyles.buttonDisabled      // Disabled state
buttonStyles.buttonDisabledText  // Disabled text
buttonStyles.buttonText          // Text button
buttonStyles.buttonTextContent   // Text button content
buttonStyles.buttonDanger        // Danger button
buttonStyles.buttonDangerText    // Danger button text
buttonStyles.buttonSmall         // Small size button
buttonStyles.buttonLarge         // Large size button
buttonStyles.buttonIcon          // Icon spacing
```

### Input Styles

```typescript
inputStyles.inputContainer      // Container with margin
inputStyles.inputLabel          // Label text
inputStyles.inputWrapper        // Input field wrapper
inputStyles.inputWrapperFocused // Focused state
inputStyles.input               // Text input
inputStyles.inputPlaceholder    // Placeholder color
inputStyles.inputError          // Error state
inputStyles.inputErrorText      // Error message text
inputStyles.inputHint           // Hint/helper text
inputStyles.inputIcon           // Icon styling
inputStyles.inputSuffix         // Suffix icon styling
inputStyles.textarea            // Textarea specific
```

### Section Styles

```typescript
sectionStyles.section           // Section container
sectionStyles.sectionPadded     // Section with padding
sectionStyles.sectionHeader     // Section header layout
sectionStyles.sectionTitle      // Section title text
sectionStyles.sectionSubtitle   // Section subtitle text
sectionStyles.sectionDivider    // Divider line
```

### Text Styles

```typescript
textStyles.textPrimary          // Primary text color
textStyles.textSecondary        // Secondary text color
textStyles.textTertiary         // Tertiary text color
textStyles.textError            // Error text color
textStyles.textSuccess          // Success text color
textStyles.textWarning          // Warning text color
```

### Divider Styles

```typescript
dividerStyles.horizontal        // Standard divider
dividerStyles.light             // Light divider
dividerStyles.bold              // Bold divider
```

### Layout Styles

```typescript
layoutStyles.centered           // Centered container
layoutStyles.spaceBetween       // Space between layout
layoutStyles.row                // Row flexbox
layoutStyles.column             // Column flexbox
layoutStyles.wrap               // Flex wrap
```

### Usage Example

```typescript
import { cardStyles, buttonStyles, inputStyles } from '@/styles';

export default function MyScreen() {
  return (
    <View style={cardStyles.card}>
      <TextInput style={inputStyles.input} />
      <TouchableOpacity style={buttonStyles.buttonPrimary}>
        <Text style={buttonStyles.buttonPrimaryText}>Submit</Text>
      </TouchableOpacity>
    </View>
  );
}
```

---

## Style Factory

Dynamic style generators for custom styling scenarios.

### Available Generators

```typescript
import {
  createPadding,
  createMargin,
  createFlexLayout,
  createButtonStyle,
  createTextStyle,
  createInputStyle,
  createCardStyle,
  createOverlayStyle,
  createResponsiveSize,
  createShadow,
  createAbsolutePosition,
  createFullSize,
  createBorder,
  getStatusColor,
  createBackgroundWithOpacity,
  createScreenStyles,
} from '@/styles';
```

### Function Reference

#### `createPadding(vertical, horizontal)`

```typescript
createPadding(16, 12)  // paddingVertical: 16, paddingHorizontal: 12
```

#### `createMargin(vertical, horizontal)`

```typescript
createMargin(8, 0)     // marginVertical: 8, marginHorizontal: 0
```

#### `createFlexLayout(direction, justify, align)`

```typescript
createFlexLayout('row', 'space-between', 'center')
// flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'
```

#### `createButtonStyle(backgroundColor, borderRadius, paddingVertical, paddingHorizontal)`

```typescript
createButtonStyle(colors.primary, 12, 14, 16)
// Returns complete button view style
```

#### `createTextStyle(fontSize, fontWeight, color, lineHeight)`

```typescript
createTextStyle(16, '600', colors.textPrimary, 24)
// Returns complete text style
```

#### `createInputStyle(borderColor, borderRadius, backgroundColor)`

```typescript
createInputStyle(colors.border, 12, colors.white)
// Returns input wrapper style
```

#### `createCardStyle(hasShadow, backgroundColor, padding, borderRadius)`

```typescript
createCardStyle(true, colors.white, 16, 12)
// Returns card style with optional shadow
```

#### `createShadow(elevation)`

```typescript
createShadow('medium')
// Returns shadow preset for 'light', 'medium', or 'heavy'
```

#### `createAbsolutePosition(top, right, bottom, left)`

```typescript
createAbsolutePosition(0, 0)
// Returns absolute positioning style
```

#### `getStatusColor(status)`

```typescript
getStatusColor('success')   // Returns colors.success
getStatusColor('error')     // Returns colors.error
```

### Usage Example

```typescript
import { createScreenStyles, createButtonStyle } from '@/styles';

const styles = createScreenStyles({
  customCard: {
    ...createCardStyle(true, colors.white, 20, 16),
  },
  customButton: {
    ...createButtonStyle(colors.primary, 12),
  },
});

export default function MyScreen() {
  return (
    <View style={styles.screen}>
      <View style={styles.customCard}>
        <TouchableOpacity style={styles.customButton}>
          <Text>Press me</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
```

---

## Best Practices

### 1. **Use Theme Tokens**

✅ **DO:**
```typescript
import { colors, spacing } from '@/theme';

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.primary,
    padding: spacing.md,
  },
});
```

❌ **DON'T:**
```typescript
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#0066CC',
    padding: 16,
  },
});
```

### 2. **Use Common Styles When Possible**

✅ **DO:**
```typescript
import { cardStyles, buttonStyles } from '@/styles';

<View style={cardStyles.card}>
  <TouchableOpacity style={buttonStyles.buttonPrimary}>
    {/* content */}
  </TouchableOpacity>
</View>
```

❌ **DON'T:**
```typescript
<View style={{ backgroundColor: '#fff', borderRadius: 12, padding: 16, ... }}>
  <TouchableOpacity style={{ backgroundColor: '#0066CC', ... }}>
    {/* content */}
  </TouchableOpacity>
</View>
```

### 3. **Follow the 8px Grid**

✅ **DO:**
```typescript
import { spacing, margin, padding } from '@/theme';

const styles = StyleSheet.create({
  container: {
    padding: padding.container,        // 16px
    marginBottom: margin.component,    // 16px
    gap: spacing.md,                   // 16px
  },
});
```

❌ **DON'T:**
```typescript
const styles = StyleSheet.create({
  container: {
    padding: 15,
    marginBottom: 18,
    gap: 14,
  },
});
```

### 4. **Use Typography Presets**

✅ **DO:**
```typescript
import { typography } from '@/theme';

const styles = StyleSheet.create({
  title: typography.heading2,
  body: typography.bodyLarge,
});
```

❌ **DON'T:**
```typescript
const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    fontWeight: '700',
    lineHeight: 32,
  },
  body: {
    fontSize: 16,
    fontWeight: '400',
    lineHeight: 24,
  },
});
```

### 5. **Use Shadow Presets**

✅ **DO:**
```typescript
import { shadowPresets } from '@/theme';

const styles = StyleSheet.create({
  card: {
    ...shadowPresets.card,
  },
});
```

❌ **DON'T:**
```typescript
const styles = StyleSheet.create({
  card: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },
});
```

### 6. **Use Color Aliases for Semantic Colors**

✅ **DO:**
```typescript
import { colorAliases } from '@/theme';

const styles = StyleSheet.create({
  button: {
    backgroundColor: colorAliases.buttonPrimary,
    borderColor: colorAliases.buttonBorder,
  },
});
```

❌ **DON'T:**
```typescript
const styles = StyleSheet.create({
  button: {
    backgroundColor: '#0066CC',
    borderColor: '#E5E7EB',
  },
});
```

### 7. **Keep Styles in One Place**

✅ **DO:**
```typescript
const styles = StyleSheet.create({
  // All styles defined here
});
```

❌ **DON'T:**
```typescript
// Styles scattered throughout component
<View style={{ backgroundColor: colors.white, padding: spacing.md }} />
<Text style={{ fontSize: 16, fontWeight: '600' }} />
```

---

## Examples

### Example 1: Refactoring a Screen

**Before (without theme system):**

```typescript
export default function LoginPage() {
  return (
    <View style={{ flex: 1, backgroundColor: '#f5f5f5', padding: 16 }}>
      <View style={{ paddingVertical: 24 }}>
        <Text style={{ fontSize: 28, fontWeight: '700', color: '#000', textAlign: 'center' }}>
          Login
        </Text>
      </View>

      <View style={{ marginBottom: 16 }}>
        <Text style={{ fontSize: 14, fontWeight: '600', color: '#000', marginBottom: 8 }}>
          Email
        </Text>
        <View style={{ 
          flexDirection: 'row', 
          alignItems: 'center', 
          backgroundColor: '#fff',
          borderRadius: 12,
          borderWidth: 1,
          borderColor: '#ddd',
          paddingHorizontal: 16,
        }}>
          <TextInput style={{ flex: 1, paddingVertical: 12, fontSize: 16, color: '#000' }} />
        </View>
      </View>

      <TouchableOpacity style={{
        paddingVertical: 14,
        paddingHorizontal: 16,
        borderRadius: 12,
        backgroundColor: '#0066CC',
        alignItems: 'center',
        marginBottom: 24,
      }}>
        <Text style={{ fontSize: 16, fontWeight: '600', color: '#fff' }}>
          Sign In
        </Text>
      </TouchableOpacity>
    </View>
  );
}
```

**After (with theme system):**

```typescript
import { SafeAreaView } from 'react-native';
import { colors, spacing, typography } from '@/theme';
import { containerStyles, headerStyles, inputStyles, buttonStyles } from '@/styles';

const styles = StyleSheet.create({
  container: {
    ...containerStyles.screenPadded,
  },
  headerContainer: {
    paddingVertical: spacing.lg,
  },
  headerTitle: {
    ...typography.displayLarge,
    color: colors.textPrimary,
    textAlign: 'center',
  },
  inputContainer: {
    marginBottom: spacing.md,
  },
});

export default function LoginPage() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.headerTitle}>Login</Text>
      </View>

      <View style={styles.inputContainer}>
        <Text style={inputStyles.inputLabel}>Email</Text>
        <View style={inputStyles.inputWrapper}>
          <TextInput style={inputStyles.input} placeholder="your@email.com" />
        </View>
      </View>

      <TouchableOpacity style={buttonStyles.buttonPrimary}>
        <Text style={buttonStyles.buttonPrimaryText}>Sign In</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}
```

### Example 2: Creating a Consistent Card List

```typescript
import { FlatList, View, Text, TouchableOpacity } from 'react-native';
import { colors, spacing, typography } from '@/theme';
import { cardStyles, buttonStyles, sectionStyles } from '@/styles';

const styles = StyleSheet.create({
  section: {
    ...sectionStyles.section,
  },
  sectionHeader: {
    ...sectionStyles.sectionHeader,
  },
  sectionTitle: {
    ...sectionStyles.sectionTitle,
  },
  card: {
    ...cardStyles.card,
    marginBottom: spacing.md,
  },
  cardTitle: {
    ...typography.heading3,
    color: colors.textPrimary,
    marginBottom: spacing.sm,
  },
  cardDescription: {
    ...typography.bodyMedium,
    color: colors.textSecondary,
    marginBottom: spacing.md,
  },
  cardButton: {
    ...buttonStyles.buttonSecondary,
  },
});

export default function CardListScreen({ items }) {
  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <Text style={styles.cardTitle}>{item.title}</Text>
      <Text style={styles.cardDescription}>{item.description}</Text>
      <TouchableOpacity style={styles.cardButton}>
        <Text style={buttonStyles.buttonSecondaryText}>Learn More</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.section}>
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Features</Text>
      </View>
      <FlatList
        data={items}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        scrollEnabled={false}
      />
    </View>
  );
}
```

### Example 3: Dynamic Styling with Style Factory

```typescript
import { createScreenStyles, createCardStyle, createStatusColor } from '@/styles';
import { colors } from '@/theme';

const styles = createScreenStyles({
  successCard: {
    ...createCardStyle(true, colors.white, 16, 12),
    borderLeftWidth: 4,
    borderLeftColor: colors.success,
  },
  errorCard: {
    ...createCardStyle(true, colors.white, 16, 12),
    borderLeftWidth: 4,
    borderLeftColor: colors.error,
  },
});

function StatusCard({ status, message }) {
  const borderColor = getStatusColor(status);
  
  return (
    <View style={[
      styles.errorCard,
      { borderLeftColor: borderColor }
    ]}>
      <Text>{message}</Text>
    </View>
  );
}
```

---

## Troubleshooting

### Styles not applying?

1. Make sure you're using `StyleSheet.create()`
2. Check that you've imported from correct path (`@/theme`, `@/styles`)
3. Verify theme tokens exist in `/src/theme/`

### Color looks different on different platforms?

Use `colorAliases` which are already platform-tested, or use the `getShadow()` function for shadows.

### Performance issues?

Always define `StyleSheet.create()` outside of component renders to avoid creating new style objects on every render.

---

## Summary

The theme system provides:

✅ **Centralized Design Tokens** - All colors, typography, spacing in one place  
✅ **Consistency** - Unified look across all screens  
✅ **Maintainability** - Easy to update brand colors or spacing globally  
✅ **Professional Design** - Pre-built patterns for common components  
✅ **Developer Experience** - Autocomplete and type safety  
✅ **Performance** - Optimized style definitions  

Happy styling! 🎨
