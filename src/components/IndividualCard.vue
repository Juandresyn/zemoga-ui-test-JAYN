<script setup>
import { computed } from 'vue'
import { currentViewMode, isMobile, isTablet } from '../stores'
import { VIEW_MODE } from '../types'
import { dateToTime } from '../utils/dates'
import { truncateStr } from '../utils/strings'
import voteController, { getVoteById } from '../controllers/votes.controller'

import Icon from './IconLibrary.vue'
import Voting from './VotingUrn.vue'
import GaugeBar from './GaugeBar.vue'


const props = defineProps({
  voted: {
    type: String,
    default: null
  },
  individual: {
    type: Object,
    default: () => ({
      id: '',
      name: '',
      description: '',
      picture: '',
      date: Date.now(),
      category: '',
      votes: {
        positive: 0,
        negative: 0
      }
    })
  },
})

const handleVote = async (vote) => {
  voteController({ id: props.individual.id, vote })
}

const hasVote = computed(() => {
  const vote = getVoteById(props.individual.id)
  if (vote) {
    return vote.vote
  }

  return null
})

const isGrid = computed(() => currentViewMode.value === VIEW_MODE.GRID)
const isGridOrMobile = computed(() => isGrid.value || isMobile.value)
const nameLength = computed(() => {
  if (isGrid.value && isMobile.value) {
    return 21
  } else if (isTablet.value) {
    return 100
  } else {
    return 21
  }
})
</script>

<template>
  <div class="card" :class="`${ isGridOrMobile ? 'card-mode--grid' : '' }`">
    <div v-if="hasVote && !isGridOrMobile" class="card__current-vote floating" :class="`${ hasVote > 0 ? 'up' : 'down' }`">
      <Icon :name="`thumbs-${ hasVote > 0 ? 'up' : 'down' }`" dimension="24" />
    </div>
    <img
      loading="lazy"
      width="267"
      height="170"
      :src="individual.picture"
      :alt="`Profile picture of ${ individual.name }`">
    <div class="card__info">
      <div class="card__info-wrapper">
        <div class="card__info-main">
          <div class="card__info-heading">
            <div v-if="hasVote && isGridOrMobile" class="card__current-vote" :class="`${ hasVote > 0 ? 'up' : 'down' }`">
              <Icon :name="`thumbs-${ hasVote > 0 ? 'up' : 'down' }`" dimension="16" />
            </div>
            <h3>{{ truncateStr(individual.name, nameLength, '') }}</h3>
          </div>
          <p>{{ truncateStr(individual.description, 12, ' ') }}</p>
        </div>
        <div class="card__info-actions">
          <small v-if="hasVote">Thank you for your vote!</small>
          <small v-else>{{ dateToTime(individual.date) }} ago in <span>{{ individual.category }}</span></small>

          <Voting :on-vote="handleVote" :style="isGridOrMobile ? 'small' : 'normal'" :has-vote="hasVote" />
        </div>
      </div>

      <GaugeBar
        :style="isGridOrMobile || isTablet ? 'compact' : 'normal'"
        :votes="individual.votes"/>
    </div>
  </div>
</template>

<style scoped lang="scss">
.card {
  --gradient: linear-gradient(90deg, rgba(0, 0, 0, 0.0001) 0%, #888888 19.79%, #666666 50%, rgba(51, 51, 51, 0.6) 71.88%);

  position: relative;
  margin-bottom: 18px;
  overflow: hidden;
  color: var(--color-white);

  img {
    position: absolute;
    object-fit: cover;
    top: 0;
    height: 100%;

    @media screen and (min-width: 581px) and (max-width: 1023px) {
      left: -30px;
    }
  }

  &__info {
    background: var(--gradient);
    position: relative;
    box-sizing: content-box;

    &-wrapper {
      display: grid;
      grid-template-columns: 2.4fr 1fr;
      grid-column-gap: 44px;
    }

    &-main {
      padding-left: 220px;
      overflow: hidden;

      @media screen and (min-width: 581px) and (max-width: 1023px) {
        padding-left: 150px;
      }
    }

    &-actions {
      padding: 8px 14px 0 0;

      span {
        text-transform: capitalize;
      }
    }

    h3 {
      color: var(--color-white);
      font-size: 36px;
      margin: 0;
      line-height: 1.75;

      @media screen and (min-width: 581px) and (max-width: 1023px) {
        font-size: 28px;
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
      }
    }

    p {
      margin: 0 0 9px;
      font-size: 18px;
      font-weight: 300;
      line-height: 1.2;
    }
  }

  &__current-vote {
    padding: 10px;
    background-color: var(--color-yellow-600);
    display: inline-flex;

    &.up {
      background-color: var(--color-green-600);
    }

    &.floating {
      position: absolute;
      z-index: 2;
    }
  }

  small {
    font-size: 15px;
    text-align: right;
    display: block;
  }

  &-mode--grid {
    overflow: hidden;
    aspect-ratio: 1;
    margin-bottom: 0;

    img {
      width: 100%;

      @media screen and (min-width: 581px) and (max-width: 1023px) {
        left: 0;
      }
    }
    .card {
      &__info {
        height: 100%;
        background: linear-gradient(180deg, rgba(0, 0, 0, 0.0001) 0%, rgba(0, 0, 0, 0.6) 100%);
        display: flex;
        flex-direction: column;

        &-wrapper {
          display: block;
          height: 100%;
          display: flex;
          justify-content: flex-end;
          flex-direction: column;
        }

        &-main {
          padding: 12px 36px 5px 0;
        }

        h3 {
          line-height: 1.2;
          margin-bottom: 7px;
          padding-left: 36px;
          white-space: normal;
        }

        p {
          margin: 0;
          padding-left: 36px;
          font-size: 15px;
          white-space: initial;
        }
      }

      &__current-vote {
        box-sizing: border-box;
        padding: 7px;
        position: absolute;
        left: 0;
        bottom: 8px;
        background-color: var(--color-yellow);

        @media screen and (min-width: 581px) and (max-width: 1023px) {
          bottom: 5px;
        }

        &.up {
          background-color: var(--color-green);
        }
      }

      &__info-heading {
        position: relative;
      }
    }

    small {
      font-size: 12px;
    }
  }

  @media screen and (max-width: 580px) {
    width: 100%;
    min-width: 85%;

    &:not(:last-of-type) {
      margin-right: 12px;
    }
  }
}

</style>
