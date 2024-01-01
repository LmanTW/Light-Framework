// Observer
export default class {
  #Core

  #observer

  constructor (Core) {
    this.#Core = Core

    this.#observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === 'childList') Array.from(mutation.addedNodes).forEach((element) => this.checkChildren(element, true))
        else if (mutation.type === 'attributes' && mutation.attributeName.substring(0, 6) === 'light:' && this.#Core.AttributeManager.attributes[mutation.attributeName.substring(6, mutation.attributeName.length)] !== undefined) this.setAttribute(mutation.target, mutation.attributeName.substring(6, mutation.attributeName.length))
      })
    })

    this.#observer.observe(Core.root, { childList: true, subtree: true, attributes: true })
  }

  // Check Children
  checkChildren (parent, checkParent) {
    if (checkParent) this.checkAttribute(parent)

    Array.from(parent.children).forEach((child) => {
      this.checkAttribute(child)

      if (child.getAttribute('light') === null && child.children.length > 0) this.checkChildren(child)
    })
  }

  // Check Attribute
  checkAttribute (element, attributeName) {
    if (typeof element.getAttributeNames === 'function') {
      if (attributeName === undefined) {
        element.getAttributeNames().forEach((name) => {
          if (name.substring(0, 6) === 'light:' && this.#Core.AttributeManager.attributes[name.substring(6, name.length)] !== undefined) this.#Core.AttributeManager.attributes[name.substring(6, name.length)](element, element.getAttribute(name))
        })
      } else if (this.#Core.AttributeManager.attributes[attributeName] !== undefined) this.#Core.AttributeManager.attributes[name.substring(6, name.length)](element, element.getAttribute(attributeName))
    }
  }
}
