const style = document.head.appendChild(document.createElement('style'))

let styles = {
  style: {},
  hover: {}
}

// Style Manager
export default class {
  // Create Style
  createStyle (style) {
    checkParameters({
      style: { type: ['string'] }
    }, { style })
 
    for (let id of Object.keys(styles.style)) {
      if (styles.style[id] === style) return id
    }

    let id = `style-${generateID(5, Object.keys(styles.hover))}`

    styles.style[id] = style

    compileStyle()

    return id
  }

  // Create Hover Style
  createHoverStyle (style) {
    checkParameters({
      style: { type: ['string'] }
    }, { style })

    for (let id of Object.keys(styles.hover)) {
      if (styles.hover[id] === style) return id
    }

    let id = `hover-${generateID(5, Object.keys(styles.hover))}`

    styles.hover[id] = style

    compileStyle()

    return id
  }
}

// Set Style
function compileStyle () {
  let chunks = []

  Object.keys(styles.style).forEach((id) => chunks.push(`.${id} {${styles.style[id]}}`))
  Object.keys(styles.hover).forEach((id) => chunks.push(`.${id}:hover {${styles.hover[id]}}`))

  style.textContent = chunks.join('')
}

import checkParameters from '../Tools/CheckParameters.js'
import generateID from '../Tools/GenerateID.js'
