// Component Manager
export default class {
  // Register Component
  static registerComponent (Core) {
    const id = generateID(5, Object.keys(components))

    components[id] = Core

    return id
  }

  // Unregister Component
  static unregisterComponent (id) {
    delete components[id]
  }

  // Get Component
  static getComponent (id) {
    return components[id]
  }

  // Get Component From Parent
  static getComponentFromParent (element) {
    if (element.getAttribute('light') !== null) return element.getAttribute('light')

    if (element.parentNode !== null) return this.getComponentFromParent(element.parentNode)
  }
}

import generateID from '../Tools/GenerateID.js'

const components = {}
