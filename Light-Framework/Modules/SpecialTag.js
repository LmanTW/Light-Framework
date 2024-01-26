// Create Special Tags
export default () => {
  window.svgCache = {}

  class StyleElement extends HTMLElement {
    constructor () {
      super()
    }

    async connectedCallback () {}
  }

  class SvgElement extends HTMLElement {
    constructor () {
      super()
    }

    async connectedCallback () {
      if (window.svgCache[this.getAttribute('src')] === undefined) window.svgCache[this.getAttribute('src')] = await (await fetch(this.getAttribute('src'))).text()

      const element = createElement('div', { innerHTML: window.svgCache[this.getAttribute('src')] }).children[0]

      this.getAttributeNames().forEach((name) => {
        if (name !== 'src') element.setAttribute(name, this.getAttribute(name))
      })

      this.outerHTML = element.outerHTML
    }
  }

  customElements.define('light-style', StyleElement)
  customElements.define('light-svg', SvgElement)
}

import createElement from './CreateElement.js'
