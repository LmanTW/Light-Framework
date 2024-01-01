// Attribute Manager
export default class {
  #Core

  #attributes = {}

  constructor (Core) {
    this.#Core = Core
  }

  get attributes () {return this.#attributes}

  // Create Attribute
  createAttribute (name, callback) {
    checkParameters({
      name: { type: ['string'] },
      callback: { type: ['function'] }
    }, { name, callback })

    if (this.#attributes[name] !== undefined) throw new Error(`Attribute Named "${name}" Already Exist`)

    this.#attributes[name] = callback

    this.#Core.Observer.checkChildren(this.#Core.root, true)
  }

  // Delete Attribute
  deleteAttribute (name) {
    checkParameters({
      name: { type: ['string'] }
    }, { name })

    if (this.#attributes[name] === undefined) throw new Error(`Attribute Named "${name}" Not Found`)

    delete this.#attributes[name]

    this.#Core.Observer.checkChildren(this.#Core.root, true)
  }
}

import checkParameters from '../Tools/CheckParameters.js'
