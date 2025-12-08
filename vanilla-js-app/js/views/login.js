import router from '../router/router.js';

const API_URL = import.meta.env?.VITE_API_URL || 'https://banksapi.io';
const STORAGE_KEY = 'bwd:login-credentials';

export default function Login() {
  const app = document.getElementById('app');

  const state = {
    username: '',
    password: '',
    clientSecret: '',
    showPassword: false,
    showSecret: false,
    isLoading: false,
    errorMessage: ''
  };

  loadSavedCredentials();

  function loadSavedCredentials() {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const credentials = JSON.parse(saved);
        state.username = credentials.username || '';
        state.password = credentials.password || '';
        state.clientSecret = credentials.clientSecret || '';
      }
    } catch (error) {
      console.error('Error loading saved credentials:', error);
      localStorage.removeItem(STORAGE_KEY);
    }
  }

  function saveCredentials() {
    const credentials = {
      username: state.username,
      password: state.password,
      clientSecret: state.clientSecret
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(credentials));
  }

  async function fetchToken(username, password, clientId) {
    try {
      const body = new URLSearchParams({
        grant_type: 'password',
        username: username,
        password: encodeURIComponent(password),
      });

      const response = await fetch(`${API_URL}/auth/oauth2/token`, {
        method: 'POST',
        headers: {
          Authorization: `Basic ${clientId}`,
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: body.toString(),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(
          errorText || `Authentication failed: ${response.status} ${response.statusText}`
        );
      }

      const data = await response.json();

      if (!data.access_token) {
        throw new Error('No access token received from server');
      }

      return data.access_token;
    } catch (error) {
      const message = error instanceof Error ? error.message : 'An unknown error occurred';
      console.error('Token fetch error:', message);
      throw error;
    }
  }

  async function handleLogin(e) {
    e.preventDefault();

    if (!state.username || !state.password || !state.clientSecret) {
      state.errorMessage = 'Please fill in all required fields';
      render();
      return;
    }

    state.errorMessage = '';
    state.isLoading = true;
    render();

    try {
      const token = await fetchToken(state.username, state.password, state.clientSecret);

      if (!token) {
        throw new Error('Failed to obtain authentication token');
      }

      localStorage.setItem('ba-token', token);
      saveCredentials();
      router.navigate('/products');
    } catch (error) {
      state.errorMessage = error instanceof Error ? error.message : 'Login failed. Please try again.';
      state.isLoading = false;
      render();
    }
  }

  function render() {
    app.innerHTML = `
      <div class="login-container">
        <form class="login-form" id="loginForm">
          <h2>WEB/Connect Demo</h2>

          ${state.errorMessage ? `
            <div class="error-message" role="alert">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="12" y1="8" x2="12" y2="12"></line>
                <line x1="12" y1="16" x2="12.01" y2="16"></line>
              </svg>
              ${state.errorMessage}
            </div>
          ` : ''}

          <label for="username">Username</label>
          <input
            type="text"
            id="username"
            value="${state.username}"
            ${state.isLoading ? 'disabled' : ''}
            required
            placeholder="Username"
          />

          <label for="password">Password</label>
          <div class="password-input-wrapper">
            <input
              type="${state.showPassword ? 'text' : 'password'}"
              id="password"
              value="${state.password}"
              ${state.isLoading ? 'disabled' : ''}
              required
              placeholder="Password"
            />
            <button
              type="button"
              class="toggle-password"
              id="togglePassword"
              aria-label="Toggle password visibility"
            >
              ${state.showPassword ? `
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
                  <line x1="1" y1="1" x2="23" y2="23"></line>
                </svg>
              ` : `
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                  <circle cx="12" cy="12" r="3"></circle>
                </svg>
              `}
            </button>
          </div>

          <label for="clientSecret">Client Secret</label>
          <div class="password-input-wrapper">
            <input
              type="${state.showSecret ? 'text' : 'password'}"
              id="clientSecret"
              value="${state.clientSecret}"
              ${state.isLoading ? 'disabled' : ''}
              required
              placeholder="Client Secret"
            />
            <button
              type="button"
              class="toggle-password"
              id="toggleSecret"
              aria-label="Toggle secret visibility"
            >
              ${state.showSecret ? `
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
                  <line x1="1" y1="1" x2="23" y2="23"></line>
                </svg>
              ` : `
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                  <circle cx="12" cy="12" r="3"></circle>
                </svg>
              `}
            </button>
          </div>

          <button
            type="submit"
            ${state.isLoading || !state.username || !state.password || !state.clientSecret ? 'disabled' : ''}
            class="submit-button"
          >
            ${state.isLoading ? '<span class="spinner"></span>' : ''}
            ${state.isLoading ? 'Logging in...' : 'Login'}
          </button>
        </form>
      </div>

      <style>
        .login-container {
          display: flex;
          justify-content: center;
          align-items: center;
          min-height: 100vh;
          background: #ffffff;
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          width: 100%;
        }

        .login-form {
          background: #fff;
          padding: 2rem 3rem;
          border-radius: 12px;
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
          width: 100%;
          max-width: 400px;
          box-sizing: border-box;
        }

        .login-form h2 {
          margin-bottom: 1.5rem;
          font-size: 1.8rem;
          text-align: center;
          color: #333;
        }

        .login-form label {
          margin-top: 1rem;
          display: block;
          color: #555;
          font-weight: 500;
        }

        .login-form input {
          width: 100%;
          padding: 0.75rem;
          margin-top: 0.25rem;
          border: 1px solid #ccc;
          border-radius: 8px;
          box-sizing: border-box;
          font-size: 1rem;
        }

        .password-input-wrapper {
          position: relative;
          display: flex;
          align-items: center;
        }

        .password-input-wrapper input {
          padding-right: 2.5rem;
        }

        .toggle-password {
          position: absolute;
          right: 0.75rem;
          background: none;
          border: none;
          padding: 0.25rem;
          cursor: pointer;
          color: #666;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-top: 0;
          width: auto;
          transition: color 0.3s ease;
        }

        .toggle-password:hover {
          color: #333;
        }

        .toggle-password:focus {
          outline: 2px solid #1d7371;
          outline-offset: 2px;
          border-radius: 4px;
        }

        .login-form button[type="submit"] {
          width: 100%;
          padding: 0.75rem;
          margin-top: 1.5rem;
          background-color: #1d7371;
          color: white;
          border: none;
          border-radius: 8px;
          font-size: 1rem;
          cursor: pointer;
          transition: background-color 0.3s ease;
        }

        .login-form button[type="submit"]:hover:not(:disabled) {
          background-color: #155755;
        }

        .login-form button[type="submit"]:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        .error-message {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.75rem;
          margin-bottom: 1rem;
          background-color: #fee;
          border: 1px solid #fcc;
          border-radius: 8px;
          color: #c33;
          font-size: 0.9rem;
        }

        .error-message svg {
          flex-shrink: 0;
        }

        .spinner {
          display: inline-block;
          width: 16px;
          height: 16px;
          border: 2px solid rgba(255, 255, 255, 0.3);
          border-radius: 50%;
          border-top-color: white;
          animation: spin 0.8s linear infinite;
        }

        @keyframes spin {
          to {
            transform: rotate(360deg);
          }
        }

        .submit-button {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
        }

        input:disabled {
          background-color: #f5f5f5;
          cursor: not-allowed;
        }
      </style>
    `;

    attachEventListeners();
  }

  function attachEventListeners() {
    const form = document.getElementById('loginForm');
    if (form) {
      form.addEventListener('submit', handleLogin);
    }

    const usernameInput = document.getElementById('username');
    if (usernameInput) {
      usernameInput.addEventListener('input', (e) => {
        state.username = e.target.value;
        state.errorMessage = '';
        updateSubmitButton();
      });
    }

    const passwordInput = document.getElementById('password');
    if (passwordInput) {
      passwordInput.addEventListener('input', (e) => {
        state.password = e.target.value;
        state.errorMessage = '';
        updateSubmitButton();
      });
    }

    const clientSecretInput = document.getElementById('clientSecret');
    if (clientSecretInput) {
      clientSecretInput.addEventListener('input', (e) => {
        state.clientSecret = e.target.value;
        state.errorMessage = '';
        updateSubmitButton();
      });
    }

    const togglePasswordBtn = document.getElementById('togglePassword');
    if (togglePasswordBtn) {
      togglePasswordBtn.addEventListener('click', () => {
        state.showPassword = !state.showPassword;
        render();
      });
    }

    const toggleSecretBtn = document.getElementById('toggleSecret');
    if (toggleSecretBtn) {
      toggleSecretBtn.addEventListener('click', () => {
        state.showSecret = !state.showSecret;
        render();
      });
    }
  }

  function updateSubmitButton() {
    const submitButton = document.querySelector('button[type="submit"]');
    if (submitButton) {
      const isValid = state.username && state.password && state.clientSecret;
      submitButton.disabled = !isValid || state.isLoading;
    }
  }

  render();
}