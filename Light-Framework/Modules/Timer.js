// Timer
export default class {
  #interval

  #timers = {}

  constructor () {
    this.#interval = setInterval(() => {
      let time = performance.now()

      Object.keys(this.#timers).forEach((id) => {
        let timer = this.#timers[id]

        if (time-timer.lastUpdateTime >= timer.interval) {
          timer.callback(timer.count)

          timer.lastUpdateTime = time

          if (timer.times !== Infinity) {
            timer.count++

            if (timer.count >= timer.times) {
              if (timer.callback2 !== undefined) timer.callback2()

              delete timer[id]
            }
          }
        }
      })
    }, 1)
  }

  // Create Interval
  createInterval (interval, callback) {
    Tools.checkParameters({
      interval: { type: ['number'] },
      callback: { type: ['function'] }
    }, { interval, callback })

    let id = Tools.generateID(5, Object.keys(this.#timers))

    this.#timers[id] = {
      interval,
      times: Infinity,

      callback,

      count: 0,
      lastUpdateTime: performance.now()-interval
    }

    return id
  }

  // Create Loop
  createLoop (interval, times, callback, callback2) {
    Tools.checkParameters({
      interval: { type: ['number'] },
      times: { type: ['number'] },
      callback: { type: ['function'] },
      callback2: { type: ['undefined', 'function'] }
    }, { interval, times, callback, callback2 })

    let id = Tools.generateID(5, Object.keys(this.#timers))

    this.#timers[id] = {
      interval,
      times,

      callback,
      callback2,

      count: 0,
      lastUpdateTime: performance.now()-interval
    }

    return id
  }

  // Delete Timer
  deleteTimer (id) {
    Tools.checkParameters({
      id: { type: ['undefined', 'string'] }
    }, { id })

    if (id === undefined) {
      clearInterval(this.#interval)

      this.#timers = {}
    } else {
      if (this.#timers[id] === undefined) throw new Error(`Timer Not Found: ${id}`)

      delete this.#timers[id]
    }
  }
}

import Tools from './Tools.js'
