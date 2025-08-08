const userService = require('../services/userService');

class UserController {
  
  /**
   * Profile method removed - not needed for frontend SPA
   */

  /**
   * Get user data as JSON API
   */
  async getUserData(req, res) {
    try {
      const sessionUser = req.session.user;
      const userDisplayInfo = userService.getUserDisplayInfo(sessionUser);
      const sessionStats = userService.getSessionStats(sessionUser);
      const sessionValid = userService.isSessionValid(sessionUser);

      res.json({
        success: true,
        user: userDisplayInfo,
        sessionStats,
        sessionValid,
        hasGraphData: !!sessionUser.graphData,
        tokenInfo: {
          hasAccessToken: !!sessionUser.accessToken,
          hasIdToken: !!sessionUser.idToken,
          hasRefreshToken: !!sessionUser.refreshToken,
          expiresOn: sessionUser.expiresOn
        }
      });

    } catch (error) {
      console.error('❌ Get user data error:', error);
      res.status(500).json({
        success: false,
        error: 'Could not retrieve user data'
      });
    }
  }

  /**
   * Refresh user profile from Microsoft Graph
   */
  async refreshProfile(req, res) {
    try {
      const sessionUser = req.session.user;
      
      if (!sessionUser || !sessionUser.accessToken) {
        return res.status(401).json({ error: 'No valid session or access token' });
      }

      console.log('🔄 Refreshing user profile from Microsoft Graph...');
      
      const graphData = await userService.getUserProfile(sessionUser.accessToken);
      
      // Update session with fresh Graph data
      req.session.user = {
        ...sessionUser,
        graphData: graphData,
        lastGraphUpdate: new Date().toISOString()
      };

      const userDisplayInfo = userService.getUserDisplayInfo(req.session.user);

      res.json({
        success: true,
        message: 'Profile refreshed from Microsoft Graph',
        user: userDisplayInfo,
        lastUpdate: req.session.user.lastGraphUpdate
      });

    } catch (error) {
      console.error('❌ Refresh profile error:', error);
      res.status(500).json({
        success: false,
        error: 'Could not refresh profile from Microsoft Graph'
      });
    }
  }

  /**
   * Get user's Microsoft Graph data
   */
  async getGraphData(req, res) {
    try {
      const sessionUser = req.session.user;
      
      if (!sessionUser?.graphData) {
        return res.status(404).json({
          success: false,
          error: 'No Microsoft Graph data available'
        });
      }

      res.json({
        success: true,
        graphData: sessionUser.graphData,
        lastUpdate: sessionUser.lastGraphUpdate || sessionUser.loginTime
      });

    } catch (error) {
      console.error('❌ Get Graph data error:', error);
      res.status(500).json({
        success: false,
        error: 'Could not retrieve Microsoft Graph data'
      });
    }
  }
}

module.exports = new UserController();
