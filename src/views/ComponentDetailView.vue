<script setup>
import { ref, computed, onMounted } from "vue";
import { useRouter, useRoute } from "vue-router";
import { getComponents } from "@/api/requests.js";
import { mockCategories } from "@/mock/components.js";

const router = useRouter();
const route = useRoute();

const categoryId = computed(() => route.params.categoryId);
const itemId = computed(() => Number(route.params.itemId));

const categories = ref([]);
const loading = ref(true);

const category = computed(() => categories.value.find((c) => c.id === categoryId.value));
const component = computed(() => category.value?.items.find((i) => i.id === itemId.value));
const relatedComponents = computed(() =>
  category.value?.items.filter((i) => i.id !== itemId.value) ?? []
);

function goBack() {
  if (window.history.length > 1) {
    router.back();
  } else {
    router.push({ name: "simulator" });
  }
}

onMounted(async () => {
  let cats = mockCategories;
  try {
    const data = await getComponents();
    if (data?.categories) cats = data.categories;
  } catch {
    // backend unavailable — using mock data
  }
  categories.value = cats;
  loading.value = false;
});
</script>

<template>
  <div class="detail-page">
    <!-- Loading state -->
    <div v-if="loading" class="state-center">
      <div class="spinner"></div>
      <p>Loading component…</p>
    </div>

    <!-- Not found state -->
    <div v-else-if="!component" class="state-center">
      <p class="not-found-title">Component not found</p>
      <button class="btn-back" @click="goBack">← Go back</button>
    </div>

    <!-- Detail content -->
    <template v-else>
      <!-- Breadcrumb / back -->
      <div class="breadcrumb">
        <button class="btn-back" @click="goBack">← Back</button>
        <span class="crumb-sep">/</span>
        <span class="crumb">{{ category.label }}</span>
        <span class="crumb-sep">/</span>
        <span class="crumb crumb--active">{{ component.name }}</span>
      </div>

      <!-- Hero section -->
      <div class="hero">
        <div class="hero-image-wrap">
          <img :src="component.image" :alt="component.name" class="hero-image" />
        </div>

        <div class="hero-info">
          <span class="category-badge">{{ category.label }}</span>
          <h1 class="component-name">{{ component.name }}</h1>
          <p class="component-price">CHF {{ component.price }}</p>
          <p class="component-desc">{{ component.description }}</p>

          <div class="hero-actions">
            <button
              class="btn-primary"
              @click="router.push({ name: 'simulator', query: { preselect: `${categoryId}:${itemId}` } })"
            >
              Add to Build
            </button>
            <button class="btn-secondary" @click="goBack">Back to list</button>
          </div>
        </div>
      </div>

      <!-- Specs table -->
      <section v-if="component.specs?.length" class="specs-section">
        <h2 class="section-title">Specifications</h2>
        <table class="specs-table">
          <tbody>
            <tr v-for="spec in component.specs" :key="spec.label">
              <td class="spec-label">{{ spec.label }}</td>
              <td class="spec-value">{{ spec.value }}</td>
            </tr>
          </tbody>
        </table>
      </section>

      <!-- Related components -->
      <section v-if="relatedComponents.length" class="related-section">
        <h2 class="section-title">Other {{ category.label }} options</h2>
        <div class="related-grid">
          <div
            v-for="rel in relatedComponents"
            :key="rel.id"
            class="related-card"
            @click="router.push({ name: 'component-detail', params: { categoryId: category.id, itemId: rel.id } })"
          >
            <img :src="rel.image" :alt="rel.name" class="related-image" />
            <div class="related-info">
              <span class="related-name">{{ rel.name }}</span>
              <span class="related-desc">{{ rel.description }}</span>
              <span class="related-price">CHF {{ rel.price }}</span>
            </div>
          </div>
        </div>
      </section>
    </template>
  </div>
</template>

<style scoped>
.detail-page {
  min-height: calc(100vh - var(--navbar-height));
  background: var(--color-bg);
  color: var(--color-text);
  padding: 0 0 4rem;
}

/* Loading / not found */
.state-center {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1.2rem;
  min-height: 40vh;
  color: var(--color-text-muted);
}

.not-found-title {
  font-size: 1.3rem;
  font-weight: 600;
}

