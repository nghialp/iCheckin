import { DocumentNode, OperationVariables } from '@apollo/client';
import { useMutation } from '@apollo/client/react';

/**
 * Options for useApolloMutationWrapper hook
 */
export interface UseApolloMutationWrapperOptions<TData = unknown, TVariables extends OperationVariables = OperationVariables> {
  /** Callback when mutation completes successfully */
  onCompleted?: (data: TData) => void;
  /** Callback when mutation fails */
  onError?: (error: Error) => void;
}

/**
 * Return type for useApolloMutationWrapper hook
 */
export interface UseApolloMutationWrapperResult<TData = unknown, TVariables extends OperationVariables = OperationVariables> {
  /** Function to execute the mutation */
  mutate: (variables?: TVariables) => Promise<{ data: TData }>;
  /** Whether the mutation is currently loading */
  loading: boolean;
  /** Any error that occurred during the mutation */
  error: Error | undefined;
  /** The data returned by the mutation */
  data: TData | undefined;
}

/**
 * Custom hook that wraps Apollo useMutation with typed generics.
 * This hook provides a streamlined way to execute GraphQL mutations.
 *
 * @template TData - The type of data returned by the mutation
 * @template TVariables - The type of variables passed to the mutation
 * @param mutation - The GraphQL mutation document node
 * @param options - Optional configuration for the mutation
 * @returns An object containing the mutate function, loading state, error, and data
 *
 * @example
 * ```typescript
 * const LOGIN_MUTATION = gql`
 *   mutation Login($email: String!, $password: String!) {
 *     login(email: $email, password: $password) {
 *       accessToken
 *       user { id name }
 *     }
 *   }
 * `;
 *
 * function LoginForm() {
 *   const { mutate, loading, error, data } = useApolloMutationWrapper<
 *     LoginResponse,
 *     { email: string; password: string }
 *   >(LOGIN_MUTATION);
 *
 *   const handleSubmit = async (values) => {
 *     const result = await mutate({ email: values.email, password: values.password });
 *     if (result.data?.login) {
 *       navigation.navigate('Home');
 *     }
 *   };
 *
 *   return <Form onSubmit={handleSubmit} disabled={loading} />;
 * }
 * ```
 */
const useApolloMutationWrapper = <TData = unknown, TVariables extends OperationVariables = OperationVariables>(
  mutation: DocumentNode,
  options?: UseApolloMutationWrapperOptions<TData, TVariables>,
): UseApolloMutationWrapperResult<TData, TVariables> => {
  const [executeMutation, result] = useMutation<TData, TVariables>(mutation, {
    onCompleted: options?.onCompleted,
    onError: options?.onError as (error: Error) => void,
  });

  const mutate = async (variables?: TVariables): Promise<{ data: TData }> => {
    try {
      const res = await executeMutation({ variables: variables as TVariables });
      
      // Ensure we always return a data object
      if (res && res.data) {
        return { data: res.data as TData };
      }
      
      // If no data, return empty object or throw
      console.warn('⚠️ Mutation completed without data:', res);
      return { data: {} as TData };
    } catch (error) {
      console.error('❌ Mutation error in wrapper:', error);
      throw error;
    }
  };

  return {
    mutate,
    loading: result.loading,
    error: result.error,
    data: result.data || undefined,
  };
};

export { useApolloMutationWrapper };
export default useApolloMutationWrapper;

