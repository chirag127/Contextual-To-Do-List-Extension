/**
 * Authentication utility for the Contextual To-Do List extension
 * Handles user authentication using Clerk
 */

// Clerk public key (replace with your actual key)
const CLERK_PUBLISHABLE_KEY = 'pk_test_your_clerk_key';

// Backend API URL
const API_URL = 'https://your-backend-url.com';

/**
 * Initializes Clerk authentication
 * @returns {Promise<void>}
 */
async function initAuth() {
  // Load Clerk script dynamically
  return new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/npm/@clerk/chrome-extension@latest/dist/clerk.browser.js';
    script.onload = () => {
      window.Clerk.load({
        publishableKey: CLERK_PUBLISHABLE_KEY
      }).then(() => {
        console.log('Clerk initialized');
        resolve();
      }).catch(error => {
        console.error('Error initializing Clerk:', error);
        reject(error);
      });
    };
    script.onerror = (error) => {
      console.error('Error loading Clerk script:', error);
      reject(error);
    };
    document.head.appendChild(script);
  });
}

/**
 * Signs in the user
 * @returns {Promise<Object>} - A promise that resolves to the user object
 */
async function signIn() {
  try {
    if (!window.Clerk) {
      await initAuth();
    }
    
    // Open Clerk sign-in modal
    const signInResponse = await window.Clerk.openSignIn({
      redirectUrl: chrome.runtime.getURL('popup/popup.html'),
      appearance: {
        elements: {
          rootBox: {
            boxShadow: 'none',
            width: '100%',
            margin: '0'
          }
        }
      }
    });
    
    if (!signInResponse || !window.Clerk.user) {
      throw new Error('Sign in failed');
    }
    
    // Get session token
    const token = await window.Clerk.session.getToken();
    
    // Create auth state object
    const authState = {
      isAuthenticated: true,
      user: {
        id: window.Clerk.user.id,
        email: window.Clerk.user.primaryEmailAddress?.emailAddress,
        firstName: window.Clerk.user.firstName,
        lastName: window.Clerk.user.lastName,
        imageUrl: window.Clerk.user.imageUrl
      },
      token
    };
    
    // Update auth state in background script
    await updateAuthState(authState);
    
    return authState;
  } catch (error) {
    console.error('Error signing in:', error);
    throw error;
  }
}

/**
 * Signs out the user
 * @returns {Promise<boolean>} - A promise that resolves to true if successful
 */
async function signOut() {
  try {
    if (!window.Clerk) {
      await initAuth();
    }
    
    await window.Clerk.signOut();
    
    // Update auth state in background script
    await updateAuthState({
      isAuthenticated: false,
      user: null,
      token: null
    });
    
    return true;
  } catch (error) {
    console.error('Error signing out:', error);
    throw error;
  }
}

/**
 * Gets the current authentication state
 * @returns {Promise<Object>} - A promise that resolves to the auth state
 */
async function getAuthState() {
  return new Promise((resolve) => {
    chrome.runtime.sendMessage({ action: 'GET_AUTH_STATE' }, (response) => {
      resolve(response.authState);
    });
  });
}

/**
 * Updates the authentication state in the background script
 * @param {Object} authState - The new auth state
 * @returns {Promise<boolean>} - A promise that resolves to true if successful
 */
async function updateAuthState(authState) {
  return new Promise((resolve) => {
    chrome.runtime.sendMessage({ 
      action: 'SET_AUTH_STATE', 
      data: authState 
    }, (response) => {
      resolve(response.success);
    });
  });
}

/**
 * Checks if the user is authenticated
 * @returns {Promise<boolean>} - A promise that resolves to true if authenticated
 */
async function isAuthenticated() {
  const authState = await getAuthState();
  return authState && authState.isAuthenticated;
}

/**
 * Gets the current user
 * @returns {Promise<Object|null>} - A promise that resolves to the user object or null
 */
async function getCurrentUser() {
  const authState = await getAuthState();
  return authState && authState.isAuthenticated ? authState.user : null;
}

/**
 * Gets the authentication token
 * @returns {Promise<string|null>} - A promise that resolves to the token or null
 */
async function getToken() {
  const authState = await getAuthState();
  return authState && authState.isAuthenticated ? authState.token : null;
}

// Export functions
window.AuthUtils = {
  initAuth,
  signIn,
  signOut,
  getAuthState,
  isAuthenticated,
  getCurrentUser,
  getToken
};
