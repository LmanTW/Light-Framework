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
    if (options.style !== undefined) options.style = Tools.applyStyle(options.style)

    Object.keys(options).forEach((key) => {
      if (key === 'innerHTML') element.innerHTML = options[key]
      else if (key === 'style') element.setAttribute('light:style', Tools.parseObjectToCss(options[key]))
      else element.setAttribute(key, options[key])
    })
  }

  if (children !== undefined) children.forEach((child) => element.appendChild(child))

  return element
}

import Tools from './Tools.js'
