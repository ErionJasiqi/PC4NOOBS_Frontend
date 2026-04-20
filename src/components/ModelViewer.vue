<script setup>
defineProps({
  src: String
})
</script>

<template>
  <model-viewer
    :src="src"
    camera-controls
    auto-rotate
    shadow-intensity="1"
    style="width: 100%; height: 500px; background: #111;"
  />
</template>