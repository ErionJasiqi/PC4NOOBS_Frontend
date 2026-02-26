<template>
  <div>
    <header>
      <div>
        <button type="button" @click="$router.push('/')">PC4NOOBS</button>
      </div>

      <nav>
        <ul>
          <li>
            <button type="button" @click="$router.push('/guides')">Guides</button>
          </li>
          <li>
            <button type="button" @click="$router.push('/questionnaire')">Begin Questionnaire</button>
          </li>
          <li>
            <button type="button" @click="$router.push('/simulator')">Simulator</button>
          </li>
        </ul>
      </nav>

      <div>
        <button type="button" @click="$router.push('/account')">Account</button>
      </div>
    </header>

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

    <footer>
      <section>
        <p>PC4Noobs.info@gmail.com</p>
        <p>Street: Erlenweg 70</p>
        <p>City: Bennau 8836</p>
        <p>Phone: 055 360 62 63</p>
        <p>Country: Switzerland</p>
      </section>

      <nav>
        <ul>
          <li><Routerlink to="/imprint">Imprint</Routerlink></li>
          <li><Routerlink to="/terms">Terms</Routerlink></li>
          <li><Routerlink to="/privacy">Privacy</Routerlink></li>
        </ul>
      </nav>
    </footer>
  </div>
</template>
