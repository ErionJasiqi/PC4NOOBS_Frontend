<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const username = ref('')
const email = ref('')
const password = ref('')
const confirmPassword = ref('')
const errorMessage = ref('')

function register() {
  errorMessage.value = ''

  if (
    !username.value.trim() ||
    !email.value.trim() ||
    !password.value.trim() ||
    !confirmPassword.value.trim()
  ) {
    errorMessage.value = 'Please fill in all fields.'
    return
  }

  if (password.value.length < 4) {
    errorMessage.value = 'Password must be at least 4 characters.'
    return
  }

  if (password.value !== confirmPassword.value) {
    errorMessage.value = 'Passwords do not match.'
    return
  }

  const user = {
    username: username.value.trim(),
    email: email.value.trim().toLowerCase(),
    password: password.value
  }

  localStorage.setItem('registeredUser', JSON.stringify(user))
  localStorage.setItem('loggedInUser', JSON.stringify(user))

  router.push('/account')
}

onMounted(() => {
  if (localStorage.getItem('loggedInUser')) {
    router.replace('/account')
  }
})
</script>

<template>
  <main class="account-main">
    <div class="auth-card">
      <h1>Register</h1>

      <p v-if="errorMessage" class="message error">{{ errorMessage }}</p>

      <div class="form-group">
        <label for="username">Username</label>
        <input id="username" type="text" v-model="username" autocomplete="username" />
      </div>

      <div class="form-group">
        <label for="email">E-Mail</label>
        <input id="email" type="email" v-model="email" autocomplete="email" />
      </div>

      <div class="form-group">
        <label for="password">Password</label>
        <input id="password" type="password" v-model="password" autocomplete="new-password" />
      </div>

      <div class="form-group">
        <label for="confirm-password">Confirm Password</label>
        <input
          id="confirm-password"
          type="password"
          v-model="confirmPassword"
          autocomplete="new-password"
          @keyup.enter="register"
        />
      </div>

      <button type="button" class="auth-btn" @click="register">REGISTER</button>

      <p class="social-label">Continue with</p>
      <div class="social-icons">
        <img src="/src/assets/google.png" alt="Google" />
        <img src="/src/assets/apple.png" alt="Apple" />
        <img src="/src/assets/microsoft.png" alt="Microsoft" />
        <img src="/src/assets/facebook.png" alt="Facebook" />
      </div>

      <p class="auth-link">
        Already have an account?
        <router-link to="/login"><strong>Login here</strong></router-link>
      </p>
    </div>
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

.message {
  text-align: center;
  padding: 0.7rem 0.9rem;
  border-radius: 8px;
  font-size: 0.9rem;
  margin: 0;
}

.message.error {
  background: rgba(255, 80, 80, 0.15);
  color: #ff9b9b;
}
</style>