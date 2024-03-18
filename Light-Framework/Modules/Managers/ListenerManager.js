// Listener Manager
export default class {
  #listeners = {}

  // Listen To Event
  listen (target, name, callback) {
    const id = generateID(5, Object.keys(this.#listeners))

    this.#listeners[id] = { target, name, callback }

    target.addEventListener(name, callback)

    return id
  }

  // Delete Listener
  deleteListener (id) {
    this.#listeners[id].target.removeEventListener(this.#listeners[id].name, this.#listeners[id].callback)
  }

  // Remove All Listeners
  deleteAllListeners () {
    Object.keys(this.#listeners).forEach((id) => this.#listeners[id].target.removeEventListener(this.#listeners[id].name, this.#listeners[id].callback))
  }
}

import generateID from '../Tools/GenerateID.js'
