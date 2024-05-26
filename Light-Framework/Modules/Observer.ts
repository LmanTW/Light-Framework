// Observer
export default class {
  private _Core!: Core

  public observer!: MutationObserver

  constructor (Core: Core) {
    this._Core = Core

    this.observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (ComponentManager.getComponentFromParent(mutation.target as HTMLElement) === Core.id) {
          if (mutation.type === 'childList') {
            Array.from(mutation.addedNodes).forEach((element) => {
              if ((element as HTMLElement).tagName !== undefined) this.checkChildren(element as HTMLElement)
            })
          } else if (mutation.type === 'attributes') this.checkAttributes(mutation.target as HTMLElement, mutation.attributeName!)
        }
      })
    })

    this.observer.observe(Core.element, { subtree: true, childList: true, attributes: true })
  }

  // Check Children
  public checkChildren (parent: HTMLElement): void {
    if (parent.tagName !== undefined) {
      this.checkAttributes(parent)

      Array.from(parent.children).forEach((child) => { 
        if (child.tagName !== undefined && child.getAttribute('light') === null) this.checkChildren(child as HTMLElement)
      })
    } 
  }

  // Check Attributes
  public checkAttributes (element: HTMLElement, attributeName?: string): void {
    Tools.checkParameters({
      attributeName: { type: ['undefined', 'string'] }
    }, { attributeName })

    if (element.tagName !== undefined) {
      if (attributeName === undefined) {
        element.getAttributeNames().forEach((name) => {
          const attribute = this._Core.AttributeManager.getAttribute(name)

          if (attribute !== undefined) attribute(element, element.getAttribute(name)!)
        })
      } else {
        const attribute = this._Core.AttributeManager.getAttribute(attributeName)

        if (attribute !== undefined) attribute(element, element.getAttribute(attributeName)!)
      }
    }
  }
}

import Tools from './Tools/Main.ts'

import ComponentManager from './Managers/ComponentManager.ts'
import Core from './Core.ts'
