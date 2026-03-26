<template>
    <main>
        <section>
            <h1>Privacy Policy</h1>
            
            <h2>Responsible body</h2>
            <p>PC4Noobs Erlenweg 70, 8836 Bennau, Switzerland, Email: pc4noobs.info@gmail.com</p>

            <h2>Collection and use of personal data</h2>
            <p>When you visit the website, the following data may be stored automatically:</p>
            <ul>
                <li>IP address</li>
                <li>Browser type &amp; version</li>
                <li>Time of visit</li>
                <li>Pages accessed</li>
            </ul>
            <p>This data is used exclusively for technical security and to improve the website.</p>

            <h2>Contact</h2>
            <p>When contacting us via email, the data provided will be stored for the purpose of processing the request.</p>

            <h2>Cookies</h2>
            <p>The website may use cookies to improve user-friendliness. Users can deactivate cookies in their browser.</p>

            <h2>Disclosure of data</h2>
            <p>No personal data will be passed on to third parties unless there is a legal obligation.</p>

            <h2>External Links</h2>
            <p>No responsibility is assumed for the data protection practices of external sites.</p>

            <h2>User Rights</h2>
            <p>Users have the right to:</p>
            <ul>
                <li>Receive information about stored data</li>
                <li>Request correction or deletion</li>
                <li>Object to data processing</li>
            </ul>
            <p>Requests can be sent to pc4noobs.info@gmail.com.</p>

            <h2>Changes</h2>
            <p>This privacy policy may be amended as necessary.</p>
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