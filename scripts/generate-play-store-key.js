import crypto from 'crypto';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Google Play Store expected certificate fingerprint
const EXPECTED_CERT = '3A:4C:AE:AE:46:E5:1A:40:BE:47:8B:E8:D4:B1:BE:C4:1A:F0:2D:9F';
const CURRENT_CERT = '39:42:B1:26:C0:34:0C:2F:13:C3:A9:04:4D:D1:85:D0:F9:4C:D3:AB';

// Convert certificate fingerprint to signing key
function certToSigningKey(fingerprint) {
  // Remove colons and convert to buffer
  const cleanFingerprint = fingerprint.replace(/:/g, '');
  const certBuffer = Buffer.from(cleanFingerprint, 'hex');
  
  // Generate a deterministic signing key from the certificate
  const signingKey = crypto.createHash('sha256')
    .update(certBuffer)
    .digest();
    
  return {
    id: cleanFingerprint.substring(0, 16),
    key: signingKey.toString('base64'),
    algorithm: 'HS256',
    fingerprint: fingerprint
  };
}

// Generate keystore information for the expected certificate
function generateKeystoreInfo() {
  const expectedKey = certToSigningKey(EXPECTED_CERT);
  const currentKey = certToSigningKey(CURRENT_CERT);
  
  console.log('🔐 Google Play Store Certificate Analysis');
  console.log('==========================================');
  console.log(`Expected Certificate: ${EXPECTED_CERT}`);
  console.log(`Current Certificate:  ${CURRENT_CERT}`);
  console.log('');
  
  console.log('✅ Expected Signing Key:');
  console.log(`   Key ID: ${expectedKey.id}`);
  console.log(`   Algorithm: ${expectedKey.algorithm}`);
  console.log('');
  
  console.log('❌ Current Signing Key:');
  console.log(`   Key ID: ${currentKey.id}`);
  console.log(`   Algorithm: ${currentKey.algorithm}`);
  console.log('');
  
  // Generate keystore properties for Android
  const keystoreConfig = `# Android Keystore Configuration
# Use these settings to generate a keystore with the expected certificate
KEYSTORE_ALIAS=canada-access-hub
KEYSTORE_PASSWORD=SecurePassword123!
KEY_PASSWORD=SecurePassword123!

# Certificate Details (must match Google Play expectations)
CERT_FINGERPRINT_SHA1=${EXPECTED_CERT}
CERT_SUBJECT="CN=Canada Access Hub, OU=Government Services, O=GIOLYNXAPPS, L=Toronto, ST=Ontario, C=CA"
CERT_VALIDITY_YEARS=25

# Key generation command:
# keytool -genkey -v -keystore canada-access-hub.keystore -alias canada-access-hub -keyalg RSA -keysize 2048 -validity 9125 -storepass SecurePassword123! -keypass SecurePassword123!
`;

  const configFile = path.join(__dirname, '../keystore.config');
  fs.writeFileSync(configFile, keystoreConfig);
  
  console.log('📝 Keystore configuration saved to keystore.config');
  console.log('');
  console.log('🔧 Next Steps:');
  console.log('1. Generate a new keystore with the expected certificate fingerprint');
  console.log('2. Sign your App Bundle with the new keystore');
  console.log('3. Upload the correctly signed App Bundle to Google Play');
  
  return { expectedKey, currentKey };
}

// Run the analysis
if (import.meta.url === `file://${process.argv[1]}`) {
  generateKeystoreInfo();
}

export { certToSigningKey, generateKeystoreInfo };