// Core
export default class {
  #id
  #root

  #data

  #finishCallback

  constructor (Component, target, data) {
    if (typeof target !== 'string' && !(target instanceof HTMLElement)) throw new Error('Parameter "target" Must Be A <string> Or An Instance Of HTMLElement')

    Tools.checkParameters({
      data: { type: ['undefined', 'object'] }
    }, { data })

    this.#data = (data === undefined) ? {} : data
 
    this.#root = (typeof target === 'string') ? document.querySelector(target) : target

    if (this.#root === null) throw new Error(`Target Not Found: ${target}`)
    if (this.#root.getAttribute('light') !== null) throw new Error('Target Is Already A Light Component')

    this.#id = ComponentManager.createComponent(Component)

    this.ListenerManager = new ListenerManager()
    this.TimerManager = new TimerManager()

    this.AttributeManager = new AttributeManager(this)
    this.UnitManager = new UnitManager(this)
    this.StyleManager = new StyleManager(this)
    this.Observer = new Observer(this)

    this.#root.setAttribute('light', this.#id)

    PluginManager.initializePlugins(this)
  }

  get root () {return this.#root}
  get id () {return this.#id}
  get data () {return this.#data}

  // Load Component From URl
  async load (html, wait) {
    Tools.checkParameters({
      html: { type: ['string'] },
      wait: { type: ['undefined', 'boolean'] }
    }, { html, wait })

    this.ListenerManager.removeAllListeners()
    this.TimerManager.deleteAllTimers()

    return new Promise((resolve) => {
      const content = createElement('div', { innerHTML: html })
      const newRoot = document.body.appendChild(createElement('div', { light: this.#id }))

      newRoot.style.position = 'fixed'
      newRoot.style.bottom = '0px'
      newRoot.style.width = '0px'
      newRoot.style.height = '0px'
      newRoot.style.overflow = 'hidden'

      Array.from(content.children).forEach((child) => {
        if (child.tagName !== 'SCRIPT') newRoot.appendChild(child)
      })

      Array.from(content.children).forEach((child) => {
        if (child.tagName === 'SCRIPT') {
          const script = createElement('script', { innerHTML: child.innerHTML })

          child.getAttributeNames().forEach((name) => script.setAttribute(name, child.getAttribute(name)))

          newRoot.appendChild(script)
        }
      })

      if (wait === true) {
        this.#finishCallback = (callback) => {
          updateRoot(this.#root)

          callback()
        }
      } else updateRoot(this.#root)

      // Update The Root
      function updateRoot (root) {
        while (root.firstChild) root.firstChild.remove()

        Array.from(newRoot.children).forEach((child) => {
          root.appendChild(child)
        })

        newRoot.remove()

        resolve()
      }
    })
  }

  // Remove Component
  remove () {
    deleteComponent(this.#id)

    this.ListenerManager.removeAllListeners()
    this.TimerManager.deleteAllTimers()
  }

  // Finish Loading
  async finish () {
    if (this.#finishCallback !== undefined) {
      return new Promise((resolve) => {
        this.#finishCallback(() => resolve())

        this.#finishCallback = undefined
      })
    }
  }
}

import Tools  from './Tools/Main.js'

import ComponentManager from './Managers/ComponentManager.js'
import AttributeManager from './Managers/AttributeManager.js'
import ListenerManager from './Managers/ListenerManager.js'
import PluginManager from './Managers/PluginManager.js'
import TimerManager from './Managers/TimerManager.js'
import StyleManager from './Managers/StyleManager.js'
import UnitManager from './Managers/UnitManager.js'
import createElement from './CreateElement.js'
import Observer from './Observer.js'
