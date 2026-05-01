<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useRoute } from "vue-router";
import { onMounted } from "vue";
import { a } from "vue-router/dist/index-Cu9B0wDz.mjs";

const router = useRouter();
const route = useRoute();

const activity = route.query.activity;
const budget = Number(route.query.budget);
const build = route.query.build;
const design = route.query.design;

// Komponentenliste mit Beispiel-Daten 
const categories = [
  {
    id: "motherboard",
    label: "Motherboard",
    items: [
      {
        id: 1,
        name: "Rog Crosshair X670E Hero",
        price: 350,
        performance: 8,
        socket: "AM5",
        image: "/src/assets/simulator-example.png",
        description:
          "Wir haben diese Hauptplatine für Sie ausgewählt, da sie für ihren vergleichsweise niedrigen Preis eine sehr gute Leistung bietet.",
      },
      {
        id: 2,
        name: "Rog Strix X670E-E Gaming WiFi",
        price: 400,
        image: "/src/assets/simulator-example.png",
        socket: "AM5",
        performance:9,
        description:"Wir haben diese Hauptplatine für Sie ausgewählt, da sie für ihren vergleichsweise niedrigen Preis eine sehr gute Leistung bietet.",
      },
      {
        id: 3,
        name: "TUF Gaming X670E-Plus",
        price: 200,
        image: "/src/assets/simulator-example.png",
        performance: 7,
        socket: "AM5",
        description:"Wir haben diese Hauptplatine für Sie ausgewählt, da sie für ihren vergleichsweise niedrigen Preis eine sehr gute Leistung bietet.",
      },
    ],
  },
  {
    id: "cpu",
    label: "CPU",
    items: [
      {
        id: 1,
        name: "Intel Core i7-14700K",
        price: 350,
        image: "/src/assets/simulator-example.png",
        performance:  10,      
        socket: "LGA1700",
        nr_cores: 20,
        nr_threads: 28,
        description:"Wir haben diese Hauptplatine für Sie ausgewählt, da sie für ihren vergleichsweise niedrigen Preis eine sehr gute Leistung bietet.",
      },
      {
        id: 2,
        name: "AMD Ryzen 7 7800X3D",
        price: 245.25,
        image: "/src/assets/simulator-example.png",
        performance:9,
        socket: "AM5",
        nr_cores: 8,
        nr_threads: 16,
        description:"Wir haben diese Hauptplatine für Sie ausgewählt, da sie für ihren vergleichsweise niedrigen Preis eine sehr gute Leistung bietet.",
      },
      {
        id: 3,
        name: "AMD Ryzen 5 9600X",
        price: 155,
        image: "/src/assets/simulator-example.png",
        performance: 8,
        socket: "AM5",
        nr_cores: 6,
        nr_threads: 12,
        description:"Wir haben diese Hauptplatine für Sie ausgewählt, da sie für ihren vergleichsweise niedrigen Preis eine sehr gute Leistung bietet.",
      },
    ],
  },
  {
    id: "rams",
    label: "RAM",
    items: [
      {
        id: 1,
        name: "Corsair Vengeance",
        price: 439,
        image: "/src/assets/simulator-example.png",
        performance: 8,
        description:"Wir haben diese Hauptplatine für Sie ausgewählt, da sie für ihren vergleichsweise niedrigen Preis eine sehr gute Leistung bietet.",
      },
      {
        id: 2,
        name: "Kingston Fury Beast",
        price: 129,
        image: "/src/assets/simulator-example.png",
        performance: 7,
        description:"Wir haben diese Hauptplatine für Sie ausgewählt, da sie für ihren vergleichsweise niedrigen Preis eine sehr gute Leistung bietet.",
      },
      {
        id: 3,
        name: "G.Skill Trident Z5 NEO RGB",
        price: 547,
        image: "/src/assets/simulator-example.png",
        performance: 9,
        description:"Wir haben diese Hauptplatine für Sie ausgewählt, da sie für ihren vergleichsweise niedrigen Preis eine sehr gute Leistung bietet.",
      },
    ],
  },
  {
    id: "case",
    label: "Case",
    items: [
      {
        id: 1,
        name: "Darkflash Tech Darkflash DS900WS computer case",
        price: 843,
        image: "/src/assets/simulator-example.png",
        performance: 6,
        description:"Wir haben diese Hauptplatine für Sie ausgewählt, da sie für ihren vergleichsweise niedrigen Preis eine sehr gute Leistung bietet.",
      },
      {
        id: 2,
        name: "be quiet! Silent Base 802 Window",
        price: 132,
        image: "/src/assets/simulator-example.png",
        performance: 8,
        description:"Wir haben diese Hauptplatine für Sie ausgewählt, da sie für ihren vergleichsweise niedrigen Preis eine sehr gute Leistung bietet.",
      },
      {
        id: 3,
        name: "Genesis Natec ARACANTA Midi Tower",
        price: 495,
        image: "/src/assets/simulator-example.png",
        performance: 7,
        description:"Wir haben diese Hauptplatine für Sie ausgewählt, da sie für ihren vergleichsweise niedrigen Preis eine sehr gute Leistung bietet.",
      },
    ],
  },
  {
    id: "psu",
    label: "PSU",
    items: [
      {
        id: 1,
        name: "Corsair PSU SF1000L",
        price: 187,
        image: "/src/assets/simulator-example.png",
        performance: 9,
        description:"Wir haben diese Hauptplatine für Sie ausgewählt, da sie für ihren vergleichsweise niedrigen Preis eine sehr gute Leistung bietet.",
      },
      {
        id: 2,
        name: "Gigabyte UD850GM PG5",
        price: 420,
        image: "/src/assets/simulator-example.png",
        performance: 7,
        description:"Wir haben diese Hauptplatine für Sie ausgewählt, da sie für ihren vergleichsweise niedrigen Preis eine sehr gute Leistung bietet.",
      },
      {
        id: 3,
        name: "ASUS TUF Gaming 1000W Gold White",
        price: 244,
        image: "/src/assets/simulator-example.png",
        performance: 8,
        description:"Wir haben diese Hauptplatine für Sie ausgewählt, da sie für ihren vergleichsweise niedrigen Preis eine sehr gute Leistung bietet.",
      },
    ],
  },
  {
    id: "gpu",
    label: "GPU",
    items: [
      {
        id: 1,
        name: "Gigabyte GeForce RTX 5060 Ti",
        price: 444.95,
        image: "/src/assets/simulator-example.png",
        performance:8,
        max_res: "4K",
        storage_cap: 8,
        req_power: 220,
        description:"Wir haben diese Hauptplatine für Sie ausgewählt, da sie für ihren vergleichsweise niedrigen Preis eine sehr gute Leistung bietet.",
      },
      {
        id: 2,
        name: "ASUS Dual GeForce RTX 5060 Ti OC",
        price: 242,
        image: "/src/assets/simulator-example.png",
        performance:7,
        max_res: "4K",
        storage_cap: 8,
        req_power: 220,
        description:"Wir haben diese Hauptplatine für Sie ausgewählt, da sie für ihren vergleichsweise niedrigen Preis eine sehr gute Leistung bietet.",
      },
      {
        id: 3,
        name: "GeForce RTX 5070 Ti Aero OC",
        price: 133,
        image: "/src/assets/simulator-example.png",
        performance:9,
        max_res: "4K",
        storage_cap: 8,
        req_power: 220,
        description:"Wir haben diese Hauptplatine für Sie ausgewählt, da sie für ihren vergleichsweise niedrigen Preis eine sehr gute Leistung bietet.",
      },
    ],
  },
  {
    id: "cooler",
    label: "Cooler",
    items: [
      {
        id: 1,
        name: "be quiet! Pure Rock 3",
        price: 26.50,
        image: "/src/assets/simulator-example.png",
        performance: 7,
        amount_fans: 1,
        airflow: 101.2,
        description:"Wir haben diese Hauptplatine für Sie ausgewählt, da sie für ihren vergleichsweise niedrigen Preis eine sehr gute Leistung bietet.",
      },
      {
        id: 2,
        name: "Peerless Assassin 120 SE",
        price: 47.90,
        image: "/src/assets/simulator-example.png",
        performance: 9,
        amount_fans: 2,
        airflow: 112.42,
        description:"Wir haben diese Hauptplatine für Sie ausgewählt, da sie für ihren vergleichsweise niedrigen Preis eine sehr gute Leistung bietet.",
      },
      {
        id: 3,
        name: "Arctic Freezer 36 A-RGB",
        price: 30.40,
        image: "/src/assets/simulator-example.png",
        performance: 8,
        amount_fans: 2,
        airflow: 120.5,
        description:"Wir haben diese Hauptplatine für Sie ausgewählt, da sie für ihren vergleichsweise niedrigen Preis eine sehr gute Leistung bietet.",
      },
    ],
  },
];

