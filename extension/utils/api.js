/**
 * API utility for the Contextual To-Do List extension
 * Provides methods for interacting with the backend API
 */

// Backend API URL
const API_URL = 'https://your-backend-url.com';

/**
 * Makes an authenticated API request
 * @param {string} endpoint - The API endpoint
 * @param {Object} options - Request options
 * @returns {Promise<Object>} - A promise that resolves to the API response
 */
async function apiRequest(endpoint, options = {}) {
  try {
    // Get authentication token
    const token = await window.AuthUtils.getToken();
    
    if (!token) {
      throw new Error('Not authenticated');
    }
    
    // Set default options
    const defaultOptions = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    };
    
    // Merge options
    const requestOptions = {
      ...defaultOptions,
      ...options,
      headers: {
        ...defaultOptions.headers,
        ...options.headers
      }
    };
    
    // Make request
    const response = await fetch(`${API_URL}${endpoint}`, requestOptions);
    
    // Handle non-OK responses
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || `API request failed with status ${response.status}`);
    }
    
    // Parse and return response
    return await response.json();
  } catch (error) {
    console.error('API request error:', error);
    throw error;
  }
}

/**
 * Gets the user profile from the API
 * @returns {Promise<Object>} - A promise that resolves to the user profile
 */
async function getUserProfile() {
  return apiRequest('/api/user/profile');
}

/**
 * Syncs tasks with the backend
 * @param {Object} tasks - The tasks to sync
 * @returns {Promise<Object>} - A promise that resolves to the synced tasks
 */
async function syncTasks(tasks) {
  return apiRequest('/api/tasks/sync', {
    method: 'POST',
    body: JSON.stringify({ tasks })
  });
}

/**
 * Gets all tasks from the backend
 * @returns {Promise<Object>} - A promise that resolves to all tasks
 */
async function getAllTasks() {
  return apiRequest('/api/tasks');
}

/**
 * Creates a new task on the backend
 * @param {Object} task - The task to create
 * @returns {Promise<Object>} - A promise that resolves to the created task
 */
async function createTask(task) {
  return apiRequest('/api/tasks', {
    method: 'POST',
    body: JSON.stringify({ task })
  });
}

/**
 * Updates a task on the backend
 * @param {string} taskId - The ID of the task to update
 * @param {Object} task - The updated task data
 * @returns {Promise<Object>} - A promise that resolves to the updated task
 */
async function updateTask(taskId, task) {
  return apiRequest(`/api/tasks/${taskId}`, {
    method: 'PUT',
    body: JSON.stringify({ task })
  });
}

/**
 * Deletes a task on the backend
 * @param {string} taskId - The ID of the task to delete
 * @returns {Promise<Object>} - A promise that resolves to the deletion result
 */
async function deleteTask(taskId) {
  return apiRequest(`/api/tasks/${taskId}`, {
    method: 'DELETE'
  });
}

// Export functions
window.ApiUtils = {
  apiRequest,
  getUserProfile,
  syncTasks,
  getAllTasks,
  createTask,
  updateTask,
  deleteTask
};
