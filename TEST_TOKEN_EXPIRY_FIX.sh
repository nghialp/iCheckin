#!/bin/bash

# 🧪 Token Expiry Fix - Testing Script
# Giúp bạn test xem fix có hoạt động không

set -e

echo "╔════════════════════════════════════════════════════════════╗"
echo "║  🧪 Token Expiry Fix - Manual Testing Guide               ║"
echo "╚════════════════════════════════════════════════════════════╝"
echo ""

# Check nếu git có changes
if [ -n "$(git status --porcelain)" ]; then
    echo "📝 Current changes:"
    git status --short
    echo ""
fi

echo "📋 TESTING SCENARIOS:"
echo ""
echo "1️⃣  TOKEN EXPIRY FIX"
echo "   Problem: JWT token expires but no redirect to login"
echo "   Solution: Automatic logout + redirect to AuthStack"
echo ""

echo "2️⃣  IMPLEMENTATION:"
echo "   ✅ Modified: src/graphql/client.ts"
echo "      - Added global callback for unauthenticated errors"
echo "      - Call callback when token refresh fails"
echo ""
echo "   ✅ Modified: src/providers/AuthProvider.tsx"
echo "      - Setup callback to listen for token expiry"
echo "      - Refactored logout logic"
echo ""

echo "3️⃣  HOW IT WORKS:"
echo "   GraphQL Request → JWT Expires → errorLink catches → "
echo "   Try refresh → Fails → Call callback → AuthProvider.logout() → "
echo "   setUser(null) → isAuthenticated = false → Redirect to Login ✅"
echo ""

echo "4️⃣  MANUAL TEST (Do this in React Native Debugger):"
echo ""
echo "   A) Login successfully first"
echo "   B) Open React Native console (Shake → Remote Debug)"
echo "   C) Paste this to simulate expired token:"
echo ""
echo "   ──────────────────────────────────────────────────────────"
cat << 'EOF'
AsyncStorage.removeItem('auth_user').then(() => {
  console.log('✅ Auth cleared - next request will trigger redirect');
  // Then navigate or make any GraphQL request
});
EOF
echo "   ──────────────────────────────────────────────────────────"
echo ""

echo "5️⃣  VERIFY IN CONSOLE LOGS:"
echo "   Look for these logs:"
echo ""
echo "   [GqlAuthGuard] UNAUTHENTICATED - Attempting token refresh..."
echo "   [GqlAuthGuard] No refresh token found - logging out"
echo "   [GqlAuthGuard] Triggering logout callback"
echo "   [AuthProvider] Token expired or invalid - logging out"
echo ""
echo "   Then screen should redirect to Login page ✅"
echo ""

echo "6️⃣  BUILD & TEST:"
cd "$(dirname "$0")" || exit 1

echo "   Starting Metro bundler..."
pnpm start &
METRO_PID=$!

sleep 5

echo ""
echo "   In another terminal, run:"
echo "   pnpm run ios"
echo "   # or"
echo "   pnpm run android"
echo ""

wait $METRO_PID