const openCategory = ref(null);
const selectedItem = ref(null);

function toggleCategory(id) {
  openCategory.value = openCategory.value === id ? null : id;
}

function openDetail(item) {
  selectedItem.value = item;
}

function closeDetail() {
  selectedItem.value = null;
}

function selectComponent(item) {
  // Komponente speichern / weiterverarbeiten – hier bei Bedarf erweitern
  selectedItem.value = null;
}

function scoreItem(item, categoryId) {
  let score = 0;

  const activityWeights = {
    gaming: 1.5,
    "film-production": 1.7,
    "graphic-design": 1.3,
    work: 1.0,
  };

  score += item.performance * (activityWeights[activity] || 1);


  if (item.price > budget / categories.length) {
    score -= 5;
  }

  score += item.performance / item.price * 100;

  return score;
}

function isCompatible(cpu, motherboard) {
  return cpu.socket === motherboard.socket;
}


function generateBuild() {
  const selected = {};


  const cpuCategory = categories.find(c => c.id === "cpu");

  selected.cpu = [...cpuCategory.items]
    .sort((a, b) => scoreItem(b, "cpu") - scoreItem(a, "cpu"))[0];


  const motherboardCategory = categories.find(c => c.id === "motherboard");

  selected.motherboard = motherboardCategory.items
    .filter(m => isCompatible(selected.cpu, m))
    .sort((a, b) => scoreItem(b, "motherboard") - scoreItem(a, "motherboard"))[0];

    
  categories.forEach(cat => {
    if (selected[cat.id]) return;

    selected[cat.id] = [...cat.items]
      .sort((a, b) => scoreItem(b, cat.id) - scoreItem(a, cat.id))[0];
  });

  return selected;
}

