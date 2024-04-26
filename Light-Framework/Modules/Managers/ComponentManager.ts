// Component Manager
export default class {
  // Register Component
  public static registerComponent (Core: Core_): string {
    Tools.checkParameters({
      Core: { instanceOf: { instance: Core_, name: 'Core' } }
    }, { Core })

    const id = Tools.generateID(5, Object.keys(components))

    components[id] = Core

    return id
  }

  // Unregister Component
  public static unregisterComponent (id: string): void {
    Tools.checkParameters({
      id: { type: ['string'] }
    }, { id })

    if (components[id] === undefined) throw new Error(`Component Not Found: "${id}"`)

    delete components[id]
  }

  // Get Component
  public static getComponent (id: string): undefined | Core_ {
    Tools.checkParameters({
      id: { type: ['string'] }
    }, { id })

    return components[id]
  } 

  // Get Component From Parent
  public static getComponentFromParent (element: HTMLElement): undefined | string {
    Tools.checkParameters({
      element: { instanceOf: { instance: HTMLElement, name: 'HTMLElement' } }
    }, { element })

    const attribute = element.getAttribute('light')

    if (attribute !== null) return attribute

    if (element.parentElement !== null) return this.getComponentFromParent(element.parentElement)
  }
}

import Tools from '../Tools/Main.ts'
import Core_ from '../Core.ts'

const components: { [key: string]: Core_ } = {} 
