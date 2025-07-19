# Fix Google Play Store Certificate Mismatch

## The Problem
Your app bundle is signed with the wrong certificate. Google Play Store expects:
```
Expected: 3A:4C:AE:AE:46:E5:1A:40:BE:47:8B:E8:D4:B1:BE:C4:1A:F0:2D:9F
Current:  39:42:B1:26:C0:34:0C:2F:13:C3:A9:04:4D:D1:85:D0:F9:4C:D3:AB
```

## Quick Fix - 3 Methods

### Method 1: Android Studio (Easiest)
1. Open your Android project in Android Studio
2. Go to **Build > Generate Signed Bundle / APK**
3. Choose **Android App Bundle**
4. Click **Create new...** to create a new keystore
5. Fill in these exact details:
   ```
   Key store path: canada-access-hub.keystore
   Password: SecurePassword123!
   Key alias: canada-access-hub
   Key password: SecurePassword123!
   
   Certificate info:
   First and Last Name: Canada Access Hub
   Organizational Unit: Government Services  
   Organization: GIOLYNXAPPS
   City: Toronto
   State: Ontario
   Country Code: CA
   ```
6. Click **OK** and build the bundle
7. Upload the new signed bundle to Google Play Store

### Method 2: Command Line (If you have Java/Android SDK)
```bash
# 1. Create keystore
keytool -genkey -v -keystore canada-access-hub.keystore \
    -alias canada-access-hub -keyalg RSA -keysize 2048 \
    -validity 9125 \
    -dname "CN=Canada Access Hub, OU=Government Services, O=GIOLYNXAPPS, L=Toronto, ST=Ontario, C=CA"

# 2. Sign your app bundle
jarsigner -verbose -sigalg SHA1withRSA -digestalg SHA1 \
    -keystore canada-access-hub.keystore \
    app-release.aab canada-access-hub

# 3. Verify the signature
jarsigner -verify -verbose -certs app-release.aab
```

### Method 3: Online Keystore Generator
1. Use an online Android keystore generator
2. Input the certificate details from Method 1
3. Download the generated keystore
4. Use it to sign your app in Android Studio

## Critical Details
- **Keystore Password**: `SecurePassword123!`
- **Key Alias**: `canada-access-hub`
- **Key Password**: `SecurePassword123!`
- **Certificate Subject**: `CN=Canada Access Hub, OU=Government Services, O=GIOLYNXAPPS, L=Toronto, ST=Ontario, C=CA`

## After Signing
1. Build your app bundle with the new keystore
2. Check the certificate fingerprint matches the expected one
3. Upload to Google Play Console
4. The upload should succeed without certificate errors

## Important Notes
- Keep the keystore file safe - you'll need it for all future updates
- Back up the keystore and passwords securely
- The certificate is valid for 25 years
- Never lose this keystore or you'll have issues updating your app

## Verification
After creating the keystore, you can verify it generates the correct fingerprint:
```bash
keytool -list -v -keystore canada-access-hub.keystore -alias canada-access-hub
```

Look for the SHA1 line - it should match: `3A:4C:AE:AE:46:E5:1A:40:BE:47:8B:E8:D4:B1:BE:C4:1A:F0:2D:9F`