const selectedComponents = ref({});




onMounted(() => {
  selectedComponents.value = generateBuild();
});

if (activity === "gaming" && categoryId === "gpu") {
  score += item.performance * 2;
}

if (activity === "work" && categoryId === "gpu") {
  score -= 2;
}

</script>

<template>
  <div class="simulator-layout">
    <!-- Sidebar -->
    <aside class="sidebar">
      <h2 class="sidebar-heading">Komponenten</h2>

      <div v-for="cat in categories" :key="cat.id" class="category-block">
        <!-- Kategorie-Titel -->
        <div
          class="category-title"
          :class="{ active: openCategory === cat.id }"
          @click="toggleCategory(cat.id)"
        >
          {{ cat.label }}
        </div>

        <!-- Dropdown -->
        <transition name="slide">
          <div v-if="openCategory === cat.id" class="dropdown">
            <p class="dropdown-heading">Unsere Empfehlungen</p>

            <div
              v-for="item in cat.items"
              :key="item.id"
              class="dropdown-item"
              @click="openDetail(item)"
            >
              <span class="item-name">{{ item.name }}</span>
              <span class="item-price">{{ item.price }}</span>
              <img :src="item.image" :alt="item.name" class="item-thumb" />
              
            </div>
          </div>
        </transition>
      </div>

      <!-- Bezahl-Button -->
      <button
        type="button"
        class="payment-btn"
        @click="router.push('/payment')"
      >
        PC/ Kauf<br />finalisieren
      </button>
    </aside>

    <!-- ── Haupt-Bereich (PC-Bild) ─────────────────────────────────────── -->
    <main class="simulator-main">
      <div class="pc-image-wrapper">
        <img src="/src/assets/pc-homescreen.png" alt="PC Vorschau" />
      </div>
    </main>

    <transition name="fade">
      <div
        v-if="selectedItem"
        class="modal-overlay"
        @click.self="closeDetail"
      >
        <div class="modal">
          <!-- 3 Karten nebeneinander (wie in den Screenshots) -->
          <div class="modal-cards">
            <div
            v-for="item in cat.items"
            :key="item.id"
            class="dropdown-item"
            :class="{ selected: selectedComponents[cat.id]?.id === item.id }"
            @click="openDetail(item)">
              <img :src="item.image" :alt="item.name" class="modal-img" />
              <h3 class="modal-name">{{ item.name }}</h3>
              <p class="modal-desc">{{ item.description }}</p>
              <div class="modal-actions">
                <button type="button" class="btn-secondary" @click="closeDetail">
                  Auswahl ändern
                </button>
                <button type="button" class="btn-primary" @click="selectComponent(item)">
                  Komponent auswählen
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<style scoped>
.simulator-layout {
  display: flex;
  min-height: calc(100vh - 70px); /* Platz für Header */
  background: #1a1f2e;
  color: #e0e6f0;
  position: relative;
}

.selected {
  border-left: 3px solid #39d353;
  background: #2e3850;
}

.sidebar {
  width: 230px;
  min-width: 230px;
  background: #1e2435;
  border-right: 1px solid #2a3148;
  display: flex;
  flex-direction: column;
  padding: 0 0 24px 0;
  overflow-y: auto;
  position: relative;
  z-index: 10;
}

