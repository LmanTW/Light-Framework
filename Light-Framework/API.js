import info from './Info.json' assert { type: 'json' }

if (window.light === undefined) {
  console.log(`[ Light-Framework ]

  Version: ${info.version}
  Build: ${info.build}

  Github: ${info.github}`)

  window.light = true
}

// API 
export default class {
  // Use Plugin
  static use (Plugin) {
    checkParameters({
      Plugin: { type: ['object'] }
    }, { Plugin })

    checkObject('Plugin', {
      id: { type: ['string'] },

      register: { type: ['undefined', 'function'] },
      init: { type: ['undefined', 'function'] }
    }, Plugin)

    PluginManager.addPlugin(Plugin)
  }

  // Create Element
  static createElement (tagName, options, children) {
    checkParameters({
      tagName: { type: ['string'] },
      options: { type: ['undefined', 'object'] },
      children: { type: ['undefined', 'array'] }
    }, { tagName, options, children })

    return createElement(tagName, options, children)
  }

  // Create SVG Element
  static async createSvgElement (src, options) {
    checkParameters({
      src: { type: ['string'] },
      options: { type: ['undefined', 'object'] }
    }, { src, options })

    return await createSvgElement(src, options)
  }

  // Set Style
  static setStyle (element, name, value) {
    if (!(element instanceof HTMLElement)) throw new Error('Parameter "element" Must Be An Instance Of <HTMLElement>')

    checkParameters({
      name: { type: ['string'] },
      value: { type: ['number', 'string'] }
    }, { name, value })

    setStyle(element, name, value)
  }

  #Core

  constructor (element, data) {
    if (!(element instanceof HTMLElement)) throw new Error('Parameter "element" Must Be An Instance Of <HTMLElement>')

    checkParameters({
      data: { type: ['undefined', 'object'] }
    }, { data })

    this.#Core = new Core(this, element, data)

    this.ListenerManager = {
      listen: (target, name, callback) => {
        checkParameters({
          name: { type: ['string'] },
          callback: { type: ['function'] }
        }, { name, callback })

        return this.#Core.ListenerManager.listen(target, name, callback)
      },

      deleteListener: (id) => {
        checkParameters({
          id: { type: ['string'] }
        }, { id })

        this.#Core.ListenerManager.deleteListener(id)
      }
    }

    this.TimerManager = {
      createTimeout: (time, callback) => {
        checkParameters({
          time: { type: ['number'] },
          callback: { type: ['function'] }
        }, { time, callback })

        return this.#Core.TimerManager.createTimeout(time, callback)
      },

      createInterval: (interval, callback) => {
        checkParameters({
          interval: { type: ['number'] },
          callback: { type: ['function'] }
        }, { interval, callback })

        return this.#Core.TimerManager.createInterval(interval, callback)
      },

      createLoop: (interval, times, callback, callback2) => {
        checkParameters({
          interval: { type: ['number'] },
          times: { type: ['number'] },
          callback: { type: ['function'] },
          callback2: { type: ['undefined', 'function'] }
        }, [ interval, times, callback, callback2 ])

        return this.#Core.TimerManager.createLoop(interval, times, callback, callback2)
      },

      deleteTimer: (id) => {
        checkParameters({
          id: { type: ['string'] }
        }, { id })

        this.#Core.TimerManager.deleteTimer(id)
      }
    }
  }

  // Get Element By ID
  getElementByID (id) {
    checkParameters({
      id: { type: ['string'] }
    }, { id })

    return this.#Core.getElementByID(id)
  }

  // Get Element By Class Name
  getElementsByClassName (name) {
    checkParameters({
      name: { type: ['string'] },
    }, { name })
  
    return this.#Core.getElementsByClassName(name)
  }

  // Get Element By Tag Name
  getElementsByTagName (name) {
    checkParameters({
      name: { type: ['string'] },
    }, { name })
  
    return this.#Core.getElementsByTagName(name)
  }

  // Load The Component From HTML
  load (html) {
    checkParameters({
      html: { type: ['string'] }
    }, { html })

    this.#Core.load(html)
  }

  // Remove The Component
  remove () {
    this.#Core.remove()
  }
}

import checkParameters from './Modules/Tools/CheckParameters.js'
import checkObject from './Modules/Tools/CheckObject.js'

import PluginManager from './Modules/Managers/PluginManager.js'
import createSvgElement from './Modules/CreateSvgElement.js'
import DefaultPlugin from './Modules/DefaultPlugin.js'
import createElement from './Modules/CreateElement.js'
import setStyle from './Modules/SetStyle.js'
import Core from './Modules/Core.js'

PluginManager.addPlugin(DefaultPlugin)
