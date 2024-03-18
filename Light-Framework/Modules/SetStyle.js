// Set Style
export default (element, name, value) => {
  const component = ComponentManager.getComponent(ComponentManager.getComponentFromParent(element))

  if (component !== undefined) {
    const styles = parseCssToObject((element.getAttribute('light:style') === null) ? '' : element.getAttribute('light:style'))

    if (value === undefined) delete styles[name]
    else styles[name] = value

    element.setAttribute('light:style', parseObjectToCss(styles))
  } 
}

import parseObjectToCss from './Tools/ParseObjectToCss.js'
import parseCssToObject from './Tools/ParseCssToObject.js'

import ComponentManager from './Managers/ComponentManager.js'
