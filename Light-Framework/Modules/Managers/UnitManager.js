// Unit Manager
export default class {
  #Core

  #units = {}

  constructor (Core) {
    this.#Core = Core
  }

  get units () {return this.#units}

  // Create Unit
  createUnit (name, callback, reload) {
    Tools.checkParameters({
      name: { type: ['string'] },
      callback: { type: ['function'] },
      reload: { type: ['undefined', 'boolean'] }
    }, { name, callback })

    if (this.#units[name] !== undefined) throw new Error(`Unit Named "${name}" Already Exist`)

    this.#units[name] = callback

    if (reload === undefined || reload === true) this.#Core.Observer.checkChildren(this.#Core.root)
  }

  // Delete Unit
  deleteUnit (name, reload) {
    Tools.checkParameters({
      name: { type: ['string'] },
      reload: { type: ['undefined', 'boolean'] }
    }, { name })

    if (this.#units[name] === undefined) throw new Error(`Unit Named "${name}" Not Found`)

    delete this.#units[name]

    if (reload === undefined || reload === true) this.#Core.Observer.checkChildren(this.#Core.root)
  }
}

import Tools from '../Tools/Main.js'
