<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const categories = [
    {
        id: 'motherboard',
        label: 'Motherboard',
        items: [
            { id: 1, name: 'Example', price: '350.-', image: '/src/assets/simulator-example.png', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Haec Hauptplatine wurde für Sie ausgewählt.' }
        ]
    },
    {
        id: 'cpu',
        label: 'Processors',
        items: [
            { id: 1, name: 'Example', price: '350.-', image: '/src/assets/simulator-example.png', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Haec Hauptplatine wurde für Sie ausgewählt.' }
        ]
    },
    {
        id: 'ram',
        label: 'RAMs',
        items: [
            { id: 1, name: 'Example', price: '350.-', image: '/src/assets/simulator-example.png', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Haec Hauptplatine wurde für Sie ausgewählt.' }
        ]
    },
    {
        id: 'case',
        label: 'Case',
        items: [
            { id: 1, name: 'Example', price: '350.-', image: '/src/assets/simulator-example.png', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Haec Hauptplatine wurde für Sie ausgewählt.' }
        ]
    },
    {
        id: 'psu',
        label: 'PSUs',
        items: [
            { id: 1, name: 'Example', price: '350.-', image: '/src/assets/simulator-example.png', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Haec Hauptplatine wurde für Sie ausgewählt.' }
        ]
    },
    {
        id: 'gpu',
        label: 'Graphics Cards',
        items: [
            { id: 1, name: 'Example', price: '350.-', image: '/src/assets/simulator-example.png', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Haec Hauptplatine wurde für Sie ausgewählt.' }
        ]
    },
    {
        id: 'cooler',
        label: 'Coolers',
        items: [
            { id: 1, name: 'Example', price: '350.-', image: '/src/assets/simulator-example.png', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Haec Hauptplatine wurde für Sie ausgewählt.' }
        ]
    }
]

const openCategory = ref(null)
const selectedItem = ref(null)

function toggleCategory(id) {
    openCategory.value = openCategory.value === id ? null : id
}

function openDetail(item) {
    selectedItem.value = item
}

function closeDetail() {
    selectedItem.value = null
}
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
        <button type="button" class="payment-btn" @click="router.push('/payment')">Finalize PC / Purchase</button>
        </aside>

        <!-- Main area (PC image placeholder) -->
        <main class="simulator-main">
            <img src="/src/assets/pc-homescreen.png" alt="PC Preview" />
        </main>

        <!-- Detail modal -->
        <div v-if="selectedItem" class="modal-overlay" @click.self="closeDetail">
            <div class="modal">
                <img :src="selectedItem.image" :alt="selectedItem.name" class="modal-img" />
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