#!/bin/bash

# Mapbox Setup Script for iCheckin React Native App
# This script helps you complete the Mapbox migration setup

set -e

echo "🗺️  Mapbox iCheckin Setup Script"
echo "================================"
echo ""

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Step 1: Verify directory
echo -e "${BLUE}Step 1: Checking directory...${NC}"
if [ ! -f "package.json" ]; then
    echo -e "${RED}❌ Error: package.json not found${NC}"
    echo "Please run this script from the iCheckin directory"
    exit 1
fi
echo -e "${GREEN}✅ Found package.json${NC}"
echo ""

# Step 2: Check Mapbox dependency
echo -e "${BLUE}Step 2: Checking @rnmapbox/maps dependency...${NC}"
if grep -q "@rnmapbox/maps" package.json; then
    echo -e "${GREEN}✅ @rnmapbox/maps found in package.json${NC}"
else
    echo -e "${RED}❌ @rnmapbox/maps not found${NC}"
    exit 1
fi

if grep -q "react-native-maps" package.json; then
    echo -e "${YELLOW}⚠️  react-native-maps still in dependencies${NC}"
    echo "Please remove it manually from package.json"
else
    echo -e "${GREEN}✅ react-native-maps successfully removed${NC}"
fi
echo ""

# Step 3: Check for .env file
echo -e "${BLUE}Step 3: Checking Mapbox configuration...${NC}"
if [ ! -f ".env" ]; then
    echo -e "${YELLOW}⚠️  .env file not found${NC}"
    echo ""
    echo "Creating .env file setup..."
    echo ""
    echo "To get your Mapbox token:"
    echo "1. Go to https://account.mapbox.com/tokens/"
    echo "2. Create a new token or copy existing one"
    echo "3. Enter the token below:"
    echo ""
    read -p "Enter your MAPBOX_ACCESS_TOKEN: " MAPBOX_TOKEN
    
    if [ -z "$MAPBOX_TOKEN" ]; then
        echo -e "${RED}❌ Token cannot be empty${NC}"
        echo "Create .env file manually with: MAPBOX_ACCESS_TOKEN=your_token"
        exit 1
    fi
    
    echo "MAPBOX_ACCESS_TOKEN=$MAPBOX_TOKEN" > .env
    echo -e "${GREEN}✅ .env file created${NC}"
else
    if grep -q "MAPBOX_ACCESS_TOKEN" .env; then
        echo -e "${GREEN}✅ MAPBOX_ACCESS_TOKEN found in .env${NC}"
    else
        echo -e "${YELLOW}⚠️  MAPBOX_ACCESS_TOKEN not in .env${NC}"
        read -p "Enter your MAPBOX_ACCESS_TOKEN: " MAPBOX_TOKEN
        echo "MAPBOX_ACCESS_TOKEN=$MAPBOX_TOKEN" >> .env
        echo -e "${GREEN}✅ Added MAPBOX_ACCESS_TOKEN to .env${NC}"
    fi
fi
echo ""

# Step 4: Check for utility file
echo -e "${BLUE}Step 4: Checking utility files...${NC}"
if [ -f "src/utils/mapboxConfig.ts" ]; then
    echo -e "${GREEN}✅ mapboxConfig.ts exists${NC}"
else
    echo -e "${RED}❌ mapboxConfig.ts not found${NC}"
    echo "This file should have been created during migration"
fi
echo ""

# Step 5: Check updated screens
echo -e "${BLUE}Step 5: Checking migrated screens...${NC}"
SCREENS=(
    "src/screens/app/LocationDetailPage.tsx"
    "src/screens/app/MapPage.tsx"
    "src/screens/app/CheckInScreen.tsx"
)

for screen in "${SCREENS[@]}"; do
    if grep -q "@rnmapbox/maps" "$screen"; then
        echo -e "${GREEN}✅ $screen migrated${NC}"
    else
        echo -e "${RED}❌ $screen not migrated${NC}"
    fi
done
echo ""

# Step 6: Check iOS Pods (if on macOS)
echo -e "${BLUE}Step 6: Checking iOS setup...${NC}"
if [ -d "ios" ]; then
    if command -v pod &> /dev/null; then
        echo -e "${YELLOW}CocoaPods detected${NC}"
        read -p "Do you want to install iOS pods? (y/n) " -n 1 -r
        echo ""
        if [[ $REPLY =~ ^[Yy]$ ]]; then
            cd ios
            echo "Installing pods..."
            pod install
            cd ..
            echo -e "${GREEN}✅ Pods installed${NC}"
        else
            echo "Skipped pod installation"
        fi
    else
        echo -e "${YELLOW}⚠️  CocoaPods not found${NC}"
        echo "Install with: sudo gem install cocoapods"
    fi
else
    echo -e "${YELLOW}iOS directory not found - skipping${NC}"
fi
echo ""

# Step 7: Verify documents
echo -e "${BLUE}Step 7: Checking documentation...${NC}"
DOCS=(
    "MAPBOX_SETUP.md"
    "MAPBOX_QUICK_REFERENCE.md"
    "MIGRATION_REPORT.md"
    "COMPLETION_SUMMARY.md"
)

for doc in "${DOCS[@]}"; do
    if [ -f "$doc" ]; then
        echo -e "${GREEN}✅ $doc${NC}"
    else
        echo -e "${RED}❌ $doc not found${NC}"
    fi
done
echo ""

# Summary
echo "================================"
echo -e "${GREEN}🎉 Setup Check Complete!${NC}"
echo "================================"
echo ""
echo "Next steps:"
echo "1. Run: pnpm start"
echo "2. In another terminal:"
echo "   - iOS: pnpm ios"
echo "   - Android: pnpm android"
echo ""
echo "3. Test the following screens:"
echo "   ✓ LocationDetail page"
echo "   ✓ Map feed page"
echo "   ✓ CheckIn screen"
echo ""
echo "For detailed instructions, see:"
echo "  • COMPLETION_SUMMARY.md"
echo "  • MAPBOX_SETUP.md"
echo "  • MAPBOX_QUICK_REFERENCE.md"
echo ""
echo -e "${GREEN}Happy mapping! 🗺️${NC}"
