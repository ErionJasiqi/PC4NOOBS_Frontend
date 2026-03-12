<template>
    <main>
        <section>
            <h1>Imprint</h1>

            <p>PC4Noobs - Your PC, built simply</p>
            <p>Owners: Alessio Huber, Ioannis Ligkas, Erion Jasiqi, Yusuf Er</p>
            <p>Address: Erlenweg 70, Bennau 8836, Switzerland</p>
            <p>Telephone: 055 360 62 63</p>
            <p>E-Mail: pc4noobs.info@gmail.com</p>
            <p>Website: https://www.PC4Noobs.com</p> <!--to change-->
        </section>

        <section>
            <h2>Disclaimer</h2>
            
            <h3>Contents</h3>
            <p>The contents of this website have been compiled with the utmost care. However, no guarantee can be given for the accuracy, completeness, or timeliness of the contents.</p>

            <h3>Links</h3>
            <p>This website contains links to external third-party websites. The operator has no influence on their content; therefore, no liability is assumed.</p>

            <h3>Copyright</h3>
            <p>All content, text, designs, and graphics on this website are subject to Swiss copyright law.</p>
        </section>

        <nav>
            <button type="button" class="back-btn" @click="$router.push('/')">← back</button>
        </nav>
    </main>
</template>

<style scoped>
main {
    max-width: 860px;
    margin: 0 auto;
    padding: 2.5rem 2rem;
}

section {
    background-color: var(--color-bg-card);
    border: 1px solid var(--color-border);
    border-radius: 8px;
    padding: 2rem 2.5rem;
    display: flex;
    flex-direction: column;
    gap: 1.2rem;
    margin-bottom: 1.5rem;
}

h1 {
    font-size: 1.8rem;
    font-weight: 700;
    color: var(--color-text);
}

h2 {
  font-size: 1.1rem;
  font-weight: 600;
  color: var(--color-text);
  margin-top: 0.5rem;
}

p, li {
  color: var(--color-text-muted);
  font-size: 0.95rem;
  line-height: 1.7;
}

ul {
  list-style: disc;
  padding-left: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
}

.back-btn {
  background: none;
  border: none;
  color: var(--color-text);
  font-size: 1rem;
  cursor: pointer;
  padding: 0.5rem 0;
}

.back-btn:hover {
  color: var(--color-green);
}
</style>