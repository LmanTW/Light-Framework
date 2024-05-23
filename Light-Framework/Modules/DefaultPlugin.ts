// Default Plugin
const DefaultPlugin: Plugin = {
  id: 'Default',

  register: (_, Utilities) => {
    class LightSVG extends HTMLElement {
      constructor () {
        super()
      }

      async connectedCallback () {
        if (svgCache[this.getAttribute('src')] === undefined) svgCache[this.getAttribute('src')] = await (await fetch(this.getAttribute('src'))).text()

        const element = createElement('div', { innerHTML: svgCache[this.getAttribute('src')] })

        this.getAttributeNames().forEach((name) => element.setAttribute(name, this.getAttribute(name)))

        this.replaceWith(element)
      }
    }

    if (customElements.get('light-svg') === undefined) customElements.define('light-svg', LightSVG)
  },

  init: (Core) => {
    Core.AttributeManager.createAttribute('style', (element, value) => {
      const properties = applySpecialProperties(parseStyle(Core.UnitManager.parseStyleValue(value)))

      const delayValues = {}

      Object.keys(properties).forEach((name) => {
        if (['transition', 'transitionDuration'].includes(name)) {
          delayValues[name] = properties[name]

          delete properties[name]
        }
      })

      const classList = Array.from(element.classList).filter((className) => !className.includes('style-'))
      
      if (classList.length > 0) element.setAttribute('class', classList.join(' '))
      else element.removeAttribute('class')

      addClass(element, Core.StyleManager.createStyle(createStyle(properties), 'style', 'style-<id>'))

      window.requestAnimationFrame(() => Object.keys(delayValues).forEach((name) => element.style[name] = delayValues[name]))
    })
    Core.AttributeManager.createAttribute('style:hover', (element, value) => addClass(element, Core.StyleManager.createStyle(Core.UnitManager.parseStyleValue(value), 'hover', 'hover-<id>:hover')))
    Core.AttributeManager.createAttribute('style:hold', (element, value) => addClass(element, Core.StyleManager.createStyle(Core.UnitManager.parseStyleValue(value), 'hold', 'hold-<id>:active:hover')))
    Core.AttributeManager.createAttribute('trigger:open', (element, value) => {
      if (element.getAttribute('light:computed') === null) {
        const style: CssProperties = (element.children.length === 0) ? { all: 'unset', color: 'inherit', background: 'inherit', font: 'inherit' } : { all: 'inherit' }

        element.innerHTML = createElement('a', { innerHTML: element.innerHTML, href: value, target: '_blank', style: createStyle(style) }).outerHTML

        element.setAttribute('light:computed', 'true')
      }
    })
    Core.AttributeManager.createAttribute('trigger:goto', (element, value) => {
      if (element.getAttribute('light:computed') === null) {
        const style: CssProperties = (element.children.length === 0) ? { all: 'unset', color: 'inherit', background: 'inherit', font: 'inherit' } : { all: 'inherit' }

        element.innerHTML = createElement('a', { innerHTML: element.innerHTML, href: value, style: createStyle(style) }).outerHTML

        element.setAttribute('light:computed', 'true')
      }
    })
    Core.AttributeManager.createAttribute('url', (element, value) => {
      if (element.getAttribute('light:computed') === null) {
        const style: CssProperties = (element.children.length === 0) ? { all: 'unset', color: 'inherit', background: 'inherit', font: 'inherit' } : { all: 'inherit' }

        const a = createElement('a', { innerHTML: element.innerHTML, href: value, style: createStyle(style) })

        while (element.firstChild) element.firstChild.remove()

        element.appendChild(a)

        Core.ListenerManager.listen(a, 'click', (event) => event.preventDefault())

        element.setAttribute('light:computed', 'true')
      }      
    })

    Core.UnitManager.createUnit('ps', (value) => `calc(calc(1vw + 1vh) * ${value})`)
  }
}

// Add Class
function addClass (element: HTMLElement, className: string): void {
  let classList: string = element.getAttribute('class')
  
  const chunks: string[] = (classList === null) ? [] : classList.split(' ')

  if (!chunks.includes(className)) chunks.push(className)

  element.setAttribute('class', chunks.join(' '))
}

export default DefaultPlugin

import { createStyle, applySpecialProperties, parseStyle, CssProperties } from './Style'
import { Plugin } from './Managers/PluginManager'
import { createElement } from './Element'

const svgCache = {}
