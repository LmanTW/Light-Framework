import info from './Info.json' assert { type: 'json' }

console.log(`[ Light-Framework ]

Version: v${info.version}

Github: ${info.github}
`)

// API
export default class {
  static get Animation () {return Animation}
  static get createElement () {return createElement}
  static get createSvgElement () {return createSvgElement}

  #Core

  constructor (selector) {
    this.#Core = new Core(selector)

    this.Event = this.#Core.EventManager
    this.Timer = this.#Core.Timer

    this.Unit = this.#Core.UnitManager
  }

  get root () {return this.#Core.root}

  // Use Plugin
  use (Plugin) {
    return new Plugin(this.#Core)
  }

  // Remove
  remove () {
    this.#Core.remove()
  }
}

import createSvgElement from './Modules/CreateSvgElement.js'
import createElement from './Modules/CreateElement.js'
import Animation from './Modules/Animation.js'
import Core from './Modules/Core.js'
