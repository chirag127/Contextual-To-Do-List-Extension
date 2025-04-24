/**
 * Sidebar script for the Contextual To-Do List extension
 * Handles the sidebar UI and interactions
 */

// Check if the script is being injected as a content script or loaded in the sidebar iframe
const isContentScript = (typeof chrome !== 'undefined' && chrome.runtime && chrome.runtime.onMessage);

if (isContentScript) {
  // Content script execution
  injectSidebar();
} else {
  // Sidebar iframe execution
  document.addEventListener('DOMContentLoaded', initializeSidebar);
}

/**
 * Injects the sidebar into the page
 */
function injectSidebar() {
  // Check if sidebar already exists
  if (document.getElementById('contextual-todo-sidebar-container')) {
    return;
  }
  
  // Create toggle button
  const toggleButton = document.createElement('button');
  toggleButton.id = 'sidebar-toggle-btn';
  toggleButton.innerHTML = `
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M9 5H7C5.89543 5 5 5.89543 5 7V19C5 20.1046 5.89543 21 7 21H17C18.1046 21 19 20.1046 19 19V7C19 5.89543 18.1046 5 17 5H15M9 5C9 6.10457 9.89543 7 11 7H13C14.1046 7 15 6.10457 15 5M9 5C9 3.89543 9.89543 3 11 3H13C14.1046 3 15 3.89543 15 5M12 12H15M12 16H15M9 12H9.01M9 16H9.01" stroke="white" stroke-width="2" stroke-linecap="round"/>
    </svg>
  `;
  
  // Add click event to toggle button
  toggleButton.addEventListener('click', () => {
    const sidebarContainer = document.getElementById('contextual-todo-sidebar-container');
    
    if (sidebarContainer) {
      // Toggle sidebar visibility
      if (sidebarContainer.style.display === 'none') {
        sidebarContainer.style.display = 'block';
      } else {
        sidebarContainer.style.display = 'none';
      }
    } else {
      // Create sidebar if it doesn't exist
      createSidebar();
    }
  });
  
  // Add toggle button to page
  document.body.appendChild(toggleButton);
  
  // Check if there are tasks for this URL
  chrome.runtime.sendMessage({ 
    action: 'GET_TASKS_FOR_URL', 
    url: window.location.href 
  }, (response) => {
    if (response && response.success && response.data && response.data.length > 0) {
      // Create sidebar if there are tasks
      createSidebar();
    }
  });
}

/**
 * Creates the sidebar iframe
 */
function createSidebar() {
  // Create container
  const sidebarContainer = document.createElement('div');
  sidebarContainer.id = 'contextual-todo-sidebar-container';
  sidebarContainer.style.cssText = `
    position: fixed;
    top: 0;
    right: 0;
    width: 320px;
    height: 100vh;
    z-index: 9999;
    border: none;
  `;
  
  // Create iframe
  const iframe = document.createElement('iframe');
  iframe.id = 'contextual-todo-sidebar-iframe';
  iframe.src = chrome.runtime.getURL('sidebar/sidebar.html');
  iframe.style.cssText = `
    width: 100%;
    height: 100%;
    border: none;
    background-color: white;
  `;
  
  // Add iframe to container
  sidebarContainer.appendChild(iframe);
  
  // Add container to page
  document.body.appendChild(sidebarContainer);
  
  // Listen for messages from the iframe
  window.addEventListener('message', (event) => {
    // Check if the message is from our iframe
    if (event.source === iframe.contentWindow) {
      if (event.data.action === 'CLOSE_SIDEBAR') {
        sidebarContainer.style.display = 'none';
      }
    }
  });
}

/**
 * Initializes the sidebar
 */
function initializeSidebar() {
  // DOM elements
  const newTaskInput = document.getElementById('new-task-input');
  const addTaskBtn = document.getElementById('add-task-btn');
  const tasksListEl = document.getElementById('tasks-list');
  const emptyStateEl = document.getElementById('empty-state');
  const closeSidebarBtn = document.getElementById('close-sidebar-btn');
  const openPopupBtn = document.getElementById('open-popup-btn');
  const editTaskModal = document.getElementById('edit-task-modal');
  const closeModalBtn = document.querySelector('.close-modal');
  const editTaskForm = document.getElementById('edit-task-form');
  const editTaskId = document.getElementById('edit-task-id');
  const editTaskTitle = document.getElementById('edit-task-title');
  const editTaskDescription = document.getElementById('edit-task-description');
  const editTaskDueDate = document.getElementById('edit-task-due-date');
  const editTaskPriority = document.getElementById('edit-task-priority');
  const deleteTaskBtn = document.getElementById('delete-task-btn');
  
  // Current URL
  const currentUrl = window.parent.location.href;
  
  // Load tasks
  loadTasks();
  
  // Set up event listeners
  setupEventListeners();
  
  /**
   * Loads tasks for the current URL
   */
  async function loadTasks() {
    try {
      // Get tasks for current URL
      const tasks = await window.StorageUtils.getTasksForUrl(currentUrl);
      
      // Clear tasks list
      tasksListEl.innerHTML = '';
      
      // Show or hide empty state
      if (tasks.length === 0) {
        tasksListEl.appendChild(emptyStateEl);
      } else {
        // Add tasks to list
        tasks.forEach(task => {
          const taskElement = createTaskElement(task);
          tasksListEl.appendChild(taskElement);
        });
      }
    } catch (error) {
      console.error('Error loading tasks:', error);
    }
  }
  
  /**
   * Creates a task element
   * @param {Object} task - The task object
   * @returns {HTMLElement} - The task element
   */
  function createTaskElement(task) {
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
    // Add task button
    addTaskBtn.addEventListener('click', addNewTask);
    
    // Add task on Enter key
    newTaskInput.addEventListener('keydown', (event) => {
      if (event.key === 'Enter') {
        addNewTask();
      }
    });
    
    // Close sidebar button
    closeSidebarBtn.addEventListener('click', () => {
      // Send message to parent window to close sidebar
      window.parent.postMessage({ action: 'CLOSE_SIDEBAR' }, '*');
    });
    
    // Open popup button
    openPopupBtn.addEventListener('click', () => {
      chrome.runtime.sendMessage({ action: 'OPEN_POPUP' });
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
      const tasks = await window.StorageUtils.getTasksForUrl(currentUrl);
      
      // Find task
      const task = tasks.find(t => t.id === taskId);
      
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
      
      // Get tasks for current URL
      const tasks = await window.StorageUtils.getTasksForUrl(currentUrl);
      
      // Find task
      const task = tasks.find(t => t.id === taskId);
      
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
}
