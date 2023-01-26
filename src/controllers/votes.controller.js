import { myVotes, individuals } from "../stores"
import Database from '../persistentLayer/db'
import { BD_ENTITIES } from '../types'

const dbVotes = new Database(BD_ENTITIES.VOTES)
const dbIndividuals = new Database(BD_ENTITIES.INDIVIDUALS)

const initVotes = async () => {
  myVotes.value = await dbVotes.getAll()
}

initVotes()

export const getVoteById = (id) => {
  if (!id) return

  const vote = myVotes.value.find(v => v.id === id)
  if (vote) return vote

  return false
}

const actVote = async (vote, remove = false) => {
  const individualFromDb = await dbIndividuals.getById(vote.id)

  if (individualFromDb && individualFromDb.id === vote.id) {
    if (vote.vote > 0) {
      individualFromDb.votes.positive += remove ? -1 : 1
    } else {
      individualFromDb.votes.negative += remove ? -1 : 1
    }
  }

  await dbIndividuals.save(individualFromDb)
  individuals.value = await dbIndividuals.getAll()
}

export default async (vote) => {
  const alreadyVoted = await dbVotes.getById(vote.id)

  if (alreadyVoted) {
    await dbVotes.remove(alreadyVoted._id)
    myVotes.value = await dbVotes.getAll()

    actVote(vote, true)
    return;
  }

  await dbVotes.save({ id: vote.id, vote: vote.vote })

  actVote(vote)

  myVotes.value = await dbVotes.getAll()
}
