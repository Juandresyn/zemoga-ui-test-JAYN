import {render, screen } from '@testing-library/vue'
import AppHeader from '../components/AppHeader.vue'

test('Should render with title', async () => {
  render(AppHeader, {
    props: {
      title: 'My title 123'
    }
  })

  expect(screen.queryByText('My title 123')).toBeTruthy()
})
