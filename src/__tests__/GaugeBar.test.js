import {render, screen } from '@testing-library/vue'
import '@testing-library/jest-dom/extend-expect'
import GaugeBar from '../components/GaugeBar.vue'

test('Should render with correct percentages', async () => {
  const t = render(GaugeBar, {
    props: {
      votes: {
        positive: 7,
        negative: 3
      },
      style: 'compact'
    }
  })

  expect(t.container.firstChild.classList.contains('compact')).toBe(true)

  expect(screen.queryByText('70%').style.width).toBe('70%') // Only the positive is assigned width
  expect(screen.queryByText('30%').style.width).toBe('')
  expect(screen.queryByText('70%')).toBeTruthy()
  expect(screen.queryByText('30%')).toBeTruthy()
})
