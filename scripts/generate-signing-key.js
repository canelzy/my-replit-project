import crypto from 'crypto';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Generate a new signing key for PWA
function generateSigningKey() {
  // Generate a random 256-bit key
  const key = crypto.randomBytes(32);
  
  // Generate key ID (first 8 bytes as hex)
  const keyId = key.subarray(0, 8).toString('hex');
  
  // Create key data structure
  const keyData = {
    id: keyId,
    key: key.toString('base64'),
    algorithm: 'HS256',
    created: new Date().toISOString(),
    purpose: 'PWA_SIGNING'
  };
  
  // Ensure scripts directory exists
  const scriptsDir = __dirname;
  if (!fs.existsSync(scriptsDir)) {
    fs.mkdirSync(scriptsDir, { recursive: true });
  }
  
  // Save key to file
  const keyFile = path.join(scriptsDir, 'signing-key.json');
  fs.writeFileSync(keyFile, JSON.stringify(keyData, null, 2));
  
  console.log('✓ New signing key generated');
  console.log(`Key ID: ${keyId}`);
  console.log(`Key file: ${keyFile}`);
  console.log('\nIMPORTANT: Store this key securely and never commit it to version control!');
  
  return keyData;
}

// Generate environment variable format
function generateEnvFormat(keyData) {
  const envContent = `# PWA Signing Key - Generated ${keyData.created}
PWA_SIGNING_KEY_ID=${keyData.id}
PWA_SIGNING_KEY=${keyData.key}
PWA_SIGNING_ALGORITHM=${keyData.algorithm}
`;
  
  const envFile = path.join(__dirname, '../.env.signing');
  fs.writeFileSync(envFile, envContent);
  
  console.log(`\n✓ Environment variables saved to .env.signing`);
  console.log('Add these to your production environment variables.');
}

// Run the generator
if (import.meta.url === `file://${process.argv[1]}`) {
  const keyData = generateSigningKey();
  generateEnvFormat(keyData);
}

export { generateSigningKey };