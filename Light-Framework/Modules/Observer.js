// Observer
export default class {
  #Core

  #observer

  constructor (Core) {
    this.#Core = Core

    this.#observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === 'childList') Array.from(mutation.addedNodes).forEach((element) => this.checkAttribute(element))
        else if (mutation.type === 'attributes' && mutation.attributeName === '@style') child.setAttribute('style', parseStyleValue(child.getAttribute('@style'), this.#Core.UnitManager.units))
      })
    })

    this.#observer.observe(Core.root, { childList: true, subtree: true, attributes: true })
  }

  // Check Children
  checkChildren (parent) {
    Array.from(parent.children).forEach((child) => {
      this.checkAttribute(child)

      if (child.getAttribute('light') === null && child.children.length > 0) this.checkChildren(child)
    })
  }

  // Check Attribute
  checkAttribute (element) {
    element.getAttributeNames().forEach((name) => {
      if (name.substring(0, 6) === 'light:' && this.#Core.AttributeManager.attributes[name.substring(6, name.length)] !== undefined) this.#Core.AttributeManager.attributes[name.substring(6, name.length)](element, element.getAttribute(name))
    })
  }
}

import parseStyleValue from './Tools/ParseStyleValue.js'
