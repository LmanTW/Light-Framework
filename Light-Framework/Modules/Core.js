// Core
export default class {
  #root
  #id

  constructor (target, api) {
    if (typeof target !== 'string' && !(target instanceof HTMLElement)) throw new Error('Parameter "target" Must Be A <string> Or An Instance Of HTMLElement')

    this.#root = (typeof target === 'string') ? document.querySelector(target) : target

    if (this.#root === null) throw new Error(`Target Not Found: ${target}`)
    if (this.#root.getAttribute('light') !== null) throw new Error('Target Is Already A Light Component')

    this.#id = createComponent(api)
    this.#root.setAttribute('light', this.#id)

    this.EventManager = new EventManager()
    this.Timer = new Timer()

    this.Observer = new Observer(this)

    this.AttributeManager = new AttributeManager(this)
    this.StyleManager = new StyleManager(this)
    this.UnitManager = new UnitManager(this)

    this.AttributeManager.createAttribute('style', (element, value) => {
      let styles = Tools.applyStyle(Tools.parseCssToObject(Tools.parseStyleValue(value, this.UnitManager.units)))

      let lateStyles = {}

      Object.keys(styles).forEach((name) => {
        if (['transition', 'transitionDuration'].includes(name)) {
          lateStyles[name] = styles[name]

          delete styles[name]
        }
      })

      let classList = Array.from(element.classList).filter((className) => !className.includes('style-'))
      
      if (classList.length > 0) element.setAttribute('class', classList.join(' '))
      else element.removeAttribute('class')

      addClass(element, this.StyleManager.createStyle(Tools.parseObjectToCss(styles)))

      window.requestAnimationFrame(() => Object.keys(lateStyles).forEach((name) => element.style[name] = lateStyles[name]), 50)
    })
    this.AttributeManager.createAttribute('style:hover', (element, value) => addClass(element, this.StyleManager.createHoverStyle(Tools.parseStyleValue(value, this.UnitManager.units))))
    this.AttributeManager.createAttribute('trigger', (element, value) => this.EventManager.listen(element, 'click', () => {
      if (value[0] === '/') window.location.href = value
      else if (value.substring(0, 7) === 'http://' || value.substring(0, 8) === 'https://') window.open(value)
      else document.head.appendChild(createElement('script', { type: 'module', innerHTML: value })).remove()
    }))

    this.UnitManager.createUnit('ps', (value) => `calc(calc(1vw + 1vh)* ${value})`)

    PluginManager.initializePlugins(this)
  }

  get root () {return this.#root}

  // Load
  load (html) {
    Tools.checkParameters({
      html: { type: ['string'] }
    }, { html })

    this.EventManager.clear()
    this.Timer.deleteAllTimers()

    while (this.#root.firstChild) this.#root.firstChild.remove()

    Array.from(createElement('div', { innerHTML: html }).children).forEach((child) => {
      if (child.tagName === 'SCRIPT') {
        let options = { id: child.getAttribute('id'), type: child.getAttribute('type'), src: child.getAttribute('src'), innerHTML: child.innerHTML }
    
        Object.keys(options).forEach((key) => {
          if (options[key] === null) delete options[key]
        })

        this.#root.appendChild(createElement('script', options))
      } else this.#root.appendChild(child)
    })
  }

  // Remove 
  remove () {
    deleteComponent(this.#id)

    this.#root.remove()

    this.EventManager.clear()
    this.Timer.deleteAllTimers()
  }
}

// Add Class To Element
function addClass (element, className) {
  let classList = element.getAttribute('class')

  if (classList === null) classList = []
  else classList = classList.split(' ')

  if (!classList.includes(className)) classList.push(className)

  element.setAttribute('class', classList.join(' '))
}

import { createComponent, deleteComponent } from './Components.js'
import AttributeManager from './Managers/AttributeManager.js'
import PluginManager from './Managers/PluginManager.js'
import StyleManager from './Managers/StyleManager.js'
import EventManager from './Managers/EventManager.js'
import UnitManager from './Managers/UnitManager.js'
import createElement from './CreateElement.js'
import Observer from './Observer.js'
import Timer from './Timer.js'
import Tools from './Tools.js'
