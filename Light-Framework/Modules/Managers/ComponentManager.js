const components = {}

// Component Manager
export default class {
  // Create Component
  static createComponent (Component) {
    const id = Tools.generateID(5, Object.keys(components))

    components[id] = Component

    return id
  }

  // Get Component From Parent
  static getComponentFromParent (element) {
    if (element === null) return
    else if (element.getAttribute('light') === null) {
      if (element.parentNode === undefined) return
      else return this.getComponentFromParent(element.parentNode)
    } else return element.getAttribute('light')
  }

  // Get Component
  static getComponent (id) {
    return components[id]
  }
}

import Tools from '../Tools/Main.js'
