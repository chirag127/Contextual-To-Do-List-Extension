/**
 * Popup script for the Contextual To-Do List extension
 * Handles the popup UI and interactions
 */

// DOM elements
const userProfileEl = document.getElementById('user-profile');
const userAvatarEl = document.getElementById('user-avatar');
const userNameEl = document.getElementById('user-name');
const authButtonsEl = document.getElementById('auth-buttons');
const signInBtn = document.getElementById('sign-in-btn');
const signOutBtn = document.getElementById('sign-out-btn');
const tabButtons = document.querySelectorAll('.tab-btn');
const tabContents = document.querySelectorAll('.tab-content');
const currentPageTitleEl = document.getElementById('current-page-title');
const currentPageUrlEl = document.getElementById('current-page-url');
const newTaskInput = document.getElementById('new-task-input');
const addTaskBtn = document.getElementById('add-task-btn');
const currentPageTasksEl = document.getElementById('current-page-tasks');
const currentEmptyStateEl = document.getElementById('current-empty-state');
const allTasksEl = document.getElementById('all-tasks');
const allEmptyStateEl = document.getElementById('all-empty-state');
const dueTodayTasksEl = document.getElementById('due-today-tasks');
const todayEmptyStateEl = document.getElementById('today-empty-state');
const overdueTasksEl = document.getElementById('overdue-tasks');
const overdueEmptyStateEl = document.getElementById('overdue-empty-state');
const openOptionsBtn = document.getElementById('open-options-btn');
const syncBtn = document.getElementById('sync-btn');
const editTaskModal = document.getElementById('edit-task-modal');
const closeModalBtn = document.querySelector('.close-modal');
const editTaskForm = document.getElementById('edit-task-form');
const editTaskId = document.getElementById('edit-task-id');
const editTaskTitle = document.getElementById('edit-task-title');
const editTaskDescription = document.getElementById('edit-task-description');
const editTaskDueDate = document.getElementById('edit-task-due-date');
const editTaskPriority = document.getElementById('edit-task-priority');
const deleteTaskBtn = document.getElementById('delete-task-btn');

// Current page info
let currentUrl = '';
let currentTitle = '';

// Initialize popup
document.addEventListener('DOMContentLoaded', async () => {
  try {
    // Get current tab info
    const tabs = await chrome.tabs.query({ active: true, currentWindow: true });
    const activeTab = tabs[0];
    
    currentUrl = activeTab.url;
    currentTitle = activeTab.title;
    
    // Set current page info
    currentPageTitleEl.textContent = currentTitle;
    currentPageUrlEl.textContent = currentUrl;
    
    // Initialize authentication
    await initializeAuth();
    
    // Load tasks
    await loadTasks();
    
    // Set up event listeners
    setupEventListeners();
  } catch (error) {
    console.error('Error initializing popup:', error);
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
      userAvatarEl.src = user.imageUrl || 'https://via.placeholder.com/32';
      userNameEl.textContent = user.firstName ? `${user.firstName} ${user.lastName || ''}` : user.email;
      
      // Show user profile, hide auth buttons
      userProfileEl.classList.remove('hidden');
      authButtonsEl.classList.add('hidden');
      
      // Enable sync button
      syncBtn.disabled = false;
    } else {
      // Show auth buttons, hide user profile
      userProfileEl.classList.add('hidden');
      authButtonsEl.classList.remove('hidden');
      
      // Disable sync button
      syncBtn.disabled = true;
    }
  } catch (error) {
    console.error('Error initializing authentication:', error);
    
    // Show auth buttons, hide user profile
    userProfileEl.classList.add('hidden');
    authButtonsEl.classList.remove('hidden');
    
    // Disable sync button
    syncBtn.disabled = true;
  }
}

/**
 * Loads tasks for all tabs
 */
async function loadTasks() {
  try {
    // Load current page tasks
    await loadCurrentPageTasks();
    
    // Load all tasks
    await loadAllTasks();
    
    // Load upcoming tasks
    await loadUpcomingTasks();
  } catch (error) {
    console.error('Error loading tasks:', error);
  }
}

/**
 * Loads tasks for the current page
 */
