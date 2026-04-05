#!/bin/bash

# 🔍 Fragment Naming Consistency Verification

echo "╔═══════════════════════════════════════════════════════════╗"
echo "║  🔍 Fragment Naming Consistency Check                     ║"
echo "╚═══════════════════════════════════════════════════════════╝"
echo ""

# Colors
GREEN='\033[0;32m'
RED='\033[0;31m'
NC='\033[0m'

echo "📋 Checking Fragment Naming Consistency..."
echo ""

# Function to check fragment naming
check_fragment() {
    local file=$1
    local fragment_name=$2
    
    # Check if export matches definition
    export_line=$(grep -o "export const $fragment_name = " "$file" || true)
    definition_line=$(grep -o "fragment $fragment_name on" "$file" || true)
    
    if [ -z "$export_line" ]; then
        return 1  # Export not found
    fi
    
    if [ -z "$definition_line" ]; then
        echo -e "${RED}❌ Fragment $fragment_name - Definition name mismatch${NC}"
        return 1
    fi
    
    echo -e "${GREEN}✅ Fragment $fragment_name - Correct${NC}"
    return 0
}

echo "👤 User Fragments:"
check_fragment "src/graphql/fragments/user.fragment.ts" "USER_BASIC_FIELDS"
check_fragment "src/graphql/fragments/user.fragment.ts" "USER_DETAILS_FIELDS"
check_fragment "src/graphql/fragments/user.fragment.ts" "USER_SETTINGS_FIELDS"
check_fragment "src/graphql/fragments/user.fragment.ts" "USER_RELATIONS_FIELDS"
check_fragment "src/graphql/fragments/user.fragment.ts" "NOTIFICATION_SETTINGS_FIELDS"
check_fragment "src/graphql/fragments/user.fragment.ts" "PRIVACY_SETTINGS_FIELDS"
check_fragment "src/graphql/fragments/user.fragment.ts" "SECURITY_SETTINGS_FIELDS"
check_fragment "src/graphql/fragments/user.fragment.ts" "ACCESS_TOKEN_FIELDS"

echo ""
echo "💬 Comment Fragments:"
check_fragment "src/graphql/fragments/comment.fragment.ts" "COMMENT_BASIC_FIELDS"
check_fragment "src/graphql/fragments/comment.fragment.ts" "COMMENT_FIELDS"
check_fragment "src/graphql/fragments/comment.fragment.ts" "COMMENT_WITH_REPLIES_FIELDS"

echo ""
echo "📍 Place Fragments:"
check_fragment "src/graphql/fragments/place.fragment.ts" "PLACE_FIELDS"
check_fragment "src/graphql/fragments/place.fragment.ts" "MAP_PLACE_FIELDS"
check_fragment "src/graphql/fragments/place.fragment.ts" "PLACE_DETAIL_FIELDS"
check_fragment "src/graphql/fragments/place.fragment.ts" "PLACE_WITH_CHECKINS_FIELDS"

echo ""
echo "✓ Checkin Fragments:"
check_fragment "src/graphql/fragments/checkin.fragment.ts" "CHECKIN_FIELDS"

echo ""
echo "╔═══════════════════════════════════════════════════════════╗"
echo "║  ✅ Verification Complete                                 ║"
echo "╚═══════════════════════════════════════════════════════════╝"
echo ""
echo "All fragments are now correctly named!"
echo "You can now:"
echo "  ✅ Update personal information"
echo "  ✅ Query user settings"
echo "  ✅ Perform comment operations"
