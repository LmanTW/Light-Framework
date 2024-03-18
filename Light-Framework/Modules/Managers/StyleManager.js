const style = document.head.appendChild(document.createElement('style'))

const styles = {}

// Style Manager
export default class {
  // Create Style
  static createStyle (style, type, idFormat) {
    if (styles[type] === undefined) styles[type] = { idFormat, styles: {} }

    for (let id of Object.keys(styles[type].styles)) {
      if (styles[type].styles[id] === style) return `${type}-${id}`
    }

    const id = generateID(5, Object.keys(styles[type].styles)) 

    styles[type].styles[id] = style

    compileStyle()

    return `${type}-${id}`
  }
}

// Set Style
function compileStyle () {
  const chunks = []

  Object.keys(styles).forEach((type) => {
    Object.keys(styles[type].styles).forEach((id) => chunks.push(`.${styles[type].idFormat.replace('<id>', id)} {${styles[type].styles[id]}}`))
  })

  style.textContent = chunks.join('\n')
}

import generateID from '../Tools/GenerateID.js'
