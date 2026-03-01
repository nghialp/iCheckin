/**
 * Simple test runner for debugging login mutation
 * Usage: 
 *   - Import và gọi functions từ debug-login.ts
 *   - Hoặc chạy npm script: npm run test:debug
 */

import { debugEndpoint, debugLoginMutation } from './debug-login';

/**
 * Test 1: Check if endpoint is reachable
 */
export const runEndpointTest = async () => {
  console.log('\n\n=====================================');
  console.log('🔍 TEST 1: ENDPOINT CONNECTIVITY');
  console.log('=====================================\n');
  
  const result = await debugEndpoint();
  
  if (result) {
    console.log('\n✅ Endpoint test PASSED - Server is reachable\n');
  } else {
    console.log('\n❌ Endpoint test FAILED - Cannot reach server\n');
    console.log('💡 TIP: Make sure your GraphQL server is running on http://localhost:3000/graphql');
  }
  
  return result;
};

/**
 * Test 2: Test login mutation with credentials
 */
export const runLoginTest = async (email: string, password: string) => {
  console.log('\n\n=====================================');
  console.log('🔍 TEST 2: LOGIN MUTATION');
  console.log('=====================================\n');
  
  const result = await debugLoginMutation(email, password);
  
  if (result.success) {
    console.log('\n✅ Login mutation PASSED\n');
    console.log('Response data:', result.data);
  } else {
    console.log('\n❌ Login mutation FAILED\n');
    console.log('Error data:', result.data || result.error);
    console.log('\n💡 DEBUGGING TIPS:');
    console.log('   1. Check if email & password are correct');
    console.log('   2. Check console output above for GraphQL error details');
    console.log('   3. Verify GraphQL schema matches expectations');
  }
  
  return result;
};

/**
 * Run all tests in sequence
 */
export const runAllTests = async (email: string = 'test@example.com', password: string = 'password') => {
  console.log('\n\n╔═════════════════════════════════════╗');
  console.log('║  🚀 LOGIN MUTATION DEBUG TEST SUITE║');
  console.log('╚═════════════════════════════════════╝\n');
  
  // Test 1: Endpoint
  const endpointOk = await runEndpointTest();
  
  if (!endpointOk) {
    console.log('⚠️  Skipping login test because endpoint is not reachable');
    return;
  }
  
  // Test 2: Login with provided credentials
  await runLoginTest(email, password);
  
  console.log('\n\n╔═════════════════════════════════════╗');
  console.log('║  ✨ TESTS COMPLETE ✨              ║');
  console.log('╚═════════════════════════════════════╝\n');
};

// Export for direct usage in components
export default {
  runEndpointTest,
  runLoginTest,
  runAllTests,
};
