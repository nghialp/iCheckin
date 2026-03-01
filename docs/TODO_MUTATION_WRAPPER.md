# Task: Use useApolloMutationWrapper for ChangePassword and ForgetPassword

## Plan
- [x] Fix `authen.interface.ts` - Fix `ResetPasswordInput` interface (remove nested `input` object)
- [x] Refactor `ForgotPasswordPage.tsx` - Replace `useMutation` with `useApolloMutationWrapper`
- [x] Refactor `ChangePasswordPage.tsx` - Fix destructuring and variable passing

## Changes Made

### 1. Fixed `src/graphql/interfaces/pages/authen.interface.ts`
- Updated `ResetPasswordInput` to match the mutation signature (flat variables instead of nested `input`)

### 2. Refactored `src/screens/auth/ForgotPasswordPage.tsx`
- Replaced `useMutation` import with `useApolloMutationWrapper`
- Changed mutation hook from `useMutation<ForgetPasswordResponse, ForgetPasswordInput>` to `useApolloMutationWrapper<ForgetPasswordResponse, ForgetPasswordInput>`
- Updated the mutate call to use the wrapper pattern (without `{ variables: ... }`)

### 3. Fixed `src/screens/auth/ChangePasswordPage.tsx`
- Changed destructuring from array pattern to object pattern
- Updated the mutate call to use the wrapper pattern (without `{ variables: ... }`)
- Added null check for `user.id` to fix TypeScript error

