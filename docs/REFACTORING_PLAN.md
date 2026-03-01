a# Function to Arrow Function Refactoring Plan

## Task Summary
Convert all regular function declarations to arrow functions across the TypeScript React Native project.

## Files to be Modified

### 1. Custom Hooks (6 files)
- `src/hooks/useAuth.ts`
- `src/hooks/useLocation.ts`
- `src/hooks/useLanguageSwitcher.ts`
- `src/hooks/useApolloQueryWrapper.ts`
- `src/hooks/useApolloMutationWrapper.ts`
- `src/hooks/useApolloSubscriptionWrapper.ts`

### 2. Utility Functions (1 file)
- `src/utils/functions.ts` (3 functions: `requestLocationPermission`, `getDistanceFromLatLonInKm`, `deg2rad`)

### 3. Auth Screens (5 files)
- `src/screens/auth/LoginPage.tsx`
- `src/screens/auth/SignUpPage.tsx`
- `src/screens/auth/ForgotPasswordPage.tsx`
- `src/screens/auth/ChangePasswordPage.tsx`
- `src/screens/auth/EmailSentPage.tsx`

### 4. App Screens (24 files)
- `src/screens/app/HomePage.tsx`
- `src/screens/app/MapPage.tsx`
- `src/screens/app/CheckInPage.tsx` (includes helper function `getPlaceIcon`)
- `src/screens/app/CheckInScreen.tsx`
- `src/screens/app/CheckInDetailScreen.tsx`
- `src/screens/app/ProfilePage.tsx`
- `src/screens/app/SettingsPage.tsx`
- `src/screens/app/RewardsPage.tsx`
- `src/screens/app/RewardDetailScreen.tsx`
- `src/screens/app/LocationDetailPage.tsx`
- `src/screens/app/SearchScreen.tsx`
- `src/screens/app/NotificationsScreen.tsx`
- `src/screens/app/PersonalDetailsScreen.tsx`
- `src/screens/app/RedeemHistoryScreen.tsx`
- `src/screens/app/PrivacyScreen.tsx`
- `src/screens/app/SecurityScreen.tsx`
- `src/screens/app/GeneralSettingsScreen.tsx`
- `src/screens/app/SupportScreen.tsx`

### 5. Common Components (11 files)
- `src/components/common/Header.tsx`
- `src/components/common/Footer.tsx`
- `src/components/common/PlaceItem.tsx`
- `src/components/common/CheckInFeedItem.tsx`
- `src/components/common/CheckInModal.tsx`
- `src/components/common/FilterModal.tsx`
- `src/components/common/ProfileCard.tsx`
- `src/components/common/FriendsFollowingCard.tsx`
- `src/components/common/Icon.tsx`
- `src/components/common/InputField.tsx`
- `src/components/common/AppLayout.tsx`
- `src/components/common/AuthenCard.tsx`
- `src/components/common/ErrorBoundary.tsx`

### 6. Navigation (3 files)
- `src/navigation/AppNavigator.tsx`
- `src/navigation/AuthStack.tsx`
- `src/navigation/TabNavigator.tsx`

### 7. Providers (1 file)
- `src/providers/ApolloWrapper.tsx`

## Conversion Pattern

### Before (Regular Function)
```typescript
export default function FunctionName(props: PropsType) {
  // implementation
  return JSX;
}

function helperFunction(param: type): returnType {
  // implementation
  return value;
}
```

### After (Arrow Function)
```typescript
const FunctionName = (props: PropsType) => {
  // implementation
  return JSX;
};

export default FunctionName;

const helperFunction = (param: type): returnType => {
  // implementation
  return value;
};
```

## Implementation Order
1. Start with utility functions (lowest impact)
2. Then custom hooks
3. Then providers
4. Then navigation
5. Then common components
6. Finally screens

## Total Functions to Convert: ~50
- Utility functions: 3
- Custom hooks: 6
- Screens: ~24
- Components: ~12
- Navigation: 3
- Providers: 1

