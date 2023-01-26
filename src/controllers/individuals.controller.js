import individualList from '../../public/data/individuals.json'
import Database from '../persistentLayer/db'
import { BD_ENTITIES } from '../types'

const db = new Database(BD_ENTITIES.INDIVIDUALS)

const initIndividuals = async () => {
  if (db.getAll().length <= 0) {
    individualList.forEach(async i => await db.save(i))
  }
}

initIndividuals()

export default async () => await db.getAll()
