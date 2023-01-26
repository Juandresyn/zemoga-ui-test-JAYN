<script setup>
import { currentViewMode, isMobile, individuals } from '../src/stores'
import individualsGet from './controllers/individuals.controller'

import Card from './components/IndividualCard.vue'
import ViewPicker from './components/ViewPicker.vue'
import { onMounted } from 'vue';

onMounted(async () => {
  individuals.value = await individualsGet()
})
</script>

<template>
  <div>
    <div v-if="!isMobile" class="app__header">
      <h2>Previous Rulings</h2>
      <ViewPicker />
    </div>
    <div class="cards__wrapper" :class="currentViewMode">
      <Card
        v-for="individual in individuals"
        :key="individual.id"
        :individual="individual" />
    </div>
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

  .cards__wrapper {
    &.grid {
      display: grid;
      grid-template-columns: 1fr 1fr 1fr;
      grid-template-rows: 1fr 1fr;
      grid-column-gap: 27px;
      grid-row-gap: 27px;

      @media screen and (min-width: 581px) and (max-width: 1023px) {
        grid-template-columns: 1fr 1fr;
      }
    }


    @media screen and (max-width: 580px) {
      display: flex;
      width: 100%;
      overflow-x: scroll;
      white-space: nowrap;
    }
  }

</style>
