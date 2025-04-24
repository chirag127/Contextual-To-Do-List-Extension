/**
 * Options script for the Contextual To-Do List extension
 * Handles the options page UI and interactions
 */

// DOM elements
const userProfileEl = document.getElementById('user-profile');
const userAvatarEl = document.getElementById('user-avatar');
const userNameEl = document.getElementById('user-name');
const authButtonsEl = document.getElementById('auth-buttons');
const signInBtn = document.getElementById('sign-in-btn');
const signOutBtn = document.getElementById('sign-out-btn');
const sidebarPositionEl = document.getElementById('sidebar-position');
const defaultPriorityEl = document.getElementById('default-priority');
const autoShowSidebarEl = document.getElementById('auto-show-sidebar');
const showNotificationsEl = document.getElementById('show-notifications');
const exportDataBtn = document.getElementById('export-data-btn');
const importDataBtn = document.getElementById('import-data-btn');
const importDataFileEl = document.getElementById('import-data');
const clearDataBtn = document.getElementById('clear-data-btn');
const autoSyncEl = document.getElementById('auto-sync');
const syncNowBtn = document.getElementById('sync-now-btn');
const lastSyncTimeEl = document.getElementById('last-sync-time');
const saveOptionsBtn = document.getElementById('save-options-btn');
const confirmationModal = document.getElementById('confirmation-modal');
const modalTitleEl = document.getElementById('modal-title');
const modalMessageEl = document.getElementById('modal-message');
const modalCancelBtn = document.getElementById('modal-cancel-btn');
const modalConfirmBtn = document.getElementById('modal-confirm-btn');
const closeModalBtn = document.querySelector('.close-modal');

// Default options
const defaultOptions = {
  sidebarPosition: 'right',
  defaultPriority: 'medium',
  autoShowSidebar: true,
  showNotifications: true,
  autoSync: false,
  lastSyncTime: null
};

// Current options
let currentOptions = { ...defaultOptions };

// Initialize options page
document.addEventListener('DOMContentLoaded', async () => {
  try {
    // Initialize authentication
    await initializeAuth();
    
    // Load options
    await loadOptions();
    
    // Set up event listeners
    setupEventListeners();
  } catch (error) {
    console.error('Error initializing options page:', error);
  }
});

/**
 * Initializes authentication
 */
async function initializeAuth() {
  try {
    // Initialize Clerk
    if (window.AuthUtils) {
      await window.AuthUtils.initAuth();
    }
    
    // Check if user is authenticated
    const isAuthenticated = await window.AuthUtils.isAuthenticated();
    
    if (isAuthenticated) {
      // Get user info
      const user = await window.AuthUtils.getCurrentUser();
      
      // Update UI
      userAvatarEl.src = user.imageUrl || 'https://via.placeholder.com/40';
      userNameEl.textContent = user.firstName ? `${user.firstName} ${user.lastName || ''}` : user.email;
      
      // Show user profile, hide auth buttons
      userProfileEl.classList.remove('hidden');
      authButtonsEl.classList.add('hidden');
      
      // Enable sync button
      syncNowBtn.disabled = false;
    } else {
      // Show auth buttons, hide user profile
      userProfileEl.classList.add('hidden');
      authButtonsEl.classList.remove('hidden');
      
      // Disable sync button
      syncNowBtn.disabled = true;
    }
  } catch (error) {
    console.error('Error initializing authentication:', error);
    
    // Show auth buttons, hide user profile
    userProfileEl.classList.add('hidden');
    authButtonsEl.classList.remove('hidden');
    
    // Disable sync button
    syncNowBtn.disabled = true;
  }
}

/**
 * Loads options from storage
 */
