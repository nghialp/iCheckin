/**
 * API Connectivity Check
 * Test script to verify GraphQL endpoint is reachable
 * and authentication flow works correctly
 */

import Config from 'react-native-config';

const GRAPHQL_ENDPOINT = (Config.GRAPHQL_ENDPOINT as string) || 'http://localhost:3000/graphql';

/**
 * Test if GraphQL endpoint is reachable
 */
export const testEndpointConnectivity = async (): Promise<{
  success: boolean;
  endpoint: string;
  status?: number;
  error?: string;
}> => {
  try {
    console.log('[API Test] Testing endpoint:', GRAPHQL_ENDPOINT);
    
    const response = await fetch(GRAPHQL_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: '{ __typename }', // Introspection query to test connectivity
      }),
    });

    console.log('[API Test] Response status:', response.status);

    if (response.ok) {
      const data = await response.json();
      console.log('[API Test] Response data:', data);
      return {
        success: true,
        endpoint: GRAPHQL_ENDPOINT,
        status: response.status,
      };
    } else {
      return {
        success: false,
        endpoint: GRAPHQL_ENDPOINT,
        status: response.status,
        error: `HTTP ${response.status}: ${response.statusText}`,
      };
    }
  } catch (error: any) {
    console.error('[API Test] Error:', error.message);
    return {
      success: false,
      endpoint: GRAPHQL_ENDPOINT,
      error: error.message || 'Unknown error',
    };
  }
};

/**
 * Test login mutation
 */
export const testLoginMutation = async (email: string, password: string) => {
  try {
    console.log('[API Test] Testing login with email:', email);

    const response = await fetch(GRAPHQL_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: `
          mutation Login($email: String!, $password: String!) {
            login(email: $email, password: $password) {
              accessToken
              refreshToken
              user {
                id
                name
                email
              }
            }
          }
        `,
        variables: { email, password },
      }),
    });

    const data = await response.json();
    console.log('[API Test] Login response:', data);

    return {
      success: !data.errors,
      data,
      status: response.status,
    };
  } catch (error: any) {
    console.error('[API Test] Login error:', error.message);
    return {
      success: false,
      error: error.message,
    };
  }
};

/**
 * Test Bearer token in headers
 */
export const testBearerTokenAttachment = async (token: string) => {
  try {
    console.log('[API Test] Testing Bearer token attachment');

    const response = await fetch(GRAPHQL_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({
        query: `
          query {
            me {
              id
              name
              email
            }
          }
        `,
      }),
    });

    const data = await response.json();
    console.log('[API Test] Authenticated query response:', data);

    return {
      success: !data.errors,
      data,
      status: response.status,
    };
  } catch (error: any) {
    console.error('[API Test] Bearer token test error:', error.message);
    return {
      success: false,
      error: error.message,
    };
  }
};

console.log('API Check Test Suite Loaded');
console.log('Current GRAPHQL_ENDPOINT:', GRAPHQL_ENDPOINT);
