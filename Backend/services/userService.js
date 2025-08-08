const axios = require('axios');
const { authConfig } = require('../config/msalConfig');

class UserService {
  
  /**
   * Fetch user profile from Microsoft Graph API
   */
  async getUserProfile(accessToken) {
    try {
      console.log('\n🔄 Fetching user data from Microsoft Graph API...');
      
      const graphResponse = await axios.get(authConfig.graphEndpoint, {
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json'
        }
      });

      // Log Microsoft Graph data
      this.logGraphResponse(graphResponse);

      return graphResponse.data;
    } catch (error) {
      console.error('❌ Error fetching user profile:', error.message);
      if (error.response) {
        console.error('📋 Error response:', error.response.data);
        console.error('📊 Status:', error.response.status);
      }
      throw error;
    }
  }

  /**
   * Create user session data
   */
  createUserSession(tokenResponse, graphData = null) {
    const sessionUser = {
      accessToken: tokenResponse.accessToken,
      idToken: tokenResponse.idToken,
      refreshToken: tokenResponse.refreshToken,
      account: tokenResponse.account,
      _json: tokenResponse.account,
      expiresOn: tokenResponse.expiresOn,
      graphData: graphData,
      loginTime: new Date().toISOString()
    };

    console.log('💾 User session created for:', tokenResponse.account?.username);
    return sessionUser;
  }

  /**
   * Get user display information
   */
  getUserDisplayInfo(sessionUser) {
    if (!sessionUser) return null;

    const account = sessionUser.account || {};
    const graphData = sessionUser.graphData || {};

    return {
      displayName: account.name || graphData.displayName || 'Unknown User',
      email: account.username || graphData.mail || graphData.userPrincipalName || 'No email',
      firstName: graphData.givenName || account.name?.split(' ')[0] || '',
      lastName: graphData.surname || account.name?.split(' ').slice(1).join(' ') || '',
      jobTitle: graphData.jobTitle || 'N/A',
      department: graphData.department || 'N/A',
      officeLocation: graphData.officeLocation || 'N/A',
      mobilePhone: graphData.mobilePhone || 'N/A',
      businessPhones: graphData.businessPhones || [],
      tenantId: account.tenantId || 'N/A',
      userId: account.localAccountId || account.homeAccountId || 'N/A'
    };
  }

  /**
   * Log Microsoft Graph API response
   */
  logGraphResponse(graphResponse) {
    console.log('\n🔍 === MICROSOFT GRAPH API RESPONSE ===');
    console.log('📋 Graph User Data:', JSON.stringify(graphResponse.data, null, 2));
    console.log('ℹ️ Response Status:', graphResponse.status);
    console.log('ℹ️ Response Headers:', JSON.stringify(graphResponse.headers, null, 2));
    console.log('=========================================\n');
  }

  /**
   * Check if user session is valid
   */
  isSessionValid(sessionUser) {
    if (!sessionUser) {
      return { valid: false, reason: 'No session data' };
    }

    if (!sessionUser.accessToken) {
      return { valid: false, reason: 'No access token' };
    }

    if (sessionUser.expiresOn) {
      const now = new Date();
      const expiresOn = new Date(sessionUser.expiresOn);
      
      if (now > expiresOn) {
        return { valid: false, reason: 'Token expired' };
      }
    }

    return { valid: true };
  }

  /**
   * Get session statistics
   */
  getSessionStats(sessionUser) {
    if (!sessionUser) return null;

    const loginTime = new Date(sessionUser.loginTime);
    const now = new Date();
    const sessionDuration = Math.round((now - loginTime) / 1000 / 60); // minutes

    let tokenTimeLeft = 'Unknown';
    if (sessionUser.expiresOn) {
      const expiresOn = new Date(sessionUser.expiresOn);
      tokenTimeLeft = Math.round((expiresOn - now) / 1000 / 60); // minutes
    }

    return {
      loginTime: loginTime.toISOString(),
      sessionDuration: `${sessionDuration} minutes`,
      tokenTimeLeft: `${tokenTimeLeft} minutes`,
      hasRefreshToken: !!sessionUser.refreshToken,
      hasGraphData: !!sessionUser.graphData
    };
  }
}

module.exports = new UserService();
