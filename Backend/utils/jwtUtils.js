/**
 * JWT Token Utilities for decoding and analyzing tokens
 * Simplified version with only the functions currently in use
 */

/**
 * Decode JWT token without verification
 */
function decodeJWT(token) {
  try {
    const parts = token.split('.');
    if (parts.length !== 3) return null;
    
    const header = JSON.parse(Buffer.from(parts[0], 'base64url').toString());
    const payload = JSON.parse(Buffer.from(parts[1], 'base64url').toString());
    const signature = parts[2];
    
    return { header, payload, signature };
  } catch (error) {
    console.error('Error decoding JWT:', error);
    return null;
  }
}

/**
 * Analyze and log JWT token details
 */
function analyzeToken(tokenName, token) {
  if (!token) {
    console.log(`❌ No ${tokenName} provided`);
    return null;
  }
  
  console.log(`\n🔍 === ${tokenName.toUpperCase()} ANALYSIS ===`);
  console.log(`📏 Token Length: ${token.length}`);
  console.log(`🔤 Raw Token (first 100 chars): ${token.substring(0, 100)}...`);
  
  const decoded = decodeJWT(token);
  if (!decoded) {
    console.log('❌ Failed to decode JWT token');
    return null;
  }

  console.log(`\n📋 JWT Header:`, JSON.stringify(decoded.header, null, 2));
  console.log(`\n👤 JWT Payload:`, JSON.stringify(decoded.payload, null, 2));
  console.log(`\n🔒 Signature: ${decoded.signature.substring(0, 50)}...`);
  
  // Check expiration
  if (decoded.payload.exp) {
    const expirationTime = new Date(decoded.payload.exp * 1000);
    const now = new Date();
    const isExpired = now > expirationTime;
    const minutesLeft = Math.round((expirationTime - now) / 1000 / 60);
    
    console.log(`⏰ Expires: ${expirationTime.toISOString()}`);
    console.log(`✅ Valid: ${!isExpired ? 'Yes' : 'No - EXPIRED'}`);
    console.log(`⏳ Time until expiry: ${minutesLeft} minutes`);
  }
  
  // Show important claims
  console.log(`\n🎯 Key Claims:`);
  console.log(`   - Subject (sub): ${decoded.payload.sub || 'N/A'}`);
  console.log(`   - Issuer (iss): ${decoded.payload.iss || 'N/A'}`);
  console.log(`   - Audience (aud): ${decoded.payload.aud || 'N/A'}`);
  console.log(`   - Email: ${decoded.payload.email || decoded.payload.preferred_username || 'N/A'}`);
  console.log(`   - Name: ${decoded.payload.name || 'N/A'}`);
  console.log(`   - Tenant ID: ${decoded.payload.tid || 'N/A'}`);
  console.log(`   - App ID: ${decoded.payload.appid || decoded.payload.azp || 'N/A'}`);
  
  if (decoded.payload.scp) {
    console.log(`   - Scopes: ${decoded.payload.scp}`);
  }
  
  if (decoded.payload.roles) {
    console.log(`   - Roles: ${decoded.payload.roles.join(', ')}`);
  }
  
  console.log(`=======================================\n`);
  
  return decoded;
}

module.exports = {
  analyzeToken
};
