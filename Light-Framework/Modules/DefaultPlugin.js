// Default Plugin
export default {
  id: 'Default',

  register: () => {
  },

  init: (Core) => {
    Core.AttributeManager.createAttribute('style', (element, value) => {
      const styles = applyStyle(parseCssToObject(parseStyleValue(value, Core.UnitManager.units)))

      const lateStyles = {}

      Object.keys(styles).forEach((name) => {
        if (['transition', 'transitionDuration'].includes(name)) {
          lateStyles[name] = styles[name]

          delete styles[name]
        }
      })

      const classList = Array.from(element.classList).filter((className) => !className.includes('style-'))
      
      if (classList.length > 0) element.setAttribute('class', classList.join(' '))
      else element.removeAttribute('class')

      addClass(element, StyleManager.createStyle(parseObjectToCss(styles), 'style', 'style-<id>'))

      window.requestAnimationFrame(() => Object.keys(lateStyles).forEach((name) => element.style[name] = lateStyles[name]))
    }, false)
    Core.AttributeManager.createAttribute('style:hover', (element, value) => addClass(element, StyleManager.createStyle(parseStyleValue(value, Core.UnitManager.units), 'hover', 'hover-{id}:hover')), false)
    Core.AttributeManager.createAttribute('style:hold', (element, value) => addClass(element, StyleManager.createStyle(parseStyleValue(value, Core.UnitManager.units), 'hold', '.hold-{id}:active:hover')), false)
    Core.AttributeManager.createAttribute('trigger', (element, value) => {
      if (element.getAttribute('light:trigger-set') === null) {
        element.innerHTML = createElement('a', { innerHTML: element.innerHTML, href: value, style: { all: 'unset' }}).outerHTML

        element.setAttribute('light:trigger-set', 'true')
      }
    }, false)
    Core.AttributeManager.createAttribute('url', (element, value) => {
      if (element.getAttribute('light:url-set') === null) {
        const a = createElement('a', { innerHTML: element.innerHTML, href: value, style: { all: 'unset' }})

        while (element.firstChild) element.firstChild.remove()

        element.appendChild(a)

        Core.ListenerManager.listen(a, 'click', (event) => event.preventDefault())

        element.setAttribute('light:url-set', 'true')
      }      
    })

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

// Parse Style Value
function parseStyleValue (value, units) {
  if (value.includes('[') && value.includes(']')) {
    const unitList = Object.keys(units).sort((a, b) => b.length-a.length)

    for (let i = 0; i < value.length; i++) {
      if (value[i] === '[') {
        let chunk = ''

        while (value[i] !== ']' && i < value.length) {
          i++

          if (value[i] !== ']') chunk+=value[i]
        }

        if (chunk[0] === '$') value = value.replaceAll(`[${chunk}]`, `var(--${chunk.substring(1, chunk.length)})`)
        else {
          for (let unit of unitList) {
            if (chunk.substring(chunk.length-unit.length, chunk.length) === unit) value = value.replaceAll(`[${chunk}]`, units[unit](chunk.substring(0, chunk.length-unit.length)))
          }
        }
      }
    }
  }

  return value
}

import applyStyle from './Tools/ApplyStyle.js'

import parseObjectToCss from './Tools/ParseObjectToCss.js' 
import parseCssToObject from './Tools/ParseCssToObject.js'
import StyleManager from './Managers/StyleManager.js'
import createElement from './CreateElement.js'
