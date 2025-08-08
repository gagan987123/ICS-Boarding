const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { ensureAuthenticated, checkTokenExpiration } = require('../middleware/authMiddleware');

/**
 * USER API ROUTES
 * These routes handle user data operations
 * Since they're mounted at /api in app.js, paths don't need /api prefix
 */

// Apply authentication middleware to all user routes
router.use(ensureAuthenticated);

// Apply token expiration check
router.use(checkTokenExpiration);

/**
 * @route   GET /user
 * @desc    Get user data as JSON
 * @access  Private
 */
router.get('/user', userController.getUserData);

/**
 * @route   POST /user/refresh
 * @desc    Refresh user profile from Microsoft Graph
 * @access  Private
 */
router.post('/user/refresh', userController.refreshProfile);

/**
 * @route   GET /user/graph
 * @desc    Get Microsoft Graph data
 * @access  Private
 */
router.get('/user/graph', userController.getGraphData);

module.exports = router;
