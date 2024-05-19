// Timer Manager
export default class {
  private _interval!: any

  private _timers: { [key: string]: Timer } = {}

  // Create Timeout
  public createTimeout (ms: number, callback: () => any): string {
    Tools.checkParameters({
      ms: { type: ['number'] },
      callback: { type: ['function'] }
    }, { ms, callback })

    const id = Tools.generateID(5, Object.keys(this._timers))

    this._timers[id] = {
      times: 1,
      interval: ms,

      callback2: callback,

      count: 0,
      lastUpdateTime: performance.now()
    }

    if (this._interval === undefined) this._start()

    return id
  }

  // Create Interval 
  public createInterval (interval: number, callback: (count?: number) => any): string {
    Tools.checkParameters({
      interval: { type: ['number'] },
      callback: { type: ['function'] }
    }, { interval, callback })

    const id = Tools.generateID(5, Object.keys(this._timers))

    this._timers[id] = {
      times: Infinity,
      interval,

      callback,

      count: 0,
      lastUpdateTime: performance.now()
    }

    if (this._interval === undefined) this._start()

    return id
  }

  // Create Loop
  public createLoop (times: number, interval: number, callback: (count?: number) => any, callback2?: () => any): string {
    Tools.checkParameters({
      times: { type: ['number'] },
      interval: { type: ['number'] },
      callback: { type: ['function'] },
      callback2: { type: ['undefined', 'function'] }
    }, { times, interval, callback, callback2 })

    const id = Tools.generateID(5, Object.keys(this._timers))

    this._timers[id] = {
      times,
      interval,

      callback,
      callback2,
        
      count: 0,
      lastUpdateTime: performance.now()
    }

    if (this._interval === undefined) this._start()

    return id
  }

  // Delete Timer
  public deleteTimer (id: string): void {
    Tools.checkParameters({
      id: { type: ['string'] }
    }, { id })

    if (this._timers[id] === undefined) throw new Error(`Timer Not Found: "${id}"`)

    delete this._timers[id]
  }

  // Delete All Timers
  public deleteAllTimers (): void {
    Object.keys(this._timers).forEach((id) => this.deleteTimer(id))
  }

  // Start The Timer
  private _start (): undefined {
    this._interval = setInterval(() => {
      const time = performance.now()

      Object.keys(this._timers).forEach((id) => {
        const timer = this._timers[id]

        if (timer !== undefined && time - timer.lastUpdateTime >= timer.interval) {
          if (timer.callback !== undefined) timer.callback(timer.count)

          timer.lastUpdateTime = time

          if (timer.times !== Infinity) {
            timer.count++

            if (timer.count === timer.times) {
              if (timer.callback2 !== undefined) timer.callback2()

              delete this._timers[id]
            }
          }
        }
      })
    }, 1)
  }
}

// Timer
interface Timer {
  times: number,
  interval: number,

  callback?: (count: number) => any,
  callback2?: () => any,

  count: number,
  lastUpdateTime: number
}

import Tools from '../Tools/Main.ts'
