/**
 * Authentication API routes for the Contextual To-Do List backend
 */

const express = require('express');
const router = express.Router();
const { ClerkExpressRequireAuth } = require('@clerk/clerk-sdk-node');
const { getCurrentUser } = require('../middleware/auth');

/**
 * GET /api/auth/user
 * Get the current user
 */
router.get('/user', ClerkExpressRequireAuth(), getCurrentUser, async (req, res) => {
  try {
    // User is already set by middleware
    res.json({
      id: req.userId
    });
  } catch (error) {
    console.error('Error getting user:', error);
    res.status(500).json({
      error: true,
      message: 'Error getting user'
    });
  }
});

/**
 * GET /api/auth/verify
 * Verify authentication
 */
router.get('/verify', ClerkExpressRequireAuth(), getCurrentUser, async (req, res) => {
  try {
    res.json({
      authenticated: true,
      userId: req.userId
    });
  } catch (error) {
    console.error('Error verifying authentication:', error);
    res.status(500).json({
      error: true,
      message: 'Error verifying authentication'
    });
  }
});

module.exports = router;