.spinner {
  width: 36px;
  height: 36px;
  border: 3px solid #2a3148;
  border-top-color: var(--color-green);
  border-radius: 50%;
  animation: spin 0.7s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

/* Breadcrumb */
.breadcrumb {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 1.2rem 2.5rem;
  font-size: 0.82rem;
  color: var(--color-text-muted);
  border-bottom: 1px solid var(--color-border);
  background: var(--color-bg-secondary);
}

.btn-back {
  background: none;
  border: none;
  color: var(--color-green);
  font-size: 0.82rem;
  cursor: pointer;
  padding: 0;
  transition: color 0.15s;
}

.btn-back:hover {
  color: var(--color-green-hover);
  text-decoration: underline;
}

.crumb-sep {
  color: #3a4a65;
}

.crumb {
  color: var(--color-text-muted);
}

.crumb--active {
  color: var(--color-text);
  font-weight: 600;
}

/* Hero */
.hero {
  display: grid;
  grid-template-columns: 380px 1fr;
  gap: 3rem;
  max-width: 1100px;
  margin: 2.5rem auto;
  padding: 0 2.5rem;
}

.hero-image-wrap {
  background: #1a1f2e;
  border: 1px solid var(--color-border);
  border-radius: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2.5rem;
  aspect-ratio: 4/3;
}

.hero-image {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

.hero-info {
  display: flex;
  flex-direction: column;
  gap: 0.9rem;
  padding-top: 0.5rem;
}

.category-badge {
  display: inline-block;
  font-size: 0.72rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: var(--color-green);
  background: rgba(57, 211, 83, 0.1);
  border: 1px solid rgba(57, 211, 83, 0.25);
  border-radius: 6px;
  padding: 3px 10px;
  width: fit-content;
}

.component-name {
  font-size: 2rem;
  font-weight: 800;
  line-height: 1.2;
  color: var(--color-text);
}

.component-price {
  font-size: 1.8rem;
  font-weight: 800;
  color: var(--color-green);
}

.component-desc {
  font-size: 0.95rem;
  color: var(--color-text-muted);
  line-height: 1.7;
  max-width: 520px;
}

.hero-actions {
  display: flex;
  gap: 0.9rem;
  flex-wrap: wrap;
  margin-top: 0.6rem;
}

.btn-primary {
  background: var(--color-green);
  color: #000;
  font-weight: 700;
  font-size: 0.95rem;
  padding: 0.75rem 1.8rem;
  border: none;
  border-radius: 999px;
  cursor: pointer;
  transition: background 0.2s, transform 0.1s;
}

.btn-primary:hover {
  background: var(--color-green-hover);
  transform: translateY(-1px);
}

.btn-secondary {
  background: transparent;
  color: var(--color-text-muted);
  font-weight: 600;
  font-size: 0.95rem;
  padding: 0.75rem 1.8rem;
  border: 1px solid var(--color-border);
  border-radius: 999px;
  cursor: pointer;
  transition: border-color 0.2s, color 0.2s;
}

.btn-secondary:hover {
  border-color: var(--color-text-muted);
  color: var(--color-text);
}

/* Specs */
.specs-section,
.related-section {
  max-width: 1100px;
  margin: 2rem auto 0;
  padding: 0 2.5rem;
}

.section-title {
  font-size: 1.1rem;
  font-weight: 700;
  color: var(--color-text);
  margin-bottom: 1rem;
  padding-bottom: 0.6rem;
  border-bottom: 1px solid var(--color-border);
}

.specs-table {
  width: 100%;
  border-collapse: collapse;
  background: #1a1f2e;
  border: 1px solid var(--color-border);
  border-radius: 10px;
  overflow: hidden;
  font-size: 0.9rem;
}

.specs-table tbody tr {
  border-bottom: 1px solid var(--color-border);
  transition: background 0.12s;
}

.specs-table tbody tr:last-child {
  border-bottom: none;
}

.specs-table tbody tr:hover {
  background: #1e2435;
}

.spec-label {
  padding: 0.75rem 1.25rem;
  color: var(--color-text-muted);
  font-weight: 600;
  width: 35%;
  white-space: nowrap;
}

.spec-value {
  padding: 0.75rem 1.25rem;
  color: var(--color-text);
}

/* Related */
.related-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 1rem;
}

.related-card {
  display: flex;
  gap: 1rem;
  align-items: center;
  background: #1a1f2e;
  border: 1px solid var(--color-border);
  border-radius: 10px;
  padding: 1rem;
  cursor: pointer;
  transition: border-color 0.18s, background 0.18s;
}

.related-card:hover {
  border-color: var(--color-green);
  background: #1e2435;
}

.related-image {
  width: 64px;
  height: 48px;
  object-fit: contain;
  background: #252d42;
  border-radius: 6px;
  flex-shrink: 0;
}

.related-info {
  display: flex;
  flex-direction: column;
  gap: 3px;
  min-width: 0;
}

.related-name {
  font-size: 0.85rem;
  font-weight: 700;
  color: var(--color-text);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.related-desc {
  font-size: 0.73rem;
  color: var(--color-text-muted);
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  line-height: 1.4;
}

.related-price {
  font-size: 0.85rem;
  font-weight: 700;
  color: var(--color-green);
  margin-top: 2px;
}

/* Responsive */
@media (max-width: 820px) {
  .hero {
    grid-template-columns: 1fr;
  }

  .hero-image-wrap {
    aspect-ratio: 16/9;
    max-height: 240px;
  }

  .component-name {
    font-size: 1.5rem;
  }

  .component-price {
    font-size: 1.4rem;
  }
}
</style>
