// Attribute Manager
export default class {
  #Core

  constructor (Core) {
    this.#Core = Core

    this.attributes = {}
  }

  // Create Attribute
  createAttribute (name, callback, update) {
    if (this.attributes[name] !== undefined) throw new Error(`Attribute Already Exist: "${name}"`)

    this.attributes[name] = callback

    if (update === undefined || update === true) this.#Core.Observer.checkChildren(this.#Core.root)
  }

  // Delete Attribute
  deleteAttribute (name) {
    if (this.attributes[name] === undefined) throw new Error(`Attribute Not Found: "${name}"`)

    delete this.attributes[name]

    this.#Core.Observer.checkChildren(this.#Core.root)

    if (update === undefined || update === true) this.#Core.Observer.checkChildren(this.#Core.root)
  }
}
