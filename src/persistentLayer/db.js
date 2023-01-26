// Require minimongo
import minimongo from 'minimongo'

export default class Database {
  constructor(collectionName, seed = []) {
    minimongo.utils.autoselectLocalDb({ storage: 'LocalStorageDb' })
    this.LocalDb = minimongo.LocalStorageDb
    this.DB = new this.LocalDb({ namespace: `db.${ collectionName }` })
    this.collectionName = collectionName
    this.addCollection(collectionName)

    if (seed.length > 0) {
      this.DB[collectionName].seed(seed)
    }
  }

  /**
   * Creates a new collection
   * @param {*} name
   */
  addCollection(name) {
    this.DB.addCollection(name)
  }

  /**
   * Inserts a new document into the database.
   * @param {*} doc
   * @returns object
   */
  async save(doc) {
    return await this.DB[this.collectionName].upsert(doc)
  }

  /**
   * Gets a document by it's id
   * @param {*} id
   * @returns object
   */
  async getById(id) {
    return await this.DB[this.collectionName].findOne({ id })
  }

  /**
   * Get all docs from the database
   * @returns object[]
   */
  async getAll() {
    return await this.DB[this.collectionName].find().fetch()
  }

  /**
   * Removes a document
   * @param {*} id
   */
  async remove(id) {
    return await this.DB[this.collectionName].remove(id)
  }
}
