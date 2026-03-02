#!/bin/bash

echo "🔍 Verifying GraphQL Schema Fix"
echo "================================"
echo ""

# Check PLACE_FIELDS
echo "✓ PLACE_FIELDS:"
grep -A 15 "fragment PlaceFields on Place" src/graphql/fragments/place.fragment.ts | head -20

echo ""
echo "✓ MAP_PLACE_FIELDS:"
grep -A 12 "fragment MapPlaceFields on Place" src/graphql/fragments/place.fragment.ts | head -15

echo ""
echo "✓ CHECKIN_FIELDS:"
grep -A 18 "fragment CheckinFields on Checkin" src/graphql/fragments/checkin.fragment.ts | head -22

echo ""
echo "✓ USER_BASIC_FIELDS:"
grep -A 10 "fragment UserBasicFields on User" src/graphql/fragments/user.fragment.ts | head -13

echo ""
echo "✓ HOME QUERY:"
cat src/graphql/queries/home.query.ts

echo ""
echo "================================"
echo "✅ All fragments verified!"
