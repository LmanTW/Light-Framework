import info from './Info.json' assert { type: 'json' }

if (window.light === undefined) {
  console.log(`[ Light-Framework ]

  Version: v${info.version}

  Github: ${info.github}`)
}

window.light = true

// API
class API { 
  static get use () {return PluginManager.use}

  static get createElement () {return createElement}
  static get createSvgElement () {return createSvgElement}

  // Get Component
  static getComponent (element) {
    Tools.checkParameters({
      element: { instance: [HTMLElement] }
    }, { element })

    let id = getComponentIdFromParent(element)

    return getComponent(id)
  }

  #Core

  constructor (target) {
    this.#Core = new Core(target, this)

    this.Event = this.#Core.EventManager
    this.Timer = this.#Core.Timer

    this.Unit = this.#Core.UnitManager
  }

  get root () {return this.#Core.root}

  // Load
  load (html) {
    this.#Core.load(html)
  }

  // Remove
  remove () {
    this.#Core.remove()
  }
}

export default API

import { getComponentIdFromParent, getComponent } from './Modules/Components.js'
import PluginManager from './Modules/Managers/PluginManager.js'
import createSvgElement from './Modules/CreateSvgElement.js'
import createElement from './Modules/CreateElement.js'
import Tools from './Modules/Tools.js'
import Core from './Modules/Core.js'

