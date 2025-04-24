/**
 * Authentication middleware for the Contextual To-Do List backend
 */

const { ClerkExpressRequireAuth } = require('@clerk/clerk-sdk-node');

/**
 * Middleware to require authentication
 */
const requireAuth = ClerkExpressRequireAuth();

/**
 * Middleware to get the current user
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next function
 */
const getCurrentUser = (req, res, next) => {
  // User is already set by Clerk middleware
  if (!req.auth || !req.auth.userId) {
    return res.status(401).json({
      error: true,
      message: 'Unauthorized'
    });
  }
  
  // Add user ID to request
  req.userId = req.auth.userId;
  
  next();
};

module.exports = {
  requireAuth,
  getCurrentUser
};
