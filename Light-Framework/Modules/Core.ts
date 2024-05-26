// Core
export default class {
  private _id!: undefined | string
  private _element: HTMLElement

  private _API!: Light

  public componentPath: string = window.location.pathname
  public data!: any

  public ListenerManager!: ListenerManager
  public TimerManager!: TimerManager

  public AttributeManager!: AttributeManager
  public UnitManager!: UnitManager
  public Observer!: Observer

  public PluginManager: typeof PluginManager = PluginManager
  public ComponentManager: typeof ComponentManager = ComponentManager
  public StyleManager: typeof StyleManager = StyleManager

  constructor (API: Light, element: HTMLElement, data: any) {
    Tools.checkParameters({
      API: { instanceOf: { instance: Light, name: 'Light' }},
      element: { instanceOf: { instance: HTMLElement, name: 'HTMLElement' }}
    }, { API, element })

    this._id = ComponentManager.registerComponent(this)
    this._element = element

    this._API = API
    this.data = data

    this.ListenerManager = new ListenerManager()
    this.TimerManager = new TimerManager()

    this.AttributeManager = new AttributeManager(this)
    this.UnitManager = new UnitManager(this)
    this.Observer = new Observer(this)

    element.setAttribute('light', this._id)

    PluginManager.initializePlugins(this)

    this.Observer.checkChildren(this._element)
  }

  public get id () {return this._id}
  public get element () {return this._element}
  public get API () {return this._API}

  // Get Element By ID
  public getElementByID (id: string): undefined | HTMLElement {
    Tools.checkParameters({
      id: { type: ['string'] }
    }, { id })

    return getElements(this._element, (element) => element.id === id, 1)[0]
  }

  // Get Elements By Class Name
  public getElementsByClassName (className: string): HTMLElement[] {
    Tools.checkParameters({
      className: { type: ['string'] }
    }, { className })

    return getElements(this._element, (element) => Array.from(element.classList).includes(className), Infinity)
  }

  // Get Elements By Tag Name
  public getElementsByTagName (tagName: string): HTMLElement[] {
    Tools.checkParameters({
      tagName: { type: ['string'] }
    }, { tagName })

    return getElements(this._element, (element) => element.tagName === tagName, Infinity)
  }

  // Get All Elements
  public getAllElements (): HTMLElement[] {
    return getElements(this._element, () => true, Infinity)
  }

  // Load Component 
  public async load (html: string, componentPath?: string): Promise<void> {
    Tools.checkParameters({
      html: { type: ['string'] },
      componentPath: { type: ['undefined', 'string'] }
    }, { html, componentPath })

    removeChildComponents(this._element)

    this.ListenerManager.removeAllListeners()
    this.TimerManager.deleteAllTimers()

    const content = createElement('div', { innerHTML: html })

    const scripts = getElements(content, (element) => element.localName === 'script', Infinity).map((element) => {
      element.remove()

      return { src: element.getAttribute('src'), type: element.getAttribute('type'), content: element.innerHTML }
    }) 

    this._element.innerHTML = content.innerHTML

    for (let script of scripts) {
      if (script.src !== null && script.src[0] === '.') script.src = (componentPath === undefined) ? script.src : resolvePath(componentPath, script.src)

      const content = (script.src === null) ? script.content : await (await fetch(script.src)).text()

      if (script.type === 'module') {
        new Function('Light', 'Component', 'Import', `(async()=>{${content}})()`)(Light, this._API, async (src: string) => {
          if (componentPath !== undefined && src[0] === '.') src = resolvePath(componentPath, src)

          return await import(src)
        })
      } else new Function('Light', 'Component', content)(Light, this._API)
    }
  
    if (componentPath !== undefined) this.componentPath = componentPath
  }

  // Remove Component
  public remove (): void {
    removeChildComponents(this._element)

    this.ListenerManager.removeAllListeners()
    this.TimerManager.deleteAllTimers()

    this.Observer.observer.disconnect()

    ComponentManager.unregisterComponent(this._id!)

    this._id = undefined

    this._element.removeAttribute('light')
  }
}

// Get Element
function getElements (parent: HTMLElement, callback: (element: HTMLElement) => boolean, max: number): HTMLElement[] {
  let elements: HTMLElement[] = []

  for (const child of Array.from(parent.children)) {
    if (callback(child as HTMLElement)) elements.push(child as HTMLElement)
    
    elements = elements.concat(getElements(child as HTMLElement, callback, max - elements.length))

    if (elements.length >= max) break
  }

  return elements
}

// Remove Child Components
function removeChildComponents (parent: HTMLElement): void {
  Array.from(parent.children).forEach((child) => {
    if (child.getAttribute('light') !== null) ComponentManager.getComponent(child.getAttribute('light')!)!.remove()
    else removeChildComponents(child as HTMLElement)
  })
}

// Resolve Path
function resolvePath (basePath: string, path: string): string {
  const result = basePath.split('/')

  path.split('/').forEach((name) => {
    if (name === '.') result.splice(path.length - 1, 1)
    else if (name === '..') result.splice(path.length - 2, 2)
    else result.push(name)
  })

  return result.join('/')
}

import ComponentManager from './Managers/ComponentManager.ts'
import AttributeManager from './Managers/AttributeManager.ts'
import ListenerManager from './Managers/ListenerManager.ts'
import { PluginManager } from './Managers/PluginManager.ts'
import TimerManager from './Managers/TimerManager.ts'
import StyleManager from './Managers/StyleManager.ts'
import UnitManager from './Managers/UnitManager.ts'
import { createElement } from './Element.ts'
import Observer from './Observer.ts'
import Tools from './Tools/Main.ts'
import { Light } from '../API.ts'
