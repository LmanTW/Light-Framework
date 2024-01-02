// Event Manager
export default class {
  #events = {}

  // Listen
  listen (target, name, callback) {
    checkParameters({
      name: { type: ['string'] },
      callback: { type: ['function'] }
    }, { name, callback })

    let id = generateID(5, Object.keys(this.#events))

    this.#events[id] = { target, name, callback }

    target.addEventListener(name, callback)
  }

  // Clear Listener(s)
  clear (id) {
    checkParameters({
      id: { type: ['undefined', 'string'] }
    }, { id })

    if (id === undefined) Object.keys(this.#events).forEach((id) => this.#events[id].target.removeEventListener(this.#events[id].name, this.#events[id].callback))
    else this.#events[id].target.removeEventListener(this.#events[id].name, this.#events[id].callback)
  }
}

import checkParameters from '../Tools/CheckParameters.js'
import generateID from '../Tools/GenerateID.js'
