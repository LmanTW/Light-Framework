// Unit Manager
export default class {
  #Core

  constructor (Core) {
    this.#Core = Core

    this.units = {}
  }

  // Create Unit
  createUnit (name, callback, update) {
    if (this.units[name] !== undefined) throw new Error(`Unit Already Exist: "${name}"`)

    this.units[name] = callback

    this.#Core.Observer.checkChildren(this.#Core.root)

    if (update === undefined || update === true) this.#Core.Observer.checkChildren(this.#Core.root)
  }

  // Delete Unit
  deleteUnit (name, update) {
    if (this.units[name] === undefined) throw new Error(`Unit Not Found: "${name}"`)

    delete this.units[name]

    this.#Core.Observer.checkChildren(this.#Core.root)

    if (update === undefined || update === true) this.#Core.Observer.checkChildren(this.#Core.root)
  }
}
