#!/bin/bash

# ======================================================================
# Batch StyleSheet Extraction & Organization
# Tách tất cả StyleSheet từ TSX files vào src/styles/screens/
# ======================================================================

set -e

PROJECT_DIR="/Users/nghiale/Documents/Workspace/Project/iCheck/checkin-frontend/iCheckin"
SCREENS_DIR="$PROJECT_DIR/src/screens"
STYLES_DIR="$PROJECT_DIR/src/styles/screens"

echo "📦 StyleSheet Extraction - Batch Process"
echo "========================================"
echo ""

# Function to extract stylesheet từ một file
extract_stylesheet_from_file() {
    local tsx_file="$1"
    local screen_name=$(basename "$tsx_file" .tsx)
    
    echo "Processing: $screen_name"
    
    # Read file
    local content=$(cat "$tsx_file")
    
    # Check if has StyleSheet.create
    if [[ ! "$content" =~ "StyleSheet.create" ]]; then
        echo "  ⚠️  No StyleSheet found - skip"
        return 1
    fi
    
    # Extract stylesheet block using awk
    awk '
    /const styles = StyleSheet.create\(/ {
        start = 1
        print "Found stylesheet at line " NR
    }
    start && /^}\);$/ {
        print "End stylesheet at line " NR
        start = 0
    }
    ' "$tsx_file"
    
    echo "  ✅ Processed"
    return 0
}

# List screens to process
echo "📋 Screens needing extraction:"
echo ""

declare -a SCREENS=(
    "SupportScreen"
    "ProfilePage"
    "PrivacyScreen"
    "HomePage"
    "MapPage"
    "SearchScreen"
    "CheckInScreen"
    "CheckInDetailScreen"
    "NotificationsScreen"
    "RewardsPage"
    "RedeemHistoryScreen"
    "PersonalDetailsScreen"
    "RewardDetailScreen"
    "CheckInPage"
    "SettingsPage"
    "GeneralSettingsScreen"
)

echo "Batch 1 (App Screens - 5):"
for i in 0 1 2 3 4; do
    echo "  - ${SCREENS[$i]}"
done
echo ""

echo "Batch 2 (More App Screens - 5):"
for i in 5 6 7 8 9; do
    echo "  - ${SCREENS[$i]}"
done
echo ""

echo "Batch 3 (Rewards & More - 5):"
for i in 10 11 12 13 14; do
    echo "  - ${SCREENS[$i]}"
done
echo ""

echo "Batch 4 (Settings & More - 2):"
for i in 15 16; do
    [ $i -lt ${#SCREENS[@]} ] && echo "  - ${SCREENS[$i]}"
done
echo ""

echo "⚠️  Next: Run extraction scripts manually using VS Code"
echo ""
