# 📖 Theme System Quick Reference

**Fast cheat sheet for using the centralized theme system**

---

## 🎨 Colors

```typescript
import { colors, colorAliases } from '@/theme';

// Primary
colors.primary                    // #0066CC
colors.primaryLight             // #E6F0FF
colors.primaryDark              // #0052A3

// Semantic
colors.success                  // #10B981
colors.error                    // #EF4444
colors.warning                  // #F59E0B
colors.info                     // #3B82F6

// Text
colors.textPrimary              // #111827 (main)
colors.textSecondary            // #6B7280 (secondary)
colors.textTertiary             // #9CA3AF (disabled)
colors.textInverse              // #FFFFFF (on dark)

// Backgrounds
colors.background               // #F5F5F5 (app bg)
colors.surface                  // #FFFFFF (cards)
colors.white                    // #FFFFFF
colors.black                    // #000000

// Grays
colors.gray900...gray50         // 10-step gray scale
colors.border                   // #E5E7EB (borders)
colors.divider                  // #D1D5DB (dividers)

// Aliases (semantic naming)
colorAliases.buttonPrimary      // colors.primary
colorAliases.buttonDisabled     // colors.gray300
colorAliases.inputBorder        // colors.border
colorAliases.inputBorderFocus   // colors.primary
colorAliases.statusError        // colors.error
```

---

## ✍️ Typography

```typescript
import { typography, fontSizes, fontWeights } from '@/theme';

// Predefined styles (includes fontSize, fontWeight, lineHeight)
typography.displayLarge         // Display text, 32px, bold
typography.heading1             // Heading 1, 28px, bold
typography.heading2             // Heading 2, 24px, bold
typography.heading3             // Heading 3, 20px, semibold
typography.bodyLarge            // Body, 16px, regular
typography.bodyMedium           // Body, 14px, regular
typography.bodySmall            // Body, 12px, regular
typography.label                // Label, 14px, semibold
typography.button               // Button, 14px, semibold
typography.caption              // Caption, 12px, regular
typography.hint                 // Hint, 12px, regular

// Manual font size/weight
fontSizes.h1                    // 28px
fontSizes.bodyLarge             // 16px
fontSizes.caption               // 12px

fontWeights.bold                // '700'
fontWeights.semibold            // '600'
fontWeights.regular             // '400'
```

**Usage:**
```typescript
const styles = StyleSheet.create({
  title: typography.heading2,
  body: {
    ...typography.bodyLarge,
    color: colors.textSecondary,
  },
});
```

---

## 📐 Spacing (8px Grid)

```typescript
import { spacing, padding, margin, gap } from '@/theme';

// Base units (multiples of 8px)
spacing.xs                      // 4px
spacing.sm                      // 8px
spacing.md                      // 16px
spacing.lg                      // 24px
spacing.xl                      // 32px
spacing.xxl                     // 40px
spacing.xxxl                    // 48px

// Padding presets
padding.container               // 16px (standard container)
padding.containerLarge          // 24px
padding.component               // 16px
padding.button.vertical         // 14px
padding.button.horizontal       // 16px
padding.input.vertical          // 10px
padding.input.horizontal        // 16px
padding.card                    // 16px
padding.section                 // 24px

// Margin presets
margin.component                // 16px
margin.section                  // 24px
margin.betweenSections          // 32px
margin.text                     // 8px

// Gap (Flexbox)
gap.sm                          // 8px
gap.md                          // 16px
gap.lg                          // 24px
```

**Usage:**
```typescript
const styles = StyleSheet.create({
  container: {
    paddingHorizontal: padding.container,    // 16px
    marginBottom: margin.component,           // 16px
    gap: gap.md,                              // 16px
  },
});
```

---

## 🌫️ Shadows

```typescript
import { shadows, shadowPresets, getShadow } from '@/theme';

// Presets (ready to use)
shadowPresets.card              // Elevation 2 (light shadow)
shadowPresets.cardHover         // Elevation 3 (medium shadow)
shadowPresets.modal             // Elevation 4 (prominent shadow)
shadowPresets.button            // Elevation 1 (subtle)
shadowPresets.fab               // Elevation 3 (FAB shadow)
shadowPresets.none              // No shadow

// Get shadow for current platform
getShadow('elevation2')         // Auto-returns iOS or Android shadow

// Manual elevation levels
shadows.elevation1              // Subtle
shadows.elevation2              // Light
shadows.elevation3              // Medium
shadows.elevation4              // Prominent
shadows.elevation5              // Maximum
```

**Usage:**
```typescript
const styles = StyleSheet.create({
  card: {
    ...shadowPresets.card,      // Auto applies elevation2
  },
  cardHover: {
    ...shadowPresets.cardHover, // Auto applies elevation3
  },
});
```

