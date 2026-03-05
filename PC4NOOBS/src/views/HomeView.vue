<template>
  <div>
    <main>
      <section>
        <div>
          <h1>Build your PC — made simple.</h1>
          <p>
            Take our questionnaire to find your perfect PC.
            Or view our guides to become an expert.
          </p>

          <div>
            <button type="button" @click="$router.push('/questionnaire')">Begin Now</button>
            <button type="button" @click="$router.push('/guides')">View Guides</button>
          </div>
        </div>

        <div>
          <img src="/src/assets/pc-homescreen.png" alt="Gaming PC illustration" />
        </div>
      </section>
    </main>
  </div>
</template>
