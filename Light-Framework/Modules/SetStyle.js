// Set Style
export default (target, name, value) => {
  Tools.checkParameters({
    target: { instance: [HTMLElement] },
    name: { type: ['string'] },
    value: { type: ['undefined', 'string', 'number'] }
  }, { target, name, value })

  let component = getComponent(getComponentIdFromParent(target))

  if (component === undefined) throw new Error('Cannot Find Component')

  let styles = Tools.parseCssToObject((target.getAttribute('light:style') === null) ? '' : target.getAttribute('light:style'))

  if (value === undefined) delete styles[name]
  else styles[name] = value

  target.setAttribute('light:style', Tools.parseObjectToCss(styles))
}

import Tools from './Tools.js'

import { getComponentIdFromParent, getComponent } from './Components.js'
