import { DocumentNode, OperationVariables, TypedDocumentNode } from '@apollo/client';
import { useSubscription } from '@apollo/client/react';

/**
 * Options for useApolloSubscriptionWrapper hook
 */
export interface UseApolloSubscriptionWrapperOptions<TVariables extends OperationVariables = OperationVariables> {
  /** Variables to pass to the subscription */
  variables?: TVariables;
  /** Whether to skip the subscription */
  skip?: boolean;
}

/**
 * Return type for useApolloSubscriptionWrapper hook
 */
export interface UseApolloSubscriptionWrapperResult<TData = unknown> {
  /** The data returned by the subscription */
  data: TData | undefined;
  /** Whether the subscription is currently loading */
  loading: boolean;
  /** Any error that occurred with the subscription */
  error: Error | undefined;
}

/**
 * Custom hook that wraps Apollo useSubscription with typed generics.
 * This hook provides a simple interface for subscribing to GraphQL real-time updates.
 *
 * @template TData - The type of data returned by the subscription
 * @template TVariables - The type of variables passed to the subscription
 * @param subscription - The GraphQL subscription document node
 * @param options - Optional configuration including variables and skip option
 * @returns An object containing data, loading state, and error
 *
 * @example
 * ```typescript
 * const NOTIFICATION_SUBSCRIPTION = gql`
 *   subscription OnNotification($userId: ID!) {
 *     notificationReceived(userId: $userId) {
 *       id
 *       message
 *       type
 *     }
 *   }
 * `;
 *
 * function NotificationsList({ userId }: { userId: string }) {
 *   const { data, loading, error } = useApolloSubscriptionWrapper<NotificationResponse>(
 *     NOTIFICATION_SUBSCRIPTION,
 *     { variables: { userId } }
 *   );
 *
 *   if (loading) return <LoadingSpinner />;
 *   if (error) return <ErrorMessage error={error} />;
 *
 *   return <FlatList data={data?.notificationReceived} renderItem={Item} />;
 * }
 * ```
 */
export function useApolloSubscriptionWrapper<TData = unknown, TVariables extends OperationVariables = OperationVariables>(
  subscription: DocumentNode | TypedDocumentNode<TData, TVariables>,
  options?: UseApolloSubscriptionWrapperOptions<TVariables>,
): UseApolloSubscriptionWrapperResult<TData> {
  const result = useSubscription<TData>(subscription, {
    variables: options?.variables,
    skip: options?.skip,
  }) as { data?: TData; loading: boolean; error?: Error };

  return {
    data: result.data,
    loading: result.loading,
    error: result.error,
  };
}

