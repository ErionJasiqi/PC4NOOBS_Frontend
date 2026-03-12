<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <div>
    <header>
      <div class="header-left">
        <RouterLink to="/" class="logo-link">
          <img src="/src/assets/Logo.png" alt="PC4NOOBS Logo" />
        </RouterLink>
        <nav>
          <RouterLink to="/guides/main-components">Guides</RouterLink>
          <RouterLink to="/questionnaire">Begin Questionnaire</RouterLink>
          <RouterLink to="/simulator">Simulator</RouterLink>
        </nav>
      </div>

      <RouterLink to="/account" class="account-link">
        <img src="/src/assets/avatar.png" alt="Account" />
      </RouterLink>
    </header>

    <RouterView />

    <footer>
      <section>
        <a href="mailto:PC4Noobs.info@gmail.com">PC4Noobs.info@gmail.com</a>
        <p>Street: Erlenweg 70</p>
        <p>City: Bennau 8836</p>
        <p>Phone: 041 360 62 63</p>
        <p>Country: Switzerland</p>
      </section>
      <nav>
        <ul>
          <li><RouterLink to="/imprint">Imprint</RouterLink></li>
          <li><RouterLink to="/terms">Terms</RouterLink></li>
          <li><RouterLink to="/privacy">Privacy</RouterLink></li>
        </ul>
      </nav>
    </footer>
  </div>
</template>

<style scoped>
header nav a{
  text-decoration: none;
  border: none;
}

header nav a.router-link-exact-active {
  text-decoration: none;
  background-color: transparent;
}

</style>
