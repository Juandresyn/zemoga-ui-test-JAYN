import { render } from '@testing-library/vue'
import CardsWrapper from '../components/CardsWrapper.vue'
import { currentViewMode } from '../stores'
import { VIEW_MODE } from '../types'

test('Should update view mode in classList accordingly', async () => {
  currentViewMode.value = VIEW_MODE.GRID
  let t = render(CardsWrapper)

  expect(t.container.firstChild.classList.contains(VIEW_MODE.GRID)).toBe(true)

  currentViewMode.value = VIEW_MODE.LIST
  t = render(CardsWrapper)

  expect(t.container.firstChild.classList.contains(VIEW_MODE.LIST)).toBe(true)
})
