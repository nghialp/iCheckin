#!/bin/bash

# ====================================================================
# StyleSheet Extraction Script
# Tách tất cả StyleSheet từ .tsx files vào .styles.ts files riêng
# ====================================================================

set -e

SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
PROJECT_ROOT="$SCRIPT_DIR/.."

echo "🔍 StyleSheet Extraction Helper"
echo "==============================="
echo ""

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to extract styles from a TSX file
extract_styles() {
    local tsx_file="$1"
    local base_name=$(basename "$tsx_file" .tsx)
    local dir_name=$(dirname "$tsx_file")
    local styles_file="${dir_name}/${base_name}.styles.ts"

    if [ ! -f "$tsx_file" ]; then
        echo -e "${RED}❌ File not found: $tsx_file${NC}"
        return 1
    fi

    # Check if styles file already exists
    if [ -f "$styles_file" ]; then
        echo -e "${YELLOW}⚠️  Styles file already exists: $styles_file${NC}"
        return 1
    fi

    # Check if const styles = StyleSheet.create exists
    if ! grep -q "const styles = StyleSheet.create" "$tsx_file"; then
        echo -e "${YELLOW}⚠️  No StyleSheet.create found in: $tsx_file${NC}"
        return 1
    fi

    echo -e "${BLUE}📝 Processing: $tsx_file${NC}"

    # Extract the StyleSheet content
    local start_line=$(grep -n "const styles = StyleSheet.create" "$tsx_file" | head -1 | cut -d: -f1)
    local end_line=$(tail -n +$start_line "$tsx_file" | grep -n "^});" | head -1 | awk '{print $1}')
    
    if [ -z "$end_line" ]; then
        echo -e "${RED}❌ Could not parse StyleSheet in: $tsx_file${NC}"
        return 1
    fi

    end_line=$((start_line + end_line - 1))

    # Create styles.ts file
    cat > "$styles_file" << 'EOF'
import { StyleSheet, Dimensions } from 'react-native';

const screenWidth = Dimensions.get('window').width;

EOF

    # Extract and add the StyleSheet content
    sed -n "${start_line},${end_line}p" "$tsx_file" | sed 's/const styles = //g' >> "$styles_file"

    echo -e "${GREEN}✅ Created: $styles_file${NC}"

    # Update the TSX file
    # 1. Remove StyleSheet import (if not used elsewhere)
    # 2. Add new import
    # 3. Remove the StyleSheet definition

    # Add import (after other imports)
    local last_import_line=$(grep -n "^import " "$tsx_file" | tail -1 | cut -d: -f1)
    sed -i "${last_import_line}a import { styles } from './${base_name}.styles';" "$tsx_file"

    # Remove the StyleSheet definition
    local new_start=$((start_line + 1))  # +1 because we added import
    local new_end=$((end_line + 1))
    sed -i "${new_start},${new_end}d" "$tsx_file"

    # Remove StyleSheet import if not used
    if ! grep -q "StyleSheet" "$tsx_file"; then
        sed -i "/StyleSheet,/d" "$tsx_file"
    fi

    echo -e "${GREEN}✅ Updated: $tsx_file${NC}"
    echo ""

    return 0
}

# Main
if [ $# -eq 0 ]; then
    echo "Usage: $0 <tsx_file_path>"
    echo ""
    echo "Examples:"
    echo "  $0 src/screens/app/LocationDetailPage.tsx"
    echo "  $0 src/screens/app/*.tsx  (multiple files)"
    echo ""
    echo "Or provide multiple files:"
    echo "  $0 src/screens/app/SecurityScreen.tsx src/screens/app/ProfilePage.tsx"
    exit 1
fi

# Process all provided files
total=0
success=0

for file in "$@"; do
    # Expand glob patterns
    if [[ "$file" == *\** ]]; then
        for expanded_file in $file; do
            ((total++))
            if extract_styles "$expanded_file"; then
                ((success++))
            fi
        done
    else
        ((total++))
        if extract_styles "$file"; then
            ((success++))
        fi
    fi
done

echo ""
echo "==============================="
echo -e "${BLUE}Summary: $success/$total files processed successfully${NC}"
echo ""
echo "📋 Next steps:"
echo "  1. Review the changes"
echo "  2. Test the screens"
echo "  3. Commit: git add -A && git commit -m 'refactor: extract styles'"
echo ""
