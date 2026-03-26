<script setup>
import { useRouter} from 'vue-router';

const router = useRouter();
</script>

<template>
    <main>
        <h1>How do you want to proceed?</h1>
        <p>Choose your path to the perfect PC</p>

        <div class="mode-cards">
            <div class="mode-card" @click="router.push('/questionnaire/guided')">
                <img src="/src/assets/guided-mode.png" alt="Guided Mode" />
                <h2>Guided Mode</h2>
                <p>Take the expert quiz to discover PCs that suit you.</p>
            </div>

            <div class="mode-card" @click="router.push('/simulator')">
                <img src="/src/assets/expert-mode.png" alt="Expert Mode" />
                <h2>Expert Mode</h2>
                <p>Want to test your knowledge or build the perfect PC yourself? Choose this mode.</p>
            </div>
        </div>
    </main>
</template>

<style scoped>
main {
  min-height: calc(100vh - 80px - 200px);
  background-color: var(--color-bg-card);
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 3rem 1rem;
}
 
h1 {
  font-size: 2.2rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
  text-align: center;
}
 
p {
  color: var(--color-text-muted);
  margin-bottom: 3rem;
  text-align: center;
}
 
.mode-cards {
  display: flex;
  gap: 2rem;
  flex-wrap: wrap;
  justify-content: center;
}
 
.mode-card {
  background-color: #0d0f1a;
  border: 1px solid var(--color-border);
  border-radius: 8px;
  padding: 2.5rem 2rem;
  width: 260px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  cursor: pointer;
  transition: border-color 0.2s;
  text-align: center;
}
 
.mode-card:hover {
  border-color: var(--color-accent);
}
 
.mode-card img {
  width: 70px;
  height: 70px;
  object-fit: contain;
}
 
.mode-card h2 {
  font-size: 1.3rem;
  font-weight: 600;
}
 
.mode-card p {
  font-size: 0.9rem;
  color: var(--color-text-muted);
  line-height: 1.5;
  margin-bottom: 0;
}
</style>