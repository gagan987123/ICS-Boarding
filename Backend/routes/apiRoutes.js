const express = require('express');
const router = express.Router();
const authService = require('../services/authService');
const { ensureAuthenticated } = require('../middleware/authMiddleware');

/**
 * API ROUTES
 * JSON API endpoints for frontend consumption
 * These are mounted at /api in app.js, so paths don't need /api prefix
 */

/**
 * @route   GET /auth/status
 * @desc    Check if user is authenticated (JSON response)
 * @access  Public
 */
router.get('/auth/status', (req, res) => {
    if (req.session && req.session.user) {
        return res.json({
            isAuthenticated: true,
            user: {
                displayName: req.session.user.account?.name || req.session.user.displayName,
                email: req.session.user.account?.username || req.session.user.email
            }
        });
    }
    return res.json({ isAuthenticated: false });
});

/**
 * @route   GET /auth/login-url
 * @desc    Get Azure AD login URL for frontend redirection
 * @access  Public
 */
router.get('/auth/login-url', async (req, res) => {
    try {
        // This generates a URL pointing to Azure AD login
        // Using client ID: 8434acb3-3462-4797-b705-1188cf20bdeb
        const authUrl = await authService.getAuthUrl();
        res.json({ url: authUrl });
    } catch (error) {
        console.error('Error generating auth URL:', error);
        res.status(500).json({ error: 'Failed to generate authentication URL' });
    }
});

/**
 * @route   POST /auth/logout
 * @desc    Logout via API (destroy session)
 * @access  Public
 */
router.post('/auth/logout', (req, res) => {
    req.session.destroy(err => {
        if (err) {
            console.error('Error destroying session:', err);
            return res.status(500).json({ error: 'Failed to logout' });
        }
        res.json({ success: true, message: 'Logged out successfully' });
    });
});

/**
 * Note: Graph data endpoints have been moved to userRoutes.js
 * and are mounted at /api/user/graph
 */

module.exports = router;
