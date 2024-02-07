// Event Manager
export default class {
  #events = {}

  // Listen
  listen (target, name, callback, options) {
    Tools.checkParameters({
      name: { type: ['string'] },
      callback: { type: ['function'] },
      options: { type: ['undefined', 'object'] }
    }, { name, callback })

    const id = Tools.generateID(5, Object.keys(this.#events))

    this.#events[id] = { target, name, callback }

    target.addEventListener(name, callback, options)
  }

  // Remove Listener
  remove (id) {
    Tools.checkParameters({
      id: { type: ['undefined', 'string'] }
    }, { id })

    this.#events[id].target.removeEventListener(this.#events[id].name, this.#events[id].callback)
  }

  // Remove All Listeners
  removeAllListeners () {
    Object.keys(this.#events).forEach((id) => this.#events[id].target.removeEventListener(this.#events[id].name, this.#events[id].callback))
  }
}

import Tools from '../Tools/Main.js'
