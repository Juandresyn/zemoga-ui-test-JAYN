import individualList from '../data/individuals.json'
import Database from '../persistentLayer/db'
import { BD_ENTITIES } from '../types'

const db = new Database(BD_ENTITIES.INDIVIDUALS, individualList)

export default async () => await db.getAll()
