<script setup lang="ts">
import { reactive } from 'vue';
import axios from "axios";
import {useRouter} from "vue-router";

const router = useRouter();
const form = reactive({
  token: '',
})

async function provideToken() {
  localStorage.setItem('ba-token', form.token);
  await router.push({ path: '/products' });
}
</script>

<template>
  <div class="login-container">
    <form class="login-form" @submit.prevent="provideToken">
      <h2>WEB/Connect Demo</h2>

      <label for="token">Provide your BANKSapi Token</label>
      <input type="password" id="token" v-model="form.token" required placeholder="Enter your token" />

      <button type="submit">Start</button>
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

.login-form button {
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

.login-form button:hover {
  background-color: #1d7371;
}
</style>
