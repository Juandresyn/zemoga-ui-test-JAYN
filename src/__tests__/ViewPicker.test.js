import {render, fireEvent } from '@testing-library/vue'
import { currentViewMode } from '../stores'
import ViewPicker from '../components/ViewPicker.vue'

test('List should not be opened', async () => {
  const t = render(ViewPicker)

  expect(t.container.querySelector('ul')).toBeFalsy()
})

test('List should open on click', async () => {
  const t = render(ViewPicker)
  const button = t.container.querySelector('button')
  await fireEvent.click(button)

  expect(t.container.querySelector('ul')).toBeTruthy()
})

test('Clicking list item should close list and change button text', async () => {
  const t = render(ViewPicker)
  const trigger = t.container.querySelector('button')
  await fireEvent.click(trigger)
  expect(t.container.querySelector('ul')).toBeTruthy()

  const firstLi = t.container.querySelector('ul > li:first-of-type')
  const firstLiText = firstLi.innerText
  expect(firstLi).toBeTruthy()
  await fireEvent.click(firstLi)

  expect(t.container.querySelector('ul')).toBeFalsy()

  let buttonText = t.container.querySelector('button').innerText

  expect(buttonText).toBe(firstLiText)

  await fireEvent.click(trigger)
  const lastLi = t.container.querySelector('ul > li:last-of-type')
  const lastLiText = lastLi.innerText
  expect(lastLi).toBeTruthy()
  await fireEvent.click(lastLi)

  expect(t.container.querySelector('ul')).toBeFalsy()

  buttonText = t.container.querySelector('button').innerText

  expect(buttonText).toBe(lastLiText)
})

test('Should update currentViewMode ref', async () => {
  const t = render(ViewPicker)
  const trigger = t.container.querySelector('button')

  // Open the selector
  await fireEvent.click(trigger)
  expect(t.container.querySelector('ul')).toBeTruthy()

  // click the first <li>
  const firstLi = t.container.querySelector('ul > li:first-of-type')
  const firstLiText = firstLi.innerText
  expect(firstLi).toBeTruthy()
  await fireEvent.click(firstLi)

  // check the trigger text changed
  setTimeout(() => {
    const value = currentViewMode.value
    expect(value).toBe(firstLiText)
  }, 0);

  // click the last <li>
  await fireEvent.click(trigger)
  const lastLi = t.container.querySelector('ul > li:last-of-type')
  const lastLiText = lastLi.innerText
  expect(lastLi).toBeTruthy()
  await fireEvent.click(lastLi)

  // check the trigger text changed
  setTimeout(() => {
    const value = currentViewMode.value
    expect(value).toBe(lastLiText)
  }, 0);
})
