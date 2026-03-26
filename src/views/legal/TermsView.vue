<template>
    <main>
        <section>
            <h1>Terms</h1>
            
            <h2>Scope of application</h2>
            <p>These General Terms and Conditions apply to the use of the PC4Noobs website and all associated services.</p>

            <h2>Services</h2>
            <p>PC4Noobs provides users with information about PC components, compatibility, product recommendations, and a PC simulator for visualizing a build. The content is for informational purposes only and does not constitute technical advice.</p>

            <h2>Liability</h2>
            <p>PC4Noobs accepts no liability for damage resulting from the use of the information provided. All information about products, prices, and compatibility is provided without guarantee.</p>

            <h2>Use of the website</h2>
            <p>Use of the website is at your own risk. Manipulation or unauthorized interference with the system is prohibited.</p>
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