async function loadOptions() {
  return new Promise((resolve) => {
    chrome.storage.local.get(['options'], (result) => {
      if (result.options) {
        currentOptions = { ...defaultOptions, ...result.options };
      }
      
      // Set form values
      sidebarPositionEl.value = currentOptions.sidebarPosition;
      defaultPriorityEl.value = currentOptions.defaultPriority;
      autoShowSidebarEl.checked = currentOptions.autoShowSidebar;
      showNotificationsEl.checked = currentOptions.showNotifications;
      autoSyncEl.checked = currentOptions.autoSync;
      
      // Set last sync time
      if (currentOptions.lastSyncTime) {
        const lastSync = new Date(currentOptions.lastSyncTime);
        lastSyncTimeEl.textContent = `Last synced: ${lastSync.toLocaleString()}`;
      } else {
        lastSyncTimeEl.textContent = 'Last synced: Never';
      }
      
      resolve();
    });
  });
}

/**
 * Saves options to storage
 */
async function saveOptions() {
  // Get form values
  currentOptions.sidebarPosition = sidebarPositionEl.value;
  currentOptions.defaultPriority = defaultPriorityEl.value;
  currentOptions.autoShowSidebar = autoShowSidebarEl.checked;
  currentOptions.showNotifications = showNotificationsEl.checked;
  currentOptions.autoSync = autoSyncEl.checked;
  
  return new Promise((resolve) => {
    chrome.storage.local.set({ options: currentOptions }, () => {
      resolve();
    });
  });
}

/**
 * Sets up event listeners
 */
function setupEventListeners() {
  // Sign in button
  signInBtn.addEventListener('click', async () => {
    try {
      await window.AuthUtils.signIn();
      await initializeAuth();
    } catch (error) {
      console.error('Error signing in:', error);
    }
  });
  
  // Sign out button
  signOutBtn.addEventListener('click', async () => {
    try {
      await window.AuthUtils.signOut();
      await initializeAuth();
    } catch (error) {
      console.error('Error signing out:', error);
    }
  });
  
  // Save options button
  saveOptionsBtn.addEventListener('click', async () => {
    try {
      await saveOptions();
      showNotification('Options saved successfully');
    } catch (error) {
      console.error('Error saving options:', error);
      showNotification('Error saving options', true);
    }
  });
  
  // Export data button
  exportDataBtn.addEventListener('click', exportData);
  
  // Import data button
  importDataBtn.addEventListener('click', () => {
    if (importDataFileEl.files.length === 0) {
      showNotification('Please select a file to import', true);
      return;
    }
    
    showConfirmationModal(
      'Import Data',
      'This will replace all your current tasks with the imported data. Are you sure you want to proceed?',
      importData
    );
  });
  
  // Clear data button
  clearDataBtn.addEventListener('click', () => {
    showConfirmationModal(
      'Clear All Data',
      'This will delete all your tasks and cannot be undone. Are you sure you want to proceed?',
      clearData
    );
  });
  
  // Sync now button
  syncNowBtn.addEventListener('click', async () => {
    try {
      await window.StorageUtils.syncTasks();
      
      // Update last sync time
      currentOptions.lastSyncTime = new Date().toISOString();
      await saveOptions();
      
      // Update UI
      const lastSync = new Date(currentOptions.lastSyncTime);
      lastSyncTimeEl.textContent = `Last synced: ${lastSync.toLocaleString()}`;
      
      showNotification('Tasks synced successfully');
    } catch (error) {
      console.error('Error syncing tasks:', error);
      showNotification('Error syncing tasks', true);
    }
  });
  
  // Close modal
  closeModalBtn.addEventListener('click', () => {
    confirmationModal.style.display = 'none';
  });
  
  // Modal cancel button
  modalCancelBtn.addEventListener('click', () => {
    confirmationModal.style.display = 'none';
  });
  
  // Close modal when clicking outside
  window.addEventListener('click', (event) => {
    if (event.target === confirmationModal) {
      confirmationModal.style.display = 'none';
    }
  });
}

/**
 * Shows a confirmation modal
 * @param {string} title - The modal title
 * @param {string} message - The modal message
 * @param {Function} confirmCallback - The function to call when confirmed
 */
function showConfirmationModal(title, message, confirmCallback) {
  modalTitleEl.textContent = title;
  modalMessageEl.textContent = message;
  
  // Remove previous event listener
  const newConfirmBtn = modalConfirmBtn.cloneNode(true);
  modalConfirmBtn.parentNode.replaceChild(newConfirmBtn, modalConfirmBtn);
  
  // Add new event listener
  newConfirmBtn.addEventListener('click', () => {
    confirmCallback();
    confirmationModal.style.display = 'none';
  });
  
  // Show modal
  confirmationModal.style.display = 'block';
}

