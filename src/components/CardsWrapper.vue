<script setup>
import { onMounted } from 'vue';
import individualsGet from '../controllers/individuals.controller'
import { currentViewMode, individuals } from '../stores'
import Card from './IndividualCard.vue'

onMounted(async () => {
  individuals.value = await individualsGet()
})
</script>

<template>
  <div class="cards__wrapper" :class="currentViewMode">
    <Card
      v-for="individual in individuals"
      :key="individual.id"
      :individual="individual" />
  </div>
</template>

<style scoped lang="scss">
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
