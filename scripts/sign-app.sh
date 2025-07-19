#!/bin/bash

# Sign Android App Bundle with the correct keystore
# This script signs your app with the certificate expected by Google Play Store

KEYSTORE_NAME="canada-access-hub.keystore"
ALIAS="canada-access-hub"
KEYSTORE_PASSWORD="SecurePassword123!"

echo "📦 Signing Android App Bundle"
echo "============================="

# Check if keystore exists
if [ ! -f "$KEYSTORE_NAME" ]; then
    echo "❌ Keystore not found: $KEYSTORE_NAME"
    echo "Run ./create-keystore.sh first to create the keystore"
    exit 1
fi

# Check if app bundle file is provided
if [ -z "$1" ]; then
    echo "Usage: $0 <app-bundle-file.aab>"
    echo "Example: $0 app-release.aab"
    exit 1
fi

APP_BUNDLE="$1"

# Check if app bundle exists
if [ ! -f "$APP_BUNDLE" ]; then
    echo "❌ App bundle not found: $APP_BUNDLE"
    exit 1
fi

echo "Signing app bundle: $APP_BUNDLE"
echo "Using keystore: $KEYSTORE_NAME"
echo "Alias: $ALIAS"
echo ""

# Sign the app bundle
jarsigner -verbose \
    -sigalg SHA1withRSA \
    -digestalg SHA1 \
    -keystore "$KEYSTORE_NAME" \
    -storepass "$KEYSTORE_PASSWORD" \
    "$APP_BUNDLE" \
    "$ALIAS"

if [ $? -eq 0 ]; then
    echo ""
    echo "✅ App bundle signed successfully!"
    echo ""
    echo "🔍 Verifying signature:"
    jarsigner -verify -verbose -certs "$APP_BUNDLE"
    
    echo ""
    echo "📋 Certificate Fingerprint:"
    keytool -list -v -keystore "$KEYSTORE_NAME" -alias "$ALIAS" -storepass "$KEYSTORE_PASSWORD" | grep "SHA1:"
    
    echo ""
    echo "🚀 Ready for Google Play Store upload!"
    echo "Upload file: $APP_BUNDLE"
else
    echo "❌ Failed to sign app bundle"
    exit 1
fi