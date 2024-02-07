import info from './Info.json' assert { type: 'json' }

if (window.light === undefined) {
  console.log(`[ Light-Framework ]

  Version: ${info.version}
  Build: ${info.build}

  Github: ${info.github}`)

  window.light = true
}

// API
class API {
  static get use () {return PluginManager.addPlugin}

  static get createElement () {return createElement}
  static get createSvgElement () {return createSvgElement}
  static get setStyle () {return setStyle}

  // Get Component
  static getComponent (element) {
    Tools.checkParameters({
      element: { instance: [HTMLElement] }
    }, { element })

    let id = ComponentManager.getComponentFromParent(element)

    return ComponentManager.getComponent(id)
  }

  #Core

  constructor (target, options) {
    this.#Core = new Core(this, target, options)

    this.Event = this.#Core.ListenerManager
    this.Timer = this.#Core.TimerManager
  }

  async load (html, wait) {await this.#Core.load(html, wait)}
  remove () {this.#Core.remove()}

  finish () {this.#Core.finish()}
}

export default API

import Tools from './Modules/Tools/Main.js'

import ComponentManager from './Modules/Managers/ComponentManager.js'
import PluginManager from './Modules/Managers/PluginManager.js'
import createSvgElement from './Modules/CreateSvgElement.js'
import DefaultPlugin from './Modules/DefaultPlugin.js'
import createElement from './Modules/CreateElement.js'
import setStyle from './Modules/SetStyle.js'
import Core from './Modules/Core.js'

PluginManager.addPlugin(DefaultPlugin)
