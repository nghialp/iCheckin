#!/bin/bash

# GraphQL Endpoint Verification Script
# Purpose: Verify all GraphQL endpoints are properly organized and accessible

echo "🔍 GraphQL Endpoint Verification Report"
echo "========================================"
echo ""

# Count files
echo "📊 File Counts:"
echo "- Mutation files: $(find src/graphql/mutations -type f -name '*.ts' | wc -l)"
echo "- Query files: $(find src/graphql/queries -type f -name '*.ts' | wc -l)"
echo "- Fragment files: $(find src/graphql/fragments -type f -name '*.ts' | wc -l)"
echo ""

# List mutation files
echo "📝 Mutation Files:"
find src/graphql/mutations -type f -name '*.ts' | sort
echo ""

# List query files
echo "📝 Query Files:"
find src/graphql/queries -type f -name '*.ts' | sort
echo ""

# List fragment files
echo "📝 Fragment Files:"
find src/graphql/fragments -type f -name '*.ts' | sort
echo ""

# Check for empty files
echo "🔎 Checking for empty files:"
empty_count=0
for file in $(find src/graphql -type f -name '*.ts'); do
  size=$(wc -c < "$file")
  if [ $size -lt 100 ]; then
    echo "  ⚠️  $file ($(($size / 1024))KB)"
    empty_count=$((empty_count + 1))
  fi
done
if [ $empty_count -eq 0 ]; then
  echo "  ✅ No empty files found"
fi
echo ""

# Check exports in mutations/index.ts
echo "📤 Exported mutations:"
grep "export {" src/graphql/mutations/index.ts | wc -l | awk '{print "  Total exports: " $1}'
echo ""

# Check exports in queries/index.ts
echo "📤 Exported queries:"
grep "export {" src/graphql/queries/index.ts | wc -l | awk '{print "  Total exports: " $1}'
echo ""

# Verify queries.ts re-exports
echo "✅ Verification:"
if grep -q "export.*from './queries/" src/graphql/queries.ts; then
  echo "  ✅ queries.ts properly re-exports from subdirectories"
else
  echo "  ❌ queries.ts re-exports missing"
fi

if grep -q "export.*from './mutations/" src/graphql/mutations.ts; then
  echo "  ✅ mutations.ts properly re-exports from subdirectories"
else
  echo "  ❌ mutations.ts re-exports missing"
fi

echo ""
echo "========================================"
echo "✅ Verification Complete!"
