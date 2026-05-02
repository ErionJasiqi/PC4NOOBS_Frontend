<script setup>
import { ref, computed, watch, onMounted } from "vue";
import { useRouter, useRoute } from "vue-router";
import { getComponents, getRecommendations } from "@/api/requests.js";
import { mockCategories } from "@/mock/components.js";

const router = useRouter();
const route = useRoute();

const activity = route.query.activity || null;
const budget = Number(route.query.budget) || null;

const activityLabels = {
  "graphic-design": "Graphic Design",
  gaming: "Gaming",
  work: "Work",
  "film-production": "Film Production",
};

function computeLocalRecommendations(cats, budgetVal) {
  if (!budgetVal) return {};
  const target = budgetVal / cats.length;
  const recs = {};
  for (const cat of cats) {
    let best = cat.items[0];
    let bestDiff = Infinity;
    for (const item of cat.items) {
      const diff = Math.abs(item.price - target);
      if (diff < bestDiff) {
        bestDiff = diff;
        best = item;
      }
    }
    recs[cat.id] = best.id;
  }
  return recs;
}

const categories = ref([]);
const recommendedIds = ref({});
const openCategory = ref(null);
const selectedComponents = ref({});

const totalCost = computed(() =>
  Object.values(selectedComponents.value).reduce((sum, item) => sum + item.price, 0)
);

const budgetRemaining = computed(() =>
  budget !== null ? budget - totalCost.value : null
);

const isOverBudget = computed(() =>
  budgetRemaining.value !== null && budgetRemaining.value < 0
);

function getDropdownSections(cat) {
  const recId = recommendedIds.value[cat.id];
  const items = [...cat.items].sort((a, b) => {
    if (a.id === recId) return -1;
    if (b.id === recId) return 1;
    return 0;
  });

  if (!recId) return items.map((item) => ({ type: "item", item }));

  const sections = [];
  sections.push({ type: "separator", label: "Recommended for you" });
  sections.push({ type: "item", item: items[0] });
  if (items.length > 1) {
    sections.push({ type: "separator", label: "Other options" });
    for (let i = 1; i < items.length; i++) {
      sections.push({ type: "item", item: items[i] });
    }
  }
  return sections;
}

function isRecommended(catId, itemId) {
  return recommendedIds.value[catId] === itemId;
}

function isSelected(catId, itemId) {
  return selectedComponents.value[catId]?.id === itemId;
}

function toggleCategory(id) {
  openCategory.value = openCategory.value === id ? null : id;
}

function selectComponent(catId, item) {
  selectedComponents.value = { ...selectedComponents.value, [catId]: item };
}

function removeComponent(catId) {
  const next = { ...selectedComponents.value };
  delete next[catId];
  selectedComponents.value = next;
}

watch(selectedComponents, (val) => {
  localStorage.setItem("pc4noobs_build", JSON.stringify(val));
}, { deep: true });

onMounted(async () => {
  let cats = mockCategories;
  let recs = {};

  try {
    const data = await getComponents();
    if (data?.categories) cats = data.categories;
  } catch {
    // backend not available, using mock data
  }

  try {
    const data = await getRecommendations(activity, budget);
    if (data?.recommendations) {
      recs = Object.fromEntries(
        data.recommendations.map((r) => [r.category, r.componentId])
      );
    } else {
      recs = computeLocalRecommendations(cats, budget);
    }
  } catch {
    recs = computeLocalRecommendations(cats, budget);
  }

  categories.value = cats;
  recommendedIds.value = recs;

  // Restore saved build from localStorage
  const saved = localStorage.getItem("pc4noobs_build");
  if (saved) {
    try {
      selectedComponents.value = JSON.parse(saved);
    } catch {
      // corrupt storage — fall back to recommendations below
    }
  }

  // If nothing was restored, auto-select recommended components
  if (Object.keys(selectedComponents.value).length === 0) {
    for (const cat of cats) {
      const recId = recs[cat.id];
      if (recId) {
        const item = cat.items.find((i) => i.id === recId);
        if (item) selectedComponents.value[cat.id] = item;
      }
    }
  }

  // Preselect a component coming from the detail view ("Add to Build")
  const preselect = route.query.preselect;
  if (preselect) {
    const [catId, itmIdStr] = preselect.split(":");
    const cat = cats.find((c) => c.id === catId);
    if (cat) {
      const item = cat.items.find((i) => i.id === Number(itmIdStr));
      if (item) selectedComponents.value = { ...selectedComponents.value, [catId]: item };
    }
  }
});
</script>

