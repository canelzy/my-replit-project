#!/bin/bash

# Canada Services Hub - Android App Build Script
# Package: ca.canelzy.govservices

echo "🍁 Building Canada Services Hub Android App..."

# Check if Android SDK is available
if ! command -v gradle &> /dev/null; then
    echo "❌ Gradle not found. Installing..."
    # Install Gradle via package manager
    curl -s "https://get.sdkman.io" | bash
    source "$HOME/.sdkman/bin/sdkman-init.sh"
    sdk install gradle 8.0
fi

# Navigate to Android directory
cd android || exit 1

echo "📦 Package: ca.canelzy.govservices"
echo "🏗️ Building release APK..."

# Clean previous builds
./gradlew clean

# Build release APK
./gradlew assembleRelease

# Build App Bundle (AAB) for Play Store
echo "📱 Building Android App Bundle (AAB)..."
./gradlew bundleRelease

# Sign the APK with your keystore
echo "🔐 Signing APK..."
if [ -f "../scripts/canada-access-hub.keystore" ]; then
    jarsigner -verbose -sigalg SHA256withRSA -digestalg SHA-256 \
        -keystore ../scripts/canada-access-hub.keystore \
        app/build/outputs/apk/release/app-release-unsigned.apk \
        canada-access-hub
    
    # Align the signed APK
    zipalign -v 4 app/build/outputs/apk/release/app-release-unsigned.apk \
        app/build/outputs/apk/release/canada-services-hub-signed.apk
    
    echo "✅ Signed APK: app/build/outputs/apk/release/canada-services-hub-signed.apk"
else
    echo "⚠️ Keystore not found. Using unsigned APK."
fi

echo "📋 Build Summary:"
echo "   Package: ca.canelzy.govservices"
echo "   App Name: Canada Services Hub"
echo "   Version: 2.0.0 (Code: 2)"
echo "   APK: android/app/build/outputs/apk/release/"
echo "   AAB: android/app/build/outputs/bundle/release/"

echo "🎉 Android app build complete!"