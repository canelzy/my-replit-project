import crypto from 'crypto';

// Convert SHA1 fingerprint to signing key material
export function fingerprintToKey(fingerprint: string): Buffer {
  // Remove colons and convert to buffer
  const cleanFingerprint = fingerprint.replace(/:/g, '');
  return Buffer.from(cleanFingerprint, 'hex');
}

// Sign data with certificate-based key
export function signWithCertificate(data: string, fingerprint: string): string {
  const certKey = fingerprintToKey(fingerprint);
  
  // Use HMAC with the certificate fingerprint as key
  const signature = crypto
    .createHmac('sha256', certKey)
    .update(data)
    .digest('hex');
    
  return signature;
}

// Generate certificate-based JWT with Google Play Store validation
export function generateCertificateToken(appId: string, fingerprint: string): string {
  const expectedCert = '3A:4C:AE:AE:46:E5:1A:40:BE:47:8B:E8:D4:B1:BE:C4:1A:F0:2D:9F';
  const currentCert = '39:42:B1:26:C0:34:0C:2F:13:C3:A9:04:4D:D1:85:D0:F9:4C:D3:AB';
  
  const header = {
    alg: 'HS256',
    typ: 'JWT',
    kid: fingerprint.replace(/:/g, '').substring(0, 16), // Use first 16 chars as key ID
    cert: fingerprint,
    expected_cert: expectedCert,
    cert_status: fingerprint === expectedCert ? 'valid' : 'mismatch'
  };

  const payload = {
    app_id: appId,
    iss: 'canada-access-hub',
    iat: Math.floor(Date.now() / 1000),
    exp: Math.floor(Date.now() / 1000) + (24 * 60 * 60), // 24 hours
    cert_fingerprint: fingerprint,
    expected_cert: expectedCert,
    current_cert: currentCert,
    cert_match: fingerprint === expectedCert,
    play_store_ready: fingerprint === expectedCert,
    signed_with_cert: true
  };

  const encodedHeader = Buffer.from(JSON.stringify(header)).toString('base64url');
  const encodedPayload = Buffer.from(JSON.stringify(payload)).toString('base64url');
  
  const certKey = fingerprintToKey(fingerprint);
  const signature = crypto
    .createHmac('sha256', certKey)
    .update(`${encodedHeader}.${encodedPayload}`)
    .digest('base64url');

  return `${encodedHeader}.${encodedPayload}.${signature}`;
}

// Verify certificate-based signature
export function verifyCertificateToken(token: string, expectedFingerprint: string): any {
  try {
    const [encodedHeader, encodedPayload, signature] = token.split('.');
    
    const header = JSON.parse(Buffer.from(encodedHeader, 'base64url').toString());
    const payload = JSON.parse(Buffer.from(encodedPayload, 'base64url').toString());
    
    // Verify the certificate fingerprint matches
    if (payload.cert_fingerprint !== expectedFingerprint) {
      throw new Error('Certificate fingerprint mismatch');
    }
    
    const certKey = fingerprintToKey(expectedFingerprint);
    const expectedSignature = crypto
      .createHmac('sha256', certKey)
      .update(`${encodedHeader}.${encodedPayload}`)
      .digest('base64url');

    if (signature !== expectedSignature) {
      throw new Error('Invalid certificate signature');
    }

    return payload;
  } catch (error) {
    throw new Error('Certificate token verification failed');
  }
}