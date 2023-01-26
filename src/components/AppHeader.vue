<script setup>
import { isMobile } from '../stores'
import ViewPicker from './ViewPicker.vue'

defineProps({
  title: {
    type: String,
    default: "",
    required: true
  }
})
</script>

<template>
  <div v-if="!isMobile" class="app__header">
    <h2>{{ title }}</h2>
    <ViewPicker />
  </div>
</template>

<style scoped lang="scss">
  .app__header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 36px;

    h2 {
      margin-bottom: 0
    }
  }
</style>
