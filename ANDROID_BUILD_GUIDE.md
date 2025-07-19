# Custom Android App Build Guide
## Canada Services Hub - Native Android Deployment

### Your Custom Android Package
**Package Name**: `ca.canelzy.govservices`
**App Name**: Canada Services Hub
**Version**: 2.0.0 (Version Code: 2)

### Build Options

#### Option 1: Quick Build Script
```bash
chmod +x scripts/build-android-app.sh
./scripts/build-android-app.sh
```

#### Option 2: Manual Build
```bash
cd android
./gradlew clean
./gradlew assembleRelease
./gradlew bundleRelease
```

### Build Outputs

#### APK File (Direct Installation)
- **Location**: `android/app/build/outputs/apk/release/app-release.apk`
- **Use For**: Direct installation on devices, testing
- **File Size**: ~8-15 MB

#### AAB File (Google Play Store)
- **Location**: `android/app/build/outputs/bundle/release/app-release.aab`
- **Use For**: Google Play Store submission
- **File Size**: ~5-10 MB (optimized)

### Signing Your App

Your app is already configured with:
- **Keystore**: `scripts/canada-access-hub.keystore`
- **Alias**: `canada-access-hub`
- **SHA1 Fingerprint**: `3A:4C:AE:AE:46:E5:1A:40:BE:47:8B:E8:D4:B1:BE:C4:1A:F0:2D:9F`

### Google Play Store Submission

#### Upload Process:
1. **Create Developer Account**: $25 one-time fee
2. **Upload AAB File**: Use the `.aab` file from build outputs
3. **App Details**: 
   - Title: "Canada Services Hub"
   - Category: "Tools" or "Government"
   - Description: "Comprehensive directory for Canadian government services"

#### Required Assets:
- **App Icon**: Already configured (512x512 PNG)
- **Feature Graphic**: 1024x500 PNG needed
- **Screenshots**: 2-8 phone screenshots required
- **Privacy Policy**: Available at `/privacy.html`

### Key Features of Your Custom App:
- **Native Android Package**: `ca.canelzy.govservices`
- **PWA Integration**: Loads your Replit-hosted web app
- **Offline Capability**: Basic caching with service worker
- **Canadian Branding**: Red maple leaf icon and theme
- **Government Focus**: Specialized for Canadian services

### Advantages Over PWABuilder TWA:
- **Custom Package Name**: Your own `ca.canelzy.govservices` identifier
- **Full Control**: Modify Android-specific features
- **Native Integration**: Direct Android API access if needed
- **Branding Control**: Complete control over app presentation

### Build Requirements:
- **Android SDK**: Version 34 (Android 14)
- **Gradle**: 8.0+
- **Java**: JDK 11 or higher
- **Signing Key**: Your existing keystore file

Your custom Android app provides complete control over the Play Store presence while leveraging your existing web application infrastructure.