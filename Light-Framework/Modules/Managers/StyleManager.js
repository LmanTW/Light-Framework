const style = document.head.appendChild(document.createElement('style'))

let styles = {
  style: {},
  hover: {}
}

// Style Manager
export default class {
  // Create Style
  createStyle (style) {
    Tools.checkParameters({
      style: { type: ['string'] }
    }, { style })
 
    for (let id of Object.keys(styles.style)) {
      if (styles.style[id] === style) return `style-${id}`
    }

    const id = Tools.generateID(5, Object.keys(styles.style)) 

    styles.style[id] = style

    compileStyle()

    return `style-${id}`
  }

  // Create Hover Style
  createHoverStyle (style) {
    Tools.checkParameters({
      style: { type: ['string'] }
    }, { style })

    for (let id of Object.keys(styles.hover)) {
      if (styles.hover[id] === style) return `hover-${id}`
    }

    const id = Tools.generateID(5, Object.keys(styles.hover)) 

    styles.hover[id] = style

    compileStyle()

    return `hover-${id}`
  }
}

// Set Style
function compileStyle () {
  const chunks = []

  Object.keys(styles.style).forEach((id) => chunks.push(`.style-${id} {${styles.style[id]}}`))
  Object.keys(styles.hover).forEach((id) => chunks.push(`.hover-${id}:hover {${styles.hover[id]}}`))

  style.textContent = chunks.join('')
}

import Tools from '../Tools/Main.js'
