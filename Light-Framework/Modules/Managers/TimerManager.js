// Timer
export default class {
  #interval

  #timers = {}

  // Start Timer
  startTimer () {
    this.#interval = setInterval(() => {
      const time = performance.now()

      Object.keys(this.#timers).forEach((id) => {
        const timer = this.#timers[id]

        if (time-timer.lastUpdateTime >= timer.interval) {
          timer.callback(timer.count)

          timer.lastUpdateTime = time

          if (timer.times !== Infinity) {
            timer.count++

            if (timer.count >= timer.times) {
              if (timer.callback2 !== undefined) timer.callback2()

              delete this.#timers[id]
            }
          }
        }
      })
    }, 1)
  }

  // Create Timeout
  createTimeout (time, callback) {
    Tools.checkParameters({
      time: { type: ['number'] },
      callback: { type: ['function'] }
    }, { time, callback })

    const id = Tools.generateID(5, Object.keys(this.#timers))

    this.#timers[id] = {
      interval: time,
      times: 1,

      callback: () => {},
      callback2: callback,

      count: 0,
      lastUpdateTime: performance.now()
    }

    if (this.#interval === undefined) this.startTimer()

    return id
  }

  // Create Interval
  createInterval (interval, callback, instantStart) {
    Tools.checkParameters({
      interval: { type: ['number'] },
      callback: { type: ['function'] },
      instantStart: { type: ['undefined', 'boolean'] }
    }, { interval, callback, instantStart })

    const id = Tools.generateID(5, Object.keys(this.#timers))

    this.#timers[id] = {
      interval,
      times: Infinity,

      callback,

      count: 0,
      lastUpdateTime: (instantStart === true) ? performance.now()-interval : performance.now() 
    }

    if (this.#interval === undefined) this.startTimer()

    return id
  }

  // Create Loop
  createLoop (interval, times, callback, callback2, instantStart) {
    Tools.checkParameters({
      interval: { type: ['number'] },
      times: { type: ['number'] },
      callback: { type: ['function'] },
      callback2: { type: ['undefined', 'function'] },
      instantStart: { type: ['undefined', 'boolean'] }
    }, { interval, times, callback, callback2, instantStart })

    const id = Tools.generateID(5, Object.keys(this.#timers))

    this.#timers[id] = {
      interval,
      times,

      callback,
      callback2,

      count: 0,
      lastUpdateTime: (instantStart === true) ? performance.now()-interval : performance.now()
    }

    if (this.#interval === undefined) this.startTimer()

    return id
  }

  // Delete Timer
  deleteTimer (id) {
    Tools.checkParameters({
      id: { type: ['string'] }
    }, { id })

    if (this.#timers[id] === undefined) throw new Error(`Timer Not Found: ${id}`)

    delete this.#timers[id]

    if (Object.keys(this.#timers).length < 1) {
      clearInterval(this.#interval)

      this.#interval = undefined
    }
  }

  // Delete All Timers
  deleteAllTimers () {
    Object.keys(this.#timers).forEach((id) => this.deleteTimer(id))
  }
}

import Tools from '../Tools/Main.js'
