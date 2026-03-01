#!/usr/bin/env ts-node
/**
 * Debug test runner - executable test file
 * Run with: npx ts-node src/__tests__/debug-test.ts
 * Or add to package.json: "test:debug": "ts-node src/__tests__/debug-test.ts"
 */

import { runAllTests, runEndpointTest, runLoginTest } from './debug-login-runner';

// Get arguments from command line
const args = process.argv.slice(2);
const command = args[0];
const email = args[1] || 'test@example.com';
const password = args[2] || 'password';

async function main() {
  try {
    if (command === 'endpoint') {
      console.log('Running endpoint test...');
      await runEndpointTest();
    } else if (command === 'login') {
      console.log(`Running login test with email: ${email}`);
      await runLoginTest(email, password);
    } else {
      console.log('Running all tests...');
      await runAllTests(email, password);
    }
  } catch (error) {
    console.error('Error running tests:', error);
    process.exit(1);
  }
}

main();
