// Timer Manager
export default class {
  #interval

  #timers = {} 

  // Create Timeout
  createTimeout (time, callback) {
    const id = generateID(5, Object.keys(this.#timers))

    this.#timers[id] = {
      interval: time,
      times: 1,

      callback: () => {},
      callback2: callback,

      count: 0,
      lastUpdateTime: performance.now()
    }

    if (this.#interval === undefined) this.#startTimer()

    return id
  }

  // Create Interval
  createInterval (interval, callback) {
    const id = generateID(5, Object.keys(this.#timers))

    this.#timers[id] = {
      interval,
      times: Infinity,

      callback,

      count: 0,
      lastUpdateTime: performance.now() 
    }

    if (this.#interval === undefined) this.#startTimer()

    return id
  }

  // Create Loop
  createLoop (interval, times, callback, callback2) {
    const id = Tools.generateID(5, Object.keys(this.#timers))

    this.#timers[id] = {
      interval,
      times,

      callback,
      callback2,

      count: 0,
      lastUpdateTime: performance.now() 
    }

    if (this.#interval === undefined) this.#startTimer()

    return id
  }

  // Delete Timer
  deleteTimer (id) {
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

  // Start Timer
  #startTimer () {
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
}

import generateID from '../Tools/GenerateID.js'
