import crypto from 'crypto';

interface SigningKey {
  id: string;
  key: string;
  algorithm: string;
}

// Load signing key from environment or generate temporary one
export function getSigningKey(): SigningKey {
  const keyId = process.env.PWA_SIGNING_KEY_ID;
  const key = process.env.PWA_SIGNING_KEY;
  const algorithm = process.env.PWA_SIGNING_ALGORITHM || 'HS256';

  if (keyId && key) {
    return { id: keyId, key, algorithm };
  }

  // Generate temporary key for development
  const tempKey = crypto.randomBytes(32);
  console.warn('⚠️  Using temporary signing key for development. Set PWA_SIGNING_KEY_ID and PWA_SIGNING_KEY in production.');
  
  return {
    id: tempKey.subarray(0, 8).toString('hex'),
    key: tempKey.toString('base64'),
    algorithm: 'HS256'
  };
}

// Sign a payload with the current key
export function signPayload(payload: any): string {
  const signingKey = getSigningKey();
  const key = Buffer.from(signingKey.key, 'base64');
  
  const header = {
    alg: signingKey.algorithm,
    typ: 'JWT',
    kid: signingKey.id
  };

  const encodedHeader = Buffer.from(JSON.stringify(header)).toString('base64url');
  const encodedPayload = Buffer.from(JSON.stringify(payload)).toString('base64url');
  
  const signature = crypto
    .createHmac('sha256', key)
    .update(`${encodedHeader}.${encodedPayload}`)
    .digest('base64url');

  return `${encodedHeader}.${encodedPayload}.${signature}`;
}

// Verify a signed token
export function verifySignature(token: string): any {
  try {
    const [encodedHeader, encodedPayload, signature] = token.split('.');
    const signingKey = getSigningKey();
    const key = Buffer.from(signingKey.key, 'base64');
    
    const expectedSignature = crypto
      .createHmac('sha256', key)
      .update(`${encodedHeader}.${encodedPayload}`)
      .digest('base64url');

    if (signature !== expectedSignature) {
      throw new Error('Invalid signature');
    }

    return JSON.parse(Buffer.from(encodedPayload, 'base64url').toString());
  } catch (error) {
    throw new Error('Token verification failed');
  }
}

// Generate app integrity token with certificate fingerprint
export function generateAppToken(appId: string, certFingerprint?: string): string {
  const payload = {
    app_id: appId,
    iss: 'canada-access-hub',
    iat: Math.floor(Date.now() / 1000),
    exp: Math.floor(Date.now() / 1000) + (24 * 60 * 60), // 24 hours
    cert_fingerprint: certFingerprint || process.env.APP_CERT_FINGERPRINT || '3A:4C:AE:AE:46:E5:1A:40:BE:47:8B:E8:D4:B1:BE:C4:1A:F0:2D:9F'
  };

  return signPayload(payload);
}