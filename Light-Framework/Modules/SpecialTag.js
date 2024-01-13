// Create Special Tags
export default () => {
  class StyleElement extends HTMLElement {
    constructor () {
      super()
    }

    async connectedCallback () {

    }
  }

  class SvgElement extends HTMLElement {
    //static observedAttributes = ['src']

    constructor () {
      super()
    }

    async connectedCallback () {
      if (cache[this.getAttribute('src')] === undefined) cache[this.getAttribute('src')] = await (await fetch(this.getAttribute('src'))).text()

      const element = createElement('div', { innerHTML: cache[this.getAttribute('src')] }).children[0]

      this.getAttributeNames().forEach((name) => {
        if (name !== 'src') element.setAttribute(name, this.getAttribute(name))
      })

      this.outerHTML = element.outerHTML
    }
  }

  customElements.define('light-style', StyleElement)
  customElements.define('light-svg', SvgElement)
}

import Tools from './Tools.js'

import createElement from './CreateElement.js'

let cache = {}
