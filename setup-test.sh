#!/bin/bash
# ============================================
# SETUP CHECKLIST - Test Login Mutation
# ============================================
# Run this to verify everything is set up

echo "🔍 Checking setup for Login Mutation Tests..."
echo ""

# Check if files exist
echo "✅ Checking files..."

files=(
  "src/__tests__/debug-login.ts"
  "src/__tests__/debug-login-runner.ts"
  "src/__tests__/debug-test.ts"
  "src/screens/debug/DebugLoginTest.tsx"
  "QUICK_TEST_CONSOLE.js"
  "QUICK_START_TEST.md"
  "TEST_LOGIN_MUTATION.md"
  "DEBUG_LOGIN_GUIDE.md"
  "TEST_VISUAL_SUMMARY.md"
)

missing=0
for file in "${files[@]}"; do
  if [ -f "$file" ]; then
    echo "   ✅ $file"
  else
    echo "   ❌ $file (MISSING)"
    ((missing++))
  fi
done

echo ""
if [ $missing -eq 0 ]; then
  echo "✅ All files created successfully!"
else
  echo "❌ $missing files missing"
fi

echo ""
echo "============================================"
echo "📋 NEXT STEPS:"
echo "============================================"
echo ""
echo "1. Read: QUICK_START_TEST.md (fastest setup)"
echo "2. Or:   TEST_VISUAL_SUMMARY.md (visual guide)"
echo "3. Or:   DEBUG_LOGIN_GUIDE.md (detailed guide)"
echo ""
echo "Choose one method:"
echo ""
echo "📌 Method 1: UI Component (Recommended)"
echo "   - Open: src/screens/debug/DebugLoginTest.tsx"
echo "   - Add to App.tsx"
echo "   - Run: pnpm run ios"
echo "   - Navigate to DebugLogin screen"
echo ""
echo "📌 Method 2: Console (Fastest)"
echo "   - Open: QUICK_TEST_CONSOLE.js"
echo "   - Copy & paste to Chrome DevTools"
echo "   - See results in console"
echo ""
echo "📌 Method 3: Direct Fetch (Instant)"
echo "   - Copy fetch code from TEST_LOGIN_MUTATION.md"
echo "   - Paste in React Native console"
echo "   - Done!"
echo ""
echo "============================================"
echo "🚀 Ready to test! Pick a method above!"
echo "============================================"
