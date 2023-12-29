// Core
export default class {
  #root

  constructor (target) {
    if (typeof target !== 'string' && !(target instanceof HTMLElement)) throw new Error('Parameter "target" Must Be A <string> Or An Instance Of HTMLElement')

    this.#root = (typeof target === 'string') ? document.querySelector(target) : target

    this.EventManager = new EventManager()
    this.Timer = new Timer()

    this.Observer = new Observer(this)

    this.AttributeManager = new AttributeManager(this)
    this.StyleManager = new StyleManager(this)
    this.UnitManager = new UnitManager(this)

    this.AttributeManager.createAttribute('style', (element, value) => element.setAttribute('style', parseStyleValue(value, this.UnitManager.units)))
    this.AttributeManager.createAttribute('style:hover', (element, value) => {
      let classList = element.getAttribute('class')

      if (classList === null) classList = []
      else classList = classList.split(' ')

      classList.push(this.StyleManager.createHoverStyle(parseStyleValue(value, this.UnitManager.units)))

      element.setAttribute('class', classList.join(' '))
    })

    this.UnitManager.createUnit('ps', (value) => `calc(calc(calc(100vw + 100vh) / 100) * ${value})`)
  }

  get root () {return this.#root}

  // Remove 
  remove () {

  }
}

import checkParameters from './Tools/CheckParameters.js'
import parseStyleValue from './Tools/ParseStyleValue.js'

import AttributeManager from './AttributeManager.js'
import StyleManager from './StyleManager.js'
import EventManager from './EventManager.js'
import UnitManager from './UnitManager.js'
import Observer from './Observer.js'
import Timer from './Timer.js'
