<script setup>
import { getAccount, logoutUser } from "@/api/requests";
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const currentUser = ref(null);
const isLoading = ref(true);

async function logout() {
  localStorage.removeItem("loggedInUser");
  console.log(await logoutUser())
  router.push("/login");
}

onMounted(async () => {
  const loggedInRaw = localStorage.getItem("loggedInUser");

  if (!loggedInRaw) {
    router.replace("/login");
    return;
  }

  try {
    isLoading.value = true;
    currentUser.value = await getAccount(loggedInRaw);
  } catch (error) {
    console.error(error);
    localStorage.removeItem("loggedInUser");
    router.replace("/login");
  } finally {
    isLoading.value = false;
  }
});
</script>

<template>
  <main class="account-main">
    <div v-if="isLoading">
      <p>LOADINGGGGGGGGGGG</p>
    </div>
    <div class="account-card" v-if="!isLoading">
      <h1>Account Details</h1>

      <div v-if="currentUser" class="account-body">
        <figure class="avatar">
          <img src="/src/assets/avatar.png" alt="Profile picture" />
        </figure>

        <div class="account-info">
          <div class="info-header">
            <h2>Personal Information</h2>
            <button type="button" class="edit-btn">✏</button>
          </div>

          <p>{{ currentUser.Username }}</p>
          <p>{{ currentUser.Email }}</p>
          <p>{{ currentUser.Phone }}</p>
          <p>{{ currentUser.CreatedAt }}</p>

          <h2>Delivery Address</h2>
          <p>{{ currentUser.Address }}</p>
          <p>{{ currentUser.City }}</p>

          <h2>Selected Language</h2>
          <p>English</p>

          <h2>Customer ID</h2>
          <p>{{ currentUser.UserId }}</p>

          <button type="button" class="auth-btn logout-btn" @click="logout">
            LOGOUT
          </button>
        </div>
      </div>
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

.auth-btn {
  align-self: flex-start;
  background-color: var(--color-green);
  color: #000;
  font-weight: 700;
  font-size: 0.95rem;
  padding: 0.6rem 2rem;
  border: none;
  border-radius: 999px;
  cursor: pointer;
  width: 160px;
  margin-top: 1.2rem;
}

.auth-btn:hover {
  background-color: var(--color-green-hover);
}
</style>
