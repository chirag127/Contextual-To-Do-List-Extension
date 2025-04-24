/**
 * Tasks API routes for the Contextual To-Do List backend
 */

const express = require('express');
const router = express.Router();
const { getCurrentUser } = require('../middleware/auth');
const db = require('../utils/db');

// Apply current user middleware to all routes
router.use(getCurrentUser);

/**
 * GET /api/tasks
 * Get all tasks for the current user
 */
router.get('/', async (req, res) => {
  try {
    const tasks = await db.getAllTasks(req.userId);
    res.json(tasks);
  } catch (error) {
    console.error('Error getting tasks:', error);
    res.status(500).json({
      error: true,
      message: 'Error getting tasks'
    });
  }
});

/**
 * GET /api/tasks/url
 * Get tasks for a specific URL
 */
router.get('/url', async (req, res) => {
  try {
    const { url } = req.query;
    
    if (!url) {
      return res.status(400).json({
        error: true,
        message: 'URL is required'
      });
    }
    
    const tasks = await db.getTasksForUrl(req.userId, url);
    res.json(tasks);
  } catch (error) {
    console.error('Error getting tasks for URL:', error);
    res.status(500).json({
      error: true,
      message: 'Error getting tasks for URL'
    });
  }
});

/**
 * GET /api/tasks/:id
 * Get a task by ID
 */
router.get('/:id', async (req, res) => {
  try {
    const task = await db.getTaskById(req.userId, req.params.id);
    
    if (!task) {
      return res.status(404).json({
        error: true,
        message: 'Task not found'
      });
    }
    
    res.json(task);
  } catch (error) {
    console.error('Error getting task:', error);
    res.status(500).json({
      error: true,
      message: 'Error getting task'
    });
  }
});

/**
 * POST /api/tasks
 * Create a new task
 */
router.post('/', async (req, res) => {
  try {
    const { task } = req.body;
    
    if (!task) {
      return res.status(400).json({
        error: true,
        message: 'Task data is required'
      });
    }
    
    if (!task.title || !task.url) {
      return res.status(400).json({
        error: true,
        message: 'Task title and URL are required'
      });
    }
    
    // Add user ID to task
    task.userId = req.userId;
    
    // Create task
    const createdTask = await db.createTask(task);
    
    res.status(201).json(createdTask);
  } catch (error) {
    console.error('Error creating task:', error);
    res.status(500).json({
      error: true,
      message: 'Error creating task'
    });
  }
});

/**
 * PUT /api/tasks/:id
 * Update a task
 */
router.put('/:id', async (req, res) => {
  try {
    const { task } = req.body;
    
    if (!task) {
      return res.status(400).json({
        error: true,
        message: 'Task data is required'
      });
    }
    
    // Update task
    const updatedTask = await db.updateTask(req.userId, req.params.id, task);
    
    if (!updatedTask) {
      return res.status(404).json({
        error: true,
        message: 'Task not found'
      });
    }
    
    res.json(updatedTask);
  } catch (error) {
    console.error('Error updating task:', error);
    res.status(500).json({
      error: true,
      message: 'Error updating task'
    });
  }
});

/**
 * DELETE /api/tasks/:id
 * Delete a task
 */
router.delete('/:id', async (req, res) => {
  try {
    const deleted = await db.deleteTask(req.userId, req.params.id);
    
    if (!deleted) {
      return res.status(404).json({
        error: true,
        message: 'Task not found'
      });
    }
    
    res.json({ success: true });
  } catch (error) {
    console.error('Error deleting task:', error);
    res.status(500).json({
      error: true,
      message: 'Error deleting task'
    });
  }
});

/**
 * POST /api/tasks/sync
 * Sync tasks
 */
router.post('/sync', async (req, res) => {
  try {
    const { tasks } = req.body;
    
    if (!tasks) {
      return res.status(400).json({
        error: true,
        message: 'Tasks data is required'
      });
    }
    
    // Sync tasks
    const syncedTasks = await db.syncTasks(req.userId, tasks);
    
    res.json({ tasks: syncedTasks });
  } catch (error) {
    console.error('Error syncing tasks:', error);
    res.status(500).json({
      error: true,
      message: 'Error syncing tasks'
    });
  }
});

module.exports = router;
