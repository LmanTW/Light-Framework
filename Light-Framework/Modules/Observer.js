// Observer
export default class {
  #Core

  constructor (Core) {
    this.#Core = Core

    this.observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === 'childList') Array.from(mutation.addedNodes).forEach((element) => this.checkChildren(element))
        else if (mutation.type === 'attributes' && mutation.attributeName.substring(0, 6) === 'light:') this.checkAttribute(mutation.target, mutation.attributeName.substring(6, mutation.attributeName.length))
      })
    })

    this.observer.observe(Core.root, { childList: true, subtree: true, attributes: true })
  }

  // Check Children
  checkChildren (parent) {
    this.checkAttribute(parent)

    Array.from(parent.children).forEach((child) => {
      if (child.tagName !== undefined && child.getAttribute('light') === null) this.checkChildren(child)
    })
  }

  // Check Attribute
  checkAttribute (element, attributeName) {
    if (attributeName === undefined) {
      element.getAttributeNames().forEach((name) => {
        if (name.substring(0, 6) === 'light:' && this.#Core.AttributeManager.attributes[name.substring(6, name.length)] !== undefined) this.#Core.AttributeManager.attributes[name.substring(6, name.length)](element, element.getAttribute(name))
      })
    } else if (this.#Core.AttributeManager.attributes[attributeName] !== undefined) this.#Core.AttributeManager.attributes[attributeName](element, element.getAttribute(`light:${attributeName}`)) 
  }
}
