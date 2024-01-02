import info from './Info.json' assert { type: 'json' }

console.log(`[ Light-Framework ]

Version: v${info.version}

Github: ${info.github}`)

checkEnvironment()

// API
export default class {
  static get Animation () {return Animation}
  static get createElement () {return createElement}
  static get createSvgElement () {return createSvgElement}

  // Get Component
  static getComponent () {
    let scripts = document.querySelectorAll('script[type="module"]')

    let id = getComponentIdFromParent(scripts[scripts.length-1])

    return getComponent(id)
  }

  #Core

  constructor (selector) {
    this.#Core = new Core(selector, this)

    this.Event = this.#Core.EventManager
    this.Timer = this.#Core.Timer

    this.Unit = this.#Core.UnitManager
  }

  get root () {return this.#Core.root}

  // Use Plugin
  use (Plugin) {
    return new Plugin(this.#Core, this)
  }

  // Load
  load (html) {
    this.#Core.load(html)
  }

  // Remove
  remove () {
    this.#Core.remove()
  }
}

import { getComponentIdFromParent, getComponent } from './Modules/Components.js'
import checkEnvironment from './Modules/CheckEnvironment.js'
import createSvgElement from './Modules/CreateSvgElement.js'
import createElement from './Modules/CreateElement.js'
import Animation from './Modules/Animation.js'
import Core from './Modules/Core.js'
