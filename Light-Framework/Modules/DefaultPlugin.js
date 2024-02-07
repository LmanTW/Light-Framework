// Default Plugin
export default {
  id: 'Default',

  register: (_, Tools) => {
    window.svgCache = {}

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

        if (this.parentNode !== null) this.outerHTML = element.outerHTML
      }
    }

    customElements.define('light-svg', SvgElement)
  },

  init: (Core, Tools) => {
    Core.AttributeManager.createAttribute('style', (element, value) => {
      if (element.tagName === 'STYLE') element.innerHTML = Tools.parseStyleValue(element.innerHTML, Core.UnitManager.units)   
      else {
        let styles = Tools.applyStyle(Tools.parseCssToObject(Tools.parseStyleValue(value, Core.UnitManager.units)))

        const lateStyles = {}

        Object.keys(styles).forEach((name) => {
         if (['transition', 'transitionDuration'].includes(name)) {
            lateStyles[name] = styles[name]

            delete styles[name]
          }
        })

        let classList = Array.from(element.classList).filter((className) => !className.includes('style-'))
      
        if (classList.length > 0) element.setAttribute('class', classList.join(' '))
        else element.removeAttribute('class')

        addClass(element, Core.StyleManager.createStyle(Tools.parseObjectToCss(styles)))

        window.requestAnimationFrame(() => Object.keys(lateStyles).forEach((name) => element.style[name] = lateStyles[name]))
      }
    }, false)
    Core.AttributeManager.createAttribute('style:hover', (element, value) => addClass(element, Core.StyleManager.createHoverStyle(Tools.parseStyleValue(value, Core.UnitManager.units))), false)
    Core.AttributeManager.createAttribute('trigger', (element, value) => Core.ListenerManager.listen(element, 'click', () => {
      if (value[0] === '/') window.location.href = value
      else if (value.substring(0, 7) === 'http://' || value.substring(0, 8) === 'https://') window.open(value)
      else document.head.appendChild(createElement('script', { type: 'module', innerHTML: value })).remove()
    }), false)

    Core.UnitManager.createUnit('ps', (value) => `calc(calc(1vw + 1vh) * ${value})`)
  }
}

// Add Class
function addClass (element, className) {
  let classList = element.getAttribute('class')

  if (classList === null) classList = []
  else classList = classList.split(' ')

  if (!classList.includes(className)) classList.push(className)

  element.setAttribute('class', classList.join(' '))
}

import createElement from './CreateElement.js'
