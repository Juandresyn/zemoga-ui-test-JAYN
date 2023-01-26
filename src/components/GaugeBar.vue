<script setup>
import { ref, onMounted } from 'vue';

import Icon from './IconLibrary.vue'

const props = defineProps({
  votes: {
    type: Object,
    default: () => null,
    required: true
  },
  style: {
    type: String,
    default: "normal" // normal, compact
  }
})

const isCompact = ref(false)

const votesToPercent = (votes) => {
  const { positive, negative } = props.votes
  const total = positive + negative

  return `${ (votes*100/total).toFixed(1).replace(/\.0$/, '') }%`;
}

onMounted(() => {
  isCompact.value = props.style === "compact"
})
</script>

<template>
  <div class="bar" :class="style">
    <span class="bar-up" :style="{ width: votesToPercent(votes.positive) }">
      <Icon name="thumbs-up" :dimension="isCompact ? '15' : '22'" />
      {{ votesToPercent(votes.positive) }}
    </span>
    <span class="bar-down">
      {{ votesToPercent(votes.negative) }}
      <Icon name="thumbs-down" :dimension="isCompact ? '15' : '22'" />
    </span>
  </div>
</template>

<style scoped lang="scss">
  .bar {
    position: relative;
    display: table;
    width: 100%;

    span {
      vertical-align: middle;;
      width: 100%;
      display: table-cell;
      box-sizing: content-box;
      padding: 11px 16px;
      font-size: 27px;
      color: var(--color-white);
      font-weight: 300;
      line-height: 1.2;
      min-width: 102px;
      transition: width .5s linear;

      @media screen and (min-width: 581px) and (max-width: 1023px) {
        padding: 7px 12px;
        font-size: 18px;
      }
    }

    &-up {
      background: var(--color-green-600);
      text-align: right;
    }

    &-down {
      background: var(--color-yellow-600);
      text-align: right;
    }

    &.compact {
      span {
        padding: 7px 12px;
        font-size: 18px;
      }
    }
  }
</style>
