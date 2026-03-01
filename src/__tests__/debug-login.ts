/**
 * Debug script to test login mutation
 * Run this to see the exact response from your local GraphQL endpoint
 */

import Config from 'react-native-config';

const GRAPHQL_ENDPOINT = (Config.GRAPHQL_ENDPOINT as string) || 'http://localhost:3000/graphql';

export const debugLoginMutation = async (email: string, password: string) => {
  try {
    console.log('==== DEBUGGING LOGIN MUTATION ====');
    console.log('Endpoint:', GRAPHQL_ENDPOINT);
    console.log('Email:', email);
    console.log('Password:', password);
    console.log('=====================================\n');

    const response = await fetch(GRAPHQL_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: `
          mutation Login($input: LoginInput!) {
            login(input: $input) {
              accessToken
              refreshToken
              user {
                id
                name
                email
                avatar
              }
            }
          }
        `,
        variables: {
          input: { email, password },
        },
      }),
    });

    console.log('Response Status:', response.status);
    console.log('Response OK:', response.ok);
    console.log('Response Headers:', response.headers);

    const data = await response.json();
    console.log('\n==== FULL RESPONSE ====');
    console.log(JSON.stringify(data, null, 2));
    console.log('========================\n');

    // Check for GraphQL errors
    if (data.errors) {
      console.log('❌ GraphQL ERRORS detected:');
      data.errors.forEach((error: any, index: number) => {
        console.log(`\nError ${index + 1}:`);
        console.log('  Message:', error.message);
        console.log('  Extensions:', JSON.stringify(error.extensions, null, 2));
        console.log('  Original Error:', error.extensions?.originalError);
        console.log('  Code:', error.extensions?.code);
      });
      return { success: false, data };
    }

    // Check for valid response
    if (data.data?.login) {
      console.log('✅ LOGIN SUCCESS');
      console.log('Access Token:', data.data.login.accessToken?.slice(0, 20) + '...');
      console.log('User:', data.data.login.user);
      return { success: true, data };
    }

    console.log('⚠️ No login data in response');
    return { success: false, data };
  } catch (error: any) {
    console.error('❌ FETCH ERROR:');
    console.error('  Message:', error.message);
    console.error('  Stack:', error.stack);
    return { success: false, error: error.message };
  }
};

/**
 * Test endpoint connectivity
 */
export const debugEndpoint = async () => {
  try {
    console.log('Testing endpoint connectivity...');
    const response = await fetch(GRAPHQL_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: '{ __typename }',
      }),
    });

    const data = await response.json();
    console.log('Status:', response.status);
    console.log('Response:', JSON.stringify(data, null, 2));

    if (response.ok) {
      console.log('✅ Endpoint is reachable');
      return true;
    } else {
      console.log('❌ Endpoint returned error status');
      return false;
    }
  } catch (error: any) {
    console.error('❌ Cannot reach endpoint:', error.message);
    return false;
  }
};
