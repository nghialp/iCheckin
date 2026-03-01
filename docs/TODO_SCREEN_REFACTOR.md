# Screen Refactoring Plan

## Task
Refactor all screens in `screens/app` to use the new Apollo wrapper hooks:
- `useApolloQueryWrapper` instead of `useQuery`
- `useApolloMutationWrapper` instead of `useMutation`
- `useApolloSubscriptionWrapper` instead of `useSubscription`

## Screens Refactored
1. ✅ HomePage.tsx - uses useQuery
2. ✅ CheckInPage.tsx - uses useQuery and useMutation
3. ✅ MapPage.tsx - uses useQuery (fixed bug with useQuery in function)
4. ✅ LocationDetailPage.tsx - uses useQuery and useMutation
5. ✅ RewardsPage.tsx - uses useQuery
6. ✅ SearchScreen.tsx - uses useQuery
7. ✅ PrivacyScreen.tsx - uses useMutation
8. ✅ NotificationsScreen.tsx - uses useMutation
9. ✅ PersonalDetailsScreen.tsx - uses useMutation
10. ✅ RedeemHistoryScreen.tsx - uses useQuery
11. ✅ CheckInScreen.tsx - uses useQuery
12. ✅ CheckInDetailScreen.tsx - uses useQuery
13. ✅ RewardDetailScreen.tsx - uses useQuery and useMutation

## Summary
- 10 screens use `useApolloQueryWrapper`
- 6 screens use `useApolloMutationWrapper`
- Fixed MapPage bug where useQuery was incorrectly called inside a function
- Removed `variables` wrapper from mutation calls for cleaner syntax
- Fixed import paths for GET_NEARBY_PLACES from map.query.ts

