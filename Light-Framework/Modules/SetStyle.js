// Set Style
export default (element, name, value) => {
  Tools.checkParameters({
    element: { instance: [HTMLElement] },
    name: { type: ['string'] },
    value: { type: ['undefined', 'string', 'number'] }
  }, { element, name, value })

  let component = getComponent(getComponentIdFromParent(element))

  if (component === undefined) throw new Error('Cannot Find Component')

  console.log(element.getAttribute('light:style'))
  let styles = Tools.parseCssToObject((element.getAttribute('light:style') === null) ? '' : element.getAttribute('light:style'))

  if (value === undefined) delete styles[name]
  else styles[name] = value

  element.setAttribute('light:style', Tools.parseObjectToCss(styles))
}

import Tools from './Tools.js'

import { getComponentIdFromParent, getComponent } from './Components.js'
