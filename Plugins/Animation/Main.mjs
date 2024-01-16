import animejs from 'https://unpkg.com/animejs@3.2.2/lib/anime.es.js'

// Animation
export default {
  id: 'Animation',

  register: (API, Tools) => {
    API.Animation = {
      // Transform
      transform: (target, transforms, options) => {
        if (!Array.isArray(target) && !(target instanceof HTMLElement)) throw new Error('Parameter "target" Must Be A <array> Or An Instance Of HTMLElement')

        Tools.checkParameters({
          transforms: { type: ['object'] },
          options: { type: ['undefined', 'object'] }
        }, { transforms, options })

        let states = {}, end = {}

        Object.keys(transforms).forEach((path) => {
          states[path] = transforms[path][0]
          end[path] = transforms[path][1]
        })

        options = Object.assign({
          easing: 'easeInOutCubic',
          duration: 1000
        }, (options === undefined) ? {} : options)

        animejs(Object.assign({
          targets: states,

          change: () => {
            Object.keys(states).forEach((path) => {
              if (Array.isArray(target)) target.forEach((element) => setValue(element, path, states[path]))
              else setValue(target, path, states[path])
            })
          }
        }, end, options))

        return target
      },

      // Keyframe
      keyframe: (target, keyframes, options) => {
        if (!Array.isArray(target) && !(target instanceof HTMLElement)) throw new Error('Parameter "target" Must Be A <array> Or An Instance Of HTMLElement')

        Tools.checkParameters({
          keyframes: { type: ['array'] },
          options: { type: ['undefined', 'object'] }
        }, { keyframes, options })

        let states = {}

        Object.keys(keyframes[0]).forEach((path) => states[path] = keyframes[0][path])

        options = Object.assign({
          easing: 'easeInOutCubic',
          duration: 1000
        }, (options === undefined) ? {} : options)

        animejs(Object.assign({
          targets: states,

          keyframes,

          change: () => {
            Object.keys(states).forEach((path) => {
              if (Array.isArray(target)) target.forEach((element) => setValue(element, path, states[path]))
              else setValue(target, path, states[path])
            })
          }
        }, options))

        return target
      }
    }
  },

  init: () => {}
}

// Set Value
function setValue (element, path, value) {
  let target = element

  let keys = path.split('.')

  for (let i = 0; i < keys.length-1; i++) target = target[keys[i]]

  target[keys[keys.length-1]] = value
}
