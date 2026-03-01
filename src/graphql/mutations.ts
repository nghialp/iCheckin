/**
 * GraphQL Mutations
 * Re-exports mutations from dedicated files for backward compatibility
 * 
 * Note: New mutations should be added to their respective dedicated files:
 * - Authentication: mutations/auth/*
 * - Check-in: mutations/checkin.mutation.ts
 * - Place: mutations/place.mutation.ts
 * - Profile: mutations/profile.mutation.ts
 * - Social: mutations/social.mutation.ts
 * - Reward: mutations/reward.mutation.ts
 */

// Export all mutations from the mutations/index.ts
export * from './mutations/index';

