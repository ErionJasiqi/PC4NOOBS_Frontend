<script setup>
import { useRouter} from 'vue-router';

const router = useRouter();
</script>

<template>
    <main>
        <h1>How do you want to proceed?</h1>
        <p>Choose your path to the perfect PC</p>

        <div>
            <div @click="router.push('/questionnaire/guided')">
                <img src="/src/assets/guided-mode.png" alt="Guided Mode" />
                <h2>Guided Mode</h2>
                <p>Take the expert quiz to discover PCs that suit you.</p>
            </div>

            <div @click="router.push('/simulator')">
                <img src="/src/assets/expert-mode.png" alt="Expert Mode" />
                <h2>Expert Mode</h2>
                <p>Want to test your knowledge or build the perfect PC yourself? Choose this mode.</p>
            </div>
        </div>
    </main>
</template>