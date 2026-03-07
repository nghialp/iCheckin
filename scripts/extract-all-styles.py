#!/usr/bin/env python3
"""
StyleSheet Extractor
Tách tất cả const styles = StyleSheet.create() từ TSX files vào separate .styles.ts files
"""

import os
import re
import sys
from pathlib import Path
from typing import Optional, Tuple

# Configuration
SCREENS_DIR = Path("src/screens")
STYLES_DIR = Path("src/styles/screens")
EXTENSIONS = [".tsx"]

class StyleSheetExtractor:
    """Tách StyleSheet từ TSX files"""
    
    def __init__(self):
        self.extracted_count = 0
        self.error_count = 0
        self.files_processed = []
    
    def find_stylesheets(self, directory: Path) -> list:
        """Tìm tất cả TSX files có StyleSheet.create"""
        files = []
        for ext in EXTENSIONS:
            files.extend(directory.rglob(f"*{ext}"))
        return sorted(files)
    
    def extract_stylesheet(self, tsx_file: Path) -> Optional[str]:
        """Extract StyleSheet block từ TSX file"""
        with open(tsx_file, 'r', encoding='utf-8') as f:
            content = f.read()
        
        # Find pattern: const styles = StyleSheet.create({...});
        pattern = r'const\s+styles\s*=\s*StyleSheet\.create\s*\(([\s\S]*?)\n\}\);'
        match = re.search(pattern, content)
        
        if match:
            return match.group(0)
        return None
    
    def get_imports(self, tsx_file: Path) -> Tuple[bool, bool]:
        """Check if file has StyleSheet import and Dimensions"""
        with open(tsx_file, 'r', encoding='utf-8') as f:
            content = f.read()
        
        has_stylesheet = 'StyleSheet' in content
        has_dimensions = 'Dimensions' in content
        return has_stylesheet, has_dimensions
    
    def create_styles_file(self, tsx_file: Path, stylesheet_content: str) -> Path:
        """Create .styles.ts file with stylesheet content"""
        # Get screen name (e.g., SecurityScreen -> security)
        screen_name = tsx_file.stem  # e.g., SecurityScreen
        styles_filename = f"{screen_name}.styles.ts"
        styles_path = STYLES_DIR / styles_filename
        
        # Create imports
        imports = "import { StyleSheet, Dimensions } from 'react-native';\n\n"
        imports += "const screenWidth = Dimensions.get('window').width;\n\n"
        
        # Export styles
        content = imports + "export const styles = " + stylesheet_content + "\n"
        
        with open(styles_path, 'w', encoding='utf-8') as f:
            f.write(content)
        
        return styles_path
    
    def update_tsx_file(self, tsx_file: Path, screen_name: str) -> bool:
        """Update TSX file to import styles"""
        with open(tsx_file, 'r', encoding='utf-8') as f:
            content = f.read()
        
        # 1. Add import for styles
        # Find last import statement
        import_pattern = r'^import\s+[^;]+;'
        imports = re.findall(import_pattern, content, re.MULTILINE)
        
        if imports:
            last_import = imports[-1]
            new_import = f"{last_import}\nimport {{ styles }} from '../../styles/screens/{screen_name}.styles';"
            content = content.replace(last_import, new_import)
        
        # 2. Remove StyleSheet from react-native import
        content = re.sub(
            r'from\s+[\'"]react-native[\'"];',
            lambda m: m.group(0).replace('StyleSheet,', '').replace('StyleSheet, ', '').replace(', StyleSheet', ''),
            content
        )
        
        # 3. Remove const styles = StyleSheet.create({...});
        content = re.sub(
            r'\nconst\s+styles\s*=\s*StyleSheet\.create\s*\(([\s\S]*?)\n\}\);\n*',
            '\n',
            content
        )
        
        with open(tsx_file, 'w', encoding='utf-8') as f:
            f.write(content)
        
        return True
    
    def process_file(self, tsx_file: Path) -> bool:
        """Process one TSX file"""
        try:
            # Extract stylesheet
            stylesheet = self.extract_stylesheet(tsx_file)
            if not stylesheet:
                print(f"⚠️  No StyleSheet found: {tsx_file.name}")
                return False
            
            screen_name = tsx_file.stem
            
            # Create styles file
            styles_path = self.create_styles_file(tsx_file, stylesheet)
            print(f"✅ Created: {styles_path.name}")
            
            # Update TSX file
            self.update_tsx_file(tsx_file, screen_name)
            print(f"✅ Updated: {tsx_file.name}")
            
            self.extracted_count += 1
            self.files_processed.append(tsx_file.name)
            return True
            
        except Exception as e:
            print(f"❌ Error processing {tsx_file.name}: {e}")
            self.error_count += 1
            return False
    
    def run(self):
        """Main execution"""
        print("🔍 StyleSheet Extractor")
        print("=" * 50)
        print()
        
        # Find all TSX files
        tsx_files = self.find_stylesheets(SCREENS_DIR)
        print(f"Found {len(tsx_files)} TSX files")
        print()
        
        # Process each file
        for tsx_file in tsx_files:
            self.process_file(tsx_file)
        
        print()
        print("=" * 50)
        print(f"✅ Extracted: {self.extracted_count}")
        print(f"❌ Errors: {self.error_count}")
        print()
        
        if self.files_processed:
            print("Files processed:")
            for f in sorted(self.files_processed):
                print(f"  - {f}")

if __name__ == "__main__":
    extractor = StyleSheetExtractor()
    extractor.run()
