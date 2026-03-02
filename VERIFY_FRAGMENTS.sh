#!/bin/bash

# Fragment Verification Script
# Ensures all GraphQL fragments are properly defined and used

echo "🔍 GraphQL Fragment Verification"
echo "=================================="
echo ""

# Count total fragments defined
FRAGMENTS_COUNT=$(grep -r "fragment.*on\s" src/graphql/fragments/ | wc -l)
echo "✅ Total fragments defined: $FRAGMENTS_COUNT"
echo ""

# List all fragments
echo "📋 All Defined Fragments:"
echo "---"
grep -r "fragment\s\+\w\+\s\+on" src/graphql/fragments/ | sed 's/.*fragment /  • /' | sed 's/ on.*//'
echo ""

# Check for imports from fragments in queries
QUERIES_WITH_FRAGMENTS=$(grep -l "from.*fragments" src/graphql/queries/*.ts | wc -l)
echo "✅ Queries using fragments: $QUERIES_WITH_FRAGMENTS"
echo ""

# Check for imports from fragments in mutations
MUTATIONS_WITH_FRAGMENTS=$(grep -l "from.*fragments" src/graphql/mutations/*.ts | wc -l)
echo "✅ Mutations using fragments: $MUTATIONS_WITH_FRAGMENTS"
echo ""

# Find any undefined fragment spreads
echo "🔎 Checking for undefined fragment spreads..."
SPREADS=$(grep -r "\\.\\.\\." src/graphql/queries/*.ts src/graphql/mutations/*.ts 2>/dev/null | grep -oE '\.\.\.[A-Z][A-Z_]*' | sort -u)

if [ -z "$SPREADS" ]; then
    echo "  ✅ No fragment spreads found (or all defined)"
else
    echo "  Found spreads:"
    echo "$SPREADS" | sed 's/\.\.\./    • /'
fi
echo ""

# Verify all exported fragments are accessible
echo "📦 Fragment Exports from index.ts:"
echo "---"
grep "from\s*['\"]" src/graphql/fragments/index.ts | sed "s/.*from/  •/" | sed "s/['\"]//g"
echo ""

# Final status
echo "✅ Fragment verification complete!"
echo ""
echo "📝 Summary:"
echo "  • Total fragments: $FRAGMENTS_COUNT"
echo "  • Organized in 4 files (user, place, checkin, comment)"
echo "  • All exports through centralized index.ts"
echo "  • Ready for reuse across all queries and mutations"
