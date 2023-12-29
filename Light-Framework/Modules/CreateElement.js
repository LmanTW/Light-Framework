// Create Element
export default (tagName, options, children) => {
  checkParameters({
    tagName: { type: ['string'] },
    options: { type: ['undefined', 'object'] },
    children: { type: ['undefined', 'array'] }
  }, { tagName, options, children })

  const element = (tagName === 'svg') ? document.createElementNS('http://www.w3.org/2000/svg', 'svg') : document.createElement(tagName)

  if (options !== undefined) {
    if (options.class !== undefined) options.classList = options.class

    if (options.style !== undefined) {
      if (options.style.center !== undefined) {
        let types = options.style.center.split(' ')

        options.style.display = 'flex'

        if (types.includes('row')) {
          if (options.style.flexDirection === 'column') options.style.alignItems = 'center'
          else options.style.justifyContent = 'center'
        }

        if (types.includes('column')) {
          if (options.style.flexDirection === 'column') options.style.justifyContent = 'center'
          else options.style.alignItems = 'center'
        }
      }
    }

    Object.keys(options).forEach((key) => {
      if (key === 'style') element.setAttribute('light:style', parseObjectToCss(options[key]))
      else element.setAttribute(key, options[key])
    })
  }

  if (children !== undefined) children.forEach((child) => element.appendChild(child))

  return element
}

import checkParameters from './Tools/CheckParameters.js'

import parseObjectToCss from './Tools/ParseObjectToCss.js'
import parseStyleValue from './Tools/ParseStyleValue.js'
