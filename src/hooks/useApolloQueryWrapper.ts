import { DocumentNode, OperationVariables } from '@apollo/client';
import { useQuery } from '@apollo/client/react';

/**
 * Options for useApolloQueryWrapper hook
 */
export interface UseApolloQueryWrapperOptions<TVariables extends OperationVariables = OperationVariables> {
  /** Variables to pass to the query */
  variables?: TVariables;
  /** Whether to skip the query */
  skip?: boolean;
}

/**
 * Return type for useApolloQueryWrapper hook
 */
export interface UseApolloQueryWrapperResult<TData = unknown> {
  /** The data returned by the query */
  data: TData | undefined;
  /** Whether the query is currently loading */
  loading: boolean;
  /** Any error that occurred during the query */
  error: Error | undefined;
}

/**
 * Custom hook that wraps Apollo useQuery with typed generics.
 * This hook provides a simplified interface for executing GraphQL queries.
 *
 * @template TData - The type of data returned by the query
 * @template TVariables - The type of variables passed to the query
 * @param query - The GraphQL query document node
 * @param options - Optional configuration including variables and skip option
 * @returns An object containing data, loading state, and error
 *
 * @example
 * ```typescript
 * const GET_USER = gql`
 *   query GetUser($id: ID!) {
 *     user(id: $id) {
 *       id
 *       name
 *       email
 *     }
 *   }
 * `;
 *
 * function UserProfile({ userId }: { userId: string }) {
 *   const { data, loading, error } = useApolloQueryWrapper<{ user: User }>(
 *     GET_USER,
 *     { variables: { id: userId } }
 *   );
 *
 *   if (loading) return <LoadingSpinner />;
 *   if (error) return <ErrorMessage error={error} />;
 *
 *   return <Text>{data?.user?.name}</Text>;
 * }
 * ```
 */
export function useApolloQueryWrapper<TData = unknown, TVariables extends OperationVariables = OperationVariables>(
  query: DocumentNode,
  options?: UseApolloQueryWrapperOptions<TVariables>,
): UseApolloQueryWrapperResult<TData> {
  const result = useQuery<TData>(query, {
    variables: options?.variables,
    skip: options?.skip,
  }) as { data?: TData; loading: boolean; error?: Error };

  return {
    data: result.data,
    loading: result.loading,
    error: result.error,
  };
}