---

## 🔲 Border Radius

```typescript
import { borderRadius, borderRadiusPresets } from '@/theme';

// Base values
borderRadius.xs                 // 4px (small)
borderRadius.sm                 // 6px
borderRadius.md                 // 8px (standard)
borderRadius.lg                 // 12px (cards)
borderRadius.xl                 // 16px (large cards)
borderRadius.xxl                // 20px
borderRadius.full               // 999px (fully rounded)

// Component presets
borderRadiusPresets.button      // 8px
borderRadiusPresets.input       // 12px
borderRadiusPresets.card        // 12px
borderRadiusPresets.avatar      // 999px (circle)
borderRadiusPresets.chip        // 999px (pill)
```

**Usage:**
```typescript
borderRadius: borderRadiusPresets.card,    // 12px
borderRadius: borderRadiusPresets.avatar,  // 999px (circle)
```

---

## 🎯 Common Styles (Pre-built Patterns)

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

// Container
containerStyles.screen                // flex: 1, bg color
containerStyles.screenPadded          // with padding
containerStyles.surface               // white background

// Header
headerStyles.header                   // full header style
headerStyles.headerCompact            // compact variant
headerStyles.headerTitle              // title text style

// Cards
cardStyles.card                       // standard card + shadow
cardStyles.cardLarge                  // larger padding + shadow
cardStyles.cardFlat                   // no shadow
cardStyles.cardElevated               // higher shadow
cardStyles.cardRow                    // horizontal layout
cardStyles.cardOutlined               // outlined variant

// Buttons
buttonStyles.button                   // base button container
buttonStyles.buttonPrimary            // blue background
buttonStyles.buttonSecondary          // light background
buttonStyles.buttonText               // text-only button
buttonStyles.buttonDanger             // red background
buttonStyles.buttonSmall              // small size
buttonStyles.buttonLarge              // large size
buttonStyles.buttonPrimaryText        // white text
buttonStyles.buttonSecondaryText      // dark text
buttonStyles.buttonDisabled           // disabled state

// Inputs
inputStyles.inputContainer            // with margin
inputStyles.inputLabel                // label text
inputStyles.inputWrapper              // field wrapper
inputStyles.input                     // text input
inputStyles.inputError                // error state
inputStyles.inputErrorText            // error message
inputStyles.inputHint                 // hint text
inputStyles.textarea                  // multiline input

// Sections
sectionStyles.section                 // section container
sectionStyles.sectionHeader           // header layout
sectionStyles.sectionTitle            // title text
sectionStyles.sectionDivider          // divider line

// Text colors
textStyles.textPrimary                // main text color
textStyles.textSecondary              // secondary color
textStyles.textError                  // error color
textStyles.textSuccess                // success color

// Layout helpers
layoutStyles.centered                 // center items
layoutStyles.spaceBetween             // space between
layoutStyles.row                      // flexDirection: 'row'
layoutStyles.wrap                     // flexWrap: 'wrap'
```

**Usage:**
```typescript
<View style={cardStyles.card}>
  <Text style={buttonStyles.buttonPrimaryText}>Text</Text>
  <TextInput style={inputStyles.input} />
</View>
```

---

## 🏭 Style Factory (Dynamic Generators)

```typescript
import {
  createPadding,
  createMargin,
  createFlexLayout,
  createButtonStyle,
  createTextStyle,
  createInputStyle,
  createCardStyle,
  createShadow,
  createAbsolutePosition,
  createBorder,
  getStatusColor,
} from '@/styles';

// Padding/Margin
createPadding(16, 12)                 // verticalPadding, horizontalPadding
createMargin(8, 0)

// Flex layout
createFlexLayout('row', 'space-between', 'center')
// flexDirection, justifyContent, alignItems

// Styled components
createButtonStyle(colors.primary, 12, 14, 16)
// bgColor, borderRadius, padV, padH

createTextStyle(16, '600', colors.textPrimary)
// fontSize, fontWeight, color

createInputStyle(colors.border, 12, colors.white)
// borderColor, borderRadius, bgColor

createCardStyle(true, colors.white, 16, 12)
// hasShadow, bgColor, padding, borderRadius

// Shadows
createShadow('medium')                // 'light' | 'medium' | 'heavy'

// Positioning
createAbsolutePosition(0, 0)          // top, right, bottom, left

// Borders
createBorder(1, colors.border, 8)     // width, color, radius

// Status colors
getStatusColor('success')             // 'success'|'error'|'warning'|'info'
```

---

## 📋 Step-by-Step Refactor

### Before:
```typescript
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 16,
  },
  header: {
    fontSize: 24,
    fontWeight: '700',
    color: '#000',
    marginBottom: 16,
  },
  button: {
    backgroundColor: '#0066CC',
    borderRadius: 8,
    paddingVertical: 14,
    paddingHorizontal: 16,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});
