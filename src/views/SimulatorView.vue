<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import ModelViewer from "../components/ModelViewer.vue";

const router = useRouter();

const queryParams = router.currentRoute.value.query;

const categories = [
  [
    {
      id: "motherboard",
      label: "Motherboard",
      items: [
        {
          id: 1,
          name: "ASUS ROG Strix B650-E",
          price: 349,
          image: "/src/assets/simulator-example.png",
          sock_cpu: "AM5",
          form_factor: "ATX",
          sock_mem: "DDR5",
          m2: 2,
          max_ram: 256,
          sock_ram: 4,
          sataIII: 4,
          description:
            "High-end AM5 motherboard with PCIe 5.0 support and strong VRM cooling.",
        },
      ],
    },
    {
      id: "cpu",
      label: "Processors",
      items: [
        {
          id: 1,
          name: "AMD Ryzen 5 7600X",
          price: 299,
          image: "/src/assets/simulator-example.png",
          nr_cores: 6,
          nr_threads: 12,
          description:
            "Fast 6-core processor ideal for gaming and everyday performance.",
        },
      ],
    },
    {
      id: "case",
      label: "Case",
      items: [
        {
          id: 1,
          name: "NZXT H7 Flow",
          price: "139.-",
          image: "/src/assets/simulator-example.png",
          design: "Midi Tower",
          height: 54.40 ,
          length: 46.80,
          width: 24.40 , 
          weight: 11.10 ,
          description: "Clean mid-tower case optimized for airflow.",
        },
        {
          id: 2,
          name: "Corsair 4000D Airflow",
          price: "119.-",
          image: "/src/assets/simulator-example.png",
          height: 54.40 ,
          length: 46.80,
          width: 24.40 , 
          weight: 11.10 ,
          description:
            "Popular PC case known for excellent cooling and build quality.",
        },
        {
          id: 3,
          name: "Lian Li Lancool III",
          price: "169.-",
          image: "/src/assets/simulator-example.png",
          height: 54.40 ,
          length: 46.80,
          width: 24.40 , 
          weight: 11.10 ,
          description:
            "Premium case with spacious interior and strong airflow.",
        },
        {
          id: 4,
          name: "Fractal Design Meshify 2",
          price: "179.-",
          image: "/src/assets/simulator-example.png",
          height: 54.40 ,
          length: 46.80,
          width: 24.40 , 
          weight: 11.10 ,
          description: "High airflow case with modular layout options.",
        },
        {
          id: 5,
          name: "Phanteks Eclipse G360A",
          price: "129.-",
          image: "/src/assets/simulator-example.png",
          height: 54.40 ,
          length: 46.80,
          width: 24.40 , 
          weight: 11.10 ,
          description: "RGB gaming case with great cooling performance.",
        },
        {
          id: 6,
          name: "Cooler Master TD500 Mesh",
          price: "149.-",
          image: "/src/assets/simulator-example.png",
          height: 54.40 ,
          length: 46.80,
          width: 24.40 , 
          weight: 11.10 ,
          description:
            "Stylish case featuring polygon mesh front panel and RGB fans.",
        },
      ],
    },
    {
      id: "psu",
      label: "PSUs",
      items: [
        {
          id: 1,
          name: "Corsair RM750x",
          price: "149.-",
          image: "/src/assets/simulator-example.png",
          Watt: 750,
          description:
            "Reliable 750W fully modular power supply with gold efficiency.",
        },
        {
          id: 2,
          name: "Seasonic Focus GX-850",
          price: "169.-",
          image: "/src/assets/simulator-example.png",
          Watt: 850,
          description: "High quality 850W PSU with excellent stability.",
        },
        {
          id: 3,
          name: "be quiet! Straight Power 12 850W",
          price: "189.-",
          image: "/src/assets/simulator-example.png",
          Watt: 850,
          description: "Silent and efficient PSU for high-end systems.",
        },
        {
          id: 4,
          name: "Cooler Master MWE Gold 750",
          price: "129.-",
          image: "/src/assets/simulator-example.png",
          watt: 750,
          description: "Affordable gold-rated power supply.",
        },
        {
          id: 5,
          name: "EVGA SuperNOVA 850 G7",
          price: "179.-",
          image: "/src/assets/simulator-example.png",
          Watt: 850,
          description: "Premium modular PSU with excellent reliability.",
        },
        {
          id: 6,
          name: "Corsair HX1000i",
          price: "259.-",
          image: "/src/assets/simulator-example.png",
          Watt: 1000,
          description: "High-capacity 1000W PSU for extreme builds.",
        },
      ],
    },
    {
      id: "gpu",
      label: "Graphics Cards",
      items: [
        {
          id: 1,
          name: "NVIDIA RTX 4060 Ti",
          price: "449.-",
          image: "/src/assets/simulator-example.png",
          max_res: "7680 x 4320",
          storage_cap: 8,
          req_power: 160,
          description:
            "Efficient GPU designed for 1080p and entry 1440p gaming.",
        },
        {
          id: 2,
          name: "NVIDIA RTX 4070 Super",
          price: "679.-",
          max_res: "7680 x 4320",
          storage_cap: 8,
          req_power: 160,
          image: "/src/assets/simulator-example.png",
          description: "Excellent performance for modern 1440p gaming.",
        },
        {
          id: 3,
          name: "NVIDIA RTX 4080 Super",
          price: "1199.-",
          max_res: "7680 x 4320",
          storage_cap: 8,
          req_power: 160,
          image: "/src/assets/simulator-example.png",
          description: "High-end GPU capable of strong 4K gaming performance.",
        },
        {
          id: 4,
          name: "AMD Radeon RX 7700 XT",
          price: "499.-",
          max_res: "7680 x 4320",
          storage_cap: 8,
          req_power: 160,
          image: "/src/assets/simulator-example.png",
          description: "Great mid-range GPU for high-refresh 1440p gaming.",
        },
        {
          id: 5,
          name: "AMD Radeon RX 7800 XT",
          price: "559.-",
          max_res: "7680 x 4320",
          storage_cap: 8,
          req_power: 160,
          image: "/src/assets/simulator-example.png",
          description:
            "Powerful graphics card delivering strong raster performance.",
        },
        {
          id: 6,
          name: "AMD Radeon RX 7900 XTX",
          price: "1049.-",
          max_res: "7680 x 4320",
          storage_cap: 8,
          req_power: 160,
          image: "/src/assets/simulator-example.png",
          description: "Flagship AMD GPU designed for high-end gaming systems.",
        },
      ],
    },
    {
      id: "cooler",
      label: "Coolers",
      items: [
        {
          id: 1,
          name: "Noctua NH-D15",
          price: "119.-",
          image: "/src/assets/simulator-example.png",
          amount_fans: 2,
          airflow: 140.2,
          description:
            "Legendary air cooler known for exceptional cooling performance.",
        },
        {
          id: 2,
          name: "be quiet! Dark Rock Pro 5",
          price: "109.-",
          image: "/src/assets/simulator-example.png",
          amount_fans: 2,
          airflow: 140.2,
          description: "Ultra-quiet high-end air cooler.",
        },
        {
          id: 3,
          name: "Corsair iCUE H100i Elite",
          price: "169.-",
          image: "/src/assets/simulator-example.png",
          amount_fans: 2,
          airflow: 140.2,
          description: "240mm AIO liquid cooler with RGB lighting.",
        },
        {
          id: 4,
          name: "NZXT Kraken 360",
          price: "229.-",
          image: "/src/assets/simulator-example.png",
          amount_fans: 2,
          airflow: 140.2,
          description: "High-end 360mm liquid cooler with LCD pump display.",
        },
        {
          id: 5,
          name: "Arctic Liquid Freezer II 280",
          price: "139.-",
          image: "/src/assets/simulator-example.png",
          amount_fans: 2,
          airflow: 140.2,
          description: "Highly efficient liquid cooler with excellent value.",
        },
        {
          id: 6,
          name: "Cooler Master Hyper 212 Halo",
          price: "59.-",
          image: "/src/assets/simulator-example.png",
          amount_fans: 2,
          airflow: 140.2,
          description: "Classic budget air cooler with RGB fan.",
        },
      ],
    },
  ],
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

function configurePC() {}
</script>

<template>
  <div class="simulator-layout">
    <!-- Sidebar -->
    <aside class="sidebar">
      <h2>Components</h2>

      <div v-for="category in categories" :key="category.id">
        <!-- Category title -->
        <div @click="toggleCategory(category.id)" class="category-title">
          {{ category.label }}
        </div>

        <!-- Dropdown -->
        <div v-if="openCategory === category.id" class="dropdown">
          <p class="dropdown-heading">Our Recommendations</p>

          <div
            v-for="item in category.items"
            :key="item.id"
            class="dropdown-item"
            @click="openDetail(item)"
          >
            <span class="item-name">{{ item.name }}</span>
            <span class="item-price">{{ item.price }}</span>
            <img :src="item.image" :alt="item.name" class="item-thumb" />
          </div>
        </div>
      </div>

      <!-- Payment button -->
      <button
        type="button"
        class="payment-btn"
        @click="router.push('/payment')"
      >
        Finalize PC / Purchase
      </button>
    </aside>

    <!-- Main area (PC image placeholder) -->
    <main class="simulator-main">
      <div class="pc-image-wrapper">
        <model-viewer
  src="/3DModels/cpu_cooler.glb"
  camera-controls
  auto-rotate
  style="width: 100%; height: 500px;"
  camera-orbit="0deg 75deg 2.5m"
  field-of-view="45deg"
  exposure="1"
  shadow-intensity="1"
  ar
></model-viewer>
      </div>
    </main>

    <!-- Detail modal -->
    <div v-if="selectedItem" class="modal-overlay" @click.self="closeDetail">
      <div class="modal">
        <img
          :src="selectedItem.image"
          :alt="selectedItem.name"
          class="modal-img"
        />
        <div class="modal-info">
          <h3>{{ selectedItem.name }}</h3>
          <p>{{ selectedItem.description }}</p>
        </div>
        <div class="modal-actions">
          <button type="button" @click="closeDetail">Change selection</button>
          <button type="button" @click="closeDetail">Select component</button>
        </div>
      </div>
    </div>
  </div>
</template>
