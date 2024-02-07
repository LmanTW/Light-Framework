// Attribute Manager
export default class {
  #Core

  #attributes = {}

  constructor (Core) {
    this.#Core = Core
  }

  get attributes () {return this.#attributes}

  // Create Attribute
  createAttribute (name, callback, reload) {
    Tools.checkParameters({
      name: { type: ['string'] },
      callback: { type: ['function'] },
      reload: { type: ['undefined', 'boolean'] }
    }, { name, callback })

    if (this.#attributes[name] !== undefined) throw new Error(`Attribute Named "${name}" Already Exist`)

    this.#attributes[name] = callback

    if (reload === undefined || reload === true) this.#Core.Observer.checkChildren(this.#Core.root)
  }

  // Delete Attribute
  deleteAttribute (name, reload) {
    Tools.checkParameters({
      name: { type: ['string'] },
      reload: { type: ['undefined', 'boolean'] }
    }, { name })

    if (this.#attributes[name] === undefined) throw new Error(`Attribute Named "${name}" Not Found`)

    delete this.#attributes[name]

    if (reload === undefined || reload === true) this.#Core.Observer.checkChildren(this.#Core.root)
  }
}

import Tools from '../Tools/Main.js'
