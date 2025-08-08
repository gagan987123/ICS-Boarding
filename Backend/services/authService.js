const { ConfidentialClientApplication } = require('@azure/msal-node');
const { msalConfig, authConfig } = require('../config/msalConfig');
const { analyzeToken } = require('../utils/jwtUtils');

class AuthService {
  constructor() {
    this.cca = new ConfidentialClientApplication(msalConfig);
  }

  /**
   * Validate OAuth callback parameters
   */
  validateCallback(query) {

    if (query.error) {
      return { 
        valid: false, 
        error: `${query.error}: ${query.error_description || 'Unknown error'}` 
      };
    }

    if (!query.code) {
      return { 
        valid: false, 
        error: 'No authorization code found in the response' 
      };
    }

    return { valid: true };
  }

  /**
   * Generate authentication URL for Microsoft login
   */
  async getAuthUrl(state = 'random_state_value') {
    try {
      console.log('🔗 Generating auth URL...');
      console.log('🔄 Redirect URI:', authConfig.redirectUri);
      
      const authCodeUrlParameters = {
        scopes: authConfig.scopes,
        redirectUri: authConfig.redirectUri,
        state: state
      };

      const authCodeUrl = await this.cca.getAuthCodeUrl(authCodeUrlParameters);
      console.log('✅ Auth URL generated successfully');
      
      return authCodeUrl;
    } catch (error) {
      console.error('❌ Error generating auth URL:', error);
      throw error;
    }
  }

  /**
   * Exchange authorization code for tokens
   */
  async acquireTokenByCode(code) {
    try {
      console.log('🔄 Exchanging authorization code for tokens...');
      
      const tokenRequest = {
        code: code,
        scopes: authConfig.scopes,
        redirectUri: authConfig.redirectUri
      };

      const response = await this.cca.acquireTokenByCode(tokenRequest);
      
      console.log('✅ Tokens acquired successfully for:', response.account?.username);
      
      this.logTokenAnalysis(response);
      
      return response;
    } catch (error) {
      console.error('❌ Error acquiring tokens:', error);
      throw error;
    }
  }

  /**
   * Refresh expired tokens
   */
  async refreshTokens(refreshToken, account) {
    try {
      console.log('🔄 Refreshing expired tokens...');
      
      const silentRequest = {
        account: account,
        scopes: authConfig.scopes,
        forceRefresh: true
      };

      const response = await this.cca.acquireTokenSilent(silentRequest);
      console.log('✅ Tokens refreshed successfully');
      
      return response;
    } catch (error) {
      console.error('❌ Error refreshing tokens:', error);
      throw error;
    }
  }

  /**
   * Get Microsoft logout URL
   */
  getLogoutUrl() {
    // Use tenant-specific authority from MSAL config
    const tenantId = msalConfig.auth.authority.split('/').pop();
    return `https://login.microsoftonline.com/${tenantId}/oauth2/v2.0/logout?post_logout_redirect_uri=${encodeURIComponent(authConfig.postLogoutRedirectUri)}`;
  }

  /**
   * Log comprehensive token analysis
   */
  logTokenAnalysis(response) {
    console.log('\n🔍 === COMPLETE AZURE AD RESPONSE ===');
    console.log('📋 Full Response Object:', JSON.stringify(response, null, 2));
    console.log('\n👤 Account Details:', JSON.stringify(response.account, null, 2));
    console.log('\n🔑 Access Token Length:', response.accessToken?.length);
    console.log('🔑 ID Token Length:', response.idToken?.length);
    console.log('🔑 Refresh Token Available:', !!response.refreshToken);
    console.log('⏰ Token Expires On:', response.expiresOn);
    console.log('🎯 Scopes:', response.scopes);
    console.log('🏢 Authority Used:', response.authority);
    console.log('🆔 Correlation ID:', response.correlationId);
    console.log('=======================================\n');
    
    
    console.log('🔍 === JWT TOKEN ANALYSIS ===');
    analyzeToken('ID Token', response.idToken);
    analyzeToken('Access Token', response.accessToken);
  }
}

module.exports = new AuthService();