async function loadCurrentPageTasks() {
  try {
    // Get tasks for current URL
    const tasks = await window.StorageUtils.getTasksForUrl(currentUrl);
    
    // Clear current tasks
    currentPageTasksEl.innerHTML = '';
    
    // Show or hide empty state
    if (tasks.length === 0) {
      currentPageTasksEl.appendChild(currentEmptyStateEl);
    } else {
      // Add tasks to list
      tasks.forEach(task => {
        const taskElement = createTaskElement(task);
        currentPageTasksEl.appendChild(taskElement);
      });
    }
  } catch (error) {
    console.error('Error loading current page tasks:', error);
  }
}

/**
 * Loads all tasks
 */
async function loadAllTasks() {
  try {
    // Get all tasks
    const tasks = await window.StorageUtils.getAllTasksFlat();
    
    // Clear all tasks
    allTasksEl.innerHTML = '';
    
    // Show or hide empty state
    if (tasks.length === 0) {
      allTasksEl.appendChild(allEmptyStateEl);
    } else {
      // Sort tasks by creation date (newest first)
      tasks.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      
      // Add tasks to list
      tasks.forEach(task => {
        const taskElement = createTaskElement(task, true);
        allTasksEl.appendChild(taskElement);
      });
    }
  } catch (error) {
    console.error('Error loading all tasks:', error);
  }
}

/**
 * Loads upcoming tasks
 */
async function loadUpcomingTasks() {
  try {
    // Get due today tasks
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    
    const allTasks = await window.StorageUtils.getAllTasksFlat();
    
    // Filter tasks due today
    const dueTodayTasks = allTasks.filter(task => {
      if (!task.dueDate) return false;
      
      const dueDate = new Date(task.dueDate);
      return dueDate >= today && dueDate < tomorrow;
    });
    
    // Filter overdue tasks
    const overdueTasks = allTasks.filter(task => {
      if (!task.dueDate) return false;
      
      const dueDate = new Date(task.dueDate);
      return dueDate < today;
    });
    
    // Clear due today tasks
    dueTodayTasksEl.innerHTML = '';
    
    // Show or hide empty state
    if (dueTodayTasks.length === 0) {
      dueTodayTasksEl.appendChild(todayEmptyStateEl);
    } else {
      // Sort tasks by due date (earliest first)
      dueTodayTasks.sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate));
      
      // Add tasks to list
      dueTodayTasks.forEach(task => {
        const taskElement = createTaskElement(task, true);
        dueTodayTasksEl.appendChild(taskElement);
      });
    }
    
    // Clear overdue tasks
    overdueTasksEl.innerHTML = '';
    
    // Show or hide empty state
    if (overdueTasks.length === 0) {
      overdueTasksEl.appendChild(overdueEmptyStateEl);
    } else {
      // Sort tasks by due date (earliest first)
      overdueTasks.sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate));
      
      // Add tasks to list
      overdueTasks.forEach(task => {
        const taskElement = createTaskElement(task, true);
        overdueTasksEl.appendChild(taskElement);
      });
    }
  } catch (error) {
    console.error('Error loading upcoming tasks:', error);
  }
}

/**
 * Creates a task element
 * @param {Object} task - The task object
 * @param {boolean} showUrl - Whether to show the URL
 * @returns {HTMLElement} - The task element
 */
