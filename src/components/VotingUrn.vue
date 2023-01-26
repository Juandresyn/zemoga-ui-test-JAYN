<script setup>
import { ref, onMounted } from 'vue'

import Icon from './IconLibrary.vue'

const props = defineProps({
  hasVote: {
    type: Number,
    default: null
  },
  onVote: {
    type: Function,
    default: () => null
  },
  style: {
    type: String,
    default: 'normal' // small, normal
  }
})

const selected = ref(null)
const voted = ref(false)

const handleVoting = () => {
  props.onVote(selected.value)

  if (voted.value) {
    voted.value = false
    return;
  }

  voted.value = true
}

onMounted(() => {
  if (props.hasVote !== null) {
    voted.value = true
    selected.value = props.hasVote
  }
})
</script>

<template>
  <div class="voting" :class="style">
    <Transition name="fade">
      <div v-if="!voted" class="voting__wrapper">
        <button
          class="voting--up"
          :class="{'active': selected == 1 }"
          @click.prevent="selected = 1">
          <Icon name="thumbs-up" :dimension="`${ style === 'small' ? 16 : 22 }`" />
        </button>
        <button
          class="voting--down"
          :class="{'active': selected == -1 }"
          @click.prevent="selected = -1">
          <Icon name="thumbs-down" :dimension="`${ style === 'small' ? 16 : 22 }`" />
        </button>
      </div>
    </Transition>

    <button
      class="voting--submit" :disabled="selected == null"
      @click.prevent="handleVoting">
      <span v-if="voted">Vote Again</span>
      <span v-else>Vote Now</span>
    </button>
  </div>
</template>

<style scoped lang="scss">
.voting {
  display: flex;
  margin: 22px 0;
  justify-content: flex-end;

  &__wrapper {
    display: flex;
    align-self: center;
  }

  button {
    cursor: pointer;
    display: flex;

    &:focus,
    &.active {
      border: 1px solid var(--color-white);
    }
  }

  &--submit {
    background-color: rgba(0, 0, 0, 0.6);
    border: 1px solid var(--color-white);
    color: var(--color-white);
    padding: 13px 8px;
    max-width: 135px;
    width: 100%;
    margin-left: 5px;
    justify-content: center;

    &[disabled] {
      opacity: .7;
    }
  }

  &--up,
  &--down {
    padding: 10px;
    margin: 0 5px;
  }

  &--up {
    background-color: var(--color-green-600);
    border: 1px solid var(--color-green-600);

    &:hover,
    &.active {
      background-color: var(--color-green);
    }
  }

  &--down {
    background-color: var(--color-yellow-600);
    border: 1px solid var(--color-yellow-600);

    &:hover,
    &.active {
      background-color: var(--color-yellow);
    }
  }

  &.small {
    margin: 12px 0;
    .voting {
      &--submit {
        font-size: 10px;
        padding: 11px 5px;
        min-width: 100px;
        align-self: center;
      }

      &--up,
      &--down {
        padding: 7px;
      }
    }
  }
}
</style>
