// Attribute Manager
export default class {
  private _Core!: Core

  private _attributes: { [key: string]: (element: HTMLElement, value: string) => any } = {}

  constructor (Core: Core) {
    this._Core = Core
  }

  // Create Attribute
  public createAttribute (name: string, callback: (element: HTMLElement, value: string) => any, update?: boolean): void {
    Tools.checkParameters({
      name: { type: ['string'] },
      callback: { type: ['function'] },
      update: { type: ['undefined', 'boolean'] }
    }, { name, callback, update })

    if (this._attributes[name] !== undefined) throw new Error(`Attribute Already Exist: "${name}"`)

    this._attributes[name] = callback

    if (update === undefined || update === false) this._Core.Observer.checkChildren(this._Core.element)
  }

  // Delete Attribute
  public deleteAttribute (name: string, update?: boolean): void {
    Tools.checkParameters({
      name: { type: ['string'] },
      update: { type: ['undefined', 'boolean'] }
    }, { name, update })

    if (this._attributes[name] === undefined) throw new Error(`Attribute Not Found: "${name}"`)

    delete this._attributes[name]

    if (update === undefined || update === false) this._Core.Observer.checkChildren(this._Core.element)
  }

  // Get Attribute
  public getAttribute (name: string): undefined | ((element: HTMLElement, value: string) => any) {
    Tools.checkParameters({
      name: { type: ['string'] }
    }, { name })

    return (name.substring(0, 6) === 'light:') ? this._attributes[name.substring(6, name.length)] : undefined
  }
}

import Tools from '../Tools/Main.ts'
import Core from '../Core.ts'
