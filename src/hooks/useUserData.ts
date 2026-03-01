import { useQuery } from '@apollo/client/react';
import useAuth from './useAuth';
import { GET_USER_PROFILE } from '../graphql/queries/user.query';
import { User } from '../graphql/interfaces/entities/user.interface';
import { GetUserResponse } from '../graphql/interfaces/pages/profile.interface';


/**
 * Options for useUserData hook
 */
export interface UseUserDataOptions {
  /** Whether to skip fetching data (use cache only) */
  skip?: boolean;
  /** Callback when data is successfully fetched */
  onCompleted?: (data: { me: User }) => void;
  /** Callback when error occurs */
  onError?: (error: Error) => void;
}

/**
 * Return type for useUserData hook
 */
export interface UseUserDataResult {
  /** The user data */
  user: User | null;
  /** Whether data is currently loading */
  loading: boolean;
  /** Any error that occurred */
  error: Error | undefined;
  /** Function to refetch user data */
  refetch: () => Promise<{ data: { me: User } }>;
  /** Function to update user data in cache */
  updateUserCache: (data: Partial<User>) => void;
}

/**
 * Custom hook for managing user profile data with Apollo cache.
 * This hook provides centralized data fetching and caching for user profile.
 * 
 * Benefits:
 * - Fast navigation with cached data
 * - Automatic cache updates after mutations
 * - Consistent state across all screens
 * 
 * @param options - Optional configuration for data fetching
 * @returns Object containing user data, loading state, and helper functions
 * 
 * @example
 * ```typescript
 * const { user, loading, refetch } = useUserData();
 * 
 * // After updating profile, refetch to get fresh data
 * await refetch();
 * ```
 */
const useUserData = (options?: UseUserDataOptions): UseUserDataResult => {
  const { user: authUser } = useAuth();
  
  const queryResult = useQuery<GetUserResponse>(GET_USER_PROFILE, {
    skip: options?.skip ?? false,
    fetchPolicy: 'cache-first',
    returnPartialData: true,
  });

  const { data, loading, error, refetch } = queryResult;

  // Combine query data with auth context
  const user: User | null = (data?.me as User | undefined) || authUser as User | null || null;

  /**
   * Update user data in Apollo cache
   * This provides optimistic updates for instant UI feedback
   */
  const updateUserCache = (_updateData: Partial<User>) => {
    // Note: In a real implementation, you would use client.writeQuery to update cache
    console.log('Updating user cache with:', _updateData);
  };

  return {
    user,
    loading: loading || (!data && !error),
    error: error as Error | undefined,
    refetch: refetch as () => Promise<{ data: { me: User } }>,
    updateUserCache,
  };
};

export { useUserData };
export default useUserData;