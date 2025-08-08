/**
 * Authentication middleware to protect routes
 */
function ensureAuthenticated(req, res, next) {
  if (req.session.user) {
    console.log('✅ User authenticated:', req.session.user.account?.username || 'Unknown');
    return next();
  }
  
  console.log('❌ User not authenticated');
  
  // Check if the request is an API request (has Accept: application/json or is from Postman)
  const isApiRequest = req.get('Accept')?.includes('application/json') || 
                     req.get('User-Agent')?.includes('Postman') ||
                     req.xhr;
  
  if (isApiRequest) {
    // Return JSON response for API requests
    return res.status(401).json({ 
      isAuthenticated: false, 
      error: 'Authentication required',
      redirectUrl: '/login'
    });
  }
  
  // Redirect for browser requests
  res.redirect('/login');
}

/**
 * Check if user is authenticated (for conditional rendering)
 */
function checkAuthentication(req, res, next) {
  req.isAuthenticated = !!req.session.user;
  next();
}

/**
 * Session logging middleware
 */
function sessionLogger(req, res, next) {
  if (req.session.user) {
    console.log('🔑 Session active for:', req.session.user.account?.username);
  }
  next();
}

/**
 * Token expiration checker
 */
function checkTokenExpiration(req, res, next) {
  if (req.session.user && req.session.user.expiresOn) {
    const now = new Date();
    const expiresOn = new Date(req.session.user.expiresOn);
    
    if (now > expiresOn) {
      console.log('⏰ Token expired, clearing session');
      req.session.destroy();
      
      // Check if this is an API request
      const isApiRequest = req.get('Accept')?.includes('application/json') || 
                         req.get('User-Agent')?.includes('Postman') ||
                         req.xhr;
      
      if (isApiRequest) {
        return res.status(401).json({ 
          isAuthenticated: false, 
          error: 'Token expired',
          loginRequired: true
        });
      }
      
      return res.redirect('/login');
    }
  }
  
  next();
}

module.exports = {
  ensureAuthenticated,
  checkAuthentication,
  sessionLogger,
  checkTokenExpiration
};
