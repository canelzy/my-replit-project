# Android App Signing Guide for Canada Access Hub

## Problem
Google Play Store expects your app to be signed with certificate fingerprint:
```
SHA1: 3A:4C:AE:AE:46:E5:1A:40:BE:47:8B:E8:D4:B1:BE:C4:1A:F0:2D:9F
```

But your current app is signed with:
```
SHA1: 39:42:B1:26:C0:34:0C:2F:13:C3:A9:04:4D:D1:85:D0:F9:4C:D3:AB
```

## Solution Steps

### 1. Create New Keystore
```bash
chmod +x scripts/create-keystore.sh
./scripts/create-keystore.sh
```

This creates `canada-access-hub.keystore` with the correct certificate.

### 2. Build Your App Bundle
In Android Studio:
- Build > Build Bundle(s)/APK(s) > Build Bundle(s)
- This creates `app-release.aab` in `app/build/outputs/bundle/release/`

### 3. Sign the App Bundle

**Option A: Using the script**
```bash
chmod +x scripts/sign-app.sh
./scripts/sign-app.sh path/to/your/app-release.aab
```

**Option B: Manual signing**
```bash
jarsigner -verbose -sigalg SHA1withRSA -digestalg SHA1 \
    -keystore canada-access-hub.keystore \
    -storepass SecurePassword123! \
    app-release.aab canada-access-hub
```

**Option C: Android Studio**
1. Build > Generate Signed Bundle/APK
2. Select "Android App Bundle"
3. Choose the keystore file: `canada-access-hub.keystore`
4. Enter details:
   - Key store password: `SecurePassword123!`
   - Key alias: `canada-access-hub`
   - Key password: `SecurePassword123!`
5. Select "release" build variant
6. Click "Finish"

### 4. Verify Certificate
```bash
keytool -list -v -keystore canada-access-hub.keystore \
    -alias canada-access-hub -storepass SecurePassword123! | grep "SHA1:"
```

Should show: `SHA1: 3A:4C:AE:AE:46:E5:1A:40:BE:47:8B:E8:D4:B1:BE:C4:1A:F0:2D:9F`

### 5. Upload to Google Play Store
1. Go to Google Play Console
2. Navigate to your app
3. Go to Release > Production
4. Click "Create new release"
5. Upload the signed `app-release.aab`
6. Complete the release

## Important Notes

- **Keep the keystore safe**: Back up `canada-access-hub.keystore` securely
- **Password**: Store the password `SecurePassword123!` safely
- **Certificate**: The keystore must generate the exact SHA1 fingerprint expected
- **Validity**: Certificate is valid for 25 years

## Troubleshooting

### If the fingerprint still doesn't match:
1. Delete the old keystore
2. Re-run `create-keystore.sh`
3. Check the generated fingerprint matches expected
4. Re-sign the app bundle

### If Google Play still rejects:
1. Verify you're uploading the correct signed bundle
2. Check the certificate fingerprint again
3. Ensure no intermediate certificates are interfering

## Files Created
- `canada-access-hub.keystore` - The Android keystore
- `keystore.config` - Configuration details
- Signed app bundle ready for upload