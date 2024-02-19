const style = document.head.appendChild(document.createElement('style'))

let styles = {
  style: {},
  hover: {},
  hold: {}
}

// Style Manager
export default class {
  // Create Style
  createStyle (style, type) {
    Tools.checkParameters({
      style: { type: ['string'] }
    }, { style })
 
    for (let id of Object.keys(styles.style)) {
      if (styles[type][id] === style) return `${type}-${id}`
    }

    const id = Tools.generateID(5, Object.keys(styles[type])) 

    styles[type][id] = style

    compileStyle()

    return `${type}-${id}`
  }
}

// Set Style
function compileStyle () {
  const chunks = []

  Object.keys(styles.style).forEach((id) => chunks.push(`.style-${id} {${styles.style[id]}}`))
  Object.keys(styles.hover).forEach((id) => chunks.push(`.hover-${id}:hover {${styles.hover[id]}}`))
  Object.keys(styles.hold).forEach((id) => chunks.push(`.hold-${id}:active:hover {${styles.hold[id]}}`))

  style.textContent = chunks.join('')
}

import Tools from '../Tools/Main.js'
