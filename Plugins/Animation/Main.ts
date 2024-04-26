import anime from './Anime.js'

import { Plugin } from '../../Light-Framework/API.ts'

// Animation
const Animation: Plugin = {
  id: 'Animation',

  register: (API, Utilities) => {
    API.Animation = {
      // Transform
      transform: (target: HTMLElement, transforms: { [key: string]: [any, any] }, options: AnimationOptions): void => {
        Utilities.Tools.checkParameters({
          target: { instanceOf: { instance: HTMLElement, name: 'HTMLElement' }},
          transforms: { type: ['object'] },
          options: { type: ['undefined', 'object'] }
        }, { target })

        if (options === undefined) options = {}

        const states: { [key: string]: any } = {}
        const end: { [key: string]: any } = {}

        Object.keys(transforms).forEach((path) => {
          states[path] = transforms[path][0]
          end[path] = transforms[path][1]
        })

        anime({
          targets: states,

          change: () => Object.keys(states).forEach((name) => setValue(target, name, states[name])),

          delay: options.delay || 0,
          duration: options.duration || 1000,
          easing: options.easing || 'easeInOutCubic',
          complete: options.complete
        })
      },

      // Keyframes
      keyframes: (target: HTMLElement, keyframes: { [key: string]: any }[], options: AnimationOptions): void => {
        Utilities.Tools.checkParameters({
          target: { instanceOf: { instance: HTMLElement, name: 'HTMLElement' }},
          keyframes: { type: ['array'] },
          options: { type: ['undefined', 'object'] }
        }, { target })

        if (options === undefined) options = {}

        const states: { [key: string]: any } = {}

        Object.keys(keyframes[0]).forEach((path) => states[path] = keyframes[0][path])

        anime({
          targets: states,

          keyframes,

          change: () => Object.keys(states).forEach((name) => setValue(target, name, states[name])),

          delay: options.delay || 0,
          duration: options.duration || 1000,
          easing: options.easing || 'easeInOutCubic',
          loop: options.loop || false,
          complete: options.complete
        })
      }
    }
  }
}

// Set Value
function setValue (element: HTMLElement, name: string, value: any): void {
  let target = element

  const keys = name.split('.')

  for (let i = 0; i < keys.length - 1; i++) {
    if (target[keys[i]] === undefined) throw new Error(`Value "${name}" Does Not Exist On <HTMLElement>`)

    target = target[keys[i]]
  }

  target[keys[keys.length - 1]] = value
}

// Animation Options 
interface AnimationOptions {
  delay?: number,
  duration?: number,
  easing?: string, 
  loop?: boolean,

  complete?: (...args: any) => any
}

export default Animation
