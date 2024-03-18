// Create Element
export default (tagName, options, children) => {
  const element = (tagName === 'svg') ? document.createElementNS('http://www.w3.org/2000/svg', 'svg') : document.createElement(tagName)

  if (options !== undefined) {
    if (options.class !== undefined) options.classList = options.class

    Object.keys(options).forEach((key) => {
      if (key === 'innerHTML') element.innerHTML = options[key]
      else if (['style', 'light:style', 'light:style:hover', 'light:style:hold'].includes(key) && typeof options[key] === 'object') element.setAttribute(key, parseObjectToCss(applyStyle(options[key])))
      else element.setAttribute(key, options[key])
    })
  }

  if (children !== undefined) children.forEach((child) => element.appendChild(child))

  return element
}

import parseObjectToCss from './Tools/ParseObjectToCss.js'
import applyStyle from './Tools/ApplyStyle.js'
