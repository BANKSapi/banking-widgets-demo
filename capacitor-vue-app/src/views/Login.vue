<script setup lang="ts">
import { reactive, ref, computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';

interface LoginForm {
  username: string;
  password: string;
  clientSecret: string;
}

interface TokenResponse {
  access_token: string;
  token_type?: string;
  expires_in?: number;
  refresh_token?: string;
}

interface SavedCredentials {
  username: string;
  password: string;
  clientSecret: string;
}

const API_URL = import.meta.env.VITE_API_URL || 'https://banksapi.io';
const STORAGE_KEY = 'bwd:login-credentials';

const router = useRouter();

const form = reactive<LoginForm>({
  username: '',
  password: '',
  clientSecret: '',
});

const showPassword = ref<boolean>(false);
const showSecret = ref<boolean>(false);
const isLoading = ref<boolean>(false);
const errorMessage = ref<string>('');

const isFormValid = computed<boolean>(() => {
  return !!(form.username && form.password && form.clientSecret);
});

const clearError = (): void => {
  errorMessage.value = '';
};

const saveCredentials = (): void => {
  const credentials: SavedCredentials = {
    username: form.username,
    password: form.password,
    clientSecret: form.clientSecret
  };

  localStorage.setItem(STORAGE_KEY, JSON.stringify(credentials));
};

const loadSavedCredentials = (): void => {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      const credentials: SavedCredentials = JSON.parse(saved);
      form.username = credentials.username || '';
      form.password = credentials.password || '';
      form.clientSecret = credentials.clientSecret || '';
    }
  } catch (error) {
    console.error('Error loading saved credentials:', error);
    localStorage.removeItem(STORAGE_KEY);
  }
};

onMounted(() => {
  loadSavedCredentials();
});

const fetchToken = async (
  username: string,
  password: string,
  clientId: string
): Promise<string | null> => {
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

    const data: TokenResponse = await response.json();

    if (!data.access_token) {
      throw new Error('No access token received from server');
    }

    return data.access_token;
  } catch (error) {
    const message = error instanceof Error ? error.message : 'An unknown error occurred';
    console.error('Token fetch error:', message);
    throw error;
  }
};

const handleLogin = async (): Promise<void> => {
  if (!isFormValid.value) {
    errorMessage.value = 'Please fill in all required fields';
    return;
  }

  clearError();
  isLoading.value = true;

  try {
    const token = await fetchToken(form.username, form.password, form.clientSecret);

    if (!token) {
      throw new Error('Failed to obtain authentication token');
    }

    localStorage.setItem('ba-token', token);
    saveCredentials();
    await router.replace({ path: '/products' });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Login failed. Please try again.';
    errorMessage.value = message;
  } finally {
    isLoading.value = false;
  }
};

const togglePasswordVisibility = (): void => {
  showPassword.value = !showPassword.value;
};

const toggleSecretVisibility = (): void => {
  showSecret.value = !showSecret.value;
};
</script>

<template>
  <div class="login-container">
    <form class="login-form" @submit.prevent="handleLogin">
      <h2>WEB/Connect Demo</h2>

      <div v-if="errorMessage" class="error-message" role="alert">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="12" cy="12" r="10"></circle>
          <line x1="12" y1="8" x2="12" y2="12"></line>
          <line x1="12" y1="16" x2="12.01" y2="16"></line>
        </svg>
        {{ errorMessage }}
      </div>

      <label for="username">Username</label>
      <input
        type="text"
        id="username"
        v-model="form.username"
        @input="clearError"
        :disabled="isLoading"
        required
        placeholder="Username"
      />

      <label for="password">Password</label>
      <div class="password-input-wrapper">
        <input
          :type="showPassword ? 'text' : 'password'"
          id="password"
          v-model="form.password"
          @input="clearError"
          :disabled="isLoading"
          required
          placeholder="Password"
        />
        <button
          type="button"
          class="toggle-password"
          @click="togglePasswordVisibility"
          aria-label="Toggle password visibility"
        >
          <svg v-if="!showPassword" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
            <circle cx="12" cy="12" r="3"></circle>
          </svg>
          <svg v-else xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
            <line x1="1" y1="1" x2="23" y2="23"></line>
          </svg>
        </button>
      </div>

      <label for="clientSecret">Client Secret</label>
      <div class="password-input-wrapper">
        <input
          :type="showSecret ? 'text' : 'password'"
          id="clientSecret"
          v-model="form.clientSecret"
          @input="clearError"
          :disabled="isLoading"
          required
          placeholder="Client Secret"
        />
        <button
          type="button"
          class="toggle-password"
          @click="toggleSecretVisibility"
          aria-label="Toggle secret visibility"
        >
          <svg v-if="!showSecret" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
            <circle cx="12" cy="12" r="3"></circle>
          </svg>
          <svg v-else xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
            <line x1="1" y1="1" x2="23" y2="23"></line>
          </svg>
        </button>
      </div>

      <button
        type="submit"
        :disabled="isLoading || !isFormValid"
        class="submit-button"
      >
        <span v-if="isLoading" class="spinner"></span>
        {{ isLoading ? 'Logging in...' : 'Login' }}
      </button>
    </form>
  </div>
</template>

<style scoped>
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
  background-color: transparent;
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

.checkbox-wrapper {
  display: flex;
  align-items: center;
  margin-top: 1rem;
  gap: 0.5rem;
}

.checkbox-wrapper input[type="checkbox"] {
  appearance: none;
  -webkit-appearance: none;
  width: 14px;
  height: 14px;
  margin: 0;
  border: 1.5px solid #1d7371;
  border-radius: 3px;
  cursor: pointer;
  position: relative;
  transition: all 0.3s ease;
  background-color: white;
  flex-shrink: 0;
}

.checkbox-wrapper input[type="checkbox"]:checked {
  background-color: #1d7371;
  border-color: #1d7371;
}

.checkbox-wrapper input[type="checkbox"]:checked::after {
  content: '';
  position: absolute;
  left: 50%;
  top: 50%;
  width: 7px;
  height: 14px;
  border: solid white;
  border-width: 0 2px 2px 0;
  transform: translate(-50%, -60%) rotate(45deg);
}

.checkbox-wrapper input[type="checkbox"]:hover:not(:disabled) {
  border-color: #155755;
  box-shadow: 0 0 0 3px rgba(29, 115, 113, 0.1);
}

.checkbox-wrapper input[type="checkbox"]:focus {
  outline: none;
  box-shadow: 0 0 0 3px rgba(29, 115, 113, 0.2);
}

.checkbox-wrapper input[type="checkbox"]:disabled {
  cursor: not-allowed;
  opacity: 0.5;
  background-color: #f5f5f5;
}

.checkbox-label {
  margin: 0;
  cursor: pointer;
  user-select: none;
  font-size: 0.95rem;
  color: #555;
  font-weight: 400;
}

.login-form .checkbox-wrapper label {
  margin-top: 0;
  display: block;
  color: #555;
  font-weight: 500;
}

.checkbox-wrapper input[type="checkbox"]:disabled + .checkbox-label {
  cursor: not-allowed;
  opacity: 0.6;
}
</style>
