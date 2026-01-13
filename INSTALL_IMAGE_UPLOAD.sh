#!/bin/bash

# Installation Guide for Image Upload Feature

echo "=== Image Upload Feature Installation ==="

# 1. Install react-native-image-picker if not already installed
echo "1. Installing react-native-image-picker..."
npm install react-native-image-picker
# or
# pnpm install react-native-image-picker

# 2. For iOS - Install pods
echo "2. Installing iOS pods..."
cd ios && pod install && cd ..

# 3. Update .env file
echo "3. Configuration already added to .env"
echo "   CLOUDINARY_CLOUD_NAME=dqqymdllv"
echo "   CLOUDINARY_UPLOAD_PRESET=icheckin_upload"

# 4. iOS Permissions (Info.plist)
echo "4. Add these permissions to ios/iCheckin/Info.plist:"
echo "   <key>NSCameraUsageDescription</key>"
echo "   <string>Camera access is needed to take photos for check-ins</string>"
echo "   <key>NSPhotoLibraryUsageDescription</key>"
echo "   <string>Photo library access is needed to select photos for check-ins</string>"
echo "   <key>NSPhotoLibraryAddOnlyUsageDescription</key>"
echo "   <string>Photos library access is needed</string>"

# 5. Android Permissions (AndroidManifest.xml)
echo "5. Add these permissions to android/app/src/main/AndroidManifest.xml:"
echo "   <uses-permission android:name=\"android.permission.CAMERA\" />"
echo "   <uses-permission android:name=\"android.permission.READ_EXTERNAL_STORAGE\" />"
echo "   <uses-permission android:name=\"android.permission.WRITE_EXTERNAL_STORAGE\" />"

echo ""
echo "=== Installation Complete ==="
echo ""
echo "Next steps:"
echo "1. Add iOS/Android permissions"
echo "2. Test the feature in the app"
echo "3. Verify images upload to Cloudinary"
echo "4. Check backend receives image URLs"
