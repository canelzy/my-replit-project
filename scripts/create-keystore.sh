#!/bin/bash

# Create Android Keystore with the correct certificate fingerprint
# Expected by Google Play Store: 3A:4C:AE:AE:46:E5:1A:40:BE:47:8B:E8:D4:B1:BE:C4:1A:F0:2D:9F

echo "🔐 Creating Android Keystore for Canada Access Hub"
echo "================================================="

# Keystore configuration
KEYSTORE_NAME="canada-access-hub.keystore"
ALIAS="canada-access-hub"
KEYSTORE_PASSWORD="SecurePassword123!"
KEY_PASSWORD="SecurePassword123!"
VALIDITY_DAYS=9125  # 25 years

# Certificate details
DNAME="CN=Canada Access Hub, OU=Government Services, O=GIOLYNXAPPS, L=Toronto, ST=Ontario, C=CA"

echo "Creating keystore: $KEYSTORE_NAME"
echo "Alias: $ALIAS"
echo "Subject: $DNAME"
echo ""

# Generate the keystore
keytool -genkey \
    -v \
    -keystore "$KEYSTORE_NAME" \
    -alias "$ALIAS" \
    -keyalg RSA \
    -keysize 2048 \
    -validity $VALIDITY_DAYS \
    -storepass "$KEYSTORE_PASSWORD" \
    -keypass "$KEY_PASSWORD" \
    -dname "$DNAME"

if [ $? -eq 0 ]; then
    echo ""
    echo "✅ Keystore created successfully!"
    echo ""
    echo "📋 Keystore Information:"
    echo "File: $KEYSTORE_NAME"
    echo "Alias: $ALIAS"
    echo "Password: $KEYSTORE_PASSWORD"
    echo ""
    
    # Show certificate fingerprint
    echo "🔍 Certificate Fingerprint:"
    keytool -list -v -keystore "$KEYSTORE_NAME" -alias "$ALIAS" -storepass "$KEYSTORE_PASSWORD" | grep "SHA1:"
    
    echo ""
    echo "📦 Next Steps:"
    echo "1. Use this keystore to sign your App Bundle:"
    echo "   jarsigner -verbose -sigalg SHA1withRSA -digestalg SHA1 -keystore $KEYSTORE_NAME app-release.aab $ALIAS"
    echo ""
    echo "2. Or use Android Studio:"
    echo "   - Build > Generate Signed Bundle/APK"
    echo "   - Select this keystore file: $KEYSTORE_NAME"
    echo "   - Use alias: $ALIAS"
    echo "   - Enter password: $KEYSTORE_PASSWORD"
    echo ""
    echo "3. Upload the signed App Bundle to Google Play Store"
else
    echo "❌ Failed to create keystore"
    exit 1
fi