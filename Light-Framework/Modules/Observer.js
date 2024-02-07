// Observer
export default class {
  #Core

  #observer

  constructor (Core) {
    this.#Core = Core

    this.#observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (ComponentManager.getComponentFromParent(mutation.target) === Core.id) {
          if (mutation.type === 'childList') Array.from(mutation.addedNodes).forEach((element) => this.checkChildren(element, true))
          else if (mutation.type === 'attributes' && mutation.attributeName.substring(0, 6) === 'light:' && this.#Core.AttributeManager.attributes[mutation.attributeName.substring(6, mutation.attributeName.length)] !== undefined) this.checkAttribute(mutation.target, mutation.attributeName.substring(6, mutation.attributeName.length))
        }
      })
    })

    this.#observer.observe(Core.root, { childList: true, subtree: true, attributes: true })
  }

  // Check Children
  checkChildren (element) {
    if (element.tagName !== undefined) {
      this.checkAttribute(element)

      Array.from(element.children).forEach((child) => {
        if (child.getAttribute('light') === null) this.checkChildren(child)
      })
    }
  }

  // Check Attribute
  checkAttribute (element, attributeName) {
    if (element.tagName !== undefined) {
      if (attributeName === undefined) {
        element.getAttributeNames().forEach((name) => {
          if (name.substring(0, 6) === 'light:' && this.#Core.AttributeManager.attributes[name.substring(6, name.length)] !== undefined) this.#Core.AttributeManager.attributes[name.substring(6, name.length)](element, element.getAttribute(name))
        })
      } else if (this.#Core.AttributeManager.attributes[attributeName] !== undefined) {
        this.#Core.AttributeManager.attributes[attributeName](element, element.getAttribute(`light:${attributeName}`))
      }
    }
  }
}

import ComponentManager from './Managers/ComponentManager.js'
