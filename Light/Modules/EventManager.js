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

  // Clear All Listener
  clear () {
    Object.keys(this.#events).forEach((id) => {
      this.#events[id].target.removeEventListener(this.#events[id].name, this.#events[id].callback)
    })
  }
}

import checkParameters from './Tools/CheckParameters.js'
import generateID from './Tools/GenerateID.js'
