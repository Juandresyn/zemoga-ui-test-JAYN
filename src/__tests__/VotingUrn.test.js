import {render, screen, fireEvent } from '@testing-library/vue'
import VotingUrn from '../components/VotingUrn.vue'

test('Should render with submit disabled', async () => {
  const handleOnVoteMock = jest.fn();
  const t = render(VotingUrn, {
    props: {
      onVote: handleOnVoteMock,
      style: 'normal',
      hasVote: null
    }
  })

  // check the submit button exists and it is disabled by default
  expect(screen.queryByText('Vote Now')).toBeTruthy()
  const submitButton = () => t.container.querySelector('button.voting--submit')
  expect(submitButton().getAttribute('disabled')).toBe("")

  expect(t.container.querySelector('button.voting--up')).toBeTruthy()
  expect(t.container.querySelector('button.voting--down')).toBeTruthy()
})

test('Should remove voting buttons on submit', async () => {
  const handleOnVoteMock = jest.fn();
  const t = render(VotingUrn, {
    props: {
      onVote: handleOnVoteMock,
      style: 'normal',
      hasVote: null
    }
  })

  // check the submit button exists and it is disabled by default
  const submitButton = () => screen.queryByText('Vote Now')
  expect(submitButton()).toBeTruthy()


  const voteButtonUp = () => t.container.querySelector('button.voting--up')
  expect(voteButtonUp()).toBeTruthy()

  await fireEvent.click(voteButtonUp())
  // clicking one vote button adds a class 'active to it'
  expect(voteButtonUp().classList.contains('active')).toBeTruthy()

  expect(submitButton().getAttribute('disabled')).toBe(null)

  await fireEvent.click(submitButton())
  expect(voteButtonUp()).toBeFalsy()
  expect(submitButton()).toBeFalsy()
  expect(screen.queryByText('Vote Again')).toBeTruthy()
})

test('Should call prop "onVote" with correct value on submit', async () => {
  const handleOnVoteMock = jest.fn();
  let t = render(VotingUrn, {
    props: {
      onVote: handleOnVoteMock,
      style: 'normal',
      hasVote: null
    }
  })

  const submitButton = () => screen.queryByText('Vote Now')
  const voteButtonUp = () => t.container.querySelector('button.voting--up')

  await fireEvent.click(voteButtonUp())
  await fireEvent.click(submitButton())

  expect(handleOnVoteMock).toBeCalledWith(1);

  t = render(VotingUrn, {
    props: {
      onVote: handleOnVoteMock,
      style: 'normal',
      hasVote: null
    }
  })

  const voteButtonDown = () => t.container.querySelector('button.voting--down')

  await fireEvent.click(voteButtonDown())
  await fireEvent.click(submitButton())

  expect(handleOnVoteMock).toBeCalledWith(-1);
})

test('Should be able to vote again', async () => {
  const handleOnVoteMock = jest.fn();
  let t = render(VotingUrn, {
    props: {
      onVote: handleOnVoteMock,
      style: 'normal',
      hasVote: null
    }
  })

  const submitButton = () => screen.queryByText('Vote Now')
  const voteButtonUp = () => t.container.querySelector('button.voting--up')

  await fireEvent.click(voteButtonUp())
  await fireEvent.click(submitButton())
  expect(submitButton()).toBeFalsy()

  const voteAgain = () => screen.queryByText('Vote Again')
  expect(voteAgain()).toBeTruthy()
  await fireEvent.click(voteAgain())

  expect(submitButton()).toBeTruthy()
})

test('Should show "voted" state when passing value to the "hasVote" prop', async () => {
  const handleOnVoteMock = jest.fn();
  render(VotingUrn, {
    props: {
      onVote: handleOnVoteMock,
      style: 'normal',
      hasVote: 1
    }
  })

  setTimeout(() => {
    const submitButton = () => screen.queryByText('Vote Now')
    const voteAgain = () => screen.queryByText('Vote Again')

    expect(submitButton()).toBeFalsy()
    expect(voteAgain()).toBeTruthy()
  }, 0);
})