function createTaskElement(task, showUrl = false) {
  const taskItem = document.createElement('div');
  taskItem.className = 'task-item';
  taskItem.dataset.id = task.id;
  
  const checkbox = document.createElement('input');
  checkbox.type = 'checkbox';
  checkbox.className = 'task-checkbox';
  checkbox.checked = task.completed || false;
  checkbox.addEventListener('change', () => handleTaskCompletion(task.id, checkbox.checked));
  
  const taskContent = document.createElement('div');
  taskContent.className = 'task-content';
  
  const taskTitle = document.createElement('div');
  taskTitle.className = 'task-title';
  taskTitle.textContent = task.title;
  
  const taskDetails = document.createElement('div');
  taskDetails.className = 'task-details';
  
  // Add URL if needed
  if (showUrl) {
    const taskUrl = document.createElement('span');
    taskUrl.className = 'task-url';
    
    // Try to get domain from URL
    try {
      const url = new URL(task.url);
      taskUrl.textContent = url.hostname;
    } catch (error) {
      taskUrl.textContent = task.url;
    }
    
    taskUrl.addEventListener('click', () => {
      chrome.tabs.create({ url: task.url });
    });
    
    taskDetails.appendChild(taskUrl);
    taskDetails.appendChild(document.createTextNode(' • '));
  }
  
  // Add due date if available
  if (task.dueDate) {
    const taskDueDate = document.createElement('span');
    taskDueDate.className = 'task-due-date';
    
    // Format due date
    const dueDate = new Date(task.dueDate);
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    
    if (dueDate < today) {
      taskDueDate.textContent = 'Overdue';
      taskDueDate.style.color = '#ea4335';
    } else if (dueDate < tomorrow) {
      taskDueDate.textContent = 'Today';
    } else {
      taskDueDate.textContent = dueDate.toLocaleDateString();
    }
    
    taskDetails.appendChild(taskDueDate);
  }
  
  // Add priority if available
  if (task.priority) {
    if (task.dueDate) {
      taskDetails.appendChild(document.createTextNode(' • '));
    }
    
    const taskPriority = document.createElement('span');
    taskPriority.className = `task-priority priority-${task.priority}`;
    taskPriority.textContent = task.priority;
    
    taskDetails.appendChild(taskPriority);
  }
  
  taskContent.appendChild(taskTitle);
  taskContent.appendChild(taskDetails);
  
  const taskActions = document.createElement('div');
  taskActions.className = 'task-actions';
  
  const editButton = document.createElement('button');
  editButton.className = 'task-edit-btn';
  editButton.innerHTML = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M16.4745 5.40801L18.5917 7.52524M17.8358 3.54289L11.6716 9.70711C11.2725 10.1062 11.0251 10.6584 11.0002 11.2402L10.8345 14.1345L13.7288 13.9689C14.3106 13.944 14.8628 13.6965 15.2619 13.2974L21.4261 7.13322C21.8166 6.74269 22.0001 6.21282 22.0001 5.66045C22.0001 5.10808 21.8166 4.57821 21.4261 4.18769L19.7813 2.54289C19.3908 2.15236 18.8609 1.96887 18.3085 1.96887C17.7562 1.96887 17.2263 2.15236 16.8358 2.54289L17.8358 3.54289Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M19 15V18C19 19.1046 18.1046 20 17 20H6C4.89543 20 4 19.1046 4 18V7C4 5.89543 4.89543 5 6 5H9" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>';
  editButton.addEventListener('click', () => openEditTaskModal(task));
  
  taskActions.appendChild(editButton);
  
  taskItem.appendChild(checkbox);
  taskItem.appendChild(taskContent);
  taskItem.appendChild(taskActions);
  
  return taskItem;
}

/**
 * Sets up event listeners
 */
function setupEventListeners() {
  // Tab switching
  tabButtons.forEach(button => {
    button.addEventListener('click', () => {
      // Remove active class from all buttons and contents
      tabButtons.forEach(btn => btn.classList.remove('active'));
      tabContents.forEach(content => content.classList.remove('active'));
      
      // Add active class to clicked button and corresponding content
      button.classList.add('active');
      const tabId = button.id.replace('tab-', '');
      document.getElementById(`tab-content-${tabId}`).classList.add('active');
    });
  });
  
  // Sign in button
  signInBtn.addEventListener('click', async () => {
    try {
      await window.AuthUtils.signIn();
      await initializeAuth();
      await loadTasks();
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
  
  // Add task button
  addTaskBtn.addEventListener('click', addNewTask);
  
  // Add task on Enter key
  newTaskInput.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
      addNewTask();
    }
  });
  
  // Open options page
  openOptionsBtn.addEventListener('click', () => {
    chrome.runtime.openOptionsPage();
  });
  
  // Sync button
  syncBtn.addEventListener('click', async () => {
    try {
      await window.StorageUtils.syncTasks();
      await loadTasks();
    } catch (error) {
      console.error('Error syncing tasks:', error);
    }
  });
  
  // Close modal
  closeModalBtn.addEventListener('click', () => {
    editTaskModal.style.display = 'none';
  });
  
  // Close modal when clicking outside
  window.addEventListener('click', (event) => {
    if (event.target === editTaskModal) {
      editTaskModal.style.display = 'none';
    }
  });
  
  // Edit task form submission
  editTaskForm.addEventListener('submit', handleEditTaskSubmit);
  
  // Delete task button
  deleteTaskBtn.addEventListener('click', handleDeleteTask);
}

