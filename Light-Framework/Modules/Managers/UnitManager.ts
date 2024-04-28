// Unit Manager
export default class {
  private _Core!: Core

  private _units: { [key: string]: (value: string) => string } = {}

  constructor (Core: Core) {
    this._Core = Core
  }

  // Create Unit
  public createUnit (name: string, callback: (value: string) => string, update?: boolean): void {
    Tools.checkParameters({
      name: { type: ['string'] },
      callback: { type: ['function'] },
      update: { type: ['undefined', 'boolean'] }
    }, { name, callback, update })

    if (this._units[name] !== undefined) throw new Error(`Unit Already Exist: "${name}"`)

    this._units[name] = callback

    if (update) this._Core.Observer.checkChildren(this._Core.element)
  }

  // Delete Unit
  public deleteUnit (name: string, update?: boolean): void {
    Tools.checkParameters({
      name: { type: ['string'] },
      update: { type: ['undefined', 'boolean'] }
    }, { name, update })

    if (this._units[name] === undefined) throw new Error(`Unit Not Found: "${name}"`)

    delete this._units[name]

    if (update) this._Core.Observer.checkChildren(this._Core.element)
  }

  // Parse Style Value
  public parseStyleValue (value: string): string {
    if (value.includes('[') && value.includes(']')) {
      const units = Object.keys(this._units).sort((a, b) => b.length - a.length)

      let result = '' 

      let chunk: undefined | string = undefined

      for (let i = 0; i < value.length; i++) {
        if (value[i] === '[') chunk = ''
        else if (value[i] === ']') {
          if (chunk[0] === '$') result += `var(--${chunk.substring(1, chunk.length)})`
          else {
            for (let unit of units) {
              const unitName = chunk.substring(chunk.length - unit.length, chunk.length)

              if (unitName === unit) {
                result += this._units[unitName](chunk.substring(0, chunk.length - unit.length))

                break
              } 
            }
          }

          chunk = undefined
        } else {
          if (chunk === undefined) result += value[i]
          else chunk += value[i]
        }
      }

      return result
    }

    return value
  }
}

import Tools from '../Tools/Main.ts'
import Core from '../Core.ts'