<template>
  <div class="simulator-layout">
    <!-- Left: Component picker -->
    <section class="component-panel">
      <div class="panel-header">
        <h2>Components</h2>
        <div class="panel-tags">
          <span v-if="activity" class="tag tag--activity">
            {{ activityLabels[activity] || activity }}
          </span>
          <span v-if="budget" class="tag tag--budget">Budget: CHF {{ budget }}</span>
        </div>
      </div>

      <div v-for="cat in categories" :key="cat.id" class="category-block">
        <div
          class="category-title"
          :class="{ active: openCategory === cat.id }"
          @click="toggleCategory(cat.id)"
        >
          <div class="category-title-left">
            <span class="cat-label">{{ cat.label }}</span>
            <span v-if="selectedComponents[cat.id]" class="cat-selected-name">
              {{ selectedComponents[cat.id].name }}
            </span>
          </div>
          <div class="category-title-right">
            <span v-if="selectedComponents[cat.id]" class="cat-check">✓</span>
            <span class="chevron" :class="{ open: openCategory === cat.id }">›</span>
          </div>
        </div>

        <transition name="slide">
          <div v-if="openCategory === cat.id" class="category-dropdown">
            <template v-for="(entry, index) in getDropdownSections(cat)" :key="index">
              <div v-if="entry.type === 'separator'" class="items-separator" :class="{ 'sep--recommended': entry.label === 'Recommended for you' }">
                <span>{{ entry.label }}</span>
              </div>
              <div
                v-else
                class="component-item"
                :class="{
                  'is-recommended': isRecommended(cat.id, entry.item.id),
                  'is-selected': isSelected(cat.id, entry.item.id),
                }"
                @click="selectComponent(cat.id, entry.item)"
              >
                <img :src="entry.item.image" :alt="entry.item.name" class="item-thumb" />
                <div class="item-details">
                  <span class="item-name">{{ entry.item.name }}</span>
                  <span class="item-desc">{{ entry.item.description }}</span>
                </div>
                <div class="item-right">
                  <span class="item-price">CHF {{ entry.item.price }}</span>
                  <button
                    class="item-details-btn"
                    title="View details"
                    @click.stop="router.push({ name: 'component-detail', params: { categoryId: cat.id, itemId: entry.item.id } })"
                  >
                    ↗
                  </button>
                  <span v-if="isSelected(cat.id, entry.item.id)" class="selected-check">✓</span>
                </div>
              </div>
            </template>
          </div>
        </transition>
      </div>
    </section>

    <iframe
      src="https://play.unity.com/en/games/ea4c579b-5cb4-4cba-85e5-13038d032bac/simulator"
      width="960"
      height="600"
      frameborder="0"
      allowfullscreen
    >
    </iframe>
    <!--
    <main class="simulator-main">
      <div class="pc-image-wrapper">
        <img src="/src/assets/pc-homescreen.png" alt="PC Preview" />
      </div>
    </main>
    -->

    <!-- Right: Build summary -->
    <aside class="build-panel">
      <h2 class="build-title">Your Build</h2>

      <div v-if="budget" class="budget-display">
        <span class="budget-label">Budget</span>
        <span class="budget-value">CHF {{ budget }}</span>
      </div>

      <div class="build-list">
        <div v-for="cat in categories" :key="cat.id" class="build-slot">
          <span class="slot-cat">{{ cat.label }}</span>
          <div v-if="selectedComponents[cat.id]" class="slot-content">
            <span class="slot-name">{{ selectedComponents[cat.id].name }}</span>
            <div class="slot-footer">
              <span class="slot-price">CHF {{ selectedComponents[cat.id].price }}</span>
              <button class="slot-remove" @click="removeComponent(cat.id)" title="Remove">✕</button>
            </div>
          </div>
          <span v-else class="slot-empty">— Not selected —</span>
        </div>
      </div>

      <div class="total-section">
        <div class="total-row">
          <span class="total-label">Total</span>
          <span class="total-amount" :class="{ 'over-budget': isOverBudget }">CHF {{ totalCost }}</span>
        </div>
        <div v-if="budget" class="remaining-row" :class="{ 'over-budget': isOverBudget }">
          <span>{{ isOverBudget ? "Over budget" : "Remaining" }}</span>
          <span>{{ isOverBudget ? "-" : "" }}CHF {{ Math.abs(budgetRemaining) }}</span>
        </div>
      </div>

      <button class="purchase-btn" @click="router.push({ name: 'payment', query: { total: totalCost } })">
        Finalize PC / Purchase
      </button>
    </aside>
  </div>
