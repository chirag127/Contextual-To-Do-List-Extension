/**
 * Storage utility for the Contextual To-Do List extension
 * Provides methods for working with Chrome's storage API
 */

/**
 * Gets all tasks from storage
 * @returns {Promise<Object>} - A promise that resolves to all tasks
 */
async function getAllTasks() {
  return new Promise((resolve) => {
    chrome.storage.local.get(['tasks'], (result) => {
      resolve(result.tasks || {});
    });
  });
}

/**
 * Gets tasks for a specific URL
 * @param {string} url - The URL to get tasks for
 * @returns {Promise<Array>} - A promise that resolves to an array of tasks
 */
async function getTasksForUrl(url) {
  return new Promise((resolve) => {
    chrome.runtime.sendMessage({ 
      action: 'GET_TASKS_FOR_URL', 
      url 
    }, (response) => {
      if (response && response.success) {
        resolve(response.data);
      } else {
        console.error('Error getting tasks for URL:', response?.error);
        resolve([]);
      }
    });
  });
}

/**
 * Adds a new task
 * @param {Object} task - The task to add
 * @returns {Promise<Object>} - A promise that resolves to the added task
 */
async function addTask(task) {
  return new Promise((resolve, reject) => {
    chrome.runtime.sendMessage({ 
      action: 'ADD_TASK', 
      task 
    }, (response) => {
      if (response && response.success) {
        resolve(response.data);
      } else {
        reject(new Error(response?.error || 'Failed to add task'));
      }
    });
  });
}

/**
 * Updates an existing task
 * @param {Object} task - The updated task
 * @returns {Promise<Object>} - A promise that resolves to the updated task
 */
async function updateTask(task) {
  return new Promise((resolve, reject) => {
    chrome.runtime.sendMessage({ 
      action: 'UPDATE_TASK', 
      task 
    }, (response) => {
      if (response && response.success) {
        resolve(response.data);
      } else {
        reject(new Error(response?.error || 'Failed to update task'));
      }
    });
  });
}

/**
 * Deletes a task
 * @param {string} taskId - The ID of the task to delete
 * @returns {Promise<boolean>} - A promise that resolves to true if successful
 */
async function deleteTask(taskId) {
  return new Promise((resolve, reject) => {
    chrome.runtime.sendMessage({ 
      action: 'DELETE_TASK', 
      taskId 
    }, (response) => {
      if (response && response.success) {
        resolve(true);
      } else {
        reject(new Error(response?.error || 'Failed to delete task'));
      }
    });
  });
}

/**
 * Syncs tasks with the backend
 * @returns {Promise<Object>} - A promise that resolves to the sync result
 */
async function syncTasks() {
  return new Promise((resolve, reject) => {
    chrome.runtime.sendMessage({ 
      action: 'SYNC_TASKS' 
    }, (response) => {
      if (response && response.success) {
        resolve(response.data);
      } else {
        reject(new Error(response?.error || 'Failed to sync tasks'));
      }
    });
  });
}

/**
 * Gets all tasks as a flat array
 * @returns {Promise<Array>} - A promise that resolves to an array of all tasks
 */
async function getAllTasksFlat() {
  const allTasks = await getAllTasks();
  const flatTasks = [];
  
  for (const url in allTasks) {
    flatTasks.push(...allTasks[url]);
  }
  
  return flatTasks;
}

/**
 * Gets tasks that are due soon (within the next 24 hours)
 * @returns {Promise<Array>} - A promise that resolves to an array of tasks due soon
 */
async function getTasksDueSoon() {
  const allTasks = await getAllTasksFlat();
  const now = new Date();
  const tomorrow = new Date(now);
  tomorrow.setDate(tomorrow.getDate() + 1);
  
  return allTasks.filter(task => {
    if (!task.dueDate) return false;
    
    const dueDate = new Date(task.dueDate);
    return dueDate >= now && dueDate <= tomorrow;
  });
}

/**
 * Gets overdue tasks
 * @returns {Promise<Array>} - A promise that resolves to an array of overdue tasks
 */
async function getOverdueTasks() {
  const allTasks = await getAllTasksFlat();
  const now = new Date();
  
  return allTasks.filter(task => {
    if (!task.dueDate) return false;
    
    const dueDate = new Date(task.dueDate);
    return dueDate < now;
  });
}

// Export functions
window.StorageUtils = {
  getAllTasks,
  getTasksForUrl,
  addTask,
  updateTask,
  deleteTask,
  syncTasks,
  getAllTasksFlat,
  getTasksDueSoon,
  getOverdueTasks
};
