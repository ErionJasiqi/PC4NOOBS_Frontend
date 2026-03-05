<script setup>
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter()

const step = ref(1)
const totalSteps = 4

// Step 1: Activity
const activities = [
    {
        id: 'graphic-design',
        label: 'Graphic Design',
        info: 'For optimal graphic design, mid-end PCs are recommended.'
    },
    {
        id: 'gaming',
        label: 'Gaming',
        info: 'For optimal gaming, mid- to high-end PCs are recomended. This activity requires stronger components.'
    },
    {
        id: 'work',
        label: 'Work',
        info: 'For productive work, low- to mid-end PCs are recommended. Work rarely requires extraordinary processing power.'
    },
    {
        id: 'film-production',
        label: 'Film Production',
        info: 'For quality film production, high-end PCs are recommended to speed up processes, at the cost of higher prices.'
    }
]
const selectedActivity = ref(null)
const hoveredActivity = ref(null)

//Step 2: Budget
const budget = ref(500)
const budgetLabel = computed(() => {
    if (budget.value >= 2500) return '>=2500'
    if (budget.value <= 500) return '<=500'
    return `${budget.value}`
})

//Step 3: Build preference
const buildPreference = ref(null)

//Step 4: Design wishes
const hasDesignWishes = ref(null)
const designWishText = ref('')

function next() {
    if (step.value < totalSteps) {
        step.value++
    } else {
        router.push({
            path: '/simulator',
            query: {
                activity: selectedActivity.value,
                budget: budget.value,
                build: buildPreference.value,
                design: hasDesignWishes.value === 'yes' ? designWishText.value : 'none'
            }
        })
    }
}

function back() {
    if (step.value > 1) {
        step.value--
    } else {
        router.push('/questionnaire')
    }
}
</script>

<template>
    <main>
        <h1>Questionnaire</h1>

        <!-- Step 1: Activity -->
         <template v-if="step === 1">
            <p>Which activities would you like to use a PC for?</p>
            <div>
                <button
                    v-for="activity in activities"
                    :key="activity.id"
                    @mouseenter="hoveredActivity = activity.id"
                    @mouseleave="hoveredActivity = null"
                    @click="selectedActivity = activity.id">
                <span>{{ activity.label }}</span>
                <p v-if="hoveredActivity === activity.id || selectedActivity === activity.id">
                    {{ activity.info }}
                </p>
            </button>
            </div>
         </template>

        <!-- Step 2: Budget -->
         <template v-else-if="step === 2">
            <p>What is your budget?</p>
            <div>
                <span>{{ budgetLabel }}</span>
                <input
                    type="range"
                    min="500"
                    max="2500"
                    step="100"
                    v-model.number="budget" 
                />
            </div>
         </template>

        <!-- Step 3: Build preference -->
         <template v-else-if="step === 3">
            <p>Would you like to build your PC yourself or receive it pre-assembled?</p>
            <div>
                <button type="button" @click="buildPreference = 'self'; next()">Build it yourself</button>
                <button type="button" @click="buildPreference = 'prebuilt'; next()">Pre-built</button>
            </div>
         </template>

        <!-- Step 4: Design wishes -->
         <template v-else-if="step === 4">
            <p>Do you have any special design wishes?</p>
            <div>
                <button type="button" @click="hasDesignWish = 'yes'">
                    Yes
                    <textarea
                        v-if="hasDesignWish === 'yes'"
                        v-model="designWishText"
                        placeholder="Write your wishes here..."
                        @click.stop
                    />
                </button>
                <button type="button" @click="hasDesignWish = 'no'; next()">No</button>
            </div>
         </template>

         <!-- Navigation -->
        <div>
            <button type="button" @click="back">← back</button>
            <button type="button" @click="next">
                {{ step === totalSteps ? 'simulation →' : 'next →' }}
            </button>
        </div>
    </main>
</template>