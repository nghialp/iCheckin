/**
 * Quick Test Script - Paste this into React Native console
 * 
 * Steps:
 * 1. Open app
 * 2. Shake phone → Toggle Remote Debug
 * 3. Open Chrome DevTools (chrome://inspect)
 * 4. Go to Console tab
 * 5. Copy & paste the code below
 */

// Test 1: Check Endpoint
console.log('🔍 Starting endpoint test...');
fetch('http://localhost:3000/graphql', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ query: '{ __typename }' })
})
  .then(r => r.json())
  .then(d => console.log('✅ Endpoint OK:', d))
  .catch(e => console.error('❌ Endpoint FAILED:', e.message));

// Test 2: Test Login Mutation
console.log('\n🔍 Starting login test...');
const email = 'test@example.com';
const password = 'password';
fetch('http://localhost:3000/graphql', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    query: `mutation Login($input: LoginInput!) {
      login(input: $input) {
        accessToken
        refreshToken
        user { id name email }
      }
    }`,
    variables: { input: { email, password } }
  })
})
  .then(r => r.json())
  .then(d => {
    if (d.errors) {
      console.error('❌ Login FAILED:', d.errors[0]);
    } else {
      console.log('✅ Login OK:', d.data);
    }
  })
  .catch(e => console.error('❌ Login ERROR:', e.message));
