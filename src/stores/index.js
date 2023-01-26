import { ref } from 'vue'
import { VIEW_MODE } from '../types'

export const individuals = ref([])
export const myVotes = ref([])
export const viewModes = [VIEW_MODE.LIST, VIEW_MODE.GRID]
export const currentViewMode = ref(viewModes[0])
export const isMobile = ref(window.innerWidth < 580)
export const isTablet = ref(window.innerWidth > 580 && window.innerWidth < 1025)

window.addEventListener('resize', () => {
  isMobile.value = window.innerWidth < 580
  isTablet.value = window.innerWidth > 580 && window.innerWidth < 1025
})
