// Unit Manager
export default class {
  #Core

  #units = {}

  constructor (Core) {
    this.#Core = Core
  }

  get units () {return this.#units}

  // Create Unit
  createUnit (name, callback) {
    Tools.checkParameters({
      name: { type: ['string'] },
      callback: { type: ['function'] }
    }, { name, callback })

    if (this.#units[name] !== undefined) throw new Error(`Unit Named "${name}" Already Exist`)

    this.#units[name] = callback

    this.#Core.Observer.checkChildren(this.#Core.root, true)
  }

  // Delete Unit
  deleteUnit (name) {
    Tools.checkParameters({
      name: { type: ['string'] }
    }, { name })

    if (this.#units[name] === undefined) throw new Error(`Unit Named "${name}" Not Found`)

    delete this.#units[name]

    this.#Core.Observer.checkChildren(this.#Core.root, true)
  }
}

import Tools from '../Tools.js'
