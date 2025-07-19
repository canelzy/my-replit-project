#!/bin/bash

# Quick App Bundle Signing Script
# This signs your app bundle with the available keystore

echo "🔐 Quick App Bundle Signing"
echo "=========================="

KEYSTORE="canada-access-hub.keystore"
ALIAS="canada-access-hub"
PASSWORD="SecurePassword123!"

# Check if keystore exists
if [ ! -f "$KEYSTORE" ]; then
    echo "❌ Keystore not found: $KEYSTORE"
    echo "Run ./create-keystore.sh first"
    exit 1
fi

# Check if app bundle provided
if [ -z "$1" ]; then
    echo "Usage: $0 <app-bundle-file.aab>"
    echo "Example: $0 app-release.aab"
    echo ""
    echo "📱 This script will:"
    echo "1. Sign your app bundle with the available keystore"
    echo "2. Show the certificate fingerprint" 
    echo "3. Prepare it for Google Play Store upload"
    echo ""
    echo "💡 If Google Play App Signing is enabled, certificate mismatch won't matter"
    exit 1
fi

APP_BUNDLE="$1"

if [ ! -f "$APP_BUNDLE" ]; then
    echo "❌ App bundle not found: $APP_BUNDLE"
    exit 1
fi

echo "📦 Signing: $APP_BUNDLE"
echo "🔑 Using: $KEYSTORE"
echo ""

# Sign the app bundle
jarsigner -verbose -sigalg SHA1withRSA -digestalg SHA1 \
    -keystore "$KEYSTORE" \
    -storepass "$PASSWORD" \
    "$APP_BUNDLE" \
    "$ALIAS"

if [ $? -eq 0 ]; then
    echo ""
    echo "✅ App bundle signed successfully!"
    echo ""
    
    # Show certificate fingerprint
    echo "🔍 Certificate Fingerprint:"
    keytool -list -v -keystore "$KEYSTORE" -alias "$ALIAS" -storepass "$PASSWORD" | grep "SHA1:"
    
    echo ""
    echo "📋 Summary:"
    echo "Signed file: $APP_BUNDLE"
    echo "Expected by Google Play: 3A:4C:AE:AE:46:E5:1A:40:BE:47:8B:E8:D4:B1:BE:C4:1A:F0:2D:9F"
    echo ""
    echo "🚀 Next Steps:"
    echo "1. Try uploading to Google Play Console"
    echo "2. If it fails due to certificate mismatch:"
    echo "   - Enable 'Google Play App Signing' in your app settings"
    echo "   - Or contact Google Play Support for help"
    echo ""
    echo "💡 Google Play App Signing will automatically handle certificate mismatches"
else
    echo "❌ Failed to sign app bundle"
    exit 1
fi