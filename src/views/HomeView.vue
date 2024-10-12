<template>
  <div>
    <InfoCard
      :title="infoStore.info.name"
      :description="infoStore.info.age"
      detail="Additional details here"
    />
  </div>
</template>

<script setup lang="ts">
import { defineComponent } from 'vue';
import InfoCard from '@/components/InfoCard.vue'
import { useInfoStore } from '@/stores/InformationStore'

const infoStore = useInfoStore()

infoStore.getInfo()

</script>

<style scoped>

</style>