.sidebar-heading {
  font-size: 1rem;
  font-weight: 700;
  color: #e0e6f0;
  padding: 18px 20px 10px;
  margin: 0;
  letter-spacing: 0.03em;
}

.category-block {
  width: 100%;
}

.category-title {
  padding: 9px 20px;
  font-size: 0.9rem;
  color: #c8d0e0;
  cursor: pointer;
  transition: color 0.15s, background 0.15s;
  border-left: 3px solid transparent;
}

.category-title:hover,
.category-title.active {
  color: #fff;
  background: #252d42;
  border-left-color: #39d353;
}

.dropdown {
  background: #252d42;
  border-left: 3px solid #39d353;
  margin-left: 0;
  overflow: hidden;
}

.dropdown-heading {
  font-size: 0.72rem;
  color: #8a99b8;
  padding: 7px 14px 4px;
  margin: 0;
  text-transform: uppercase;
  letter-spacing: 0.06em;
}

.dropdown-item {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 7px 10px 7px 25px;
  cursor: pointer;
  border-bottom: 1px solid #1e2435;
  transition: background 0.12s;
}

.dropdown-item:last-child {
  border-bottom: none;
}

.dropdown-item:hover {
  background: #2e3850;
}

.item-name {
  font-size: 0.78rem;
  color: #d0d8ec;
  flex: 1;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 90px;
}

.item-price {
  font-size: 0.78rem;
  color: #c8d0e0;
  white-space: nowrap;
  margin-right: 4px;
}

.item-thumb {
  width: 32px;
  height: 32px;
  object-fit: contain;
  border-radius: 3px;
  background: #1a1f2e;
  flex-shrink: 0;
}

.item-info-btn {
  background: none;
  border: none;
  color: #8a99b8;
  font-size: 0.95rem;
  cursor: pointer;
  padding: 0 2px;
  line-height: 1;
  flex-shrink: 0;
}

.payment-btn {
  margin: 18px 14px 0;
  padding: 12px 10px;
  background: #39d353;
  color: #0d1117;
  border: none;
  border-radius: 22px;
  font-size: 0.88rem;
  font-weight: 700;
  cursor: pointer;
  text-align: center;
  line-height: 1.3;
  transition: background 0.15s, transform 0.1s;
}

.payment-btn:hover {
  background: #2ebf47;
  transform: translateY(-1px);
}

.simulator-main {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px;
  background: #1a1f2e;
}

.pc-image-wrapper {
  background: #111520;
  border-radius: 10px;
  padding: 16px;
  max-width: 760px;
  width: 100%;
}

.pc-image-wrapper img {
  width: 100%;
  height: auto;
  border-radius: 6px;
  display: block;
}

.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.72);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 100;
  padding: 20px;
}

.modal {
  background: #1e2435;
  border-radius: 10px;
  padding: 24px;
  max-width: 1100px;
  width: 100%;
  overflow-y: auto;
  max-height: 90vh;
}

.modal-cards {
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
  justify-content: center;
}

.modal-card {
  background: #252d42;
  border-radius: 8px;
  padding: 20px;
  flex: 1 1 280px;
  max-width: 340px;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.modal-card--active {
}

.modal-img {
  width: 120px;
  height: 90px;
  object-fit: contain;
  align-self: flex-start;
}

.modal-name {
  font-size: 1rem;
  font-weight: 700;
  color: #fff;
  margin: 0;
}

.modal-desc {
  font-size: 0.85rem;
  color: #9aa5bf;
  margin: 0;
  line-height: 1.5;
  flex: 1;
}

.modal-actions {
  display: flex;
  gap: 10px;
  flex-wrap: nowrap;
  margin-top: 8px;
}

.btn-primary,
.btn-secondary {
  padding: 9px 16px;
  border-radius: 22px;
  border: none;
  font-size: 0.82rem;
  font-weight: 700;
  cursor: pointer;
  transition: background 0.15s, transform 0.1s;
}

.btn-primary {
  background: #39d353;
  color: #0d1117;
}

.btn-primary:hover {
  background: #2ebf47;
}

.btn-secondary {
  background: #39d353;
  color: #0d1117;
}

.btn-secondary:hover {
  background: #2ebf47;
}

.slide-enter-active,
.slide-leave-active {
  transition: max-height 0.22s ease, opacity 0.18s ease;
  max-height: 400px;
  overflow: hidden;
}

.slide-enter-from,
.slide-leave-to {
  max-height: 0;
  opacity: 0;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.18s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>