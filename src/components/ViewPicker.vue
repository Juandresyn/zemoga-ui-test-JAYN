<script setup>
import { ref } from 'vue';
import { viewModes, currentViewMode } from '../stores'

import Icon from './IconLibrary.vue'

const isOpen = ref(false)

const handleClick = (mode) => {
  currentViewMode.value = mode
  isOpen.value = false
}
</script>

<template>
  <div class="view-picker">
    <button class="view-picker__active" @click="isOpen = !isOpen">
      <span>{{ currentViewMode }}</span>
      <Icon name="chevron-down" />
    </button>
    <ul v-if="isOpen">
      <li
        v-for="mode in viewModes" :key="mode"
        role="button"
        @click="() => handleClick(mode)">
        {{ mode }}
      </li>
    </ul>
  </div>
</template>

<style scoped lang="scss">
  .view-picker {
    display: inline-block;
    border: 2px solid var(--color-darker-gray);
    min-width: 175px;
    padding: 12px;
    text-align: center;
    font-size: 14px;
    text-transform: capitalize;
    cursor: pointer;
    position: relative;
    background-color: var(--color-white);
    user-select: none;

    &__active {
      width: 100%;
      font-size: 14px;
      text-transform: capitalize;
      background: none;
      border: none;
      display: flex;
      align-items: center;
      cursor: pointer;

      &:focus {
        outline: none;
      }

      span {
        width: 100%;
      }
    }

    ul {
      position: absolute;
      z-index: 1;
      background-color: var(--color-white);
      width: 100%;
      left: -2px;
      top: 100%;
      border: 2px solid var(--color-darker-gray);
    }

    li {
      border-bottom: 2px solid var(--color-darker-gray);
      padding: 12px;

      &:last-of-type {
        border: 0;
      }
    }
  }
</style>
