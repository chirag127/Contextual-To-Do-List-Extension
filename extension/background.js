/**
 * Background script for the Contextual To-Do List extension
 * Handles authentication state, data synchronization, and communication between components
 */

// Initialize authentication state
let authState = {
  isAuthenticated: false,
  user: null,
  token: null
};

// Listen for installation or update
chrome.runtime.onInstalled.addListener(() => {
  console.log('Contextual To-Do List extension installed or updated');
  
  // Initialize storage with default values if needed
  chrome.storage.local.get(['tasks', 'authState'], (result) => {
    if (!result.tasks) {
      chrome.storage.local.set({ tasks: {} });
    }
    
    if (result.authState) {
      authState = result.authState;
    }
  });
});

// Listen for messages from popup, options, or content scripts
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  console.log('Message received in background script:', message);
  
  switch (message.action) {
    case 'GET_AUTH_STATE':
      sendResponse({ authState });
      break;
      
    case 'SET_AUTH_STATE':
      authState = message.data;
      chrome.storage.local.set({ authState });
      sendResponse({ success: true });
      break;
      
    case 'SYNC_TASKS':
      syncTasks()
        .then(result => sendResponse({ success: true, data: result }))
        .catch(error => sendResponse({ success: false, error: error.message }));
      return true; // Required for async response
      
    case 'GET_TASKS_FOR_URL':
      getTasksForUrl(message.url)
        .then(tasks => sendResponse({ success: true, data: tasks }))
        .catch(error => sendResponse({ success: false, error: error.message }));
      return true; // Required for async response
      
    case 'ADD_TASK':
      addTask(message.task)
        .then(result => sendResponse({ success: true, data: result }))
        .catch(error => sendResponse({ success: false, error: error.message }));
      return true; // Required for async response
      
    case 'UPDATE_TASK':
      updateTask(message.task)
        .then(result => sendResponse({ success: true, data: result }))
        .catch(error => sendResponse({ success: false, error: error.message }));
      return true; // Required for async response
      
    case 'DELETE_TASK':
      deleteTask(message.taskId)
        .then(result => sendResponse({ success: true, data: result }))
        .catch(error => sendResponse({ success: false, error: error.message }));
      return true; // Required for async response
      
    case 'INJECT_SIDEBAR':
      injectSidebar(sender.tab.id);
      sendResponse({ success: true });
      break;
      
    default:
      sendResponse({ success: false, error: 'Unknown action' });
  }
});

// Listen for tab updates to inject sidebar when a page is loaded
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.status === 'complete' && tab.url && tab.url.startsWith('http')) {
    // Check if there are tasks for this URL before injecting sidebar
    getTasksForUrl(tab.url)
      .then(tasks => {
        if (tasks && tasks.length > 0) {
          injectSidebar(tabId);
        }
      })
      .catch(error => console.error('Error checking tasks for URL:', error));
  }
});

/**
 * Injects the sidebar into the specified tab
 * @param {number} tabId - The ID of the tab to inject the sidebar into
 */
function injectSidebar(tabId) {
  chrome.scripting.executeScript({
    target: { tabId },
    files: ['sidebar/sidebar.js']
  }).catch(error => console.error('Error injecting sidebar script:', error));
  
  chrome.scripting.insertCSS({
    target: { tabId },
    files: ['sidebar/sidebar.css']
  }).catch(error => console.error('Error injecting sidebar CSS:', error));
}

/**
 * Retrieves tasks for a specific URL from storage
 * @param {string} url - The URL to get tasks for
 * @returns {Promise<Array>} - A promise that resolves to an array of tasks
 */
async function getTasksForUrl(url) {
  return new Promise((resolve, reject) => {
    try {
      // Normalize URL to handle variations (e.g., trailing slashes)
      const normalizedUrl = new URL(url).origin + new URL(url).pathname;
      
      chrome.storage.local.get(['tasks'], (result) => {
        const allTasks = result.tasks || {};
        const tasksForUrl = allTasks[normalizedUrl] || [];
        resolve(tasksForUrl);
      });
    } catch (error) {
      reject(error);
    }
  });
}

/**
 * Adds a new task to storage
 * @param {Object} task - The task to add
 * @returns {Promise<Object>} - A promise that resolves to the added task
 */
async function addTask(task) {
  return new Promise((resolve, reject) => {
    try {
      // Ensure task has required fields
      if (!task.url || !task.title) {
        reject(new Error('Task must have a URL and title'));
        return;
      }
      
      // Normalize URL
      const normalizedUrl = new URL(task.url).origin + new URL(task.url).pathname;
      task.url = normalizedUrl;
      
      // Add metadata
      task.id = Date.now().toString();
      task.createdAt = new Date().toISOString();
      task.updatedAt = new Date().toISOString();
      
      chrome.storage.local.get(['tasks'], (result) => {
        const allTasks = result.tasks || {};
        const tasksForUrl = allTasks[normalizedUrl] || [];
        
        // Add new task
        tasksForUrl.push(task);
        allTasks[normalizedUrl] = tasksForUrl;
        
        // Save to storage
        chrome.storage.local.set({ tasks: allTasks }, () => {
          // If authenticated, sync with backend
          if (authState.isAuthenticated) {
            syncTaskWithBackend('add', task)
              .then(() => resolve(task))
              .catch(error => {
                console.error('Error syncing task with backend:', error);
                resolve(task); // Still resolve with local task
              });
          } else {
            resolve(task);
          }
        });
      });
    } catch (error) {
      reject(error);
    }
  });
}

