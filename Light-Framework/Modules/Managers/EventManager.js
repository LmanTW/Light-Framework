// Event Manager
export default class {
  #events = {}

  // Listen
  listen (target, name, callback) {
    Tools.checkParameters({
      name: { type: ['string'] },
      callback: { type: ['function'] }
    }, { name, callback })

    let id = Tools.generateID(5, Object.keys(this.#events))

    this.#events[id] = { target, name, callback }

    target.addEventListener(name, callback)
  }

  // Clear Listener(s)
  remove (id) {
    Tools.checkParameters({
      id: { type: ['undefined', 'string'] }
    }, { id })

    if (id === undefined) Object.keys(this.#events).forEach((id) => this.#events[id].target.removeEventListener(this.#events[id].name, this.#events[id].callback))
    else this.#events[id].target.removeEventListener(this.#events[id].name, this.#events[id].callback)
  }
}

import Tools from '../Tools.js'
