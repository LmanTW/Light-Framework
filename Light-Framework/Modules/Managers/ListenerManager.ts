// Listener Manager
export default class {
  private _listeners: { [key: string]: Listener } = {}

  // Listen To An Event
  public listen (target: any, name: string, callback: (...args: any) => any, options?: { tag?: string, once?: boolean }): string {
    Tools.checkParameters({
      name: { type: ['string'] },
      callback: { type: ['function'] }
    }, { name, callback })

    if (options === undefined) options = {}

    const id = Tools.generateID(5, Object.keys(this._listeners))

    const callback2 = (...args: any) => {
      if (options.once) this.removeListener(id)

      callback(...args)
    }

    this._listeners[id] = { target, name, callback: callback2, tag: options.tag }

    target.addEventListener(name, callback2, options)

    return id
  }

  // Remove Listener
  public removeListener (id: string): void {
    Tools.checkParameters({
      id: { type: ['string'] }
    }, { id })

    if (this._listeners[id] === undefined) throw new Error(`Listener Not Found: "${id}"`)

    this._listeners[id].target.removeEventListener(this._listeners[id].name, this._listeners[id].callback)
  }

  // Remove All Listeners
  public removeAllListeners (): void {
    Object.keys(this._listeners).forEach((id) => this.removeListener(id))
  }

  // Find Listeners
  public findListeners (target: any, query: { name?: string, tag?: string }): string[] {
    const listeners: string[] = []
      
    Object.keys(this._listeners).forEach((id) => {
      if (this._listeners[id].target === target && ((query.name === undefined || this._listeners[id].name === query.name) && (query.tag === undefined && this._listeners[id].tag === query.tag))) listeners.push(id) 
    })

    return listeners 
  }
}

// Listener
interface Listener {
  target: any,

  name: string,
  tag?: string,

  callback: (...args: any) => any
}

import Tools from '../Tools/Main.ts'