</template>

<style scoped>
.simulator-layout {
  display: flex;
  min-height: calc(100vh - 70px);
  background: #1a1f2e;
  color: #e0e6f0;
}

/* === Left panel === */
.component-panel {
  flex: 1;
  min-width: 0;
  background: #1e2435;
  border-right: 1px solid #2a3148;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
}

.panel-header {
  padding: 18px 20px 14px;
  border-bottom: 1px solid #2a3148;
  display: flex;
  align-items: center;
  gap: 12px;
  flex-wrap: wrap;
  position: sticky;
  top: 0;
  background: #1e2435;
  z-index: 5;
}

.panel-header h2 {
  font-size: 1.05rem;
  font-weight: 700;
  margin: 0;
}

.panel-tags {
  display: flex;
  gap: 6px;
  flex-wrap: wrap;
}

.tag {
  font-size: 0.7rem;
  padding: 3px 9px;
  border-radius: 10px;
  font-weight: 600;
}

.tag--activity {
  background: #6c63ff1a;
  color: #9b8fff;
  border: 1px solid #6c63ff33;
}

.tag--budget {
  background: #39d3531a;
  color: #39d353;
  border: 1px solid #39d35333;
}

.category-block {
  border-bottom: 1px solid #2a3148;
}

.category-title {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 20px;
  cursor: pointer;
  transition: background 0.15s;
}

.category-title:hover,
.category-title.active {
  background: #252d42;
}

.category-title-left {
  display: flex;
  flex-direction: column;
  gap: 2px;
  min-width: 0;
}

.cat-label {
  font-size: 0.88rem;
  font-weight: 600;
  color: #c8d0e0;
}

.cat-selected-name {
  font-size: 0.73rem;
  color: #39d353;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 260px;
}

.category-title-right {
  display: flex;
  align-items: center;
  gap: 6px;
  flex-shrink: 0;
}

.cat-check {
  color: #39d353;
  font-size: 0.85rem;
}

.chevron {
  font-size: 1.3rem;
  color: #8a99b8;
  transition: transform 0.2s;
  display: inline-block;
  line-height: 1;
}

.chevron.open {
  transform: rotate(90deg);
}

/* Dropdown */
.category-dropdown {
  background: #161b28;
  overflow: hidden;
}

.items-separator {
  padding: 7px 20px 4px;
  font-size: 0.67rem;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: #4a5a78;
  border-top: 1px solid #1e2840;
}

.items-separator:first-child {
  border-top: none;
}

.sep--recommended {
  color: #39d353;
}

.component-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 10px 20px;
  cursor: pointer;
  border-left: 3px solid transparent;
  transition: background 0.12s, border-color 0.12s;
}

.component-item:hover {
  background: #1c2338;
}

.component-item.is-recommended {
  border-left-color: #39d353;
  background: #192030;
}

.component-item.is-recommended:hover {
  background: #1e2840;
}

.component-item.is-selected {
  background: #162416;
  border-left-color: #39d353;
}