/**
 * Updates an existing task in storage
 * @param {Object} updatedTask - The updated task
 * @returns {Promise<Object>} - A promise that resolves to the updated task
 */
async function updateTask(updatedTask) {
  return new Promise((resolve, reject) => {
    try {
      if (!updatedTask.id || !updatedTask.url) {
        reject(new Error('Task must have an ID and URL'));
        return;
      }
      
      // Normalize URL
      const normalizedUrl = new URL(updatedTask.url).origin + new URL(updatedTask.url).pathname;
      updatedTask.url = normalizedUrl;
      
      // Update metadata
      updatedTask.updatedAt = new Date().toISOString();
      
      chrome.storage.local.get(['tasks'], (result) => {
        const allTasks = result.tasks || {};
        const tasksForUrl = allTasks[normalizedUrl] || [];
        
        // Find and update task
        const taskIndex = tasksForUrl.findIndex(task => task.id === updatedTask.id);
        
        if (taskIndex === -1) {
          reject(new Error('Task not found'));
          return;
        }
        
        tasksForUrl[taskIndex] = { ...tasksForUrl[taskIndex], ...updatedTask };
        allTasks[normalizedUrl] = tasksForUrl;
        
        // Save to storage
        chrome.storage.local.set({ tasks: allTasks }, () => {
          // If authenticated, sync with backend
          if (authState.isAuthenticated) {
            syncTaskWithBackend('update', tasksForUrl[taskIndex])
              .then(() => resolve(tasksForUrl[taskIndex]))
              .catch(error => {
                console.error('Error syncing task with backend:', error);
                resolve(tasksForUrl[taskIndex]); // Still resolve with local task
              });
          } else {
            resolve(tasksForUrl[taskIndex]);
          }
        });
      });
    } catch (error) {
      reject(error);
    }
  });
}

/**
 * Deletes a task from storage
 * @param {string} taskId - The ID of the task to delete
 * @returns {Promise<boolean>} - A promise that resolves to true if successful
 */
async function deleteTask(taskId) {
  return new Promise((resolve, reject) => {
    try {
      chrome.storage.local.get(['tasks'], (result) => {
        const allTasks = result.tasks || {};
        let deletedTask = null;
        let taskUrl = null;
        
        // Find the task in all URLs
        for (const url in allTasks) {
          const tasksForUrl = allTasks[url];
          const taskIndex = tasksForUrl.findIndex(task => task.id === taskId);
          
          if (taskIndex !== -1) {
            deletedTask = tasksForUrl[taskIndex];
            taskUrl = url;
            
            // Remove task
            tasksForUrl.splice(taskIndex, 1);
            allTasks[url] = tasksForUrl;
            break;
          }
        }
        
        if (!deletedTask) {
          reject(new Error('Task not found'));
          return;
        }
        
        // Save to storage
        chrome.storage.local.set({ tasks: allTasks }, () => {
          // If authenticated, sync with backend
          if (authState.isAuthenticated) {
            syncTaskWithBackend('delete', deletedTask)
              .then(() => resolve(true))
              .catch(error => {
                console.error('Error syncing task deletion with backend:', error);
                resolve(true); // Still resolve as successful
              });
          } else {
            resolve(true);
          }
        });
      });
    } catch (error) {
      reject(error);
    }
  });
}

/**
 * Syncs tasks with the backend
 * @returns {Promise<Object>} - A promise that resolves to the sync result
 */
async function syncTasks() {
  return new Promise((resolve, reject) => {
    if (!authState.isAuthenticated || !authState.token) {
      reject(new Error('Not authenticated'));
      return;
    }
    
    // Get all tasks from local storage
    chrome.storage.local.get(['tasks'], (result) => {
      const localTasks = result.tasks || {};
      
      // Call backend API to sync tasks
      fetch('https://your-backend-url.com/api/tasks/sync', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authState.token}`
        },
        body: JSON.stringify({ tasks: localTasks })
      })
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to sync tasks with backend');
        }
        return response.json();
      })
      .then(data => {
        // Update local storage with synced tasks
        chrome.storage.local.set({ tasks: data.tasks }, () => {
          resolve(data);
        });
      })
      .catch(error => {
        reject(error);
      });
    });
  });
}

/**
 * Syncs a single task operation with the backend
 * @param {string} operation - The operation type ('add', 'update', or 'delete')
 * @param {Object} task - The task to sync
 * @returns {Promise<Object>} - A promise that resolves to the sync result
 */
async function syncTaskWithBackend(operation, task) {
  return new Promise((resolve, reject) => {
    if (!authState.isAuthenticated || !authState.token) {
      reject(new Error('Not authenticated'));
      return;
    }
    
    let endpoint = 'https://your-backend-url.com/api/tasks';
    let method = 'POST';
    
    if (operation === 'update') {
      endpoint = `${endpoint}/${task.id}`;
      method = 'PUT';
    } else if (operation === 'delete') {
      endpoint = `${endpoint}/${task.id}`;
      method = 'DELETE';
    }
    
    fetch(endpoint, {
      method,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${authState.token}`
      },
      body: operation === 'delete' ? undefined : JSON.stringify({ task })
    })
    .then(response => {
      if (!response.ok) {
        throw new Error(`Failed to ${operation} task with backend`);
      }
      return response.json();
    })
    .then(data => {
      resolve(data);
    })
    .catch(error => {
      reject(error);
    });
  });
}
