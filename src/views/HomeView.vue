<template>
  <div>
    <main>
      <section class="hero">
        <div class="hero-text">
          <h1>Build your PC — made simple.</h1>
          <p>
            Take our questionnaire to find your perfect PC.
            Or view our guides to become an expert.
          </p>

          <div class="hero-buttons">
            <button type="button" class="btn-primary" @click="$router.push('/questionnaire')">Begin Now</button>
            <button type="button" class="btn-primary" @click="$router.push('/guides')">View Guides</button>
          </div>
        </div>

        <div class="hero-image">
          <img src="/src/assets/pc-homescreen.png" alt="Gaming PC illustration" />
        </div>
      </section>
    </main>
  </div>
</template>

<style scoped>
.hero {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 4rem 6rem;
  min-height: calc(100vh - 80px - 200px);
  gap: 2rem;
}

.hero-text {
  max-width: 400px;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.hero-text h1 {
  font-size: 2.8rem;
  font-weight: 800;
  line-height: 1.2;
  color: var(--color-text);
}

.hero-text p {
  font-size: 1rem;
  color: var(--color-text-muted);
  line-height: 1.6;
}

.hero-buttons {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: fit-content;
}

.hero-image img {
  width: 100%;
  max-width: 480px;
}

@media (max-width: 768px) {
  .hero {
    flex-direction: column;
    padding: 2rem 1.5rem;
    text-align: center;
    align-items: center;
  }

  .hero-buttons {
    align-items: center;
    width: 100%;
  }

  .hero-image img {
    max-width: 300px;
  }
}
</style>