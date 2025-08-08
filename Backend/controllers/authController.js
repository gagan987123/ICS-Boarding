const authService = require('../services/authService');
const userService = require('../services/userService');

class AuthController {
  
  /**
   * Initiate Microsoft login
   */
  async login(req, res) {
    try {
      const authUrl = await authService.getAuthUrl();
      res.redirect(authUrl);
    } catch (error) {
      console.error('❌ Login controller error:', error);
      res.redirect('/login-error');
    }
  }

  /**
   * Handle Microsoft OAuth callback
   */
  async callback(req, res) {
    try {
      // Validate callback parameters
      const validation = authService.validateCallback(req.query);
      if (!validation.valid) {
        console.error('❌ Invalid callback:', validation.error);
        return res.redirect('/login-error');
      }

      // Exchange authorization code for tokens
      const tokenResponse = await authService.acquireTokenByCode(req.query.code);
      
      // Get additional user data from Microsoft Graph
      let graphData = null;
      try {
        graphData = await userService.getUserProfile(tokenResponse.accessToken);
      } catch (graphError) {
        console.warn('⚠️ Could not fetch Graph data:', graphError.message);
      }

      // Create and store user session
      const sessionUser = userService.createUserSession(tokenResponse, graphData);
      req.session.user = sessionUser;

      console.log('✅ User successfully authenticated and session created');
      // Redirect to frontend after successful auth
      res.redirect('http://localhost:5174/dashboard');

    } catch (error) {
      console.error('❌ Callback controller error:', error.errorCode || error.message);
      // Redirect to frontend login page with error
      res.redirect('http://localhost:5174/login?error=auth_failed');
    }
  }

  /**
   * Handle user logout
   */
  async logout(req, res) {
    const username = req.session.user?.account?.username || 'Unknown';
    
    // Clear local session
    req.session.destroy((err) => {
      if (err) {
        console.error('❌ Session destroy error:', err);
      } else {
        console.log('✅ Session destroyed for user:', username);
      }
      
      // Redirect to frontend after logout
      res.redirect('http://localhost:5174/login?logout=success');
    });
  }

  /**
   * Handle login error
   */
  loginError(req, res) {
    res.status(401).json({
      status: 'error',
      message: 'Authentication failed. Please try again.'
    });
  }

  /**
   * Refresh expired tokens
   */
  async refreshTokens(req, res) {
    try {
      if (!req.session.user || !req.session.user.refreshToken) {
        return res.status(401).json({ error: 'No refresh token available' });
      }

      const newTokens = await authService.refreshTokens(
        req.session.user.refreshToken,
        req.session.user.account
      );

      // Update session with new tokens
      req.session.user = {
        ...req.session.user,
        accessToken: newTokens.accessToken,
        idToken: newTokens.idToken,
        expiresOn: newTokens.expiresOn
      };

      console.log('✅ Tokens refreshed successfully');
      res.json({ message: 'Tokens refreshed successfully' });

    } catch (error) {
      console.error('❌ Token refresh error:', error);
      // If refresh fails, user needs to login again
      req.session.destroy();
      res.status(401).json({ 
        error: 'Token refresh failed', 
        redirectTo: '/login' 
      });
    }
  }

  /**
   * Check authentication status
   */
  checkAuth(req, res) {
    console.log('Session ID:', req.sessionID);
    console.log('Cookie header:', req.headers.cookie);
    console.log('Session data:', req.session);
    
    // Simple check if the user is logged in without redirecting
    if (req.session && req.session.user) {
      // Get user display info if available
      const userInfo = userService.getUserDisplayInfo(req.session.user);
      
      return res.json({
        isAuthenticated: true,
        user: userInfo || {
          displayName: req.session.user.account?.name || 'User',
          email: req.session.user.account?.username || null
        }
      });
    }
    
    // Not authenticated - return JSON instead of redirecting
    return res.json({ 
      isAuthenticated: false,
      debug: {
        sessionExists: !!req.session,
        cookieExists: !!req.headers.cookie,
        sessionID: req.sessionID || null
      }
    });
  }
}

module.exports = new AuthController();
