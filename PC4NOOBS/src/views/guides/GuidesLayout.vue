<template>
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
        <section>
            <RouterView />
        </section>
    </main>
</template>