```

### After:
```typescript
import { colors, spacing, typography } from '@/theme';
import { containerStyles, buttonStyles } from '@/styles';

const styles = StyleSheet.create({
  container: {
    ...containerStyles.screenPadded,
  },
  header: {
    ...typography.heading2,
    color: colors.textPrimary,
    marginBottom: margin.component,
  },
  button: {
    ...buttonStyles.buttonPrimary,
  },
  buttonText: {
    ...buttonStyles.buttonPrimaryText,
  },
});
```

---

## 🚀 Common Patterns

### Full Screen Container
```typescript
container: {
  ...containerStyles.screen,          // flex: 1, bg color
  padding: spacing.md,                // or use screenPadded
}
```

### Card with Content
```typescript
card: {
  ...cardStyles.card,                 // white, rounded, shadow, padding
  marginBottom: spacing.lg,           // spacing between cards
}
```

### Button with Text
```typescript
<TouchableOpacity style={buttonStyles.buttonPrimary}>
  <Text style={buttonStyles.buttonPrimaryText}>Label</Text>
</TouchableOpacity>
```

### Input with Label
```typescript
<View style={inputStyles.inputContainer}>
  <Text style={inputStyles.inputLabel}>Email</Text>
  <View style={inputStyles.inputWrapper}>
    <TextInput style={inputStyles.input} placeholder="..." />
  </View>
  <Text style={inputStyles.inputHint}>Helper text</Text>
</View>
```

### Section with Title
```typescript
<View style={sectionStyles.section}>
  <View style={sectionStyles.sectionHeader}>
    <Text style={sectionStyles.sectionTitle}>Title</Text>
  </View>
  {/* Content */}
</View>
```

### Centered Container
```typescript
<View style={[containerStyles.flex, layoutStyles.centered]}>
  {/* Content centered on screen */}
</View>
```

---

## 💡 Tips & Tricks

### 1. Combine Multiple Styles
```typescript
headerWithBg: {
  ...headerStyles.header,        // Base header
  backgroundColor: colors.primary, // Override color
  paddingVertical: spacing.lg,   // Override padding
}
```

### 2. Conditional Styles
```typescript
style={[
  buttonStyles.button,
  isDisabled && buttonStyles.buttonDisabled,
]}
```

### 3. Dynamic Colors Based on Status
```typescript
borderColor: getStatusColor(status),  // Returns appropriate color
```

### 4. Create Screen Styles
```typescript
const styles = createScreenStyles({
  customSection: {
    marginBottom: spacing.lg,
  },
});
// Includes: screen, content, centered, header, footer, + custom
```

### 5. Use Responsive Spacing (Future)
```typescript
const { padding } = responsiveSpacing.medium;  // Scales for device size
```

---

## 🔄 Import Patterns

### All Colors
```typescript
import { colors, colorAliases } from '@/theme';
```

### All Typography
```typescript
import { typography, fontSizes, fontWeights } from '@/theme';
```

### All Spacing
```typescript
import { spacing, padding, margin, gap } from '@/theme';
```

### All Shadows
```typescript
import { shadows, shadowPresets, getShadow } from '@/theme';
```

### All Styles
```typescript
import { 
  containerStyles,
  cardStyles,
  buttonStyles,
  inputStyles,
  /* etc */
} from '@/styles';
```

### Specific Styles
```typescript
import {
  cardStyles,
  createCardStyle,
  createButtonStyle,
} from '@/styles';
```

---

## ✅ Do's & Don'ts

### ✅ DO
```typescript
backgroundColor: colors.primary
paddingHorizontal: padding.container
...typography.bodyLarge
...cardStyles.card
```

### ❌ DON'T
```typescript
backgroundColor: '#0066CC'
paddingHorizontal: 16
fontSize: 14, fontWeight: '600'
style={{ backgroundColor: '#fff', padding: 16 }}
```

---

## 📞 Quick Help

**Need a color?** → Check `colors` object  
**Need font sizing?** → Check `typography` presets  
**Need spacing?** → Check `spacing`, `padding`, `margin`  
**Need shadows?** → Check `shadowPresets`  
**Need a card?** → Use `cardStyles.card`  
**Need a button?** → Use `buttonStyles.buttonPrimary`  
**Need an input?** → Use `inputStyles.inputWrapper` + `inputStyles.input`  
**Need custom styles?** → Use `createXxxStyle()` factories  

---

**Last Updated:** March 7, 2026  
**Theme Version:** 1.0  
**Status:** ✅ Production Ready