/**
 * Adds a new task
 */
async function addNewTask() {
  try {
    const taskTitle = newTaskInput.value.trim();
    
    if (!taskTitle) {
      return;
    }
    
    // Create new task
    const newTask = {
      title: taskTitle,
      url: currentUrl,
      completed: false,
      priority: 'medium'
    };
    
    // Add task
    await window.StorageUtils.addTask(newTask);
    
    // Clear input
    newTaskInput.value = '';
    
    // Reload tasks
    await loadTasks();
  } catch (error) {
    console.error('Error adding task:', error);
  }
}

/**
 * Handles task completion toggle
 * @param {string} taskId - The ID of the task
 * @param {boolean} completed - Whether the task is completed
 */
async function handleTaskCompletion(taskId, completed) {
  try {
    // Get all tasks
    const allTasks = await window.StorageUtils.getAllTasksFlat();
    
    // Find task
    const task = allTasks.find(t => t.id === taskId);
    
    if (!task) {
      return;
    }
    
    // Update task
    task.completed = completed;
    
    // Save task
    await window.StorageUtils.updateTask(task);
    
    // Reload tasks
    await loadTasks();
  } catch (error) {
    console.error('Error updating task completion:', error);
  }
}

/**
 * Opens the edit task modal
 * @param {Object} task - The task to edit
 */
function openEditTaskModal(task) {
  // Set form values
  editTaskId.value = task.id;
  editTaskTitle.value = task.title;
  editTaskDescription.value = task.description || '';
  
  // Format due date for input
  if (task.dueDate) {
    const dueDate = new Date(task.dueDate);
    const year = dueDate.getFullYear();
    const month = String(dueDate.getMonth() + 1).padStart(2, '0');
    const day = String(dueDate.getDate()).padStart(2, '0');
    const hours = String(dueDate.getHours()).padStart(2, '0');
    const minutes = String(dueDate.getMinutes()).padStart(2, '0');
    
    editTaskDueDate.value = `${year}-${month}-${day}T${hours}:${minutes}`;
  } else {
    editTaskDueDate.value = '';
  }
  
  editTaskPriority.value = task.priority || 'medium';
  
  // Show modal
  editTaskModal.style.display = 'block';
}

/**
 * Handles edit task form submission
 * @param {Event} event - The form submission event
 */
async function handleEditTaskSubmit(event) {
  event.preventDefault();
  
  try {
    // Get form values
    const taskId = editTaskId.value;
    const title = editTaskTitle.value.trim();
    const description = editTaskDescription.value.trim();
    const dueDate = editTaskDueDate.value ? new Date(editTaskDueDate.value).toISOString() : null;
    const priority = editTaskPriority.value;
    
    if (!title) {
      return;
    }
    
    // Get all tasks
    const allTasks = await window.StorageUtils.getAllTasksFlat();
    
    // Find task
    const task = allTasks.find(t => t.id === taskId);
    
    if (!task) {
      return;
    }
    
    // Update task
    task.title = title;
    task.description = description;
    task.dueDate = dueDate;
    task.priority = priority;
    
    // Save task
    await window.StorageUtils.updateTask(task);
    
    // Close modal
    editTaskModal.style.display = 'none';
    
    // Reload tasks
    await loadTasks();
  } catch (error) {
    console.error('Error updating task:', error);
  }
}

/**
 * Handles task deletion
 */
async function handleDeleteTask() {
  try {
    const taskId = editTaskId.value;
    
    // Delete task
    await window.StorageUtils.deleteTask(taskId);
    
    // Close modal
    editTaskModal.style.display = 'none';
    
    // Reload tasks
    await loadTasks();
  } catch (error) {
    console.error('Error deleting task:', error);
  }
}
