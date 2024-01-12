// Set Style
export default (element, name, value) => {
  Tools.checkParameters({
    element: { instance: [HTMLElement] },
    name: { type: ['string'] },
    value: { type: ['string', 'number'] }
  }, { element, name, value })

  let component = getComponent(getComponentIdFromParent(element))

  if (element.getAttribute('light:style') === null || component === undefined) return

  let styles = Tools.parseCssToObject(element.getAttribute('light:style'))

  styles[name] = value

  element.setAttribute('light:style', Tools.parseObjectToCss(styles))
}

import Tools from './Tools.js'

import { getComponentIdFromParent, getComponent } from './Components.js'
