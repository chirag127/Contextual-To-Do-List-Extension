/**
 * Main entry point for the Contextual To-Do List backend
 */

// Load environment variables
require('dotenv').config();

const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const mongoose = require('mongoose');
const { ClerkExpressRequireAuth } = require('@clerk/clerk-sdk-node');

// Import routes
const tasksRoutes = require('./api/tasks');
const authRoutes = require('./api/auth');

// Create Express app
const app = express();

// Set port
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/contextual-todo-list', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Error connecting to MongoDB:', err));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/tasks', ClerkExpressRequireAuth(), tasksRoutes);

// Health check route
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok' });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    error: true,
    message: err.message || 'Internal Server Error'
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
