<template>
    <div class="guides-layout">
        <!--Sidebar-->
        <aside class="guides-sidebar">
            <p class="sidebar-group-title">Components</p>
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
            </ul>
            <RouterLink to="/guides/build" class="sidebar-group-title sidebar-group-link">Build</RouterLink>
            <ul>
                <li><RouterLink to="/guides/build-tools">Tools</RouterLink></li>
                <li><RouterLink to="/guides/build-cpu-motherboard">CPU &amp; Motherboard</RouterLink></li>
                <li><RouterLink to="/guides/build-ram-motherboard">RAM &amp; Motherboard</RouterLink></li>
                <li><RouterLink to="/guides/build-storage-motherboard">Storage &amp; Motherboard</RouterLink></li>
                <li><RouterLink to="/guides/build-case-motherboard">Case &amp; Motherboard</RouterLink></li>
            </ul>
        </aside>

        <!--Content-->
        <section class="guides-content">
            <RouterView />
        </section>
    </div>
</template>

<style scoped>
.guides-layout {
    display: flex;
    min-height: calc(100vh - 80px - 200px);
}

.guides-sidebar {
    width: 230px;
    min-width: 230px;
    background-color: var(--color-bg-secondary);
    border-right: 1px solid var(--color-border);
    padding: 1.5rem 1rem;
    display: flex;
    flex-direction: column;
    gap: 0.3rem;
}

.sidebar-group-title {
    font-size: 1.5rem;
    font-weight: 700;
    color: var(--color-text);
    margin-top: 1rem;
    margin-bottom: 0.3rem;
    padding-left: 0.5rem;
}

.guides-sidebar ul {
    display: flex;
    flex-direction: column;    
}

.guides-sidebar ul li a {
    display: block;
    padding: 0.2rem 0.5rem 0.2rem 1rem;
    color: var(--color-text-muted);
    font-size: 0.95rem;
    border-radius: 4px;
    transition: color 0.2s, background-color 0.2s;
    text-decoration: none;
}

.guides-sidebar ul li a:hover {
    color: var(--color-text);
    background-color: var(--color-bg-hover);
}

.guides-sidebar ul li a.router-link-exact-active {
    color: var(--color-text);
    font-weight: 600;
    text-decoration: underline;
}

.guides-content {
    flex: 1;
    padding: 2.5rem 3rem;
    background-color: var(--color-bg-card);
}

.sidebar-group-link {
  text-decoration: none;
}

.sidebar-group-link.router-link-exact-active {
  text-decoration: underline;
}
</style>