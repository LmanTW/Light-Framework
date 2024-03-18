// Core
export default class {
  #id
  #root

  #data

  constructor (classInstance, element, data) {
    this.classInstance = classInstance

    this.#id = ComponentManager.registerComponent(this)
    this.#root = element

    this.#data = data

    this.ListenerManager = new ListenerManager()
    this.TimerManager = new TimerManager()

    this.AttributeManager = new AttributeManager(this)
    this.UnitManager = new UnitManager(this)
    this.Observer = new Observer(this)

    element.setAttribute('light', this.#id)

    PluginManager.initializePlugins(this)    
  }

  get id () {return this.#id}
  get root () {return this.#root}
  get data () {return this.#data}

  // Get Element By ID
  getElementByID (id) {
    this.#checkComponent()

    return getElements(this.#root, (element) => element.id === id, 1)[0]
  }

  // Get Element By Class Name
  getElementsByClassName (name) {
    this.#checkComponent()

    return getElements(this.#root, (element) => Array.from(element.classList).includes(name), Infinity)
  }

  // Get Element By Tag Name
  getElementsByTagName (name) {
    return getElements(this.#root, (element) => element.localName === name, Infinity)
  }

  // Load The Component From HTML
  load (html) {
    this.#checkComponent()

    removeChildComponents(this.#root)

    this.ListenerManager.deleteAllListeners()
    this.TimerManager.deleteAllTimers()

    const content = createElement('div', { innerHTML: html })

    const scripts = []

    getElements(content, (element) => element.localName === 'script', Infinity).forEach((element) => {
      scripts.push({ type: element.type, content: element.innerHTML })

      element.remove()
    })

    this.#root.innerHTML = content.innerHTML

    scripts.forEach((script) => {
      if (script.type === 'module') new Function('Light', 'Component', 'import', `(async () =>${script})()`)(Light, this.classInstance, async (src) => await import(src))
      else new Function('Light', 'Component', script)(Light, this.classInstance)
    })
  }

  // Remove The Component
  remove () {
    this.#checkComponent()

    removeChildComponents(this.#root)

    this.ListenerManager.deleteAllListeners()
    this.TimerManager.deleteAllTimers()

    this.Observer.observer.disconnect() 

    this.id = undefined

    this.#root.setAttribute('light', null)
  }

  // Check Component
  #checkComponent () {
    if (!this.#root.isConnected || this.#root.getAttribute('light') !== this.#id) throw new Error('Component Not Found')
  }
}

// Get Element
function getElements (parent, callback, max) {
  let elements = []

  for (const child of parent.children) {
    if (callback(child)) elements.push(child)
    else elements = elements.concat(getElements(child, callback, max))

    if (elements.length >= max) break
  }

  return elements
}

// Remove Child Components
function removeChildComponents (parent) {
  Array.from(parent.children).forEach((child) => {
    if (child.getAttribute('light') !== null) ComponentManager.getComponent(child.getAttribute('light'))
    else removeChildComponents(child)
  })
}

import ComponentManager from './Managers/ComponentManager.js'
import AttributeManager from './Managers/AttributeManager.js'
import ListenerManager from './Managers/ListenerManager.js'
import PluginManager from './Managers/PluginManager.js'
import TimerManager from './Managers/TimerManager.js'
import UnitManager from './Managers/UnitManager.js'
import createElement from './CreateElement.js'
import Observer from './Observer.js'
import Light from '../API.js'
