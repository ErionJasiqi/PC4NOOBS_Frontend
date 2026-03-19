<script setup>
import { ref } from 'vue'

const view = ref('login')

const email = ref('')
const password = ref('')
const username = ref('')

function login() {
  view.value = 'account'
}

function register() {
  view.value = 'account'
}
</script>

<template>
  <main class="account-main">

    <!-- Login form -->
    <template v-if="view === 'login'">
      <div class="auth-card">
        <h1>Login</h1>
        <div class="form-group">
          <label for="email">E-Mail</label>
          <input id="email" type="email" v-model="email" />
        </div>
        <div class="form-group">
          <label for="password">Password</label>
          <input id="password" type="password" v-model="password" />
        </div>
        <button type="button" class="auth-btn" @click="login">LOGIN</button>
        <p class="social-label">Continue with</p>
        <div class="social-icons">
          <img src="/src/assets/google.png" alt="Google" />
          <img src="/src/assets/apple.png" alt="Apple" />
          <img src="/src/assets/microsoft.png" alt="Microsoft" />
          <img src="/src/assets/facebook.png" alt="Facebook" />
        </div>
        <p class="auth-link">Forgot your password? <a href="#"><strong>Click here</strong></a></p>
        <p class="auth-link">Don't have an account? <a href="#" @click.prevent="view = 'register'"><strong>Register here</strong></a></p>
      </div>
    </template>

    <!-- Register form -->
    <template v-else-if="view === 'register'">
      <div class="auth-card">
        <h1>Register</h1>
        <div class="form-group">
          <label for="username">Username</label>
          <input id="username" type="text" v-model="username" />
        </div>
        <div class="form-group">
          <label for="reg-email">E-Mail</label>
          <input id="reg-email" type="email" v-model="email" />
        </div>
        <div class="form-group">
          <label for="reg-password">Password</label>
          <input id="reg-password" type="password" v-model="password" />
        </div>
        <button type="button" class="auth-btn" @click="register">REGISTER</button>
        <p class="social-label">Continue with</p>
        <div class="social-icons">
          <img src="/src/assets/google.png" alt="Google" />
          <img src="/src/assets/apple.png" alt="Apple" />
          <img src="/src/assets/microsoft.png" alt="Microsoft" />
          <img src="/src/assets/facebook.png" alt="Facebook" />
        </div>
        <p class="auth-link">Already have an account? <a href="#" @click.prevent="view = 'login'"><strong>Login here</strong></a></p>
      </div>
    </template>

    <!-- Account page -->
    <template v-else-if="view === 'account'">
      <div class="account-card">
        <h1>Account Details</h1>
        <div class="account-body">
          <figure class="avatar">
            <img src="/src/assets/avatar.png" alt="Profile picture" />
          </figure>
          <div class="account-info">
            <div class="info-header">
              <h2>Personal Information</h2>
              <button type="button" class="edit-btn">✏</button>
            </div>
            <p>John Doe</p>
            <p>john.doe@example.com</p>
            <p>+41 79 345 67 89</p>
            <p>31.12.2000</p>
            <h2>Delivery Address</h2>
            <p>Blächikonstrasse 3</p>
            <p>Bounarge 9659</p>
            <h2>Selected Language</h2>
            <p>German</p>
            <h2>Customer ID</h2>
            <p>123456789</p>
          </div>
        </div>
      </div>
    </template>

  </main>
</template>

<style scoped>
.account-main {
  display: flex;
  justify-content: center;
  align-items: flex-start;
  padding: 2.5rem 1rem;
  min-height: calc(100vh - 80px - 200px);
}

/* Auth card */
.auth-card {
  background-color: #1e2130;
  border: none;
  border-radius: 14px;
  padding: 2.5rem 2rem;
  width: 100%;
  max-width: 420px;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.auth-card h1 {
  font-size: 2rem;
  font-weight: 700;
  text-align: center;
  margin-bottom: 0.5rem;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
}

.form-group label {
  font-size: 0.9rem;
  color: var(--color-text);
}

.form-group input {
  padding: 0.6rem 0.8rem;
  border-radius: 6px;
  border: none;
  background-color: #c8c8c8;
  color: #111;
  font-size: 0.95rem;
}

.auth-btn {
  align-self: center;
  background-color: var(--color-green);
  color: #000;
  font-weight: 700;
  font-size: 0.95rem;
  padding: 0.6rem 2rem;
  border: none;
  border-radius: 999px;
  cursor: pointer;
  transition: background-color 0.2s;
  width: 160px;
  margin-top: 0.3rem;
}

.auth-btn:hover {
  background-color: var(--color-green-hover);
}

.social-label {
  text-align: center;
  color: var(--color-text-muted);
  font-size: 0.85rem;
  margin-bottom: -0.3rem;
}

.social-icons {
  display: flex;
  justify-content: center;
  gap: 0.8rem;
}

.social-icons img {
  height: 38px;
  width: 38px;
  object-fit: contain;
  cursor: pointer;
  border-radius: 50%;
}

.auth-link {
  text-align: center;
  font-size: 0.88rem;
  color: var(--color-text-muted);
}

.auth-link a {
  color: var(--color-text);
  display: inline;
}

/* Account page */
.account-card {
  background-color: var(--color-bg-card);
  border: 1px solid var(--color-border);
  border-radius: 10px;
  padding: 2rem 2.5rem;
  width: 100%;
  max-width: 900px;
}

.account-card h1 {
  font-size: 1.6rem;
  font-weight: 700;
  margin-bottom: 1.5rem;
}

.account-body {
  display: flex;
  gap: 2.5rem;
  align-items: flex-start;
}

.avatar img {
  width: 160px;
  height: 160px;
  border-radius: 50%;
  object-fit: cover;
}

.account-info {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
}

.info-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.account-info h2 {
  font-size: 1rem;
  font-weight: 700;
  margin-top: 1rem;
  color: var(--color-text);
}

.account-info p {
  color: var(--color-text-muted);
  font-size: 0.95rem;
}

.edit-btn {
  background: none;
  border: none;
  color: var(--color-text-muted);
  font-size: 1.1rem;
  cursor: pointer;
}

.edit-btn:hover {
  color: var(--color-green);
}
</style>