/**
 * Exports data as a JSON file
 */
async function exportData() {
  try {
    // Get all tasks
    const tasks = await window.StorageUtils.getAllTasks();
    
    // Create JSON blob
    const blob = new Blob([JSON.stringify(tasks, null, 2)], { type: 'application/json' });
    
    // Create download link
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `contextual-todo-list-export-${new Date().toISOString().split('T')[0]}.json`;
    
    // Trigger download
    document.body.appendChild(a);
    a.click();
    
    // Clean up
    setTimeout(() => {
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }, 0);
    
    showNotification('Data exported successfully');
  } catch (error) {
    console.error('Error exporting data:', error);
    showNotification('Error exporting data', true);
  }
}

/**
 * Imports data from a JSON file
 */
async function importData() {
  try {
    const file = importDataFileEl.files[0];
    
    if (!file) {
      showNotification('Please select a file to import', true);
      return;
    }
    
    // Read file
    const reader = new FileReader();
    
    reader.onload = async (event) => {
      try {
        const tasks = JSON.parse(event.target.result);
        
        // Validate tasks
        if (typeof tasks !== 'object') {
          throw new Error('Invalid data format');
        }
        
        // Save tasks
        await chrome.storage.local.set({ tasks });
        
        showNotification('Data imported successfully');
        
        // Reset file input
        importDataFileEl.value = '';
      } catch (error) {
        console.error('Error parsing import file:', error);
        showNotification('Error importing data: Invalid file format', true);
      }
    };
    
    reader.onerror = () => {
      console.error('Error reading import file');
      showNotification('Error reading import file', true);
    };
    
    reader.readAsText(file);
  } catch (error) {
    console.error('Error importing data:', error);
    showNotification('Error importing data', true);
  }
}

/**
 * Clears all data
 */
async function clearData() {
  try {
    // Clear tasks
    await chrome.storage.local.set({ tasks: {} });
    
    showNotification('All data cleared successfully');
  } catch (error) {
    console.error('Error clearing data:', error);
    showNotification('Error clearing data', true);
  }
}

/**
 * Shows a notification
 * @param {string} message - The notification message
 * @param {boolean} isError - Whether the notification is an error
 */
function showNotification(message, isError = false) {
  // Check if notification container exists
  let notificationContainer = document.querySelector('.notification-container');
  
  if (!notificationContainer) {
    // Create notification container
    notificationContainer = document.createElement('div');
    notificationContainer.className = 'notification-container';
    document.body.appendChild(notificationContainer);
    
    // Add styles
    const style = document.createElement('style');
    style.textContent = `
      .notification-container {
        position: fixed;
        top: 20px;
        right: 20px;
        z-index: 9999;
      }
      
      .notification {
        padding: 12px 16px;
        margin-bottom: 10px;
        border-radius: 4px;
        color: white;
        box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
        animation: slideIn 0.3s ease-in-out, fadeOut 0.5s ease-in-out 2.5s forwards;
        max-width: 300px;
      }
      
      .notification-success {
        background-color: #34a853;
      }
      
      .notification-error {
        background-color: #ea4335;
      }
      
      @keyframes slideIn {
        from {
          transform: translateX(100%);
          opacity: 0;
        }
        to {
          transform: translateX(0);
          opacity: 1;
        }
      }
      
      @keyframes fadeOut {
        from {
          opacity: 1;
        }
        to {
          opacity: 0;
        }
      }
    `;
    document.head.appendChild(style);
  }
  
  // Create notification
  const notification = document.createElement('div');
  notification.className = `notification ${isError ? 'notification-error' : 'notification-success'}`;
  notification.textContent = message;
  
  // Add notification to container
  notificationContainer.appendChild(notification);
  
  // Remove notification after animation
  setTimeout(() => {
    notification.remove();
  }, 3000);
}
