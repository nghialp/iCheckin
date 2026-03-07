#!/usr/bin/env ruby

require 'fileutils'
require 'pathname'

# Configuration
SCREENS_ROOT = 'src/screens'
STYLES_SCREENS_DIR = 'src/styles/screens'
FileUtils.mkdir_p(STYLES_SCREENS_DIR)

class StyleSheetExtractor
  def initialize
    @extracted = []
    @skipped = []
    @errors = []
  end

  def extract_all_screens
    puts "🔍 Scanning for screens with StyleSheet.create..."
    puts "=" * 60

    Find.find(SCREENS_ROOT) do |file|
      next unless file.end_with?('.tsx')
      
      screen_name = File.basename(file, '.tsx')
      extract_screen(file, screen_name)
    end

    print_summary
  end

  private

  def extract_screen(tsx_file, screen_name)
    content = File.read(tsx_file)

    # Check if file has StyleSheet.create
    unless content.include?('StyleSheet.create')
      @skipped << screen_name
      return
    end

    # Extract the StyleSheet block
    pattern = /const\s+styles\s*=\s*StyleSheet\.create\s*\(([\s\S]*?)\n\}\);/m
    match = content.match(pattern)

    unless match
      @errors << "#{screen_name}: Could not parse StyleSheet"
      return
    end

    stylesheet_code = match[0]
    
    # Create styles file
    styles_file = File.join(STYLES_SCREENS_DIR, "#{screen_name}.styles.ts")
    
    # Build styles file content
    styles_content = <<~TYPESCRIPT
      import { StyleSheet, Dimensions } from 'react-native';
      import { colors, spacing, typography } from '../../theme';
      import { headerStyles, cardStyles, containerStyles, buttonStyles, inputStyles, sectionStyles, textStyles, dividerStyles, layoutStyles } from '../../styles';

      const screenWidth = Dimensions.get('window').width;

      export const styles = #{stylesheet_code.gsub('const styles = ', '')}
    TYPESCRIPT

    File.write(styles_file, styles_content)
    puts "✅ Created: #{screen_name}.styles.ts"

    # Update TSX file
    # 1. Add import
    last_import_line = content.scan(/^import\s+[^;]+;/).last
    if last_import_line
      new_import = "import { styles } from '../../styles/screens/#{screen_name}.styles';"
      content = content.sub(last_import_line, "#{last_import_line}\n#{new_import}")
    end

    # 2. Remove StyleSheet from import
    content = content.gsub(/,?\s*StyleSheet,?/, ',')
    content = content.gsub(/,\s*,/, ',')
    content = content.gsub(/\(\s*,/, '(')
    content = content.gsub(/,\s*\)/, ')')

    # 3. Remove the StyleSheet definition
    content = content.gsub(/\n\nconst\s+styles\s*=\s*StyleSheet\.create\s*\(([\s\S]*?)\n\}\);/, '')

    File.write(tsx_file, content)
    puts "✅ Updated: #{screen_name}.tsx"

    @extracted << screen_name
  end

  def print_summary
    puts ""
    puts "=" * 60
    puts "📊 Summary"
    puts "=" * 60
    puts "✅ Extracted: #{@extracted.length} screens"
    puts "⏭️  Skipped: #{@skipped.length} screens"
    puts "❌ Errors: #{@errors.length}"
    puts ""

    if @extracted.any?
      puts "✅ Extracted screens:"
      @extracted.sort.each { |name| puts "  - #{name}" }
    end

    if @skipped.any?
      puts ""
      puts "⏭️  Skipped screens (no StyleSheet):"
      @skipped.sort.each { |name| puts "  - #{name}" }
    end

    if @errors.any?
      puts ""
      puts "❌ Errors:"
      @errors.each { |error| puts "  - #{error}" }
    end
  end
end

# Run extraction
extractor = StyleSheetExtractor.new
extractor.extract_all_screens
