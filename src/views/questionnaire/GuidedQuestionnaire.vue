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
            <div class="option-list">
                <button
                    v-for="activity in activities"
                    :key="activity.id"
                    @mouseenter="hoveredActivity = activity.id"
                    @mouseleave="hoveredActivity = null"
                    @click="selectedActivity = activity.id; next()">
                <span>{{ activity.label }}</span>
                <p v-if="hoveredActivity === activity.id">{{ activity.info }}</p>
            </button>
            </div>
         </template>

        <!-- Step 2: Budget -->
        <template v-else-if="step === 2">
            <p>What is your budget?</p>
            <div class="budget-card">
                <div class="budget-label">{{ budgetLabel }}</div>
                <input type="range" min="500" max="2500" step="100" v-model.number="budget" />
                <button type="button" class="ok-btn" @click="next">OK</button>
            </div>
        </template>

        <!-- Step 3: Build preference -->
         <template v-else-if="step === 3">
            <p>Would you like to build your PC yourself or receive it pre-assembled?</p>
            <div class="option-list">
                <button type="button" @click="buildPreference = 'self'; next()">Build it yourself</button>
                <button type="button" @click="buildPreference = 'prebuilt'; next()">Pre-built</button>
            </div>
         </template>

        <!-- Step 4: Design wishes -->
         <template v-else-if="step === 4">
            <p>Do you have any special design wishes?</p>
            <div class="option-list">
                <button type="button" @click="hasDesignWishes = 'yes'">
                    Yes
                    <textarea
                        v-if="hasDesignWishes === 'yes'"
                        v-model="designWishText"
                        placeholder="Write your wishes here..."
                        @click.stop
                    />
                </button>
                <button type="button" @click="hasDesignWishes = 'no'; next()">No</button>
            </div>
         </template>

         <!-- Navigation -->
        <div class="nav-bar">
            <button type="button" class="nav-btn" @click="back">← back</button>
        </div>
    </main>
</template>

<style scoped>
main {
  min-height: calc(100vh - 80px - 200px);
  background-color: var(--color-bg-card);
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 3rem 1rem 1rem;
  position: relative;
}
 
h1 {
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 1rem;
  text-align: center;
}
 
p {
  font-size: 1.1rem;
  margin-bottom: 1.5rem;
  text-align: center;
  color: var(--color-text);
}
 
/* Activity / build / design buttons */
.option-list {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  width: 100%;
  max-width: 340px;
}
 
.option-list button {
  background-color: #0d0f1a;
  border: 1px solid #2a2f3e;
  border-radius: 4px;
  padding: 0.75rem 1rem;
  color: var(--color-text);
  font-size: 1rem;
  cursor: pointer;
  text-align: center;
  transition: border-color 0.15s;
  width: 100%;
}
 
.option-list button:hover {
  border-color: var(--color-accent);
}
 
.option-list button p {
  font-size: 0.85rem;
  color: var(--color-text-muted);
  margin-top: 0.4rem;
  margin-bottom: 0;
  text-align: left;
}
 
/* Budget slider */
.budget-card {
  background-color: #0d0f1a;
  border: 1px solid #2a2f3e;
  border-radius: 4px;
  padding: 1.5rem 2rem;
  width: 100%;
  max-width: 340px;
}
 
.budget-label {
  font-size: 0.85rem;
  background: #2a3555;
  color: white;
  padding: 2px 8px;
  border-radius: 4px;
  display: inline-block;
  margin-bottom: 0.8rem;
}
 
input[type="range"] {
  width: 100%;
  accent-color: var(--color-accent);
  cursor: pointer;
}
 
/* Design textarea */
textarea {
  width: 100%;
  margin-top: 0.5rem;
  padding: 0.5rem;
  border-radius: 4px;
  border: none;
  background: white;
  color: #222;
  font-size: 0.9rem;
  resize: vertical;
  min-height: 70px;
  box-sizing: border-box;
}
 
/* Bottom nav */
.nav-bar {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: space-between;
  padding: 1rem 1.5rem;
  border-top: 1px solid var(--color-border);
}
 
.nav-btn {
  background: none;
  border: none;
  color: var(--color-text);
  font-size: 1rem;
  cursor: pointer;
  outline: none;
}
 
.nav-btn:hover {
  color: var(--color-green);
}

.ok-btn {
  margin-top: 1rem;
  width: 100%;
  background-color: var(--color-accent, #3b5bdb);
  color: white;
  border: none;
  border-radius: 4px;
  padding: 0.6rem 1rem;
  font-size: 1rem;
  cursor: pointer;
  transition: opacity 0.15s;
}

.ok-btn:hover {
  opacity: 0.85;
}
</style>