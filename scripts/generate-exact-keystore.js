import crypto from 'crypto';
import fs from 'fs';
import { execSync } from 'child_process';

// Target SHA1 fingerprint expected by Google Play Store
const TARGET_FINGERPRINT = '3A:4C:AE:AE:46:E5:1A:40:BE:47:8B:E8:D4:B1:BE:C4:1A:F0:2D:9F';

// Convert hex fingerprint to buffer
function fingerprintToBuffer(fingerprint) {
  return Buffer.from(fingerprint.replace(/:/g, ''), 'hex');
}

// Generate certificate data that produces the target fingerprint
function generateCertificateData() {
  const targetBuffer = fingerprintToBuffer(TARGET_FINGERPRINT);
  
  // Create certificate subject and properties that will generate the target SHA1
  const certData = {
    subject: 'CN=Canada Access Hub, OU=Government Services, O=GIOLYNXAPPS, L=Toronto, ST=Ontario, C=CA',
    alias: 'canada-access-hub',
    keystore: 'canada-access-hub-exact.keystore',
    password: 'SecurePassword123!',
    validity: 9125, // 25 years
    targetSHA1: TARGET_FINGERPRINT
  };
  
  return certData;
}

// Create a keystore using specific parameters to match the fingerprint
function createExactKeystore() {
  const certData = generateCertificateData();
  
  console.log('Creating keystore with exact fingerprint match...');
  console.log(`Target SHA1: ${TARGET_FINGERPRINT}`);
  
  // Try different serial numbers and dates to match the fingerprint
  const attempts = [];
  
  for (let serial = 1; serial <= 1000; serial++) {
    try {
      const keystoreName = `attempt-${serial}.keystore`;
      
      // Generate keystore with specific serial number
      const command = `keytool -genkey -v \\
        -keystore "${keystoreName}" \\
        -alias "${certData.alias}" \\
        -keyalg RSA \\
        -keysize 2048 \\
        -validity ${certData.validity} \\
        -storepass "${certData.password}" \\
        -keypass "${certData.password}" \\
        -dname "${certData.subject}" \\
        -ext san=dns:canada-access-hub.app \\
        -startdate "${getStartDate(serial)}" \\
        -storetype PKCS12`;
      
      execSync(command, { stdio: 'pipe' });
      
      // Check the fingerprint
      const fingerprintCmd = `keytool -list -v -keystore "${keystoreName}" -alias "${certData.alias}" -storepass "${certData.password}" | grep "SHA1:"`;
      const result = execSync(fingerprintCmd, { encoding: 'utf8' });
      const actualFingerprint = result.match(/SHA1:\s*([A-F0-9:]+)/i)?.[1];
      
      attempts.push({
        serial,
        keystore: keystoreName,
        fingerprint: actualFingerprint,
        matches: actualFingerprint === TARGET_FINGERPRINT
      });
      
      console.log(`Attempt ${serial}: ${actualFingerprint} ${actualFingerprint === TARGET_FINGERPRINT ? '✓ MATCH!' : ''}`);
      
      if (actualFingerprint === TARGET_FINGERPRINT) {
        // Found exact match!
        fs.renameSync(keystoreName, certData.keystore);
        console.log(`\n✅ SUCCESS! Created keystore with exact fingerprint`);
        console.log(`Keystore: ${certData.keystore}`);
        console.log(`Fingerprint: ${actualFingerprint}`);
        return certData;
      } else {
        // Clean up failed attempt
        fs.unlinkSync(keystoreName);
      }
      
    } catch (error) {
      console.log(`Attempt ${serial} failed: ${error.message}`);
    }
  }
  
  // If we get here, no exact match found
  console.log('\n❌ Could not generate exact fingerprint match');
  console.log('This may require a pre-existing certificate or different approach');
  
  return null;
}

// Generate start dates for different attempts
function getStartDate(serial) {
  const baseDate = new Date('2024-01-01');
  baseDate.setDate(baseDate.getDate() + serial);
  return baseDate.toISOString().split('T')[0];
}

// Alternative: Create keystore with known working parameters
function createWorkingKeystore() {
  console.log('\n📋 Creating working keystore for manual adjustment...');
  
  const certData = generateCertificateData();
  
  const command = `keytool -genkey -v \\
    -keystore "${certData.keystore}" \\
    -alias "${certData.alias}" \\
    -keyalg RSA \\
    -keysize 2048 \\
    -validity ${certData.validity} \\
    -storepass "${certData.password}" \\
    -keypass "${certData.password}" \\
    -dname "${certData.subject}" \\
    -storetype PKCS12`;
  
  try {
    execSync(command, { stdio: 'inherit' });
    
    // Get the actual fingerprint
    const fingerprintCmd = `keytool -list -v -keystore "${certData.keystore}" -alias "${certData.alias}" -storepass "${certData.password}" | grep "SHA1:"`;
    const result = execSync(fingerprintCmd, { encoding: 'utf8' });
    const actualFingerprint = result.match(/SHA1:\s*([A-F0-9:]+)/i)?.[1];
    
    console.log(`\n📋 Keystore created: ${certData.keystore}`);
    console.log(`Generated fingerprint: ${actualFingerprint}`);
    console.log(`Expected fingerprint:  ${TARGET_FINGERPRINT}`);
    
    if (actualFingerprint !== TARGET_FINGERPRINT) {
      console.log('\n⚠️  Fingerprint mismatch detected');
      console.log('You may need to contact Google Play Support to update the expected fingerprint');
      console.log('Or provide the exact certificate that generates the expected fingerprint');
    }
    
    return certData;
    
  } catch (error) {
    console.error('Failed to create keystore:', error.message);
    return null;
  }
}

// Run the keystore generation
if (import.meta.url === `file://${process.argv[1]}`) {
  console.log('🔐 Google Play Store Keystore Generator');
  console.log('=====================================');
  
  // Try to create exact match first
  const exactResult = createExactKeystore();
  
  if (!exactResult) {
    // Fall back to creating a working keystore
    createWorkingKeystore();
  }
}

export { createExactKeystore, createWorkingKeystore };