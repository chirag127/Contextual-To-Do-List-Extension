/**
 * Database utility for the Contextual To-Do List backend
 */

const mongoose = require('mongoose');

// Task schema
const taskSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
    index: true
  },
  userId: {
    type: String,
    required: true,
    index: true
  },
  url: {
    type: String,
    required: true,
    index: true
  },
  title: {
    type: String,
    required: true
  },
  description: {
    type: String
  },
  completed: {
    type: Boolean,
    default: false
  },
  priority: {
    type: String,
    enum: ['low', 'medium', 'high'],
    default: 'medium'
  },
  dueDate: {
    type: Date
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Create model
const Task = mongoose.model('Task', taskSchema);

/**
 * Gets all tasks for a user
 * @param {string} userId - The user ID
 * @returns {Promise<Array>} - A promise that resolves to an array of tasks
 */
const getAllTasks = async (userId) => {
  try {
    const tasks = await Task.find({ userId }).sort({ createdAt: -1 });
    
    // Group tasks by URL
    const tasksByUrl = {};
    
    tasks.forEach(task => {
      const taskObj = task.toObject();
      
      if (!tasksByUrl[taskObj.url]) {
        tasksByUrl[taskObj.url] = [];
      }
      
      tasksByUrl[taskObj.url].push(taskObj);
    });
    
    return tasksByUrl;
  } catch (error) {
    console.error('Error getting all tasks:', error);
    throw error;
  }
};

/**
 * Gets tasks for a specific URL
 * @param {string} userId - The user ID
 * @param {string} url - The URL to get tasks for
 * @returns {Promise<Array>} - A promise that resolves to an array of tasks
 */
const getTasksForUrl = async (userId, url) => {
  try {
    const tasks = await Task.find({ userId, url }).sort({ createdAt: -1 });
    return tasks.map(task => task.toObject());
  } catch (error) {
    console.error('Error getting tasks for URL:', error);
    throw error;
  }
};

/**
 * Gets a task by ID
 * @param {string} userId - The user ID
 * @param {string} taskId - The task ID
 * @returns {Promise<Object>} - A promise that resolves to the task
 */
const getTaskById = async (userId, taskId) => {
  try {
    const task = await Task.findOne({ userId, id: taskId });
    return task ? task.toObject() : null;
  } catch (error) {
    console.error('Error getting task by ID:', error);
    throw error;
  }
};

/**
 * Creates a new task
 * @param {Object} taskData - The task data
 * @returns {Promise<Object>} - A promise that resolves to the created task
 */
const createTask = async (taskData) => {
  try {
    const task = new Task(taskData);
    await task.save();
    return task.toObject();
  } catch (error) {
    console.error('Error creating task:', error);
    throw error;
  }
};

/**
 * Updates a task
 * @param {string} userId - The user ID
 * @param {string} taskId - The task ID
 * @param {Object} taskData - The updated task data
 * @returns {Promise<Object>} - A promise that resolves to the updated task
 */
const updateTask = async (userId, taskId, taskData) => {
  try {
    // Set updated timestamp
    taskData.updatedAt = new Date();
    
    const task = await Task.findOneAndUpdate(
      { userId, id: taskId },
      taskData,
      { new: true }
    );
    
    return task ? task.toObject() : null;
  } catch (error) {
    console.error('Error updating task:', error);
    throw error;
  }
};

/**
 * Deletes a task
 * @param {string} userId - The user ID
 * @param {string} taskId - The task ID
 * @returns {Promise<boolean>} - A promise that resolves to true if successful
 */
const deleteTask = async (userId, taskId) => {
  try {
    const result = await Task.deleteOne({ userId, id: taskId });
    return result.deletedCount > 0;
  } catch (error) {
    console.error('Error deleting task:', error);
    throw error;
  }
};

/**
 * Syncs tasks for a user
 * @param {string} userId - The user ID
 * @param {Object} tasks - The tasks to sync
 * @returns {Promise<Object>} - A promise that resolves to the synced tasks
 */
const syncTasks = async (userId, tasks) => {
  try {
    // Get all tasks for user
    const existingTasks = await Task.find({ userId });
    const existingTaskIds = existingTasks.map(task => task.id);
    
    // Flatten tasks object into array
    const tasksArray = [];
    for (const url in tasks) {
      tasksArray.push(...tasks[url]);
    }
    
    // Find tasks to create, update, and delete
    const tasksToCreate = [];
    const tasksToUpdate = [];
    const taskIdsToKeep = [];
    
    for (const task of tasksArray) {
      // Ensure task has user ID
      task.userId = userId;
      
      // Add to appropriate array
      if (existingTaskIds.includes(task.id)) {
        tasksToUpdate.push(task);
      } else {
        tasksToCreate.push(task);
      }
      
      taskIdsToKeep.push(task.id);
    }
    
    // Find task IDs to delete
    const taskIdsToDelete = existingTaskIds.filter(id => !taskIdsToKeep.includes(id));
    
    // Perform operations
    const createPromises = tasksToCreate.map(task => createTask(task));
    const updatePromises = tasksToUpdate.map(task => updateTask(userId, task.id, task));
    const deletePromises = taskIdsToDelete.map(id => deleteTask(userId, id));
    
    await Promise.all([
      ...createPromises,
      ...updatePromises,
      ...deletePromises
    ]);
    
    // Get updated tasks
    return await getAllTasks(userId);
  } catch (error) {
    console.error('Error syncing tasks:', error);
    throw error;
  }
};

module.exports = {
  Task,
  getAllTasks,
  getTasksForUrl,
  getTaskById,
  createTask,
  updateTask,
  deleteTask,
  syncTasks
};
