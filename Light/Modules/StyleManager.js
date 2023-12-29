const style = document.head.appendChild(document.createElement('style'))

let styles = {
  hover: {}
}

// Style Manager
export default class {
  #styles = {
    hover: []
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
    this.#styles.hover.push(id)

    compileStyle()

    return id
  }
}

// Set Style
function compileStyle () {
  let lines = []

  Object.keys(styles.hover).forEach((id) => {
    lines.push(`.${id}:hover {${styles.hover[id]}}`)
  })

  style.innerHTML = lines.join('\n')
}

import checkParameters from './Tools/CheckParameters.js'
import generateID from './Tools/GenerateID.js'
