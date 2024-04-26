// Custom Element Manager
export default class {
  // Create Custom Element
  public static createCustomElement (name: string, element: CustomElementConstructor): void {
    if (customElements_[name] !== undefined) throw new Error(`Custom Element Already Exist: "${name}"`)

    customElements_[name] = element

    customElements.define(`light-${name}`, element)
  }
}

const customElements_: { [key: string]: CustomElementConstructor } = {}
