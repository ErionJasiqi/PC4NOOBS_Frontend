<template>
    <div>
        <!-- Navbar-->
         <header>
            <nav>
                <RouterLink to="/guides/main-components">Guides</RouterLink>
                <RouterLink to="/questionnaire">Begin Questionnaire</RouterLink>
                <RouterLink to="/simulator">Simulator</RouterLink>
                <RouterLink to="/account">Account</RouterLink>
            </nav>
         </header>

         <main>
            <!--Sidebar-->
            <aside>
                <ul>
                    <li><RouterLink to="/guides/main-components">Main Components</RouterLink></li>
                    <li><RouterLink to="/guides/case">Case</RouterLink></li>
                    <li><RouterLink to="/guides/motherboard">Motherboard</RouterLink></li>
                    <li><RouterLink to="/guides/cpu">CPU</RouterLink></li>
                    <li><RouterLink to="/guides/ram">RAM</RouterLink></li>
                    <li><RouterLink to="/guides/storage">Storage</RouterLink></li>
                    <li><RouterLink to="/guides/power-supply">Power Supply</RouterLink></li>
                    <li><RouterLink to="/guides/graphics-card">Graphics Card</RouterLink></li>
                    <li><RouterLink to="/guides/other">Other</RouterLink></li>
                    <li><RouterLink to="/guides/build">Build</RouterLink></li>
                    <li><RouterLink to="/guides/build-tools">Tools</RouterLink></li>
                    <li><RouterLink to="/guides/build-cpu-motherboard">CPU &amp; Motherboard</RouterLink></li>
                    <li><RouterLink to="/guides/build-ram-motherboard">RAM &amp; Motherboard</RouterLink></li>
                    <li><RouterLink to="/guides/build-storage-motherboard">Storage &amp; Motherboard</RouterLink></li>
                    <li><RouterLink to="/guides/build-case-motherboard">Case &amp; Motherboard</RouterLink></li>
                </ul>
            </aside>

            <!--Content-->
            <section>
                <RouterView />
            </section>
         </main>

        <!--Footer-->
        <footer>
            <section>
                <p>PC4Noobs.info@gmail.com</p>
                <p>Street: Erlenweg 70</p>
                <p>City: Bennau 8836</p>
                <p>Phone: 041 360 62 63</p>
                <p>Country: Switzerland</p>
            </section>

            <nav>
                <RouterLink to="/imprint">Imprint</RouterLink>
                <RouterLink to="/terms">Terms</RouterLink>
                <RouterLink to="/privacy">Privacy</RouterLink>
            </nav>
        </footer>
    </div>
</template>
