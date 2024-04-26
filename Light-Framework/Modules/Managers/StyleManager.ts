export default class {
  // Create Style
  public static createStyle (style: string, type: string, idFormat: string): string {
    Tools.checkParameters({
      style: { type: ['string'] },
      type: { type: ['string'] },
      idFormat: { type: ['string'] }
    }, { style, type, idFormat })

    if (styles[type] === undefined) styles[type] = { idFormat, styles: {} }

    for (let id of Object.keys(styles[type].styles)) {
      if (styles[type].styles[id] === style) return `${type}-${id}`
    }

    const id = Tools.generateID(5, Object.keys(styles[type].styles))

    styles[type].styles[id] = style

    this.updateStyles()

    return `${type}-${id}`
  }

  // Update Styles
  public static updateStyles (): void {
    const chunks: string[] = []

    Object.keys(styles).forEach((type) => {
      Object.keys(styles[type].styles).forEach((id) => chunks.push(`.${styles[type].idFormat.replace('<id>', id)} {${styles[type].styles[id]}}`))
    })

    style.textContent = chunks.join('\n')
  }
}

// Style
interface Style {
  idFormat: string,

  styles: { [key: string]: string }
}

import Tools from '../Tools/Main.ts'

const style = document.head.appendChild(document.createElement('style'))

const styles: { [key: string]: Style } = {}