.item-thumb {
  width: 50px;
  height: 38px;
  object-fit: contain;
  background: #252d42;
  border-radius: 4px;
  flex-shrink: 0;
}

.item-details {
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: 3px;
}

.item-name {
  font-size: 0.84rem;
  font-weight: 600;
  color: #e0e6f0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.item-desc {
  font-size: 0.73rem;
  color: #6a7a9a;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.item-right {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 4px;
  flex-shrink: 0;
}

.item-price {
  font-size: 0.84rem;
  font-weight: 700;
  color: #c8d0e0;
  white-space: nowrap;
}

.item-details-btn {
  background: none;
  border: 1px solid #2a3a55;
  color: #6a88b8;
  font-size: 0.7rem;
  border-radius: 4px;
  padding: 1px 5px;
  cursor: pointer;
  transition: border-color 0.15s, color 0.15s;
  line-height: 1.4;
}

.item-details-btn:hover {
  border-color: #39d353;
  color: #39d353;
}

.selected-check {
  color: #39d353;
  font-size: 0.8rem;
}

/* === Right panel === */
.build-panel {
  width: 290px;
  min-width: 290px;
  background: #13182a;
  border-left: 1px solid #2a3148;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
}

.build-title {
  font-size: 1.05rem;
  font-weight: 700;
  padding: 18px 20px 14px;
  margin: 0;
  border-bottom: 1px solid #2a3148;
  position: sticky;
  top: 0;
  background: #13182a;
  z-index: 5;
}

.budget-display {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
  border-bottom: 1px solid #1e2840;
  font-size: 0.82rem;
}

.budget-label {
  color: #5a6a8a;
}

.budget-value {
  color: #39d353;
  font-weight: 700;
}

.build-list {
  flex: 1;
  overflow-y: auto;
  padding: 6px 0;
}

.build-slot {
  padding: 10px 20px;
  border-bottom: 1px solid #1a2038;
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.slot-cat {
  font-size: 0.68rem;
  text-transform: uppercase;
  letter-spacing: 0.07em;
  color: #4a5a78;
  font-weight: 600;
}

.slot-content {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.slot-name {
  font-size: 0.8rem;
  color: #c8d4ec;
  line-height: 1.35;
}

.slot-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.slot-price {
  font-size: 0.82rem;
  font-weight: 700;
  color: #39d353;
}

.slot-remove {
  background: none;
  border: none;
  color: #3a4a65;
  cursor: pointer;
  font-size: 0.7rem;
  padding: 2px 4px;
  transition: color 0.15s;
  line-height: 1;
}

.slot-remove:hover {
  color: #e05555;
}

.slot-empty {
  font-size: 0.75rem;
  color: #2e3a52;
  font-style: italic;
}

/* Total section */
.total-section {
  padding: 14px 20px;
  border-top: 1px solid #2a3148;
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.total-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.total-label {
  font-size: 0.9rem;
  color: #8a99b8;
}

.total-amount {
  font-size: 1.15rem;
  font-weight: 700;
  color: #e0e6f0;
}

.remaining-row {
  display: flex;
  justify-content: space-between;
  font-size: 0.8rem;
  color: #3a8a5a;
}

.over-budget {
  color: #e05555 !important;
}

/* Purchase button */
.purchase-btn {
  margin: 14px 20px 20px;
  padding: 12px;
  background: #39d353;
  color: #0d1117;
  border: none;
  border-radius: 22px;
  font-size: 0.9rem;
  font-weight: 700;
  cursor: pointer;
  text-align: center;
  transition: background 0.15s, transform 0.1s;
  flex-shrink: 0;
}

.purchase-btn:hover {
  background: #2ebf47;
  transform: translateY(-1px);
}

/* Slide transition */
.slide-enter-active,
.slide-leave-active {
  transition: max-height 0.22s ease, opacity 0.18s ease;
  max-height: 700px;
  overflow: hidden;
}

.slide-enter-from,
.slide-leave-to {
  max-height: 0;
  opacity: 0;
}
</style>