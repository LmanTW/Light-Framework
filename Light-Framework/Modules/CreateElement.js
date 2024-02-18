// Create Element
export default (tagName, options, children) => {
  Tools.checkParameters({
    tagName: { type: ['string'] },
    options: { type: ['undefined', 'object'] },
    children: { type: ['undefined', 'array'] }
  }, { tagName, options, children })

  const element = (tagName === 'svg') ? document.createElementNS('http://www.w3.org/2000/svg', 'svg') : document.createElement(tagName)

  if (options !== undefined) {
    if (options.class !== undefined) options.classList = options.class

    Object.keys(options).forEach((key) => {
      if (key === 'innerHTML') element.innerHTML = options[key]
      else if (specialAttributes[key] !== undefined) element.setAttribute(specialAttributes[key], (['style', 'hover'].includes(key)) ? Tools.parseObjectToCss(Tools.applyStyle(options[key])) : options[key])
      else element.setAttribute(key, options[key])
    })
  }

  if (children !== undefined) children.forEach((child) => element.appendChild(child))

  return element
}

import Tools from './Tools/Main.js'

const specialAttributes = {
  style: 'light:style',
  hover: 'light:style:hover',
  hold: 'light:style:hold',
  trigger: 'light:trigger'
}
