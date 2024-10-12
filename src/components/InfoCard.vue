<template>
  <div class="info-card">
    <h2>{{ title }}</h2>
    <p>{{ description }}</p>
    <p><strong>{{ detail }}</strong></p>
  </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue'

const props = defineProps<{
  title: string
  description: string
  detail: string
}>()

</script>

<style scoped>
.info-card {
  border: 1px solid #ccc;
  border-radius: 8px;
  padding: 16px;
  max-width: 300px;
  background-color: #f9f9f9;
}

h2 {
  font-size: 20px;
  margin-bottom: 8px;
}

p {
  margin: 0;
  font-size: 16px;
}
</style>
