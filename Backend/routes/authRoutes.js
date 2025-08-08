const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { sessionLogger } = require('../middleware/authMiddleware');

// Apply session logging to all auth routes
router.use(sessionLogger);

/**
 * CORE AUTHENTICATION FLOW ROUTES
 * These routes handle the OAuth flow with Microsoft Azure AD
 */

/**
 * @route   GET /login
 * @desc    Initiate Microsoft OAuth login
 * @access  Public
 */
router.get('/login', authController.login);

/**
 * @route   GET /auth/callback
 * @desc    Handle Microsoft OAuth callback
 * @access  Public
 */
router.get('/auth/callback', authController.callback);

/**
 * @route   GET /logout
 * @desc    Logout user and clear session
 * @access  Private
 */
router.get('/logout', authController.logout);

/**
 * @route   GET /login-error
 * @desc    Display login error page
 * @access  Public
 */
router.get('/login-error', authController.loginError);

/**
 * @route   POST /auth/refresh
 * @desc    Refresh expired tokens
 * @access  Private
 */
router.post('/auth/refresh', authController.refreshTokens);

/**
 * Note: The /auth/status endpoint for JSON API responses 
 * has been moved to apiRoutes.js to avoid duplication
 */

module.exports = router;
